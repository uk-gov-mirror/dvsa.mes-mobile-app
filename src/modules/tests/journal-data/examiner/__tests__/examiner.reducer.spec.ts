import { Examiner } from '@dvsa/mes-test-schema/categories/Common';
import { examinerReducer } from '../examiner.reducer';
import { PopulateExaminer } from '../examiner.actions';

describe('examiner reducer', () => {
  it('should return the examiner from a populate examiner', () => {
    const mockExaminer: Examiner = {
      staffNumber: '1234',
    };
    const result = examinerReducer(null, new PopulateExaminer(mockExaminer));

    expect(result).toBe(mockExaminer);
  });
});
