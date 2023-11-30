import {  Injectable } from '@angular/core';
import { CONFIG } from '../CasClient/ConfigUrl';
import { HttpService } from './http.service';
import { CasService } from 'src/app/core/services/cas.service';
import { Router } from '@angular/router';

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
      console.log('Institucional');
      logout =
        CONFIG2.LOGOUT_CORREO +
        'post_logout_redirect_uri=' +
        encodeURIComponent(CONFIG2.CASLOGOUT) +
        'service=' +
        encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
        this.router.navigate(['/logout']);
      // window.location.href = logout;
    } else {
      console.log('Centralizada');
      logout =
        CONFIG2.CASLOGOUT +
        'service='
        +
        encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
        this.router.navigate(['/logout']);
        window.location.href = logout;
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

    var service = encodeURIComponent(CONFIG2.REDIRECT_URI);
    var ticket = sessionStorage.getItem('ticketUser');
    var urlvalidate = CONFIG2.VALIDATEJAVA + 'service=' + service + '&ticket=' + ticket;
    return new Promise((resolve, reject) => {
      this.http.doGetUrlXML(urlvalidate).subscribe({
        next: (res: any) => {
          this.validacionUsuarioCas(resolve, reject, res);
        },
        error: (err: any) => {
          console.log(err);
          reject()
        },
      });
    });
  }

  public validacionUsuarioCas(resolve: any, reject: any, res: string) {
    this.caservice.validaringreso(res).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          let user = response.datosCas.casUser;
          let clientName = response.datosCas.clienteName;
          sessionStorage.setItem('clientName', clientName || 'Centralizada');
          sessionStorage.setItem('loginUser', user);
        } else {
          // alert('No se pudo validar el usuario');
          this.caservice.setMessageCasError('No se pudo validar el usuario' + response.status);
          // this.Logout();
          this.casError();
        }
        resolve();
      },
      error: (err: any) => {
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
    console.log("ticketU",window.sessionStorage.getItem('ticketUser'));
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
}
