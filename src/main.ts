import {bootstrap} from "@angular/platform-browser-dynamic";
import {App, providers} from "./app";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(App, [
  ...HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  ...providers
]);
