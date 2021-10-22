import { Component } from '@angular/core';
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import { Signature } from '@elrondnetwork/erdjs/out/signature';
const ERDJS = require('../assets/erdjs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'erdjs-angular';
  accountAddress =
    'erd1rvzyd3ex5ljll22jmvw8kpugv032fndemv69pg8p5qm42d009n6sr7mytc';

  async login() {
    let provider = ERDJS.ExtensionProvider.getInstance().setAddress(
      this.accountAddress
    );
    await provider.init();
    let message = new ERDJS.SignableMessage({
      message: Buffer.from('TestMe', 'utf8'),
      address: new ERDJS.Address(this.accountAddress)
    });

    let signed = await provider.signMessage(message);
    console.log('signed message:', signed);
    let verifier = ERDJS.UserVerifier.fromAddress(
      new ERDJS.Address(this.accountAddress)
    );
    console.log('is signature valid: ', verifier.verify(signed));
  }
}
