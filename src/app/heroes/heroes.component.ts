import { Component, OnInit } from '@angular/core';

import { HeroService } from './../hero.service';
import { Hero } from './../hero';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];

  selectHero(hero: Hero){
    this.selectedHero = hero;
    console.log(this.selectedHero.name);
  }

  

  constructor(private _heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();    
  }

  getHeroes(): void {
    this._heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
