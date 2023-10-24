import { Component, OnInit, AfterViewInit, Renderer2, ViewChildren, QueryList,ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-novice',
  templateUrl: './novice.component.html',
  styleUrls: ['./novice.component.css'],
})
export class NoviceComponent implements OnInit, AfterViewInit {

  Novica: Array<{id: string, position: Number, naslovna: string, naslov: string, vsebina: string}>;
  id: string | number
  sub: any;

  constructor(private dbService: DatabaseService,
              private route: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log('ID:', this.id);
    });
    this.dbService.readNovice().subscribe(
      (data) => {
        this.Novica = data;
        this.Novica = this.Novica.sort((a, b) =>  {
          if (a.position > b.position) {
              return 1;
          }
      
          if (a.position < b.position) {
              return -1;
          }
      
          return 0;
      });
       }
    );
    this.scrollToTop();
  }

  ngAfterViewInit(){
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  private scrollToTop() {
    if (window) {
      // Use Renderer2 to avoid direct manipulation of the DOM
      this.renderer.setProperty(window, 'scrollTo', { top: 0, behavior: 'smooth' });
    }
  }
  scroll() {

  }

}
