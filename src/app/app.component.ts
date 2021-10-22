import { Component } from '@angular/core';
import { SignableMessage } from '@elrondnetwork/erdjs/out';
import { Signature } from '@elrondnetwork/erdjs/out/signature';
const ERDJS = require('../assets/erdjs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'erdjs-angular';
  someRandomTokenToBeSigned = '094ur9414ripowefirweuoriwe';
  async login() {
    let provider = ERDJS.ExtensionProvider.getInstance();
    await provider.init();
    await provider.login({
      callbackUrl: '',
      token: this.someRandomTokenToBeSigned
    });
    const { signature, address } = provider.account;

    let toBeValidated = new ERDJS.SignableMessage({
      message: Buffer.from(`${address}${this.someRandomTokenToBeSigned}{}`),
      address: new ERDJS.Address(address),
      signature: new Signature(signature)
    });

    let verifier = ERDJS.UserVerifier.fromAddress(new ERDJS.Address(address));
    console.log('is signature valid: ', verifier.verify(toBeValidated));
  }
}
