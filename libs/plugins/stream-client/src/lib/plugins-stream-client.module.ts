import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContextPanelModule } from '@flogo-web/lib-client/context-panel';

import { StreamDesignerComponent } from './stream-designer/stream-designer.component';
import { SimulatorComponent } from './simulator/simulator.component';

@NgModule({
  imports: [
    CommonModule,
    ContextPanelModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StreamDesignerComponent },
    ]),
  ],
  declarations: [StreamDesignerComponent, SimulatorComponent],
})
export class PluginsStreamClientModule {}
