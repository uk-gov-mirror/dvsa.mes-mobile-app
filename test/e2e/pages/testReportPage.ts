import Page from './page';
import { browser, by, element } from 'protractor';

const buttonPadding = 30;
const request = require('request');

class TestReportPage extends Page {
  /**
   * Performs the long press action on the competency to add a driver fault.
   * The long press does not appear to have been implemented so calling appiums touch perform action directly.
   * @param button The button to longpress
   */
  longPressButton(button) {
    browser.getProcessedConfig().then((config) => {
      browser.driver.getSession().then((session) => {
        button.getLocation().then((buttonLocation) => {
          request.post(`${config.seleniumAddress}/session/${session.getId()}/touch/perform`, {
            json: {
              actions: [
                {
                  action: 'longPress',
                  options: {
                    x: Math.ceil(buttonLocation.x) + buttonPadding,
                    y: Math.ceil(buttonLocation.y) + buttonPadding,
                  },
                },
                {
                  action: 'release',
                },
              ],
            },
          }, (error) => {
            if (error) {
              console.error(error);
              return;
            }
          });
        });
      });
    });
  }

  /**
   * Clicks the competency to add a fault or remove where the relevant S/D/Remove has been selected in advance.
   * Note: not for use with driver faults as this requires a long press
   * @param competency The competency to add the fault to
   */
  clickCompetency(competency) {
    browser.getProcessedConfig().then((config) => {
      browser.driver.getSession().then((session) => {
        const competencyButton = this.getCompetencyButton(competency);
        competencyButton.getLocation().then((buttonLocation) => {
          request.post(`${config.seleniumAddress}/session/${session.getId()}/touch/perform`, {
            json: {
              actions: [
                {
                  action: 'tap',
                  options: {
                    x: Math.ceil(buttonLocation.x) + buttonPadding,
                    y: Math.ceil(buttonLocation.y) + buttonPadding,
                  },
                },
              ],
            },
          }, (error) => {
            if (error) {
              console.error(error);
              return;
            }
          });
        });
      });
    });
  }

  getCompetencyButton(competency: string) {
    const element = this.getElementByXPath(`//competency-button/div/span[text() = '${competency}']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  longPressCompetency (competency: string) {
    const competencyButton = this.getCompetencyButton(competency);
    this.longPressButton(competencyButton);
  }

  longPressElementByXPath(xpath) {
    const element = this.getElementByXPath(xpath);
    this.waitForPresenceOfElement(element);
    this.longPressButton(element);
  }

  completeUncoupleRecouple() {
    this.longPressElementByXPath('//competency-button[contains(@class, "uncouple-recouple-tick")]');
  }

  addUncoupleRecoupleFault() {
    this.longPressElementByXPath('//uncouple-recouple//competency-button/div/div[1]');
  }

  completeManouveure(testCategory) {
    if (testCategory === 'be' || testCategory === 'c' || testCategory === 'c1') {
      this.longPressElementByXPath('//competency-button[contains(@class, "reverse-left-tick")]');
    } else {
      this.clickManoeuvresButton();
      this.clickReverseRightRadio();
      this.clickManoeuvresButton();
    }
  }

  clickReverseRightRadio() {
    this.clickElementById('manoeuvres-reverse-right-radio');
  }

  clickManoeuvresButton() {
    this.clickElementByXPath('//manoeuvres/button');
  }

  clickSeriousMode() {
    this.clickElementById('serious-button');
  }

  clickRemove() {
    this.clickElementById('remove-button');
  }

  reverseDropDown() {
    this.clickElementByXPath('//*[@id="reverse-left-label"]');
  }

  completeControlledStop() {
    this.longPressElementByXPath('//competency-button[contains(@class, "controlled-stop-tick")]');
  }

  completeShowMe() {
    this.longPressElementByXPath('//competency-button[contains(@class, "show-me-question-tick")]');
  }

  completeEco() {
    this.longPressElementByXPath('//competency-button[contains(@class, "eco-tick")]');
  }

  getLegalRequrementsPopup() {
    const element = this.getElementByXPath('//div/legal-requirements-modal');
    this.waitForPresenceOfElement(element);
    return element;
  }
  getLegalRequirement(legalRequirement) {
    const element = this.getElementByXPath(`//legal-requirements-modal//div//ul/li[text() = '${legalRequirement}']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getLegalRequirements() {
    return element.all(by.xpath('//legal-requirement/competency-button[@class="legal-button"]'));
  }

  getCompetencyCountField(competency) {
    const element = this.getElementByXPath(`//competency-button[div/*[@class = 'competency-label'
  and text() = '${competency}']]/div/driving-faults-badge//span[@class = 'count']`);
    this.waitForPresenceOfElement(element);
    return element;
  }

  getSeriousFaultBadge() {
    const element = this.getElementByXPath('//vehicle-checks//serious-fault-badge//span');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getSummaryCountField() {
    const element = this.getElementById('summary-count');
    this.waitForPresenceOfElement(element);
    return element;
  }

  getControlledStopTick() {
    const element =  this.getElementByCss('.controlled-stop-tick.checked');
    this.waitForPresenceOfElement(element);
    return element;
  }

  completeLegalRequirements() {
    const legalRequirements = this.getLegalRequirements();
    legalRequirements.each((legalRequirement) => {
      this.longPressButton(legalRequirement);
    });
  }

  clickEndTestButton() {
    this.clickElementById('end-test-button');
  }

  clickTerminateTestButton() {
    this.clickElementByXPath('//button/span[text() = "Terminate test"]');
  }

  clickReturnToTestButton() {
    this.clickElementByXPath('//div/legal-requirements-modal//modal-return-button//span');
  }

}
export default new TestReportPage();
