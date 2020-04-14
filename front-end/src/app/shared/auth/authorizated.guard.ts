import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
    private storageService: StorageService) { }

/**
 *It allows access to the Scrum Master and the Administrator to certain routes.
 */
canActivate() {

  // logged in then returns true
  if (this.storageService.isAuthenticated() ) {
    return true;
  } else if (!this.storageService.isAuthenticated()) {
    this.router.navigate(['/login']);
    return false;
  }
}

/**
 * It allows access to the Scrum Master and the Administrator to certain daughter routes.
 */
canActivateChild() {
  // Logged in and is an administrator or scrum master then returns true
  console.log('Esta autenticado: ', this.storageService.isAuthenticated());
  console.log('Su rol es: ', this.storageService.getCurrentRol());
  if (this.storageService.isAuthenticated() && (this.storageService.getCurrentRol() === 'user1')) {
    console.log('login Manager');
    return true;
  } else {
    console.log('login');
      this.router.navigate(['/construction']);
      return false;
  }
}
}
