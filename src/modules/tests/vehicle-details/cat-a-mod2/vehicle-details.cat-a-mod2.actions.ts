import { Action } from '@ngrx/store';

export const SCHOOL_BIKE_TOGGLED = '[Vehicle Details] [Cat A Mod2] School Bike toggled';

export class SchoolBikeToggled implements Action {
  readonly type = SCHOOL_BIKE_TOGGLED;
}

export type Types =
 | SchoolBikeToggled;
