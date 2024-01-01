import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Task} from "../task-list/task-list.component";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {FetchService} from "../../../service/api/fetch.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  @Input()
  data!: Task
  @Output()
  dataChange = new EventEmitter<Task>();

  @Output()
  dialogueBoxChange = new EventEmitter<boolean>();

  title!:string;
  description!:string;

  constructor(private fetch:FetchService) {
  }

  async update(){
    this.data.title = this.title;
    this.data.description = this.description;

    let params = new URLSearchParams({
      userId: this.fetch.userId,
      taskId: this.data.id + ''
    });

    const res = await this.fetch.patchWithParam('/task/update?', params, this.data);
    if(res.status === 200){
      this.dataChange.emit(this.data);
    }

    this.dialogueBoxChange.emit(false);
  }
}
