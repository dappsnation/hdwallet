import { Component, OnInit } from '@angular/core';
import { HdwalletService } from './../../hdwallet.service';
import { BigNumber, Network } from 'ethers/utils';

@Component({
  selector: 'hdwallet-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  public address: string;
  public network: Network;
  public balance: string;

  constructor(private service: HdwalletService) { }

  async ngOnInit() {
    this.address = this.service.wallet.address;
    this.network = this.service.provider.network;
    this.balance = await this.service.getBalance();
  }

}
