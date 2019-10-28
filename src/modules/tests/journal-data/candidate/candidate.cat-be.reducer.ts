import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.actions';

export const initialState: CatBEUniqueTypes.Candidate = {
  candidateId: null,
  candidateName: {},
  driverNumber: null,
  dateOfBirth: null,
  gender: null,
  candidateAddress: {},
  primaryTelephone: null,
  secondaryTelephone: null,
  mobileTelephone: null,
  emailAddress: null,
  prn: null,
  previousADITests: null,
  ethnicityCode: null,
  businessAddress: {},
  businessName: null,
  businessTelephone: null,
};

export function candidateCatBEReducer(
  state = initialState,
  action: candidateActions.Types,
): CatBEUniqueTypes.Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS:
      return action.payload;
  }
  return state;
}

export const getCandidate = createFeatureSelector<CatBEUniqueTypes.Candidate>('candidate');
