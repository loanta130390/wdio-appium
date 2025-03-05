
// import { driver } from '@wdio/globals';
describe('Search flow', async () => {

    it('should close the Enjoy the App? popup', async () => {
        // await driver.pause(5000);
        const layout = await $('//*[@resource-id="android:id/content"]/android.widget.FrameLayout');
        await layout.waitForDisplayed({ timeout: 800000 });

        // Close app instruct
        const askForReviewPopup = await $('//*[@text="ASK ME LATER"]');
        await askForReviewPopup.waitForDisplayed();
        await expect(askForReviewPopup).toBeExisting();
        await askForReviewPopup.click();

        // Click on Search menu to open search page
        const searchMenu = await $('~Search');
        await searchMenu.waitForDisplayed({ timeout: 20000 });
        await searchMenu.click();

        // Wait for loading on Search screen
        const mapIcon = await $('//*[@content-desc="Map"]');
        await mapIcon.waitForDisplayed();
        const resetFilterLabel = await $('//*[@text="Reset Filters"]');
        await resetFilterLabel.waitForDisplayed();

        // input key into search field
        const searchField = await $('//*[@text="Search"]');
        await searchField.setValue('volta tower');
        await expect(searchField).toHaveText('volta tower');

        // Wait for app tutor
        // var appTutorSearchScreen = await $('//*[@text="Type property code, project name, property name"]');
        // await appTutorSearchScreen.waitForDisplayed();
        // for (var i = 0; i < 200; i++) {
        //     var closeTutorBtn = await $('android=new UiSelector().className("android.view.ViewGroup").instance(2)');
        //     await driver.pause(3000);
        //     await closeTutorBtn.tap();
        //     appTutorSearchScreen = await $('//*[@text="Type property code, project name, property name"]');
        //     const isTutorDisplayed = await appTutorSearchScreen.isDisplayed();
        //     if (!isTutorDisplayed) {
        //         break;
        //     }
        // }


        var appTutorSearchScreen = await $('//*[@text="Type property code, project name, property name"]');
        await appTutorSearchScreen.waitForDisplayed();
        for (var i = 0; i < 200; i++) {
            var closeTutorBtn = await $('android=new UiSelector().className("android.view.ViewGroup").instance(2)');
            await driver.pause(3000);
            await closeTutorBtn.tap();
            // appTutorSearchScreen = await $('//*[@text="Type property code, project name, property name"]');
            const isTutorDisplayed = await appTutorSearchScreen.isDisplayed();
            if (!isTutorDisplayed) {
                break;
            }
        }

        // Select autosuggest option
        const searchAutoSuggest = await $('~Volta Tower, Dubai');
        await searchAutoSuggest.waitForDisplayed();
        await searchAutoSuggest.click({ force: true });

        // Click to show result
        await $('//android.widget.TextView[@text="Show Properties"]').click();
        await $('//*[@text="Volta Tower, Downtown Dubai"]').waitForDisplayed();
        const propertyDetailCards = await $$('//*[@text="Volta Tower, Downtown Dubai"]');
        console.log(`Number of card: ${propertyDetailCards.length}`);
        await expect(propertyDetailCards.length > 0).toBe(true);
    });
    after('Close app', async () => {
        // await driver.quit();
    })
});
