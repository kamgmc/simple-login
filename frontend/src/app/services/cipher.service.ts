import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CipherService {
  encrypt(message: string, key: string): string {
    if (message === null) {
      return null;
    }
    const cipherKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key.trim()));
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), cipherKey, {
      keySize: 16,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  }

  decrypt(message: string, key: string): string {
    if (message === null) {
      return null;
    }
    const cipherKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key.trim()));
    return CryptoJS.AES.decrypt(message, cipherKey, {
      keySize: 16,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }
}
