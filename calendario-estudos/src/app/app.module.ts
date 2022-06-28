import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StudiesDayListComponent } from './studies-day-list/studies-day-list.component';
import { DetailsSubjectComponent } from './modal/details-subject/details-subject.component';
import { RemoveComponent } from './modal/remove/remove.component';
import { AddComponent } from './modal/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    StudiesDayListComponent,
    DetailsSubjectComponent,
    RemoveComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
