import { HealthDeclarationAnalyticsEffects } from '../health-declaration.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as healthDeclarationActions from '../health-declaration.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { StoreModel } from '../../../shared/models/store.model';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/candidate/candidate.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';

describe('Health Declaration Analytics Effects', () => {

  let effects: HealthDeclarationAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.HEALTH_DECLARATION;
  // tslint:disable-next-line:max-line-length
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.HEALTH_DECLARATION}`;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        HealthDeclarationAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(HealthDeclarationAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('healthDeclarationViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new healthDeclarationActions.HealthDeclarationViewDidEnter());
      // ASSERT
      effects.healthDeclarationViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new healthDeclarationActions.HealthDeclarationViewDidEnter());
      // ASSERT
      effects.healthDeclarationViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeMode);
        done();
      });
    });

  });

});
