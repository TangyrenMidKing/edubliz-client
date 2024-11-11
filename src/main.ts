import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    if (typeof window !== 'undefined') {
      window.onunload = () => {
        // Cleanup code
      };
    }
  })
  .catch((err) => console.error('Error bootstrapping app:', err));
