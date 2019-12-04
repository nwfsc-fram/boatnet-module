# boatnet-module

A collection of libraries used for the Boatnet project. 

See README.md in individual folders for more details.

See CONTRIBUTING.md for info on building/updating Boatnet modules.

* bn-test-example
    * A basic module used to test npm publish
* bn-util
   * Intended for commonly used utility functions.
* bn-models
   * Models used for storing records in CouchDB
   
* bn-auth
   * Client-side auth routines for getting CouchDB info etc from auth server. See also boatnet/dev-auth-server for example implementation.
    
* bn-pouch, bn-couch
  * Types and routines for communicating to CouchDB and PouchDB, and handling sync
  
* test-boatnet-module
  * Used for testing all of the above, via `yarn test:unit`
