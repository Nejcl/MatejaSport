import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //baseUrl = 'http://localhost:4200/php';
  baseUrl = 'http://127.0.0.1:80/php'
  //baseUrl = 'http://www.matejasport.si/php';
  data: any;

  constructor(private http: HttpClient) { }

  checkPW(InData: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/checkpw.php`, InData);
  }

  checkUserandPassword(InData: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/checkUserandPassword.php`,InData); 
  }

  readUrnik(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/getdata.php`);
  }

  deleteUrnik(id: string): Observable<any>{
    const params = new HttpParams()
    .set('id', id);

    return this.http.delete<any>(`${this.baseUrl}/deletedata.php`, {params: params});
  }

  addUrnik(InData: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/adddata.php`, InData);
  }

  reloadUrnik(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/reloaddata.php`);
  }

  pushUrnik(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/pushdata.php`);
  }

  CopyUrnikEntry(InData: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/copydata.php`, InData);
  }

  EditUrnikEntry(InData: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/editdata.php`, InData);
  }



  readNovice(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/getnovice2.php`);
  }

  deleteNovica(id: string): Observable<any>{
    const params = new HttpParams()
    .set('id', id);

    return this.http.delete<any>(`${this.baseUrl}/deletenovice2.php`, {params: params});
  }

  addNovica(InData: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addnovice2.php`, InData);
  }

  reloadNovica(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/reloadnovice2.php`);
  }

  pushNovica(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/pushnovice2.php`);
  }

  editNovica(InData: any): Observable<any[]>{
    return this.http.post<any>(`${this.baseUrl}/editnovice2.php`, InData);
  }

}
