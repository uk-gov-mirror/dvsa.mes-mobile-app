import BasePage from './basePage';

class NonPassFinalisationPage extends BasePage {
  selectActivityCode(activityCodeDesc) {
    this.clickActivityCodeSelector();
    this.clickActivityItem(activityCodeDesc);
    this.submitDialog();
  }

  // todo: kc - 2 getTestOutcomes - one is in debriefPage.ts.
  getTestOutcome() {
    const element = this.getElementById('office-page-test-outcome');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getActivityCodeSelector() {
    const element = this.getElementById('activity-code-selector');
    this.waitForPresenceOfElement(element);
    return element;
  }

  clickActivityCodeSelector() {
    this.clickElement(this.getActivityCodeSelector());
  }

  clickActivityItem(activityCodeDesc) {
    this.clickElementByXPath(`//button/span/div[@class='alert-radio-label']
  [normalize-space(text()) = '${activityCodeDesc}']`);
  }

  submitDialog() {
    this.clickElementByXPath('//button[span[text() = "Submit"]]');
  }

  selectAutomaticTransmission() {
    this.clickElementById('transmission-automatic');
  }

  selectManualTransmission() {
    this.clickElementById('transmission-manual');
  }

  // todo: kc also on debriefPage.
  getD255Yes() {
    const element = this.getElementById('d255-yes');
    this.waitForPresenceOfElement(element);
    return element;
  }

  // todo: kc also on debriefPage.
  clickD255Yes() {
    this.clickElement(this.getD255Yes());
  }

  clickContinueToBackOfficeButton(testCategory) {
    this.clickElementByXPath(
      `//div[contains(@class, "non-pass-finalisation-cat-${testCategory}-page")]//button[@id = "continue-button"]`);
  }
}

export default new NonPassFinalisationPage();
