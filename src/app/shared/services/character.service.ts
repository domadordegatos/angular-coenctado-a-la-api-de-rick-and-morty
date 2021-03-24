import { TrackHttpError } from './../models/trackHttpError';
import { environment } from './../../../environments/environment';
import { CharacterI } from './../interface/character.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http:HttpClient) { }

  searchCharacters(query = '', page = 1){
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.http.get<CharacterI[]>(filter)
    .pipe(catchError((err)=> this.handleHttpError(err)));
  }
  getDetails(id: number){
    return this.http.get<CharacterI>(`${environment.baseUrlAPI}/${id}`)
    .pipe(catchError((err)=> this.handleHttpError(err)));
  }
  private handleHttpError(
    error:HttpErrorResponse
  ):Observable<TrackHttpError> {
    let dataError = new TrackHttpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'a ocurrio un error con la data';
    return throwError(dataError);
  }
}
