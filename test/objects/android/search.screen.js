class SearchScreen {
    get mapIcon() {
        return $('//*[@content-desc="Map"]');
    }

    get resetFilterBtnLink() {
        return $('//*[@text="Reset Filters"]');
    }

    get searchField() {
        return $('//*[@text="Search"]');
    }
    searchAutoSuggest(text) {
        return $(`~${text}`);
    }
    get showPropertiesBtn() {
        return $('//android.widget.TextView[@text="Show Properties"]');
    }

    propertiesLabel(text) {
        return $(`//*[@text="${text}"]`);
    }
    cardsWithLabel(text) {
        return $$(`//*[@text="${text}"]`);
    }
}
export default new SearchScreen();
