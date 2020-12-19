import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private http: HttpClient) { }
  status;
  ngOnInit(): void {
  }
  OnSubmit(data){
    this.http.post<any>(environment.url+'/api/blogin', { username: data.username,
     password: data.password }).subscribe(result => {
      this.status = result.status;
      if (this.status === 1){
              localStorage.setItem('currentUser', JSON.stringify(result.auth));
              window.location.href = '/dash';
      }
  });
}
}
