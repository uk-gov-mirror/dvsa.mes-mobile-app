import { Then, When } from 'cucumber';
import { BackToOfficePage } from '../helper/backToOfficePage/backToOfficePage';
import { BackToOfficePageObject } from '../helper/backToOfficePage/backToOfficePage.po';

let backToOfficePageElement: BackToOfficePageObject = new BackToOfficePageObject();
let backToOfficePage: BackToOfficePage = new BackToOfficePage();

Then('I am on the back to office page', async () => {
  // todo:do we need to return this?  What is picking it up?
  // todo what happens if it isn't the current page?
  return await backToOfficePageElement.isCurrentPage();
});

When('I continue to the office write up', async () => {
  await backToOfficePage.clickContinueToWriteUpButton();
});
