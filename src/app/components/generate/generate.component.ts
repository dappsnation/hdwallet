import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidatorFn , ValidationErrors, AbstractControl } from '@angular/forms';
import { Wallet } from 'ethers';
import { HdwalletService } from 'src/app/hdwallet.service';

export const samePassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pwd = control.get('pwd');
  const confirm = control.get('control');
  return pwd !== confirm ? { 'wrongPassword': true } : null;
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

  private sameWord = (index: number) => ({value}: AbstractControl) => {
      return value !== this.testWords[index].word ? {'sameWord': value} : null;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: HdwalletService
  ) {}

  ngOnInit() {
    this.randomMnemonic();
    this.testWordsForm = this.fb.group({
      0: ['', [Validators.required, this.sameWord(0)]],
      1: ['', [Validators.required, this.sameWord(1)]],
      2: ['', [Validators.required, this.sameWord(2)]],
    });
    this.passwordForm = this.fb.group({
      pwd: ['', Validators.required],
      confirm: ['', Validators.required]
    }, { validators: samePassword });
  }

  /** Generate a random Mnemonic with the right entropy */
  public randomMnemonic() {
    this.wallet = Wallet.createRandom();
    this.mnemonic = this.wallet.mnemonic.split(' ');
    this.createTestWords(3);
  }

  /** Create a test for the mnemonic */
  public createTestWords(amount: number) {
    const mnemonic = [...this.mnemonic];
    this.testWords = Array(amount)
      .fill('')
      .map(_ => {
        const rand = Math.floor(Math.random() * mnemonic.length);
        const word = mnemonic.splice(rand)[0];
        const index = this.mnemonic.indexOf(word);
        return { word, index };
      })
      .sort((a, b) => a.index - b.index);
  }

  /** Check password and confirm are the same */
  public async createWallet() {
    if (this.passwordForm.valid) {
      const pwd = this.passwordForm.get('pwd').value;
      await this.encryptPrivatekey(pwd);
      await this.service.login(pwd);
      this.router.navigate(['display']);
    }
  }

  /** Get a private key and encrypt it with a password */
  private async encryptPrivatekey(password: string) {
    const keystore = await this.wallet.encrypt(password);
    localStorage.setItem('keystore', keystore);
  }
}
