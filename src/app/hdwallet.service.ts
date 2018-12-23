import { Injectable } from '@angular/core';
import { Wallet } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class HdwalletService {

  public wallet: Wallet;

  public async login(password: string) {
    try {
      const keystore = localStorage.getItem('keystore');
      this.wallet = await Wallet.fromEncryptedJson(keystore, password);
    } catch (err) {
      throw new Error(err);
    }
  }
}
