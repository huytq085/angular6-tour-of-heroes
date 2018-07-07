import { Hero } from './../hero';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {

  @Input() hero: Hero;
  constructor() { }

  ngOnInit() {
  }

}
