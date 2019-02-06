import { groupBy } from 'lodash';

import { SlotItem } from '../../../providers/slot-selector/slot-item';
import { DateTime } from '../../../common/date-time';

const localJournalJson = require('../../../../mock/local-journal.json');

const slotItems: SlotItem[] = localJournalJson.testSlots.map(testSlot => {
  return {
    hasSlotChanged: false,
    slotData: testSlot,
  }
});

const slots:{[k: string]: SlotItem[]} = groupBy(slotItems, (slot: SlotItem) => DateTime.at(slot.slotData.slotDetail.start).format('YYYY-MM-DD'));

export default slots;