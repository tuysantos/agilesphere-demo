import { cleanSession } from "selenium-webdriver/safari";

import { browser } from "protractor";

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.ts']
  }