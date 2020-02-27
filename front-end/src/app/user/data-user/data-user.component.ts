import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {
  dataUserForm: FormGroup;
  submitted = false;
  userId: Number;
  user: User;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataUserForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'),
       Validators.maxLength(100), Validators.required]), // only letters
      email: new FormControl(''),
      lastname: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'),
       Validators.maxLength(100), Validators.required]), // only letters
      phoneNumber: new FormControl(''),
      rol: new FormControl('user1')
    });

    this.route.paramMap.subscribe(pmap => {
      if (pmap.get('id')) {
        // tslint:disable-next-line: no-construct
        this.userId = new Number(pmap.get('id'));
        this.userService.getUser(this.userId.valueOf()).subscribe(data => {
          this.user = data;
          this.initializeForm();
        }, error => {
          console.log('Error to get data of the candidate', error);
          this.notificationService.showError('Occur an error when get data of the candidate', 'Error get Candidate');
        });
      }
    });
  }

  get f() { return this.dataUserForm.controls; }

  private initializeForm(): void {
    if (this.user && this.user.idUser) {
      this.dataUserForm.patchValue({
        id: this.user.idUser,
        name: this.user.name,
        email: this.user.email,
        lastname: this.user.lastname,
        phoneNumber: this.user.phoneNumber,
        rol: this.user.rol
      });
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.dataUserForm.invalid) {
      return;
    } else {
      if (this.userId) {
        this.userService.editUser(this.dataUserForm.value).subscribe(data => {
          this.user = data;
          this.notificationService.showSuccess(this.user.name, 'User modified succesfully.');
        }, error => {
          console.log('Error to edit the candidate', error);
          this.notificationService.showError('Occur an error when edit data of the candidate', 'Error edit Candidate');
        });

      } else {
        this.userService.addUser(this.dataUserForm.value).subscribe(data => {
          this.user = data;
          this.notificationService.showSuccess(this.user.name, 'User created succesfully.');
        }, error => {
          console.log('Error to edit the candidate', error);
          this.notificationService.showError('Occur an error when create data of the candidate', 'Error create Candidate');
        });
      }
    }
  }
}
