import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HEROS } from './mock-heroes';
import { Hero } from './hero';

import { IHero } from './IHero';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  private _url: string = '/api/heroes';
  private httpOpts = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getHeroes(): Observable<IHero[]> {
    console.log('getHeroes()');
    this.messageService.add('HeroService: fetched heroes')
    return this.http.get<IHero[]>(this._url)
      .pipe(
        tap(heroes => this.log(`fetched ${JSON.stringify(heroes)}`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  getHero(id: number): Observable<IHero> {
    const url: string = `${this._url}/${id}`
    return this.http.get<IHero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<IHero>(`getHero id = ${id}`))
    )


  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this._url, hero, this.httpOpts).pipe(
      tap(_ => this.log(`updated: ${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<IHero> {
    console.log('add hero')
    return this.http.post<Hero>(this._url, hero, this.httpOpts).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );

  }

  deleteHero(hero: Hero | number): Observable<IHero> {
    const id = typeof hero == 'number' ? hero : hero.id;
    const url = `${this._url}/${id}`;

    return this.http.delete<IHero>(url).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    )

  }

  private log(message: string) {
    this.messageService.add('Hero service: ' + message);
  }

}
