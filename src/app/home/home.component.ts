import { Component, OnInit, AfterViewInit} from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public showOverlay = true;

  Novica: Array<{id: string, position: Number, naslovna: string, naslov: string, vsebina: string}>;

  constructor(private dbService: DatabaseService) { }

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

  ngAfterViewInit()
  {
    setTimeout(() => {
      this.showOverlay = false;
      },0);

      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
  }

}


