import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { PopulateCandidateDetails } from './candidate.actions';
import { PopulateCandidateDetailsCatBE } from './candidate.cat-be.actions';
import { Booking } from '@dvsa/mes-journal-schema';
import { get } from 'lodash';

export const createPopulateCandidateDetailsAction = (testCategory: string, booking: Booking) => {
  switch (testCategory) {
    case TestCategory.B:
      return new PopulateCandidateDetails(booking.candidate);
    case TestCategory.BE:
      const candidate: CatBEUniqueTypes.Candidate = {
        ...booking.candidate,
        businessAddress: get(booking, 'business.businessAddress'),
        businessName: get(booking, 'business.businessName'),
        businessTelephone: get(booking, 'business.telephone'),
      };
      return new PopulateCandidateDetailsCatBE(candidate);
    default:
      throw new Error('No testCategory has been defined');
  }
};
