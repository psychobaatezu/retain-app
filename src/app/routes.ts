import {RouterConfig} from "@angular/router";
import {Main} from "./containers/main";
import {Notes} from "./containers/notes";
import {About} from "./containers/about";
import {Auth} from "./containers/auth";
import {AuthService} from "./services/auth";

export const routes: RouterConfig = [
  {
    path: '',
    component: Main,
    canActivate: [AuthService],
    children: [
      {path: '', component: Notes},
      {path: 'about', component: About}
    ]
  },
  {path: 'auth', component: Auth},
  {path: '**', redirectTo: ''}
];