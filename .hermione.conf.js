const SUT_URI = 'http://localhost:3000/hw/store/';
const DEFAULT_TIMEOUT = 5000;
const DEFAULT_SELECTOR = '.Application';

module.exports = {
  system: {
    ctx: {
      sutUri: SUT_URI,
      defaultTimeout:DEFAULT_TIMEOUT,
      defaultSelector:DEFAULT_SELECTOR,
    }
  },
  sets: {
    chrome1920x1080: {
      files: ["test/hermione/1920screen.hermione.js", "test/hermione/bugtest.hermione.js"],
      browsers: ['chrome1920x1080']
    },
    chrome1024x10000: {
      files: "test/hermione/1024screen.hermione.js",
      browsers: ['chrome1024x10000']
    },
    chrome560x15000: {
      files: "test/hermione/burger.hermione.js",
      browsers: ['chrome560x15000']
    },
  },

  browsers: {
    chrome1920x1080: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      },
      screenshotMode: "fullpage",
      resetCursor: true,
      calibrate: true,
      compositeImage: false,
      screenshotDelay: 100,
      assertViewOpts: {
        allowViewportOverflow: true,
      },
    },
    chrome1024x10000: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1024,
        height: 10000,
      },
      screenshotMode: "fullpage",
      resetCursor: true,
      calibrate: true,
      compositeImage: false,
      screenshotDelay: 100,
      assertViewOpts: {
        allowViewportOverflow: true,
      },
    },
    chrome560x15000: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 560,
        height: 15000,
      },
      screenshotMode: "fullpage",
      resetCursor: true,
      calibrate: true,
      compositeImage: false,
      screenshotDelay: 100,
      assertViewOpts: {
        allowViewportOverflow: true,
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
