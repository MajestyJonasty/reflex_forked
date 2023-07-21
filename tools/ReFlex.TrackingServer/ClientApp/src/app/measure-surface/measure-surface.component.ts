import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrameSizeDefinition } from 'src/shared/config/frameSizeDefinition';
import { CalibrationService } from 'src/shared/services/calibration.service';
import { ElementPosition } from 'src/shared/util/element-position.interface';
import { LogService } from '../log/log.service';

@Component({
  selector: 'app-measure-surface',
  templateUrl: './measure-surface.component.html',
  styleUrls: ['./measure-surface.component.scss']
})
export class MeasureSurfaceComponent implements OnInit {

  public fullScreen = false;

  private frameSizeSubscription?: Subscription;
  private _frameSize: FrameSizeDefinition = { top: 0, left: 0, width: 500, height: 400 };

  public constructor(private readonly calibrationService: CalibrationService, private readonly logService: LogService) { }

  public ngOnInit(): void {
    this.frameSizeSubscription = this.calibrationService.getFrameSize().subscribe((result) => {
      this._frameSize = result;
    }, (error) => {
      console.error(error);
      this.logService.sendErrorLog(`${error}`);
    });
  }

  public ngOnDestroy(): void {
    this.frameSizeSubscription?.unsubscribe();
  }

  public getViewStyle(): ElementPosition {
    if (this.fullScreen) {
      return {
        position: 'absolute',
        top: `${this._frameSize.top}px`,
        left: `${this._frameSize.left}px`,
        width: `${this._frameSize.width}px`,
        height: `${this._frameSize.height}px`
      };
    }

    return {
      position: 'relative',
      top: `0`,
      left: `0`,
      width: `100%`,
      height: `40vh`
    };
  }

}
