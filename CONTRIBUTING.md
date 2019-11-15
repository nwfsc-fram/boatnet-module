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
  * Build your package (usually will build to `lib/`)

```
yarn build
```

  * Since this is a scoped package, we need to specify public access
```
npm login
npm publish --access public
```

* Refresh your apps appropriately (lock files may point to previous versions, so your users will need to npm/yarn upgrade)

## [TODO: Unit testing]