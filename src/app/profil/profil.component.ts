import { Component, OnInit } from '@angular/core';
import { ShareDataService} from '../share-data.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor( private shareService:ShareDataService) { }

  ngOnInit() {
  }

  public printItems(){
    console.log('items in warehouse:');
    console.log(this.shareService.getItems());
 }

}
