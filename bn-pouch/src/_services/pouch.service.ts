// Boatnet Pouch Service Routines

/* tslint:disable:no-console  */
/* tslint:disable:no-var-requires  */
import { Component, Vue, Prop } from 'vue-property-decorator';
// @ts-ignore
import PouchDB from 'pouchdb-browser';
// @ts-ignore
import lf from 'pouchdb-find';
// @ts-ignore
import plf from 'pouchdb-live-find';
// @ts-ignore
import pa from 'pouchdb-authentication';
// @ts-ignore
import PouchVue, { PublicPouchVueMethods } from 'pouch-vue';

// PouchDB plugins: pouchdb-find (included in the monorepo), LiveFind (external plugin), and couchdb auth
PouchDB.plugin(lf);
PouchDB.plugin(plf);
PouchDB.plugin(pa);

// https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
declare module 'vue/types/vue' {
  // Declare augmentation for Vue
  interface Vue {
    // @ts-ignore
    $pouch: PublicPouchVueMethods; // optional if `PouchDB` is available on the global object
    $defaultDB: string; // the database to use if none is specified in the pouch setting of the vue component
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    pouch?: any; // this is where the database will be reactive
  }
}

Vue.use(PouchVue, {
  pouch: PouchDB
});

import { CouchDBCredentials } from '@boatnet/bn-couch';
import { PouchDBSyncStatus } from '../_store/types/types';

class PouchService extends Vue {
  private currentCredentials: CouchDBCredentials | null = null;
  private currentActiveSyncs = 0;
  private isSyncActive = false;
  private isConnectCalled = false; // set once - does not necessarily guarantee continuous connection?

  constructor() {
    super();

    this.attachListeners();

    console.log('[PouchDB Service] Instantiated.');
  }

  public get db() {
    return this.$pouch;
  }

  public get lookupsDBName() {
    if (!this.currentCredentials ) {
      throw new Error('Please log out and back in again.');
    }
    return this.currentCredentials.dbInfo.lookupsDB;
  }

  public get userDBName() {
    if (!this.currentCredentials ) {
      throw new Error('Please log out and back in again.');
    }
    return this.currentCredentials.dbInfo.userDB;
  }

  public async connect(credentials: CouchDBCredentials) {
    console.log('[PouchDB Service] Connecting.');
    this.isConnectCalled = true;

    this.currentCredentials = credentials; // TODO: Remove if not used later

    // Insert credentials into login
    // TODO pouch-vue connect() doesn't seem to work for us
    const credsRoot = credentials.dbInfo.urlRoot.replace(
      /https?:\/\//gi,
      (base) => {
        return (
          base +
          credentials.userCredentials.username +
          ':' +
          credentials.userCredentials.password +
          '@'
        );
      }
    );
    const credentialedReadOnlyDB =
      credsRoot + '/' + credentials.dbInfo.lookupsDB;
    const credentialedUserDB = credsRoot + '/' + credentials.dbInfo.userDB;

    const syncOptsInitial = {
      live: false,
      retry: true,
      back_off_function: (delay: number) => {
        if (delay === 0) {
          return 1000;
        }
        return Math.min(delay * 3, 60000);
      }
    };
    const syncOptsLive = {
      live: true,
      retry: true,
      back_off_function: (delay: number) => {
        if (delay === 0) {
          return 1000;
        }
        return Math.min(delay * 3, 60000);
      }
    };


    this.syncActive(credentials.dbInfo);
    const initialSyncUser = await this.$pouch.sync(
      credentials.dbInfo.userDB,
      credentialedUserDB,
      syncOptsInitial
    );
    console.log(
      '[PouchDB Service] Initial',
      credentials.dbInfo.userDB,
      'sync completed.',
      initialSyncUser.pull.start_time
    );

    const initialSyncRO = await this.$pouch.sync(
      credentials.dbInfo.lookupsDB,
      credentialedReadOnlyDB,
      syncOptsInitial
    );
    console.log(
      '[PouchDB Service] Initial',
      credentials.dbInfo.lookupsDB,
      'sync completed.',
      initialSyncRO.pull.start_time
    );

    this.$emit('syncCompleted', initialSyncRO);

    this.$pouch
      .sync(credentials.dbInfo.userDB, credentialedUserDB, syncOptsLive)
      .on('paused', (err: any) => {
        // weird logic in pouch-vue, so handling this here
        this.syncDeactive({});
      });
    this.$pouch
      .sync(credentials.dbInfo.lookupsDB, credentialedReadOnlyDB, syncOptsLive)
      .on('paused', (err: any) => {
        // weird logic in pouch-vue, so handling this here
        this.syncDeactive({});
      });

    console.log('[PouchDB Service] Live sync enabled.');
  }

  public get isConnected() {
    return this.isConnectCalled;
  }
  public async disconnect() {
    console.log('TODO Disconnect from PouchDB');
  }

  private syncActive(dbInfo: any) {
    this.currentActiveSyncs++;
    if (!this.isSyncActive) {
      this.isSyncActive = true;
      const syncStatusOn: PouchDBSyncStatus = { syncActive: true, dbInfo };
      this.$emit('syncChanged', syncStatusOn);
      // console.log('[PouchDB Service] Active:', this.currentActiveSyncs);
    }
  }

  private syncDeactive(dbInfo: any) {
    if (this.currentActiveSyncs > 0) {
      this.currentActiveSyncs--;
    }
    if (this.isSyncActive) {
      let syncStatusOff: PouchDBSyncStatus = { syncActive: false, dbInfo };
      if (dbInfo.error) {
        syncStatusOff = {
          error: dbInfo.error.message,
          ...syncStatusOff
        };
      }

      if (this.currentActiveSyncs === 0) {
        this.isSyncActive = false;
        // console.log('[PouchDB Service] Paused');
        this.$emit('syncChanged', syncStatusOff);
      }
    }
  }

  private attachListeners() {
    console.log('[PouchDB Service] Activate Sync Listener');

    // Hook up pouchdb sync events
    this.$on('pouchdb-sync-active', (dbInfo: any) => {
      // console.log('[PouchDB Service] Sync Active!', dbInfo);
      this.syncActive(dbInfo);
    });
    this.$on('pouchdb-sync-complete', (dbInfo: any) => {
      // console.log('[PouchDB Service] Sync Complete!', dbInfo);
      this.syncDeactive(dbInfo);
      this.$emit('initialsync');
    });
    this.$on('pouchdb-sync-paused', (dbInfo: any) => {
      // console.log('[PouchDB Service] Sync Paused!', dbInfo);
      this.syncDeactive(dbInfo);
    });
    this.$on('pouchdb-sync-change', (dbInfo: any) => {

      console.log(
        '[PouchDB Service] Sync: ',
        dbInfo.db,
        dbInfo.info.direction,
        dbInfo.info.change.docs_read,
        dbInfo.info.change.pending
      );
      const syncStatus: PouchDBSyncStatus = { syncActive: true, dbInfo };
      this.$emit('syncProgress', syncStatus);
    });
    this.$on('pouchdb-sync-denied', (dbInfo: any) => {
      console.log('[PouchDB Service]Sync Denied!', dbInfo);
      this.syncDeactive(dbInfo);
    });
    this.$on('pouchdb-sync-error', (dbInfo: any) => {
      console.log('[PouchDB Service] Sync Error!', dbInfo.error.message);
      this.syncDeactive(dbInfo);
    });
  }
}

export const pouchService = new PouchService();
