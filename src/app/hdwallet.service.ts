import { Injectable } from '@angular/core';
import { Wallet, ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class HdwalletService {

  public wallet: Wallet;
  public provider: ethers.providers.BaseProvider;

  public async login(password: string) {
    try {
      const keystore = localStorage.getItem('keystore');
      this.provider = ethers.getDefaultProvider('ropsten');
      const wallet = await Wallet.fromEncryptedJson(keystore, password);
      this.wallet = wallet.connect(this.provider);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getBalance() {
    const balance = await this.wallet.getBalance();
    return balance.toString();
  }
}
