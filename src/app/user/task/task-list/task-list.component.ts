import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {FetchService} from "../../../service/api/fetch.service";
import {ToasterService} from "../../../service/toasts/toaster.service";
import {TaskEditComponent} from "../task-edit/task-edit.component";
import {ɵEmptyOutletComponent} from "@angular/router";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgClass,
    ɵEmptyOutletComponent,
    TaskEditComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  value = false;
  tasks: Task[] = [
    new Task(1, 'Task 1', 'Description 1', 'Pending'),
    new Task(2, 'Task 2', 'Description 2', 'Pending'),
    new Task(3, 'Task 3', 'Description 3', 'Pending'),
    new Task(4, 'Task 4', 'Description 4', 'Pending'),
    new Task(5, 'Task 5', 'Description 5', 'Pending'),
    new Task(6, 'Task 6', 'Description 6', 'Pending'),
    new Task(7, 'Task 7', 'Description 7', 'Pending'),
    new Task(8, 'Task 8', 'Description 8', 'Pending'),
    new Task(9, 'Task 9', 'Description 9', 'Pending'),
    new Task(10, 'Task 10', 'Description 10', 'Pending'),
    new Task(11, 'Task 11', 'Description 11', 'Complete'),
    new Task(12, 'Task 12', 'Description 12', 'Complete'),
    new Task(13, 'Task 13', 'Description 13', 'Complete'),
    new Task(14, 'Task 14', 'Description 14', 'Complete'),
    new Task(15, 'Task 15', 'Description 15', 'Complete'),
    new Task(16, 'Task 16', 'Description 16', 'Complete'),
    new Task(17, 'Task 17', 'Description 17', 'Complete'),
    new Task(18, 'Task 18', 'Description 18', 'Complete'),
    new Task(19, 'Task 19', 'Description 19', 'Pending'),
    new Task(20, 'Task 20', 'Description 20', 'Pending'),
    new Task(21, 'Task 21', 'Description 21', 'Progress'),
    new Task(22, 'Task 22', 'Description 22', 'Progress'),
    new Task(23, 'Task 23', 'Description 23', 'Progress'),
    new Task(24, 'Task 24', 'Description 24', 'Progress'),
    new Task(25, 'Task 25', 'Description 25', 'Progress'),
    new Task(26, 'Task 26', 'Description 26', 'Pending'),
  ];

  constructor(private fetch: FetchService, private toaster: ToasterService) {

    let params = new URLSearchParams({userId: fetch.userId})

    fetch.getDataWithParam('/task/get-all?', params)
      .then(result => {
        if(result.status === 200){
          this.tasks = <Task[]>result.data;
        }else if(result.status >= 400){
          toaster.show('Status code 400+', 'info');
        }
      })

  }

  toggleBtn(id:string) {
    let element = <HTMLElement>document.getElementById(id);
    this.value = !this.value;
    if(element){
      if(this.value){
        element.classList.remove('hidden');
        element.classList.add('flex');
      }else{
        element.classList.add('hidden');
        element.classList.remove('flex');
      }
    }
  }

  async updateStatus(status: string, task:Task) {
    let params = new URLSearchParams({
      userId: this.fetch.userId,
      taskId: task.id + ''
    })
    const result = await this.fetch.patchWithParamForString('/task/update/status?', params, status);
    if(result.status === 200){
      task.status = status;
      this.toaster.show(result.text, 'success');
    }else{
      this.toaster.show(result.text, 'info');
    }
  }

  async deleteTask(task: Task) {
    let params = new URLSearchParams({
      userId: this.fetch.userId,
      taskId: task.id + ''
    });
    const result = await this.fetch.deleteWithParams('/task/delete?', params);
    if(result.status === 200){
      this.tasks = this.tasks.filter(data => {
        return task.id !== data.id;

      });
      this.toaster.show(result.text, 'info');
    }else{
      this.toaster.show(result.text, 'info');
    }
  }
  dialogueBox = false;
  data!:Task;
  updateTask(task: Task, id: string) {
    this.dialogueBox = !this.dialogueBox;
    this.data = task;
    this.toggleBtn(id);
  }

  close(bool:boolean){
    this.dialogueBox = bool;
  }
}

export class Task{

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status: string,
  ) {
  }
}
