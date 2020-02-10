import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { OnInit } from '@angular/core';

export interface VehicleData {
  vLength: number; // VehicleLength
  vWidth: number; // VehicleWidth
  expStartDist: number; // Expected distanceFromStart
  expMidDist: number; // Expected distanceFromMiddle
  expWidthDist: number; // Expected distanceOfBayWidth
}

export class ReverseDiagramModalMock implements OnInit {
  vehicleDetails: Map<TestCategory, VehicleData>;
  cappedStartDistance: TestCategory[];

  public getCappedStartDistanceCategories() {
    return this.cappedStartDistance;
  }

  public getVehicleDetails(): Map<TestCategory, VehicleData> {
    return this.vehicleDetails;
  }

  ngOnInit(): void {
    this.cappedStartDistance = [TestCategory.C1E, TestCategory.CE];
    this.vehicleDetails = new Map([
      [TestCategory.BE, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.C, { vLength: 10, vWidth: 2.75, expStartDist: 35, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.CE, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.C1, { vLength: 10, vWidth: 2.75, expStartDist: 35, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.C1E, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.D, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.DE, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.D1, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
      [TestCategory.D1E, { vLength: 10, vWidth: 2.75, expStartDist: 40, expMidDist: 20, expWidthDist: 4.13 }],
    ]);
  }
}
