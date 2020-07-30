import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { EyesightTestComponent } from './eyesight-test/eyesight-test';
import { EyesightFailureConfirmationComponent } from './eyesight-failure-confirmation/eyesight-failure-confirmation';
import { VehicleRegistrationComponent } from './vehicle-registration/vehicle-registration';
import { AccompanimentCardComponent } from './accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from './accompaniment/accompaniment';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details';
import { DirectivesModule } from '../../../directives/directives.module';
import { BikeCategoryTypeComponent } from './bike-category-type/bike-category-type';
import { VehicleChecksToggleComponent } from './vehicle-checks-completed/vehicle-checks-completed';
import { CandidateDeclarationSignedComponent } from './candidate-declaration/candidate-declaration';

@NgModule({
  declarations: [
    EyesightTestComponent,
    EyesightFailureConfirmationComponent,
    VehicleRegistrationComponent,
    AccompanimentCardComponent,
    AccompanimentComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsComponent,
    BikeCategoryTypeComponent,
    VehicleChecksToggleComponent,
    CandidateDeclarationSignedComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    EyesightTestComponent,
    EyesightFailureConfirmationComponent,
    VehicleRegistrationComponent,
    AccompanimentCardComponent,
    AccompanimentComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsComponent,
    BikeCategoryTypeComponent,
    VehicleChecksToggleComponent,
    CandidateDeclarationSignedComponent,
  ],
})
export class WaitingRoomToCarComponentsModule { }
