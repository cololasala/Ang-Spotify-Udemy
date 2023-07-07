import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() callBackEvent = new EventEmitter<string>();
  searched = '';

  onSearch(e: any): void {
    if (e.length >= 3) {
      this.callBackEvent.emit(e);
    }
    if (e.length === 0) {
      this.callBackEvent.emit();
    }
  }
}
