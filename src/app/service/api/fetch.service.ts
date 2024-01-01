import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  // https://taskify-backend-app-3w9xe.ondigitalocean.app
  // http://localhost:8080
  baseUrl:string = 'https://taskify-backend-app-3w9xe.ondigitalocean.app';
  jwtKey!:string;
  userId!:string;


  constructor(private router: Router) {
    let jwt = <string>localStorage.getItem('jwt');
    if(null != jwt){
        this.jwtKey = jwt;
    }

    let id = <string>localStorage.getItem('userId');
    if(null != id){
      this.userId = id;
    }
  }

  private checkJwt(){
    let auth = new JwtHelperService();
    console.log(auth.getTokenExpirationDate(this.jwtKey));
    if(auth.isTokenExpired(this.jwtKey)){
      this.router.navigate(['']);
    }
  }

  private getHeader(){
      return {
        'Authorization': 'Bearer ' + this.jwtKey,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
  }

  async login(data:any, apiUrl:string){
    const response = await fetch(this.baseUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/'
      },
      body: JSON.stringify(data)
    });
    const result = await response.text();
    if(response.status === 200){
      let json = JSON.parse(result);
      this.jwtKey = json.jwt;
      this.userId = json.userId;
      localStorage.setItem("jwt", this.jwtKey);
      localStorage.setItem('userId', this.userId);
    }
    return response.status;
  }

  async register(data:any, apiUrl:string){
    const response = await fetch(this.baseUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/'
      },
      body: JSON.stringify(data)
    })

    const result = await response.text();
    return {status: response.status, text: result}
  }

  async activateAccount(data:string, apiUrl:string){
    const response = await fetch(this.baseUrl + apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/'
      },
      body: data
    })

    const result = await response.text()
    return {status: response.status, text: result}
  }
  async postData(data:any, apiURL:string){
    this.checkJwt();
    const response = await fetch(this.baseUrl + apiURL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.jwtKey,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async getData(apiUrl:string){
    this.checkJwt()
    const response = await fetch(this.baseUrl + apiUrl, {
      method: 'GET',
      headers: this.getHeader(),
    });
    const data = await response.json();
    console.log(data);
    return {status: response.status, data: data};
  }

  async postWithParam(apiUrl:string, params:URLSearchParams, data:any){
    this.checkJwt()
      const response = await fetch(this.baseUrl + apiUrl + params, {
          method: 'POST',
          headers: this.getHeader(),
          body: JSON.stringify(data)
      });
      const status = response.status;
      const result = await response.text();
      return {
          status: status,
          text: result
      }
  }

  async getDataWithParam(apiUrl:string, params:URLSearchParams){
    this.checkJwt()
    const response = await fetch(this.baseUrl + apiUrl + params, {
      method: 'GET',
      headers: this.getHeader(),
    });

    const status: number = response.status;
    const result:any = await response.json();
    return {
      status: status,
      data: result
    }
  }

  async patchWithParam(apiUrl:string, params:URLSearchParams, data:any){
    this.checkJwt()
    const response = await fetch(this.baseUrl + apiUrl + params, {
      method: 'PATCH',
      headers: this.getHeader(),
      body:JSON.stringify(data)
    });
    const result = await response.text();
    return {
      status: response.status,
      text: result
    }
  }

  async patchWithParamForString(apiUrl:string, params:URLSearchParams, data:any){
    this.checkJwt()
    // console.log(this.baseUrl + apiUrl + params);
    const response = await fetch(this.baseUrl + apiUrl + params, {
      method: 'PATCH',
      headers: this.getHeader(),
      body:data
    });
    const result = await response.text();
    return {
      status: response.status,
      text: result
    }
  }

  async deleteWithParams(apiUrl:string, params:URLSearchParams){
    this.checkJwt()
    const response = await fetch(this.baseUrl + apiUrl + params, {
      method: 'DELETE',
      headers: this.getHeader(),
    });

    const result = await response.text();
    return {status: response.status, text: result};
  }
}
