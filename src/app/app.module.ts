import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { ConsumerComponent } from './Home/consumer/consumer.component';
import { BoardComponent } from './Home/board/board.component';
import { Routes, RouterModule } from '@angular/router';
import { ConsumregComponent } from './Home/consumreg/consumreg.component';
import { SidebarComponent } from './Board/sidebar/sidebar.component';
import { DashboardComponent } from './Board/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, children: [
    { path: '', component: ConsumerComponent },
    { path: 'board', component: BoardComponent },
    { path: 'register', component: ConsumregComponent },
  ]},
  { path: 'dash', component: SidebarComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConsumerComponent,
    BoardComponent,
    ConsumregComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
