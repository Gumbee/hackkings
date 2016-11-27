import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PulsePage } from '../pages/pulse/pulse';
import { CalendarPage } from '../pages/calendar/calendar';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TaskerPage } from '../pages/tasker/tasker';

@NgModule({
  declarations: [
    MyApp,
    PulsePage,
    CalendarPage,
    HomePage,
    TabsPage,
    TaskerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PulsePage,
    CalendarPage,
    HomePage,
    TabsPage,
    TaskerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
