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
        setTimeout(async () => {
          if (this.casClient.isAuth()) {
            window.location.href = config.URL_BASE_PATH + '/welcome';
          }
          this.isLoading = true;
        }, 2200);
       // alert('params => ' + params.ticket);


        await this.loginWithTicket(params);
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
    this.casClient.verificaLogin();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

   }
};
