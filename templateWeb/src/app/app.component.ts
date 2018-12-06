import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
