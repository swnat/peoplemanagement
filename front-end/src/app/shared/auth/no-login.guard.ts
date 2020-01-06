import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  
  constructor(private router: Router,
    private storageService: StorageService) { }

    /**
     * Autoriza el acceso a rutas específicas.
     * @param next {ActivatedRouteSnapshot} 
     * @param state {RouterStateSnapshot} 
     */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.storageService.isAuthenticated()){
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}
