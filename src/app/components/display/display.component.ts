import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HdwalletService } from './../../hdwallet.service';
import { Network } from 'ethers/utils';

@Component({
  selector: 'hdwallet-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  public address: string;
  public network: Network;
  public balance: string;
  public txForm: FormGroup;

  constructor(
    private service: HdwalletService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.txForm = this.fb.group({
      'to': ['', Validators.required],
      'value': [0, Validators.required]
    });

    this.address = this.service.wallet.address;
    this.network = this.service.provider.network;
    this.balance = await this.service.getBalance();
  }

  public async sendTx() {
    if (!this.txForm.valid) { return; }
    try {
      const response = await this.service.sendTx(this.txForm.value);
      console.log({response});
    } catch (e) {
      console.error('Cannot send Transaction', e);
    }
  }
}
