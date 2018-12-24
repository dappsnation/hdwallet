import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HdwalletService } from './../hdwallet.service';

@Component({
  selector: 'hdwallet-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  constructor(
    private service: HdwalletService,
    private router: Router
  ) { }

  public async login(password: string) {
    try {
      await this.service.login(password);
      this.router.navigate(['display']);
    } catch (err) {
      console.log(err);
    }
  }
}
