import { $, $$, expect, driver } from "@wdio/globals";
import report from '@wdio/allure-reporter';
import homeScreen from '../objects/android/home.screen';
import searchScreen from '../objects/android/search.screen';
import tutorScreen from '../objects/android/tutor.screen';

describe('Android device - Search properties', async () => {
    it(`Click 'ASK ME LATER' button to close the Enjoy the App? popup`, async () => {
        await homeScreen.askMeLaterBtn.waitForDisplayed();
        await expect(homeScreen.askMeLaterBtn).toBeExisting();
        await homeScreen.askMeLaterBtn.click();
    });
    it('Click Search button from bottom menu on Home Screen to navigate to Search screen', async () => {
        await homeScreen.searchBtnBottomMenu.waitForDisplayed({ timeout: 20000 });
        await homeScreen.searchBtnBottomMenu.click();
        await searchScreen.mapIcon.waitForDisplayed();
        await searchScreen.resetFilterBtnLink.waitForDisplayed();
    });
    const searchKeyword = 'volta tower';
    it(`Enter '${searchKeyword}' into Search field and perform search Properties on Search Screen`, async () => {
        await searchScreen.searchField.setValue(searchKeyword);
    });

    it(`Expect the app tutor is randomly displayed in between while performing Search and close it`, async () => {
        await tutorScreen.tutorLayout.waitForDisplayed();
        for (var i = 0; i < 200; i++) {
            await driver.pause(2000);
            await tutorScreen.closeBtn.click();
            const isTutorDisplayed = await tutorScreen.tutorLayout.isDisplayed();
            if (!isTutorDisplayed) {
                break;
            }
        }
    });

    it(`Verify the result on Search Screen will show Properties according to the '${searchKeyword}' keyword`, async () => {
        await searchScreen.searchAutoSuggest('Volta Tower, Dubai').waitForDisplayed();
        await searchScreen.searchAutoSuggest('Volta Tower, Dubai').click();
        await searchScreen.showPropertiesBtn.click();
        await searchScreen.propertiesLabel('Volta Tower, Downtown Dubai').waitForDisplayed();
        const propertyDetailCards = await searchScreen.cardsWithLabel('Volta Tower, Downtown Dubai');
        await expect(propertyDetailCards.length > 0).toBe(true);
    });

    afterEach('', async () => {
        await driver.takeScreenshot();
    });
});
