import { TestBed } from '@angular/core/testing';
import { DeviceProvider } from '../device';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { Device } from '@ionic-native/device';
import { DeviceMock } from '@ionic-native-mocks/device';
import { LogHelperMock } from '../../logs/__mocks__/logsHelper.mock';
import { StoreModule, Store } from '@ngrx/store';
import { LogHelper } from '../../logs/logsHelper';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogType } from '../../../shared/models/log.model';
import { configureTestSuite } from 'ng-bullet';

describe('Device Provider', () => {

  let deviceProvider: DeviceProvider;
  let store$: Store<any>;
  let logHelper: LogHelper;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          appInfo: () => ({
            versionNumber: '5',
          }),
        }),
      ],
      providers: [
        DeviceProvider,
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: Device, useClass: DeviceMock },
        Store,
        { provide: LogHelper, useClass: LogHelperMock },
      ],
    });
  });

  beforeEach(() => {
    store$ = TestBed.get(Store);
    deviceProvider = TestBed.get(DeviceProvider);
    logHelper = TestBed.get(LogHelper);
  });

  describe('getDeviceType', () => {
    it('should return the device type', () => {
      spyOn(deviceProvider, 'getDeviceType').and.returnValue('iPad7,4');
      const deviceType = deviceProvider.getDeviceType();
      expect(deviceType).toBe('iPad7,4');
    });
  });

  describe('validDeviceType', () => {
    it('should return true if the device in supported devices list', () => {
      spyOn(deviceProvider, 'getDeviceType').and.returnValue('iPad7,4');
      const deviceValid = deviceProvider.validDeviceType();
      expect(deviceValid).toEqual(true);
    });
  });

  describe('validDeviceType', () => {
    it('should return false if the device is not in supported devices list', () => {
      spyOn(deviceProvider, 'getDeviceType').and.returnValue('nonIpad7,4');
      const deviceValid = deviceProvider.validDeviceType();
      expect(deviceValid).toEqual(false);
    });
  });

  describe('getUniqueDeviceId', () => {
    it('should return the unique device id', () => {
      spyOn(deviceProvider, 'getUniqueDeviceId').and.returnValue('A1234');
      const deviceId = deviceProvider.getUniqueDeviceId();
      expect(deviceId).toBe('A1234');
    });
  });

  describe('singleAppMode', () => {
    it('should return true when enabling single app mode', async () => {
      const result = await deviceProvider.enableSingleAppMode();
      expect(result).toBe(true);
    });

    it('should retry uptil the specified limit if calling setSingleAppMode(true) fails', async () => {
      // Simulate the ASAM toggle failing
      spyOn(deviceProvider, 'setSingleAppMode').and.returnValue(Promise.resolve(false));
      spyOn(store$, 'dispatch').and.callThrough();
      const asamFailureLog = new SaveLog(logHelper.createLog(
        LogType.ERROR,
        null,
        this.enableASAMRetryFailureMessage,
      ));

      await deviceProvider.enableSingleAppMode();

      expect(deviceProvider.setSingleAppMode).toHaveBeenCalledTimes(4);
      expect(store$.dispatch).toHaveBeenCalledWith(asamFailureLog);
    });

    it('should return true when disabling single app mode', async () => {
      const result = await deviceProvider.disableSingleAppMode();
      expect(result).toBe(true);
    });

    it('should detect examiner role as DLG and resolve with false', async () => {
      spyOn(deviceProvider.appConfig, 'getAppConfig').and.returnValue({ role: 'DLG' });
      const result = await deviceProvider.enableSingleAppMode();
      expect(result).toBe(false);
    });
  });

});
