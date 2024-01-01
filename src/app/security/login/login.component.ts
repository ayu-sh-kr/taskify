import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {ToasterService} from "../../service/toasts/toaster.service";
import {Router, RouterLink} from "@angular/router";
import {FetchService} from "../../service/api/fetch.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    username!:string;
    password!:string;

    constructor(private toaster: ToasterService, private fetch: FetchService, private router: Router) {

    }

    login() {
      let res = this.fetch.login({email:this.username, password: this.password}, "/auth/login");
      res.then(value => {
        if(value === 200){
          this.toaster.show('Login successful', 'success');
          this.router.navigate(['home'])
        }else{
          this.toaster.show('Login failed', 'danger');
        }
      })
    }

    private reset() {
      this.username = '';
      this.password = '';
    }

}
