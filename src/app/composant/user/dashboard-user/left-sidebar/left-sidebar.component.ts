import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
  @Output() sectionSelected = new EventEmitter<string>();

  selectSection(section: string) {
    this.sectionSelected.emit(section);
  }
}
