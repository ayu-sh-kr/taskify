import { Component } from '@angular/core';
import {FetchService} from "../../service/api/fetch.service";
import {ToasterService} from "../../service/toasts/toaster.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  data:AccountData[] = [
    {name:'ayush', email:'ayush@gmail.com', phone:'8931007054', active: false},
    new AccountData('test', 'test@gmail.com', '9999999999', true)
  ]

  constructor(private fetch: FetchService, private toaster: ToasterService) {
    fetch.getData('/admin/accounts')
      .then(res => {
        if (res.status === 200){
          this.data = <AccountData[]>res.data
        }
      })
  }

  async updateStatus(datum: AccountData) {
    const res = await this.fetch.patchWithParam('/admin/update-status', new URLSearchParams(), {email: datum.email, status: !datum.active})
    if(res.status === 200){
      this.toaster.show(res.text, 'success');
      datum.active = !datum.active;
    }else{
      this.toaster.show(res.text, 'info');
    }
  }
}

export class AccountData {
  constructor(
    public name:string,
    public email:string,
    public phone:string,
    public active: boolean,
  ) {
  }
}
