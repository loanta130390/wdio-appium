# wdio-appium

This project will execute test on Android device using Appium with webdriverio framework written in Javascript  
After test execution has been completed, the framework will automatically export Allure Report with screenshot taken and attached inside the report
**Out of scope** iOS device testing

## Prerequisite

- Android emulator and Appium had been setup on your local machine
- Makyee app had been installed in Android emulator device

## Setup

- Install packages in your local repo: `npm install`
- Open `wdio.conf.js` file, inside `capabilities` config, check and update `appium:deviceName` AND `appium:platformVersion` to work with emulator on your machine

## Run test

1. Start Appium: `appium -p 4724`
2. Execute Test: `npx wdio`

## Open Report

`npx allure open`

**NOTE** Please check the video committed under the repo for test execution in my local machine.
