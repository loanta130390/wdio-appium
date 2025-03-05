class HomeScreen {
    get askMeLaterBtn() {
        return $('//*[@text="ASK ME LATER"]');
    }

    get searchBtnBottomMenu() {
        return $('~Search');
    }
}
export default new HomeScreen();
