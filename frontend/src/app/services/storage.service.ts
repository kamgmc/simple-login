import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {CipherService} from './cipher.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cipher: CipherService) {
  }

  setItem(key: string, value: string): void {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(this.cipher.encrypt(key, environment.appKey),
        this.cipher.encrypt(value, environment.localKey));
    }
  }

  getItem(key: string): string {
    if (typeof (Storage) !== 'undefined') {
      return this.cipher.decrypt(
        localStorage.getItem(this.cipher.encrypt(key, environment.appKey)),
        environment.localKey);
    }
  }

  removeItem(key: string): void {
    if (typeof (Storage) !== 'undefined') {
      localStorage.removeItem(this.cipher.encrypt(key, environment.appKey));
    }
  }
}
