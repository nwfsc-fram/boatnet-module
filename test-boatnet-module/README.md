# test-boatnet-modules

A simple project intended for testing the various @boatnet modules.

See `tests/unit` for individual tests for each component.

Uses:
* https://vue-test-utils.vuejs.org/
* https://github.com/vuejs/vue-jest
  * https://vue-test-utils.vuejs.org/guides/using-with-typescript.html

## Project setup
```
yarn install
```

## Run unit tests
```
yarn test:unit
```

## Run end to end tests
*IMPORTANT*, for e2e tests to work, I had to run the following to fix a cypress v8 error, https://github.com/cypress-io/cypress/issues/5440

 `npx cypress install --force`

```
yarn test:e2e
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
