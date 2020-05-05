import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
// import { Saf } from '../safety-and-balance-data-row';
import { SafetyAndBalanceDataRowComponent } from '../safety-and-balance-data-row';
import { configureTestSuite } from 'ng-bullet';

describe('VehicleChecksDataRowComponent', () => {
  let fixture: ComponentFixture<SafetyAndBalanceDataRowComponent>;
  let component: SafetyAndBalanceDataRowComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SafetyAndBalanceDataRowComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SafetyAndBalanceDataRowComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('shouldShowFault', () => {
      it('should return true if outcome is a DF', () => {
        expect(component.shouldShowFault('DF')).toEqual(true);
      });
      it('should return false if outcome is not a DF', () => {
        expect(component.shouldShowFault('P')).toEqual(false);
        expect(component.shouldShowFault('D')).toEqual(false);
        expect(component.shouldShowFault('S')).toEqual(false);
      });
    });
  });
});
