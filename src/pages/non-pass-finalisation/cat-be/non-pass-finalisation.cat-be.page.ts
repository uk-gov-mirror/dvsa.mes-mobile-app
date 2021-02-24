import { Component, OnInit } from '@angular/core';
import { IonicPage, Modal, ModalController, NavController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { CAT_BE } from '../../page-names.constants';
import { merge, Observable, Subscription } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import {
  getCurrentTest,
  getJournalData,
  getActivityCode,
  getTestOutcome,
  isTestOutcomeSet,
  getTestOutcomeText,
} from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.reducer';
import {
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import {
  NonPassFinalisationViewDidEnter,
  NonPassFinalisationValidationError,
} from '../non-pass-finalisation.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed, getD255 } from '../../../modules/tests/test-summary/common/test-summary.selector';
import {
  getTestSlotAttributes,
} from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import {
  ActivityCodeModel, getActivityCodeOptions,
} from '../../office/components/activity-code/activity-code.constants';
import { FormGroup } from '@angular/forms';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-be';
import {
  DebriefWitnessed,
  DebriefUnwitnessed,
  D255Yes,
  D255No,
} from '../../../modules/tests/test-summary/common/test-summary.actions';
import {
  CandidateChoseToProceedWithTestInWelsh,
  CandidateChoseToProceedWithTestInEnglish,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { SetTestStatusWriteUp } from '../../../modules/tests/test-status/test-status.actions';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import {
  ActivityCodeFinalisationProvider,
} from '../../../providers/activity-code-finalisation/activity-code-finalisation';
import { getTestData } from '../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';

interface NonPassFinalisationPageState {
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  isTestOutcomeSet$: Observable<boolean>;
  testOutcome$: Observable<string>;
  testOutcomeText$: Observable<string>;
  activityCode$: Observable<ActivityCodeModel>;
  displayDebriefWitnessed$: Observable<boolean>;
  debriefWitnessed$: Observable<boolean>;
  displayD255$: Observable<boolean>;
  d255$: Observable<boolean>;
  isWelshTest$: Observable<boolean>;
  testData$: Observable<CatBEUniqueTypes.TestData>;
  slotId$: Observable<string>;
}

@IonicPage()
@Component({
  selector: '.non-pass-finalisation-cat-be-page',
  templateUrl: 'non-pass-finalisation.cat-be.page.html',
})
export class NonPassFinalisationCatBEPage extends BasePageComponent implements OnInit {

  pageState: NonPassFinalisationPageState;
  form: FormGroup;
  activityCodeOptions: ActivityCodeModel[];
  slotId: string;
  testData: CatBEUniqueTypes.TestData;
  activityCode: ActivityCodeModel;
  subscription: Subscription;
  invalidTestDataModal: Modal;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
    public appConfig: AppConfigProvider,
    public modalController: ModalController,
    public activityCodeFinalisationProvider: ActivityCodeFinalisationProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
    this.activityCodeOptions = getActivityCodeOptions(this.appConfig.getAppConfig().role === ExaminerRole.DLG);
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
  }

  ngOnInit() {

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    this.pageState = {
      slotId$: this.store$.pipe(
        select(getTests),
        map(tests => tests.currentTest.slotId),
      ),
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      isTestOutcomeSet$: currentTest$.pipe(
        select(isTestOutcomeSet),
      ),
      testOutcome$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      testOutcomeText$: currentTest$.pipe(
        select(getTestOutcomeText),
      ),
      activityCode$: currentTest$.pipe(
        select(getActivityCode),
      ),
      displayDebriefWitnessed$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(isDebriefWitnessed))),
        map(([outcome, debrief]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'debriefWitnessed', debrief)),
      ),
      debriefWitnessed$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      displayD255$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getD255))),
        map(([outcome, d255]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'd255', d255)),
      ),
      d255$: currentTest$.pipe(
        select(getTestSummary),
        select(getD255),
      ),
      isWelshTest$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(isWelshTest),
      ),
      testData$: currentTest$.pipe(
        select(getTestData),
      ),
    };

    const { testData$, slotId$, activityCode$ } = this.pageState;

    this.subscription = merge(
      slotId$.pipe(map(slotId => this.slotId = slotId)),
      testData$.pipe(
        map(testData => this.testData = testData),
      ),
      activityCode$.pipe(
        map(activityCode => this.activityCode = activityCode),
      ),
    ).subscribe();
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new NonPassFinalisationViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openTestDataValidationModal() {
    this.invalidTestDataModal = this.modalController.create('TestFinalisationInvalidTestDataModal', {
      onCancel: this.onCancel,
      onReturnToTestReport: this.onReturnToTestReport,
    }, { cssClass: 'mes-modal-alert text-zoom-regular' });
    this.invalidTestDataModal.present();
  }

  onCancel = () => {
    this.invalidTestDataModal.dismiss();
  }

  removePostTestReportViews() {
    const postDebriefPage = this.navController.getViews().find(view => view.id === CAT_BE.POST_DEBRIEF_HOLDING_PAGE);
    const nonPassFinalisationPage = this.navController
      .getViews().find(view => view.id === CAT_BE.NON_PASS_FINALISATION_PAGE);

    this.navController.removeView(postDebriefPage);
    this.navController.removeView(nonPassFinalisationPage);
  }

  onReturnToTestReport = () => {
    this.invalidTestDataModal.dismiss();
    this.navController.push(
      CAT_BE.TEST_REPORT_PAGE,
      null,
      null,
      hasCompleted => hasCompleted && this.removePostTestReportViews(),
    );
  }

  async continue() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      const testDataIsInvalid = await this.activityCodeFinalisationProvider
        .catBETestDataIsInvalid(this.activityCode.activityCode, this.testData);

      if (testDataIsInvalid) {
        this.openTestDataValidationModal();
        return;
      }

      this.store$.dispatch(new SetTestStatusWriteUp(this.slotId));
      this.store$.dispatch(new PersistTests());
      this.navController.push(CAT_BE.BACK_TO_OFFICE_PAGE);
      return;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new NonPassFinalisationValidationError(`${controlName} is blank`));
      }
    });
  }

  activityCodeChanged(activityCodeModel: ActivityCodeModel) {
    this.activityCode = activityCodeModel;
    this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
  }

  debriefWitnessedChanged(debriefWitnessed: boolean) {
    this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
  }

  d255Changed(d255: boolean): void {
    this.store$.dispatch(d255 ? new D255Yes() : new D255No());
  }

  isWelshChanged(isWelsh: boolean) {
    this.store$.dispatch(
      isWelsh ?
        new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
        : new CandidateChoseToProceedWithTestInEnglish('English'),
    );
  }
}
