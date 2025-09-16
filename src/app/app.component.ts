import { Component } from '@angular/core';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  imports: [UserSearchComponent, NgxSonnerToaster, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github';
}