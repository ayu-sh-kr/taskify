import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FetchService} from "../../service/api/fetch.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName!:string;

  constructor(private fetch: FetchService) {
    // console.log(fetch.getDetails());
  }
}
