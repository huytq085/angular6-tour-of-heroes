import { Component, OnInit } from '@angular/core';

import { HeroService } from './../hero.service';
import { Hero } from './../hero';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];


  constructor(private _heroService: HeroService) { }

  add(name: string): void {
    name.trim();
    if (!name) { return; }
    this._heroService.addHero({ name } as Hero).subscribe(data => this.heroes.push(data));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h != hero);
    this._heroService.deleteHero(hero).subscribe();
  }
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this._heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
