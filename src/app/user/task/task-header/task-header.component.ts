import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent {

}
