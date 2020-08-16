import { Component, OnInit, AfterViewInit, Input, ViewChildren, QueryList,ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-novice',
  templateUrl: './novice.component.html',
  styleUrls: ['./novice.component.css'],
})
export class NoviceComponent implements OnInit, AfterViewInit {

  Novica: Array<{id: string, position: Number, naslovna: string, naslov: string, vsebina: string}>;
  sub: any;

  constructor(private dbService: DatabaseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

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
  }

  ngAfterViewInit(){
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  scroll() {

  }

}
