import { Action } from '@ngrx/store';

export const TOGGLE_EMERGENCY_STOP_SPEED_REQ = '[SpeedCheck] Toggle Emergency Stop Speed Req';
export const RECORD_EMERGENCY_STOP_FIRST_ATTEMPT = '[SpeedCheck] Record Emergency Stop First Attempt';
export const RECORD_EMERGENCY_STOP_SECOND_ATTEMPT = '[SpeedCheck] Record Emergency Stop Second Attempt';

export const ADD_EMERGENCY_STOP_RIDING_FAULT = '[SpeedCheck] Add Emergency Stop Riding Fualt';
export const ADD_EMERGENCY_STOP_SERIOUS_FAULT = '[SpeedCheck] Add Emergency Stop Serious Fault';
export const ADD_EMERGENCY_STOP_DANGEROUS_FAULT = '[SpeedCheck] Add Emergency Stop Dangerous Fault';
export const REMOVE_EMERGENCY_STOP_FAULT = '[SpeedCheck] Remove Emergency Stop Fault';

export class ToggleEmergencyStopSpeedReq implements Action {
  readonly type = TOGGLE_EMERGENCY_STOP_SPEED_REQ;
}

export class RecordEmergencyStopFirstAttempt implements Action {
  readonly type = RECORD_EMERGENCY_STOP_FIRST_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export class RecordEmergencyStopSecondAttempt implements Action {
  readonly type = RECORD_EMERGENCY_STOP_SECOND_ATTEMPT;
  constructor(public attemptedSpeed: number) {}
}

export class AddEmergencyStopRidingFault implements Action {
  readonly type = ADD_EMERGENCY_STOP_RIDING_FAULT;
}

export class AddEmergencyStopSeriousFault implements Action {
  readonly type = ADD_EMERGENCY_STOP_SERIOUS_FAULT;
}

export class AddEmergencyStopDangerousFault implements Action {
  readonly type = ADD_EMERGENCY_STOP_DANGEROUS_FAULT;
}

export class RemoveEmergencyStopFault implements Action {
  readonly type = REMOVE_EMERGENCY_STOP_FAULT;
}

export type Types =
  | ToggleEmergencyStopSpeedReq
  | RecordEmergencyStopFirstAttempt
  | RecordEmergencyStopSecondAttempt
  | AddEmergencyStopRidingFault
  | AddEmergencyStopSeriousFault
  | AddEmergencyStopDangerousFault
  | RemoveEmergencyStopFault;
