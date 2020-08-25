import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { IUser } from '../../entities/user';


@Component({
  selector: 'app-aktivacija-uporabnikov',
  templateUrl: './aktivacija-uporabnikov.component.html',
  styleUrls: ['./aktivacija-uporabnikov.component.css']
})
export class AktivacijaUporabnikovComponent implements OnInit {
 noviUporabniki: Array<IUser>;
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
  }

  prikaziNoveUporabnike() {
    this.dbService.getNewUsers().subscribe(
      (data) => {
        this.noviUporabniki = data;
        console.log(this.noviUporabniki);
        console.log(data);
       }
    );
  }

}
