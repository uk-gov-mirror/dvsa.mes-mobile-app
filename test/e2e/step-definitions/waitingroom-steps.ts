import {Before, Then, When} from 'cucumber';
import {PageHelper} from '../helper/PageHelper/pageHelper';
import {WaitingRoomPage} from '../helper/WaitingRoom/waitingRoom';
import {WaitingRoomPageObject} from '../helper/WaitingRoom/waitingRoom.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
let waitingRoomPage: WaitingRoomPage = new WaitingRoomPage();
let waitingRoomPageElement: WaitingRoomPageObject = new WaitingRoomPageObject();

//Set default category to be cat b
this.testCategory = 'b';

Before({tags: '@catbe'}, () => {
  this.testCategory = 'be';
});

Before({tags: '@catc'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catc1'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catce'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@catc1e'}, () => {
  this.testCategory = 'c';
});

Before({tags: '@cata'}, () => {
  this.testCategory = 'a-mod1';
});

Before({tags: '@catm2'}, () => {
  this.testCategory = 'a-mod2';
});

Before({tags: '@catd'}, () => {
  this.testCategory = 'd';
});

Before({tags: '@catHome'}, () => {
  this.testCategory = 'home-test';
});

Before({tags: '@catADI2'}, () => {
  this.testCategory = 'adi-part2';
});

Before({tags: '@catcpc'}, () => {
  this.testCategory = 'cpc';
});

When('the candidate enters a new email address', () => {
  waitingRoomPage.clickNewEmailRadioButton();
  waitingRoomPage.enterNewEmail('testemail@example.com');
});

When('the candidate requests to receive results by post', () => {
  waitingRoomPage.clickPostalAddressRadioButton();
});

When(/^the candidate confirms their declaration$/, () => {
  waitingRoomPage.candidateConfirmsDeclaration(this.testCategory);
});

When(/^the candidate confirms their communication preference$/, () => {
  waitingRoomPage.candidateConfirmsCommunicationPreference(this.testCategory);
});

When('the candidate completes the declaration page', () => {
  waitingRoomPage.checkInsuranceDeclaration();
  if (this.testCategory !== 'adi-part2') {
    waitingRoomPage.checkResidencyDeclaration();
  }
  waitingRoomPage.clickSignaturePad();
});

When(/^I proceed to the car|bike$/, () => {
  // Examiner clicks continue button then enters passcode
  waitingRoomPage.clickContinueButton(this.testCategory);
  PageHelper.enterPasscode();
});

Then('the email {string} has been provided and is preselected', async (emailAddress) => {
  const providedEmailRadio = waitingRoomPageElement.getProvidedEmailRadioButton();
  expect(await providedEmailRadio.isSelected()).to.eventually.be.true;
  const providedEmailValue = waitingRoomPageElement.getProvidedEmailValue();
  return expect(await providedEmailValue.getText()).to.eventually.equal(emailAddress);
});
