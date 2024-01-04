import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FetchService} from "../service/api/fetch.service";
import {ToasterService} from "../service/toasts/toaster.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  data:ProfileData = new ProfileData(10,'Ayush Kumar', 'ayush@gmail.com', '8931007054', true)

  constructor(private fetch: FetchService, private toaster: ToasterService) {
    let param = new URLSearchParams({userId: fetch.userId})
    this.fetch.getDataWithParam('/user/user-info?', param)
      .then(res => {
        if(res.status === 200){
          this.data = <ProfileData> res.data[0];
          console.log(res.data);
        }else {
          console.log(res.status)
        }
      })
  }


  async disableAccount() {
    let params = new URLSearchParams({userId: this.fetch.userId});
    let res = await this.fetch.patchWithParamForString("/user/disable?", params, this.data.email);
    if(res.status === 200){
      this.toaster.show(res.text, 'success');
    }else {
      this.toaster.show(res.text + ': ' + res.status, 'info');
    }
  }

  async deleteAccount(){
    let res = await this.fetch.deleteWithData("/user/delete?", this.data.email);
    if(res.status === 200){
      this.toaster.show(res.text, 'success');
    }else {
      this.toaster.show('Server respond with: ' + res.status, 'info');
    }
  }
}

export class ProfileData{
  constructor(
    public id: number,
    public name:string,
    public email:string,
    public phone:string,
    public active:boolean,
  ) {
  }
}
