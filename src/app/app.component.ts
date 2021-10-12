import { Component } from '@angular/core';
import { Signature } from '@elrondnetwork/erdjs/out/signature';
const ERDJS = require('../assets/erdjs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'erdjs-angular';

  async login() {
    let provider = ERDJS.ExtensionProvider.getInstance();
    await provider.init();
    let account = await provider.login();
    let message = new ERDJS.SignableMessage({
      message: Buffer.from('TestMe', 'utf8'),
      address: new ERDJS.Address(account)
    });

    let signed = await provider.signMessage(message);
    console.log('signed message:', signed);
    let verifier = ERDJS.UserVerifier.fromAddress(new ERDJS.Address(account));
    console.log('is signature valid: ', verifier.verify(signed));
  }
}
