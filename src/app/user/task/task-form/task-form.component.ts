import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FetchService} from "../../../service/api/fetch.service";
import {ToasterService} from "../../../service/toasts/toaster.service";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  title!:string;
  description!:string;
  status:string = 'Pending';

  constructor(private fetch:FetchService, private toaster: ToasterService) {
  }

  async createTask(){
    let taskDto = new TaskDto(this.title, this.description, this.status);

    let params = new URLSearchParams({userId: this.fetch.userId});
    const res = await this.fetch.postWithParam('/task/create?', params, taskDto);
    if(res.status === 201){
      this.toaster.show(res.text, 'info');
      this.title = '';
      this.description = '';
    }else{
      this.toaster.show(res.text, 'info');
    }
  }
}

export class TaskDto{
  constructor(
    public title:string,
    public description:string,
    public status:string
  ) {
  }
}
