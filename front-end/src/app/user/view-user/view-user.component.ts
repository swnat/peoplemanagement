import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: User = {
    name: '',
    lastname: '',
    email: '',
    active: true,
    rol: '',
    phoneNumber: '',
    idUser: 0,
};
  rol_name: String;

  constructor(private userService: UserService,
    private notificationService: NotificationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pmap => this.getUser(pmap.get('id')));
  }

  private getUser(id: string): void {
    if (!id) {
      this.user = {
        idUser: 0,
        name: '',
        email: '',
        lastname: '',
        active: false,
        phoneNumber: '',
        rol: ''
      } as User;
      this.rol_name = '';
      return;
    }

    this.userService.getUser(Number(id).valueOf()).subscribe((data: User) => {
      this.user = data;
      this.rol_name = this.userRole(data.rol);
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
}
