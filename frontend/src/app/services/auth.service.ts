import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {LoginRequest} from '../models/requests/login-request';
import {SignupRequest} from '../models/requests/signup-request';
import {StorageService} from './storage.service';
import {CipherService} from './cipher.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;

  constructor(private http: HttpClient, private storageService: StorageService, private cipher: CipherService) {
    const localUser = storageService.getItem('user');
    this.user = localUser ? JSON.parse(localUser) : null;
    this.token = storageService.getItem('token');
  }

  /**
   * Login call to API
   * @param request Login request object
   */
  public login(request: LoginRequest): Promise<{ token: string, user: User }> {
    // Clean fields before send
    request.email = request.email.trim().toLowerCase();
    // Encrypt password before send
    request.password = this.cipher.encrypt(request.password, environment.appKey);
    return this.http.post(`${environment.baseUrl}login`, request).toPromise()
      .then((response: any) => {
        const {user, token} = response;
        //  Save token
        this.storageService.setItem('token', token);
        this.token = token;
        //  Save User
        this.storageService.setItem('user', JSON.stringify(user));
        this.user = user;

        return {user, token};
      });
  }

  /**
   * Logout
   */
  public logout(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.storageService.removeItem('token');
        this.storageService.removeItem('user');
        resolve();
      }, 1000);
    });
  }

  /**
   * Signup call to API
   * @param request Sign request object
   */
  public signup(request: SignupRequest): Promise<any> {
    // Encrypt password before send
    request.password = this.cipher.encrypt(request.password, environment.appKey);
    return this.http.post(`${environment.baseUrl}signup`, request).toPromise();
  }

  /**
   * Defines if the user is logged in
   */
  public isLoggedIn(): boolean {
    return Boolean(this.user && this.token);
  }
}
