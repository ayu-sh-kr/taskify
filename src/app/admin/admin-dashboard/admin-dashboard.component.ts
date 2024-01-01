import { Component } from '@angular/core';
import {FetchService} from "../../service/api/fetch.service";
import {AdminHeaderComponent} from "../admin-header/admin-header.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    AdminHeaderComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  data: AdminData = {
    'totalAccount': 500,
    'activeAccount': 349,
    'disabledAccount': 151,
    'totalTask': 5
  }

  constructor(private fetch: FetchService) {
    fetch.getData('/admin/dashboard')
      .then(res => {
        if(res.status === 200){
          this.data = <AdminData>res.data;
        }
      });
  }
}

export type AdminData = {
  totalAccount: number,
  activeAccount: number,
  disabledAccount: number,
  totalTask: number
}
