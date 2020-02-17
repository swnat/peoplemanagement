import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * Manejo de la Sesión 
   * @param storageService Mantiene la sesión almacenada para que sea persistente
   * @param authenticationService Para hacer el logout
   */
  rol_name: String;
  user: User = new User();
  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

    toggled = false;

  ngOnInit() {
  

    this.userService.getUser(this.storageService.getCurrentId()).subscribe(
      data => {
        this.user = data;
        
        console.log('Candidate data',data);
        if (data.rol== 'user1') {
          this.rol_name = 'Manager';
        } else if (data.rol == 'user2') {
          this.rol_name = 'Admin';
        } else {
          this.rol_name = 'Colaborator';
        }  
      });
  }

  public logout(): void {
    this.storageService.logout(); 
  } 

  toggle() {
    this.toggled = !this.toggled;
  }

}

