import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  toggled = false;
  show = false; // user card attribute

  ngOnInit() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  /* Add function to the sidebar menu items to automatically
  hide when clicking on a screen smaller than 450px*/
  sidebar_hide() {
    if (screen.width <= 450) {
      this.toggle();
    }
  }

  // this function performs the opening of the user's card
  toggleUser() {
   this.show = !this.show;
  }
}

