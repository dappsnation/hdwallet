import { Component, OnInit } from '@angular/core';
import { HdwalletService } from './../../hdwallet.service';

@Component({
  selector: 'hdwallet-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  public address: string;

  constructor(private service: HdwalletService) { }

  ngOnInit() {
    this.address = this.service.wallet.address;
  }

}
