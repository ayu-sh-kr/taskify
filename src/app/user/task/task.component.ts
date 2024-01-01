import { Component } from '@angular/core';
import {TaskHeaderComponent} from "./task-header/task-header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  constructor() {

  }

}


