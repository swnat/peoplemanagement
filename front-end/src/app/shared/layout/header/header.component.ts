import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  toggled = false; // sidebar attribute
  isCardOpen = false; // user card attribute

  constructor() {  }

  ngOnInit() { }

  // this function performs the closing of the user's card
  toggleUserClose(e: Event) {
    this.isCardOpen = false;
  }

  // this function performs the opening of the user's card
  toggleUserOpen() {
    this.isCardOpen = !this.isCardOpen;
  }

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
}

