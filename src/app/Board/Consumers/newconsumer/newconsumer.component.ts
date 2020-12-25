import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
@Component({
  selector: 'app-newconsumer',
  templateUrl: './newconsumer.component.html',
  styleUrls: ['./newconsumer.component.css']
})
export class NewconsumerComponent implements OnInit {
  public data = [];
  constructor(private http: HttpClient) {
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/ConsumerUserInfo',{},{headers: headers}).subscribe(result => {
       this.data = result.Users;
  });
   }
  ngOnInit(): void {
  }
}
