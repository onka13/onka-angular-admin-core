## onka-angular-admin-core

Simple admin panel based on angular material.

## Installation

You can install it from npm using:

```
npm i onka-angular-admin-core

// add material package
ng add @angular/material
```

Add styles into angular.json

```
"assets": [
  ...
],
"styles": [
  "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
  "./node_modules/onka-angular-admin-core/src/assets/onka.scss",
  ...             
],
```

Change port address if you desired;

```
"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
        "browserTarget": "main:build",
        "port": 3001
    },
    ...
```

If you got some inject error message, add below config to `tsconfig.json`

```
 "compilerOptions": {
    ...
    "paths": { "@angular/*": ["./node_modules/@angular/*"] }
 }
```

Add `OnkaAppInitializerService` to providers in `app.module.ts`

```
export function appInit(service: OnkaAppInitializerService) {
  return () => service.init();
}

var config = new ConfigService();
config.setApiUrl(environment.apiUrl);
config.setIsProd(environment.production);
config.setLangList({
  en: () => Promise.resolve(en),
  tr: () => Promise.resolve(tr),
});

@NgModule({
  providers: [
    { provide: ConfigService, useValue: config },
    OnkaAppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [OnkaAppInitializerService],
    },
  ],
...
```