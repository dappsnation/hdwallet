import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn , ValidationErrors } from '@angular/forms';
import { Wallet } from 'ethers';

export const sameWordsValidator = (
    control: FormGroup,
    tests: { word: string, index: number }[]
  ): ValidationErrors | null => {
    const values = [0, 1, 2].map(i => control.get([i]).value);
    const words = tests.map(test => test.word);
    console.log({values, words});
    return words === values ? { 'identityRevealed': true } : null;
};

export const samePassword: ValidatorFn = (control: FormGroup) => {
  const pwd = control.get('pwd');
  const confirm = control.get('control');
  return pwd === confirm ? { 'identityRevealed': true } : null;
};

@Component({
  selector: 'hdwallet-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {
  public wallet: Wallet;
  public mnemonic: string[];
  public testWords: { word: string, index: number }[];
  public testWordsForm: FormGroup;
  public passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.randomMnemonic();
    this.testWordsForm = this.fb.group({
      0: ['', Validators.required],
      1: ['', Validators.required],
      2: ['', Validators.required],
    }, {
      validators: (control: FormGroup) => sameWordsValidator(control, this.testWords)
    });
    this.passwordForm = this.fb.group({
      pwd: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {
      validators: samePassword
    });
  }

  /** Generate a random Mnemonic with the right entropy */
  public randomMnemonic() {
    this.wallet = Wallet.createRandom();
    this.mnemonic = this.wallet.mnemonic.split(' ');
    this.createTestWords(3);
  }

  /** Create a test for the mnemonic */
  public createTestWords(amount: number) {
    if (amount > this.mnemonic.length) {
      console.error(`Cannot test more than ${this.mnemonic.length} words`);
    }
    if (amount < 1) {
      console.error(`You should test at least 1 word`);
    }
    const mnemonic = [...this.mnemonic];
    this.testWords = Array(amount).fill('').map(_ => {
      const rand = Math.floor(Math.random() * mnemonic.length);
      return { word: mnemonic.splice(rand)[0], index: rand };
    });
  }

  /** Check password and confirm are the same */
  public createWallet() {
    if (this.passwordForm.valid) {
      const pwd = this.passwordForm.get('pwd').value;
      this.encryptPrivatekey(pwd);
    }
  }

  /** Get a private key and encrypt it with a password */
  private async encryptPrivatekey(password: string) {
    const keystore = await this.wallet.encrypt(password);
    localStorage.setItem('keystore', keystore);
  }
}
