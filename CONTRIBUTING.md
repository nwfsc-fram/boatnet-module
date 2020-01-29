# Brief Guide: Developing new Boatnet Modules

## Creating a new generic module
* Naming convention for boatnet modules is `@boatnet/bn-xyz`
```
mkdir bn-my-boatnet-module
cd bn-my-boatnet-module
yarn init -y
tsconfig --init
```
* See `bn-test-example` for examples, and configure your `package.json` and `tsconfig.json` accordingly (this will build to `lib/`)
* Note that modules with Vue support is more complex, still working on docs for that. See existing examples.

## Test by using npm link or yarn link, before you publish
### yarn link method
* Official documentation: https://yarnpkg.com/en/docs/cli/link
  * Not mentioned in the docs is the Windows yarn link tracking dir, C:\Users<user name>\AppData\Local\Yarn\Data\link
* This seems to be easier, but if you have errors, try npm link below.
* Example using bn-models library, and ashop client)
```
cd /my-git-path/boatnet-module/bn-models
[yarn install if you need to]
yarn build
yarn link
cd /my-git-path/boatnet/apps/ashop
yarn link @boatnet/bn-models
```
* Perform development (I believe you need to run `yarn build` between changes in your library) and when complete,
```
yarn unlink @boatnet/bn-models
```

### npm link method
* First, if your app is using the @boatnet module you intend to test/develop, you need to remove its node_modules first. Otherwise, you will get a "npm ERR! Refusing to delete" error.
```
rm -rf /c/git/boatnet-module/bn-MY-MODULE/node_modules/
```
* To be safe, I usually remove the package I'm testing as well
```
cd /c/my-test-app/
yarn remove @boatnet/bn-MY-MODULE
```
* Then you should be able to link it like so:
```
cd /c/my-test-app/
npm link /c/<your path to your library>/boatnet-module/bn-my-fancy-boatnet
```
  * At this point, in your app, you should be able to import as usual, e.g.
  ```
  import { myTestFunction } from '@boatnet/bn-my-fancy-boatnet'
  ```
  * You will want to break this npm link when you publish your library via `npm unlink`

## Publish to NPM
  * Remember to bump version # appropriately in package.json.
  * Run ```yarn build``` to perform lint checking before final merging of your code.
  * If yarn build fails trying running ```yarn install``` first
  * **Be sure to push and merge your (preferably code reviewed) changes to master before npm publishing.**
  * Build your package (usually will build to `lib/`, be sure to configure your tsconfig.json appropriately, see other @boatnet modules for examples.)

```
yarn build
```

  * Since this is a "@" (scoped) package, we need to specify ```--access public``` (only required when creating a package the first time, but OK to specify always)
```
npm login
npm publish --access public
```

* Refresh your apps appropriately (users will have to re-run yarn install or lerna boostrap),
e.g. ```yarn add @boatnet/bn-pouch@latest```

* Kick off a full Jenkins Dev build, which will pull down the newest modules and verify your changes work. Next production build should be a full build too (not FAST build)

## Unit Testing

* The test-boatnet-module project is intended to be used for all @boatnet module testing purposes. It is a Vue app so you can add components to its UI.
* Unit tests are not yet required, but it's a near-term goal to get these into our build process.
* E2E testing is not currently working correctly
* Unit testing
  * See tests/unit directory for examples.
  * To run tests, `yarn test:unit`
  * It is recommended to keep the package.json up to date with your newest versions.
  `yarn upgrade @boatnet/bn-MY-MODULE@latest`

