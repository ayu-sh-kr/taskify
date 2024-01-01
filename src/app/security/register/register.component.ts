import { Component } from '@angular/core';
import {Router, RouterLink, Routes} from "@angular/router";
import {ToasterService} from "../../service/toasts/toaster.service";
import {FormsModule} from "@angular/forms";
import {FetchService} from "../../service/api/fetch.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  firstName!:string;
  lastName!:string;
  phone!:string;
  email!:string;
  password!:string;

  constructor(private toaster:ToasterService, private fetch: FetchService, private router: Router) {
  }


  async register() {
    if(this.verifyEmail()){
      let registerData:RegisterDto = new RegisterDto(
        this.firstName + this.lastName,
        this.password,
        this.email,
        this.phone
      );

      const res = await this.fetch.register(registerData, "/auth/register");
      if(res.status === 201){
        this.toaster.show(res.text, 'success');
        const act = await this.fetch.activateAccount(registerData.email, "/user/activate");
        if(act.status === 200){
          this.router.navigate(['']);
        }
      }else{
        this.toaster.show('Server return ' + res.status, 'info');
      }
    }
  }

  private verifyEmail() {
    let email = this.email;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(email)){
      this.toaster.show("Email is valid", 'success');
      return true;
    } else {
      this.toaster.show("Email is not valid", 'info');
      return false;
    }
  }
}

export class RegisterDto{
  constructor(
    public name: string,
    public password: string,
    public email: string,
    public phone: string,
  ) {
  }
}
