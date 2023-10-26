import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../CasClient/ConfigUrl';
// import { Observable, Subject, throwError } from 'rxjs';
import { User } from './CasClientUser';
import { HttpService } from './http.service';
import { CasService } from 'src/app/core/services/cas.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router, RoutesRecognized } from '@angular/router';

const CONFIG2 = CONFIG.Settings;
declare var URL: any;
var redirect = '';

@Injectable()
export class CasClient {
  cadena!: string[];

  constructor(
    private http: HttpService,
    private caservice: CasService,
    private router: Router ) {}

  public Redirect() {
    redirect =
      CONFIG2.CASLOGIN + 'service=' + encodeURIComponent(CONFIG2.REDIRECT_URI);
    window.open(redirect, '_self');
  }

  public Logout() {
    var Autenticacion = sessionStorage.getItem('clientName');
    var logout = '';
    this.remove();
    if (Autenticacion == 'Institucional') {
      logout =
        CONFIG2.LOGOUT_CORREO +
        'post_logout_redirect_uri=' +
        encodeURIComponent(CONFIG2.CASLOGOUT) +
        'service=' +
        encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
      // window.location.href = logout;
      this.router.navigate(['/logout']);
    } else {
      logout =
        CONFIG2.CASLOGOUT +
        'service=' +
        encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
      // window.location.href = logout;
      this.router.navigate(['/logout']);
    }
  }

  public casError(){
    this.router.navigate(['/casError']);
  }

  public verificaLogin(): Promise<any> {
    if (!this.isAuthenticated()) {
      this.Redirect();
    }
    return this.validateLogin();
  }

  public validateLogin() {
    console.log('INGRESO A validateLogin');
    var service = encodeURIComponent(CONFIG2.REDIRECT_URI);
    var ticket = sessionStorage.getItem('ticketUser');
    var urlvalidate =
      CONFIG2.VALIDATEJAVA + 'service=' + service + '&ticket=' + ticket;
    return new Promise((resolve, reject) => {
      this.http.doGetUrlXML(urlvalidate).subscribe({
        next: (res: any) => {
          this.validacionUsuarioCas(resolve, reject, res);
        },
        error: (err: any) => {
          console.log(err);
          // this.Logout();
          this.casError();
          reject();
        },
      });
    });
  }

  public validacionUsuarioCas(resolve: any, reject: any, res: string) {
    this.caservice.validaringreso(res).subscribe({
      next: (response: any) => {
        alert(JSON.stringify(response));
        if (response.status === 'success') {
          let user = response.datosCas.casUser;
          alert('Bienvenido ' + user);
          let clientName = response.datosCas.clienteName;
          sessionStorage.setItem('clientName', clientName || 'Centralizada');
          sessionStorage.setItem('loginUser', user);
        } else {
          // alert('No se pudo validar el usuario');
          this.caservice.setMessageCasError('No se pudo validar el usuario');
          // this.Logout();
          this.casError();
        }
        resolve();
      },
      error: (err: any) => {
        console.log('Se captura el error =>' ,err);
        // alert('No se pudo validar el usuario por un error' + err.message);
        this.caservice.setMessageCasError(err.message);
        this.casError();
        reject();
      },
    });
  }

  public urlWithoutTicket(url: string): string {
    return url.replace(/(^|[&?])ticket(=[^&]*)?/, '');
  }

  public uniqueUrl(url: string) {
    var unique_url = url;
    unique_url += url.indexOf('?') === -1 ? '?' : '&';
    unique_url += '_=' + new Date().getTime();
    return unique_url;
  }

  public remove() {
    window.sessionStorage.removeItem('ticketUser');
    window.sessionStorage.removeItem('loginUser');
    window.sessionStorage.removeItem('clientName');
    localStorage.removeItem('userRole');

  }

  public isNotEmpty(obj: any): boolean {
    return !this.isEmpty(obj);
  }

  public isEmpty(obj: any): boolean {
    return obj == undefined || obj == null || obj == '' || obj == ' ';
  }

  public saveTicket() {
    let ticket = window.location.search.replace('?ticket=', '');
    if (ticket) {
      sessionStorage.setItem('ticketUser', ticket);
    }
  }

  public getLogin() {
    return sessionStorage.getItem('loginUser');
  }

  public getTicket() {
    return sessionStorage.getItem('ticketUser');
  }

  public isAuthenticated(): boolean {
    var rawIdToken = sessionStorage.getItem('ticketUser');
    return this.isNotEmpty(rawIdToken);
  }
  public isAuth(): boolean {
    var ticket = sessionStorage.getItem('ticketUser');
    var user = sessionStorage.getItem('loginUser');
    console.log('EN la funcion isAuth ticket =>', ticket);
    console.log('EN la funcion isAuth user =>', user);
    return Boolean(ticket) && Boolean(user);
  }

  public ReadTicket(url: string): String {
    let intIndex: boolean = url.includes('ticket');
    let rawClientInfo: string = '';
    if (intIndex) {
      this.cadena = url.split('=');
      rawClientInfo = this.cadena[1];
      sessionStorage.setItem('ticketUser', this.cadena[1]);
      return rawClientInfo;
    } else {
      return rawClientInfo;
    }
  }
  public SalirSistema() {
    sessionStorage.removeItem('idRol');
    sessionStorage.removeItem('perfil');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('totalfactura');
    sessionStorage.removeItem('totalfacturaAnu');
    sessionStorage.removeItem('totalNota');
    sessionStorage.removeItem('correo');
  }
}
