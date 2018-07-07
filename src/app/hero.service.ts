import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient } from '@angular/common/http'
import { HEROS } from './mock-heroes';
import { Hero } from './hero';

import { IHero } from './IHero';



@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private _url: string = '../assets/mock-heroes.json';
  getHeroes(): Observable<IHero[]> {
    console.log('getHeroes()');
    this.messageService.add('HeroService: fetched heroes')
    return this.http.get<IHero[]>(this._url);
  }
  constructor(private http: HttpClient, private messageService: MessagesService) { }
}
