import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CasClient } from 'src/app/core/security/CasClient/CasClient';
import { CasService } from 'src/app/core/services/cas.service';
import config from 'config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  request: any;
  orderby: any;

  private destroy$ = new Subject<any>();

  constructor(private route: ActivatedRoute, private casClient: CasClient,private srvCasService: CasService) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: async (params: any) => {
          if (this.casClient.isAuth()) {
            window.location.href = config.URL_BASE_PATH + '/welcome';
          }else{
            console.log('PASO 2 Xd');
            await this.loginWithTicket(params);
          }
          this.isLoading = true;
          this.request = true;
      },
      error: (err) => {
        console.log('err =>', err);
      },
    });
  }

  async loginWithTicket(params: any) {
    if (!this.casClient.isAuth()) {
      if (params.ticket) {
        await this.autenticar();
      }
    }
  }

 async autenticar() {
    this.casClient.saveTicket();
    let res = await  this.casClient.verificaLogin();
    if (res) {
      window.location.href = config.URL_BASE_PATH + '/welcome';
    }else{
      this.srvCasService.setMessageCasError('No se pudo autenticar');
      this.casClient.casError();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

   }
};
