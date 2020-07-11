import { environment } from './../../../environments/environment';
import { CharacterI } from './../interface/character.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http:HttpClient) { }

  searchCharacters(query = '', page = 1){
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.http.get<CharacterI[]>(filter);
  }
  getDetails(id: number){
    return this.http.get<CharacterI>(`${environment.baseUrlAPI}/${id}`)
  }
}
