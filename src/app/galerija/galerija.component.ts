import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent implements OnInit, AfterViewInit {



  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor() { }

  ngOnInit() {



    this.galleryOptions = [
      {
        imageSize: NgxGalleryImageSize.Contain,
        height: '80vh',
        width: '100%',
        imagePercent: 100,
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
        imageSwipe: true,
        previewSwipe: true,
        thumbnailsSwipe: true,

      },

  ];

    this.galleryImages = [
      {
          small: '/assets/gallery/g1(1).jpg',
          medium: '/assets/gallery/g1.jpg',
          big: '/assets/gallery/g1.jpg'
      },
      {
          small: '/assets/gallery/g2(1).jpg',
          medium: '/assets/gallery/g2.jpg',
          big: '/assets/gallery/g2.jpg'
      },
      {
          small: '/assets/gallery/g3(1).jpg',
          medium: '/assets/gallery/g3.jpg',
          big: '/assets/gallery/g3.jpg'
      },
      {
        small: '/assets/gallery/g4(1).jpg',
        medium: '/assets/gallery/g4.jpg',
        big: '/assets/gallery/g4.jpg'
    },
    {
      small: '/assets/gallery/g5(1).jpg',
      medium: '/assets/gallery/g5.jpg',
      big: '/assets/gallery/g5.jpg'
  },
  {
    small: '/assets/gallery/g6(1).jpg',
    medium: '/assets/gallery/g6.jpg',
    big: '/assets/gallery/g6.jpg'
},
{
  small: '/assets/gallery/g7(1).jpg',
  medium: '/assets/gallery/g7.jpg',
  big: '/assets/gallery/g7.jpg'
},
{
  small: '/assets/gallery/g8(1).jpg',
  medium: '/assets/gallery/g8.jpg',
  big: '/assets/gallery/g8.jpg'
}
  ];

}

ngAfterViewInit()
{
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
}

}
