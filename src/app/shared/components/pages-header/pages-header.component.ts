import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pages-header',
  templateUrl: './pages-header.component.html',
  styleUrls: ['./pages-header.component.css']
})
export class PagesHeaderComponent implements OnInit {
  @Input('page-title') pageTitle: string;
  @Input('show-button') showButton: boolean;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;


  constructor() { }

  ngOnInit(): void {
  }

}
