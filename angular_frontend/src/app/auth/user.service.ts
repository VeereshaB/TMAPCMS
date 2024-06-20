import { Injectable, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { IAccount } from '../shared/model/account.model';
import { Observable, identity, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVICE_API_URL } from '../shared/util/app.constants';
import { LoginRequest } from '../shared/model/login-request.model';
// import { MyProfile } from '../myprofile/model/my-profile.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";
import { createRequestOption } from '../shared/util/request-util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userIdentity: any;

  private securityToken: any;
  
  public profileName: BehaviorSubject<any> = new BehaviorSubject(null);

  authenticationsuccesshandler = new Subject<any>();

  selectedChildren = new BehaviorSubject(0);

  constructor(private http: HttpClient,  private router: Router) { }

  login(userName: string, password: string): Observable<any> {
    const loginRequest = new LoginRequest(userName, password);
    return this.http.post(SERVICE_API_URL + 'api/account/authenticate', loginRequest);
  }

  getUser(): Promise<IAccount> {
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }
    return this.fetch().toPromise().then(response => {
      const account: IAccount = response.body;
      if (account) {
        this.userIdentity = account;
        this.setProfile(account);
      } else {
        this.userIdentity = undefined;
      }
      return this.userIdentity;
    }).catch(err => {
      this.userIdentity = undefined;
      return this.userIdentity;
    });
  }

  setProfile(value) {
    if (value) {
      this.profileName.next(value);
    } else {
      this.profileName.next(null);
    }
  }  

  setIdentity(identity) {
    if (identity === null) {
      localStorage.clear();
      this.userIdentity = undefined;
    } else {
      this.securityToken = identity;
      localStorage.setItem('Bearer access_token', this.securityToken.accessToken);
      localStorage.setItem('refreshToken', this.securityToken.refreshToken);
      localStorage.setItem('expiredInMs', this.securityToken.expiredInMs);
      
    }
  }

  fetch(): Observable<HttpResponse<IAccount>> {
    return this.http.get<IAccount>(SERVICE_API_URL + 'api/account/user', { observe: 'response' });
  }

  validateUserName(userId: number, userName: string): Observable<HttpResponse<IAccount>> {
    return this.http.get<IAccount>(SERVICE_API_URL + 'api/account/user/'+userId+'/validate/'+userName, { observe: 'response' });
  }

//   updateMyProfile(myProfile?: MyProfile): Observable<any> {
//     return this.http.put(SERVICE_API_URL + "api/my-profile", myProfile);
//   }

  updateMyProfile2(file: FormData, req?: any): Observable<any> {
    return this.http.post(SERVICE_API_URL + 'api/my-profile/updateUserProfile2', file, { 
      reportProgress: true, params: createRequestOption(req), observe: 'response' });
  }



//   fetchMyProfile(): Observable<HttpResponse<MyProfile>> {
//     return this.http.get<MyProfile>(SERVICE_API_URL + "api/my-profile", { observe: 'response' });
//   }

  forgotPassword(data){
    return this.http.post(SERVICE_API_URL + 'api/registration/forgot-password', data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('Bearer access_token');
  }

  onAuthenticationSuccess(){
    this.authenticationsuccesshandler.next(this.userIdentity);
  }

  logout() {
    let prefix = localStorage.getItem('prefix');
    localStorage.removeItem('prefix');
    console.log('prefix'+prefix);
    localStorage.clear(); 
    
    this.setIdentity(null);
    if(prefix != undefined){
      this.router.navigate(["login/"+prefix]);
    }else{
      this.router.navigate(["login"]);
    }
  }

}
