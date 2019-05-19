import { Component, OnInit } from '@angular/core';
import { TrylinksService } from '../trylinks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private tryLinksService: TrylinksService, private router: Router) { }

  ngOnInit() {
  }

  get username() {
    return this.tryLinksService.username;
  }

  logout(): void {

  }

}
