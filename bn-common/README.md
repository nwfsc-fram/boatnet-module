# bn-common

Common Components for Boatnet Applications

## Building

* This module does not follow conventions for universal (rollup) deployment of vue modules.
* (It packages actual .vue files)
* It manually copies the following directories to lib/ (containing the .vue files)
  * components
  * layouts
  * views

## Development

* For development, use ```yarn link``` and perform ```yarn build``` to apply your changes to the running app
* e.g.

```
cd /c/git/boatnet-module/bn-common
yarn build
yarn link
cd /c/git/boatnet/apps/ashop
yarn link @boatnet/bn-common
```
and then, as you make updates to bn-common,

```
yarn build
```

and your changes should be applied.

## Publishing

```
<commit your changes>
yarn build
yarn publish
<enter incremental number when prompted>
```

* Increment version #'s in your client's ```package.json```