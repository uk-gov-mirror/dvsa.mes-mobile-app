import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { AppModule } from '../../../../../app/app.module';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { SpeedReqDebriefCardComponent } from '../speed-requirements-debrief-card';
import { configureTestSuite } from 'ng-bullet';

describe('SeriousFaultsDebriefCardComponent', () => {
  let translate: TranslateService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedReqDebriefCardComponent],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forRoot({}),
        TranslateModule,
      ],
    });
  });

  beforeEach(async(() => {
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
  }));
});
