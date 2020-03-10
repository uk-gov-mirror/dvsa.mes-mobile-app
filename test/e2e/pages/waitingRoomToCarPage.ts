import Page from './page';
import { by, element } from 'protractor';
import { UI_TEST_DATA } from '../../test_data/ui_test_data';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

class WaitingRoomToCarPage extends Page {
  eyeSightResultPass() {
    this.clickElementById('eyesight-pass');
  }

  eyeSightResultFail() {
    this.clickElementById('eyesight-fail');
  }

  getEyesightFailureConfirmation() {
    const element = this.getElementById('eyesight-failure-confirmation');
    this.waitForPresenceOfElement(element);
    return element;
  }

  clickEyesightFailureConfirmButton() {
    this.clickElementById('confirm-eyesight-failure');
  }

  clickTellMeSelector() {
    this.clickElementById('tell-me-selector');
  }

  clickTellMeQuestion(tellMeQuestion) {
    this.clickElementByXPath(`//button/span/div[normalize-space(text()) = "${tellMeQuestion}"]`);
  }

  clickSubmitButton() {
    this.clickElementByXPath('//button[span[text() = "Submit"]]');
  }

  selectTellMeQuestion (tellMeQuestion: string) {
    this.clickTellMeSelector();
    this.clickTellMeQuestion(tellMeQuestion);
    this.clickSubmitButton();
  }

  getVehicleChecksQuestions(){
    return element.all(by.id('vehicle-checks-question-selector'));
  }

  clickVehicleCheck(showMeQuestionsArray, index) {
    this.clickElementByXPath(`//button//div[normalize-space(text()) =  "${showMeQuestionsArray[0][index]}"]`);
  }

  clickVehicleAnswer(resultFromQuestions, index) {
    this.clickElementById(`${resultFromQuestions}_${index + 1}`);
  }

  showMeQuestions(questions, questionResult) {
    const showMeQuestionsArray = [questions, questionResult];
    const elements = this.getVehicleChecksQuestions();
    elements.each((element, index) => {
      this.clickElement(element);
      this.clickVehicleCheck(showMeQuestionsArray, index);
      // const submitDialog = TempPage.getAndAwaitElement(by.xpath('//ion-alert//button[span[text() =  "Submit"]]'));
      // TempPage.clickElement(submitDialog);
      this.clickSubmitButton();
      const resultFromQuestions =
        (showMeQuestionsArray[1][index] === 'true') ? 'vehicleChecksFault' : 'vehicleChecksCorrect';
      this.clickVehicleAnswer(resultFromQuestions, index);
    });
  }

  clickTellMeFault() {
    this.clickElementById('tellme-fault');
  }

  clickTellMeCorrect() {
    this.clickElementById('tellme-correct');
  }

  clickManualTransmission() {
    this.clickElementById('transmission-manual');
  }

  clickAutomaticTransmission() {
    this.clickElementById('transmission-automatic');
  }

  standardUserJourney(withDriverFault: boolean, manualTransmission: boolean, tellMeQuestion: string) {
    this.selectTellMeQuestion(tellMeQuestion);

    if (withDriverFault) {
      this.clickTellMeFault();
    } else {
      this.clickTellMeCorrect();
    }

    if (manualTransmission) {
      this.clickManualTransmission();
    } else {
      this.clickAutomaticTransmission();
    }
  }

  getSelectQuestionsButton() {
    const element = this.getElementByCss('input[value="Select questions"]');
    this.waitForPresenceOfElement(element);
    return element;
  }

  openSelectQuestionsOverlay() {
    const selectQuestionsButton = this.getSelectQuestionsButton();
    expect(selectQuestionsButton.isPresent()).to.eventually.be.true;
    this.clickElement(selectQuestionsButton);
  }

  submitVehicleChecksButton() {
    this.clickElementById('submit-vehicle-checks');
  }

  multiShowAndTell(questions, questionResult) {
    this.openSelectQuestionsOverlay();
    this.showMeQuestions(questions, questionResult);
    this.submitVehicleChecksButton();
  }

  // todo: kc is this similar to SearchPage?
  enterSearchTerm(searchTerm) {
    this.textFieldInputViaNativeMode(
      '//XCUIElementTypeOther[XCUIElementTypeOther[@name="Vehicle registration number"]]/' +
      'following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeTextField', searchTerm);
  }

  submitWRTC() {
    this.clickElementByXPath('//button[span[h3[text()="Continue to test report"]]]');
  }

  completeWaitingRoomPage(testCategory, questionResult, manualTransmission: boolean, tellMeQuestion?: string) {
    if (testCategory === 'be') {
      this.eyeSightResultPass();
      this.multiShowAndTell(UI_TEST_DATA.testData.be, questionResult);
    } else if (testCategory === 'c' || testCategory === 'c1') {
      this.multiShowAndTell(UI_TEST_DATA.testData.c, questionResult);
    } else if (testCategory === 'ce') {
      this.multiShowAndTell(UI_TEST_DATA.testData.ce, questionResult);
    } else {
      this.eyeSightResultPass();
      this.standardUserJourney(questionResult, manualTransmission, tellMeQuestion);
    }
    this.enterSearchTerm('AB12CDE');
    this.submitWRTC();
  }
}

export default new WaitingRoomToCarPage();
