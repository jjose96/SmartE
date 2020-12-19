import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  OnSubmit(data){
    this.http.post<any>(environment.url+'/api/login', { username: data.username,
     password: data.password }).subscribe(result => {
  });
}
}
