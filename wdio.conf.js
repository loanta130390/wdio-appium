const path = require('path');
const allure = require('allure-commandline');
const os = require("os");

exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        path.join(process.cwd(), './test/specs/**/*.spec.js')
    ],
    include: ['**/*.spec.js'],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554', // CHANGE THIS
        'appium:automationName': 'UiAutomator2',
        'appium:platformVersion': '11', // CHANGE THIS
        'appium:appPackage': 'com.redspider.makyee',
        'appium:appActivity': 'com.redspider.makyee.MainActivity',
        'appium:ensureWebviewsHavePages': true,
        'appium:unicodeKeyboard': true,
        'appium:resetKeyboard': true,
        'appium:setWebContentsDebuggingEnabled': true,
        'appium:autoGrantPermissions': true,
        'appium:forceAppLaunch': true,
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 150000,
    connectionRetryTimeout: 40000,
    connectionRetryCount: 3,
    scriptWait: 3000,
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 1500000
    },
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                reportedEnvironmentVars: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version,
                },
            }
        ]
    ],

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await driver.takeScreenshot();
        }
    },

    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
}



