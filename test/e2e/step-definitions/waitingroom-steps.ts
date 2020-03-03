import { Then, When, Before } from 'cucumber';
import { by } from 'protractor';
import { getElement, clickElement } from '../../helpers/interactionHelpers';
import TempPage from '../pages/tempPage';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Set default category to be cat b
this.testCategory = 'b';

Before({ tags: '@catbe' }, () => {
  this.testCategory = 'be';
});

Before({ tags: '@catc' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catce' }, () => {
  this.testCategory = 'c';
});

Before({ tags: '@catc1e' }, () => {
  this.testCategory = 'c';
});

When('the candidate enters a new email address', () => {
  const newEmailRadio = TempPage.getElement(by.id('newEmail'));
  TempPage.clickElement(newEmailRadio);
  const newEmailAddressField = TempPage.getElement(by.id('newEmailInput'));
  newEmailAddressField.sendKeys('testemail@example.com');
});

When('the candidate requests to receive results by post', () => {
  const postalAddressRadio = TempPage.getElement(by.id('postalAddress'));
  TempPage.clickElement(postalAddressRadio);
});

When(/^the candidate confirms their (communication preference|declaration)$/, (pageName) => {
  const pageType = (pageName === 'communication preference' ? `communication-cat-${this.testCategory}-page`
  : `waiting-room-cat-${this.testCategory}-page`);
  TempPage.clickElementByXPath(
    `//div[contains(@class, '${pageType}')]//button[@id = 'continue-button']`);
});

When('the candidate completes the declaration page', () => {
  TempPage.clickElementById('insurance-declaration-checkbox');
  TempPage.clickElementById('residency-declaration-checkbox');
  TempPage.clickElementByXPath('//signature-pad/canvas');
});

When('I proceed to the car', () => {
  // Examiner clicks continue button then enters passcode
  const continueButton = TempPage.getElement(by.xpath(
    `//div[contains(@class, "communication-cat-${this.testCategory}-page")]//button[@id = "continue-button"]`));
  TempPage.clickElement(continueButton);
  TempPage.enterPasscode();
});

Then('the email {string} has been provided and is preselected', (emailAddress) => {
  const providedEmailRadio = TempPage.getElement(by.id('providedEmail'));
  expect(providedEmailRadio.isSelected()).to.eventually.be.true;
  const providedEmailValue = TempPage.getElement(by.id('providedEmailInput'));
  return expect(providedEmailValue.getText()).to.eventually.equal(emailAddress);
});
