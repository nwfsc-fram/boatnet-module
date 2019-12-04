// https://www.npmjs.com/package/jest-fetch-mock#installation-and-setup
// This is referenced in jest.config.js

import {GlobalWithFetchMock} from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
