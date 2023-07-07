import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './page/history.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoryComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HistoryRoutingModule,
    SharedModule
  ]
})
export class HistoryModule { }
