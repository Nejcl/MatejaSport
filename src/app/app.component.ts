import { Component, ViewChild,ViewEncapsulation, OnInit, AfterViewInit, } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError,NavigationCancel, Event as RouterEvent, } from '@angular/router';
import {MatDialog} from "@angular/material";
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { element } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  implements OnInit, AfterViewInit {
  @ViewChild('storitveTrigger', {static: false}) storitveTrigger: MatMenuTrigger;
  @ViewChild('onasTrigger', {static: false}) onasTrigger: MatMenuTrigger;

  public showOverlay = true;

  onStoritve: boolean;
  onStoritveMenu: boolean;
  onOnas: boolean;
  onOnasMenu: boolean;
  openOnas: boolean;
  openStoritve: boolean;
  oNasActive: boolean;
  storitveActive: boolean;

  grayBG: boolean;

  constructor(
      public router: Router,
      public route: ActivatedRoute,
      public dialog: MatDialog,
  ) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {



        if( window.location.href.indexOf('home') >= 0 )
        {
          this.grayBG = true;
        }
        else{
          this.grayBG = false;
        }

        this.oNasActive = false;
        this.storitveActive = false;

        if( window.location.href.indexOf('kjesmo') >= 0 ||
        window.location.href.indexOf('instruktorji') >= 0){
        this.oNasActive = true;
        this.storitveActive = false;
      }
      if( window.location.href.indexOf('skupinskevadbe') >= 0 ||
          window.location.href.indexOf('sestavatreninga') >= 0 ||
          window.location.href.indexOf('rojstnodnevne') >= 0 ||
          window.location.href.indexOf('rehabilitacija') >= 0 ||
          window.location.href.indexOf('masaze') >= 0 ||
          window.location.href.indexOf('individualnavadba') >= 0){
          this.oNasActive = false;
          this.storitveActive = true;
       }

      }



  });

  }

  onActivate(event) {
    window.scroll(0,0);
    document.body.scrollTop = 0;
    document.querySelector('body').scrollTo(0,0);

}

ngAfterViewInit() {
  // Hack: Scrolls to top of Page after page view initialized
  let top = document.getElementById('top');
  if (top !== null) {
    top.scrollIntoView();
    top = null;
  }
}

// Shows and hides the loading spinner during RouterEvent changes
navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    this.showOverlay = true;
  }
  if (event instanceof NavigationEnd) {
    this.showOverlay = false;

  }

  // Set loading state to false in both of the below events to hide the spinner in case a request fails
  if (event instanceof NavigationCancel) {
    this.showOverlay = false;
  }
  if (event instanceof NavigationError) {
    this.showOverlay = false;
  }
}



  handleClick(){
    setTimeout(() => {
      this.onStoritve = true;
      this.storitveTrigger.openMenu();
      },300);

  }

  handleClick2(){
    setTimeout(() => {
      this.onOnas = true;
      this.onasTrigger.openMenu();
      },300);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
    });
  }

  oNasMobile(){
    this.openOnas = this.openOnas ? false : true;
  }

  storitveMobile(){
    this.openStoritve = this.openStoritve ? false : true;

  }

  OnChanges(){

  }

  ngOnInit() {

    if( window.location.href.indexOf('kjesmo') >= 0 ||
      window.location.href.indexOf('instruktorji') >= 0){
      this.oNasActive = true;
    }
    if( window.location.href.indexOf('skupinskevadbe') >= 0 ||
        window.location.href.indexOf('sestavatreninga') >= 0 ||
        window.location.href.indexOf('rojstnodnevne') >= 0 ||
        window.location.href.indexOf('rehabilitacija') >= 0 ||
        window.location.href.indexOf('masaze') >= 0 ||
        window.location.href.indexOf('individualnavadba') >= 0){
    this.storitveActive = true;
     }


    }



  handleOpen(){
    this.onStoritve = true;
    this.storitveTrigger.openMenu();

  }


  handleOpen2(){
    this.onStoritveMenu = true;
  }

  handleClose(){
    setTimeout(() => {
    this.onStoritve = false;
   if(!this.onStoritve && !this.onStoritveMenu){this.storitveTrigger.closeMenu();}
    },100);
  }
  handleClose2(){
    setTimeout(() => {
    this.onStoritveMenu =  false;
    if(!this.onStoritve && !this.onStoritveMenu){this.storitveTrigger.closeMenu();}
    },100);
  }

  handleOpenO(){
    this.onOnas = true;
    this.onasTrigger.openMenu();

  }

  handleOpenO2(){
    this.onOnasMenu = true;
  }

  handleCloseO(){
    setTimeout(() => {
    this.onOnas = false;
   if(!this.onOnas && !this.onOnasMenu){this.onasTrigger.closeMenu();}
    },100);
  }
  handleCloseO2(){
    setTimeout(() => {
    this.onOnasMenu =  false;
    if(!this.onOnas && !this.onOnasMenu){this.onasTrigger.closeMenu();}
    },100);
  }



}

