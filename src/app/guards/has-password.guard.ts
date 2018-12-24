import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HdwalletService } from './../hdwallet.service';

@Injectable({
  providedIn: 'root'
})
export class HasPasswordGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: HdwalletService
  ) {}

  canActivate(): boolean {
    if (!this.service.wallet) {
      this.router.navigate(['password']);
      return false;
    }
    return true;
  }
}
