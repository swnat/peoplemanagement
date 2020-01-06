import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { JwtService } from '../service/jwt.service';
import { StorageService } from '../service/storage.service';
import { LoginObject } from '../models/login';
import { Session } from '../models/session';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
/**
 * Constructor with the following public attributes of the component
 * 
 * @param formBuilder attribute used to facilitate the creation of form group
 * @param authenticationService service used in the component to make the call to the backend
 * @param storageService service used to store session related data
 * @param router attribute used to redirect once logged
 */
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router,
              private jwt: JwtService) { }


  /**
  * boolean attributes, to hide characters in the password form
  */
    hide:boolean= true;

  /**
   * The form is initialized with empty values by default
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
   
  }

  /**
   * Method to make the call to the server through the authentication service
   */
  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error;
        }
      )
    }
  }

  /**
   * Method used in the case that the credentials sent are valid
   * @param {Session} data attribute representing server response
   */
  private correctLogin(data: Session){
    let token = this.jwt.decode(data.accessToken);

    data.id = token.sub;
    data.rol = token.scopes;
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/candidate']);
  }
  get f() { return this.loginForm.controls; }
}
