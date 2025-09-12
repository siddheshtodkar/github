import { Component } from '@angular/core';
import { UserSearchComponent } from './components/user-search/user-search.component';

@Component({
  selector: 'app-root',
  imports: [UserSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github';
}