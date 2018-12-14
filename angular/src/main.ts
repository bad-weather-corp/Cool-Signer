import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * bootstrap angular application
 */
const bootstrapAngular = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

// bootstrap based on whether we are cordova or not
if ((window as any).isCordovaApp) {
  // cordova app registers for cordova deviceready lifecycle event
  document.addEventListener('deviceready', bootstrapAngular, false);
} else {
  // if not cordova then simply bootstrap right away
  bootstrapAngular();
}
