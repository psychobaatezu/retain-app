import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from "../services/auth";

@Component({
  selector: 'app-bar',
  directives: [
    ...ROUTER_DIRECTIVES,
  ],
  styles: [`
    .app-bar {
      height: 65px;
      padding: 5px 30px;
      background-color: #00bcd4;
    }
    .logo {
      color: #ffffff;
      font-size: 30px;
      font-weight: 300;
      cursor: pointer;
    }
    .link {
      color: #ffffff;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
    }
  `],
  template: `
    <header class="app-bar row middle-xs">
      <span [routerLink]="['']" class="logo col-xs-9">
        Retain
      </span>
      <nav class="col-xs-3">
        <div class="row middle-xs between-xs">
          <span [routerLink]="['', 'about']" class="link">About</span>  
          <span (click)="signout()" class="link">Sign out</span>  
        </div>
      </nav>
    </header>
  `
})
export class AppBar {
  constructor(private authService: AuthService) {}

  signout() {
    this.authService.sigout();
  }
}
