import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { HEROS } from './mock-heroes';
import { Hero } from './hero';

import { IHero } from './IHero';
import { map } from 'rxjs/operators';




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
  getHero(id: number): Observable<IHero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.getHeroes().pipe(
      map(heroes => heroes.find(hero => hero.id == id))
    );

  }
  constructor(private http: HttpClient, private messageService: MessagesService) { }
}
