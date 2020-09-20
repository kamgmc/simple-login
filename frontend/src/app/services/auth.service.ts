import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {LoginRequest} from '../models/requests/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;

  constructor(private http: HttpClient) {
    const localUser = localStorage.getItem('user');
    this.user = localUser ? JSON.parse(localUser) : null;
    this.token = localStorage.getItem('token');
  }

  /**
   * Login call to API
   * @param request Login request object
   */
  public login(request: LoginRequest): Promise<{ token: string, user: User }> {
    return this.http.post(`${environment.baseUrl}login`, request).toPromise()
      .then((response: any) => {
        const {user, token} = response;
        //  Save token
        localStorage.setItem('token', token);
        this.token = token;
        //  Save User
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;

        return {user, token};
      });
  }

  /**
   * Defines if the user is logged in
   */
  public isLoggedIn(): boolean {
    return Boolean(this.user && this.token);
  }
}
