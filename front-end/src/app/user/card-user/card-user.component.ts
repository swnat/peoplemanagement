import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StorageService } from 'src/app/service/storage.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';


@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {
   /**
   * session management
   * @param storageService It keeps the session stored so that it is persistent
   * @param AuthenticationService to logout
   */

  // Profile User attribute
  userProfile: User = {
    name: '',
    lastname: '',
    email: '',
    active: true,
    rol: '',
    phoneNumber: '',
    idUser: 0,
};
  rol_name: String; // attribute to save the user's role

  rol_name_profile: String; // attribute card user profile
  user: User = new User();
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private userServiceProfile: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // get rol user
    this.route.paramMap.subscribe(pmap => this.getUser(pmap.get('id')));

    this.userService.getUser(this.storageService.getCurrentId()).subscribe(
      data => {
        this.user = data;

        if (data.rol === 'user1') {
          this.rol_name = 'Manager';
        } else if (data.rol === 'user2') {
          this.rol_name = 'Admin';
        } else {
          this.rol_name = 'Colaborator';
        }
      });
  }

  // get profile user
  private getUser(id: string): void {
    if (!id) {
      this.userProfile = {
        idUser: 0,
        name: '',
        email: '',
        lastname: '',
        active: false,
        phoneNumber: '',
        rol: ''
      } as User;
      this.rol_name_profile = '';
      return;
    }

    this.userServiceProfile.getUser(Number(id).valueOf()).subscribe((data: User) => {
      this.userProfile = data;
      this.rol_name_profile = this.userRole(data.rol);
    }, error => {
      console.log('Error to get data of the user', error);
      this.notificationService.showError('Occur an error when get data of the user', 'Error get User');
    });
  }

  public userRole(rol: String): String {
    if (rol === 'user1') {
      return 'Manager';
    } else if (rol === 'user2') {
      return 'Admin';
    }
    return 'Colaborator';
  }

  // function logout
  public logout(): void {
    this.storageService.logout();
  }

}
