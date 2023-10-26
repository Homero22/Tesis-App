import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './shared/footer/footer.component';
import { AsideComponent } from './shared/aside/aside.component';
import { CasClient } from './core/security/CasClient/CasClient';
import { HttpService } from './core/security/CasClient/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/security/other/auth.interceptor';
import { CasErrModule } from './modules/pages/cas-err/cas-err.module';
import { DeniedModule } from './modules/pages/denied/denied.module';
import { FailedModule } from './modules/pages/failed/failed.module';
import { LogoutModule } from './modules/pages/logout/logout.module';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CasErrModule,
    DeniedModule,
    FailedModule,
    LogoutModule,
    LoginModule



  ],
  providers: [
    CasClient,
    HttpService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
