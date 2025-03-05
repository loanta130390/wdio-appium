class TutorScreen {
    get tutorLayout() {
        return $('//*[@text="Type property code, project name, property name"]');
    }

    get closeBtn() {
        return $('android=new UiSelector().className("android.view.ViewGroup").instance(2)');
    }
}
export default new TutorScreen();
