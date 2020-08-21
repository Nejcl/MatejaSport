import { Injectable } from '@angular/core';
import {IUser} from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  private _user:IUser[] = [];
 
  addItem(user: IUser) {
      this._user.push(user);
  }

  getItems(): IUser[] {
      return this._user;
  }
}
