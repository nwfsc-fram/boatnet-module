# Brief Guide: Developing new Boatnet Modules

## Create your module
* Naming convention for boatnet modules is `@boatnet/bn-xyz`
```
mkdir bn-my-boatnet-module
cd bn-my-boatnet-module
yarn init -y
tsconfig --init
```
* See `bn-test-example` for examples, and configure your `package.json` and `tsconfig.json` accordingly (this will build to `lib/`)

## Test by using npm link, before you publish
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
  * Remember to bump version # appropriately
  * Build your package (usually will build to `lib/`, be sure to configure your tsconfig.json appropriately, see other @boatnet modules for examples.)

```
yarn build
```

  * Since this is a scoped package, we need to specify public access
```
npm login
npm publish --access public
```

* Refresh your apps appropriately (lock files may point to previous versions, so your users will need to npm/yarn upgrade)

## Unit Testing

* The test-boatnet-module project is intended to be used for all testing purposes. It is a Vue app so you can add components to its UI.
* E2E testing is not currently working correctly
* Unit testing
  * See tests/unit directory for examples.
  * To run tests, `yarn test:unit`

