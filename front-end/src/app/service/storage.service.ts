import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  /**
   * SetCurrentSession method
   * Assign the current session.
   * 
   * @param session {Session} 
   */
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  /**
   * LoadSessionData method
   * 
   * Return the session from JSON
   * @return {Session}
   */
  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  /**
   * GetCurrentSession method.
   * 
   * @return {Session}.
   */
  getCurrentSession(): Session {
    return this.currentSession;
  }

  /**
   * removeCurrentSession method.
   * 
   * Remove the session (JSON) from the localStorageService and the Session object.
   */
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  /**
   * getCurrentTokenType method.
   * 
   * Returns the type of token.
   * @return {string}
   */
  getCurrentTokenType(): string {
    var session: Session = this.getCurrentSession();
    return (session && session.tokenType) ? session.tokenType : null;
  };

  /**
   * setCurrentRol method.
   * 
   * Assign the role of a session and can have the following values:
   * rol=1 Manager
   * rol=2 Admin
   * rol=3 Colaborator
   * 
   * @param rol {number} type of sesion
   */
  setCurrentRol(rol: string){
    var session: Session = this.getCurrentSession();
    session.rol = rol;
  }

  /**
   * getCurrentRol method.
   * 
   * Get the role of the current session.
   * @return {number}
   */
  getCurrentRol(): string{
    var session: Session = this.getCurrentSession();
    return session.rol;
  }

  /**
   *  isAuthenticated method.
   * 
   * Verifica si la sesión está autorizada.
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  /**
   * method getCurrentToken
   * 
   * Returns the current session.
   * 
   * @return {string}
   */
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.accessToken) ? session.accessToken : null;
  };

  /**
   * getCurrentId method 
   * 
   * Get the id of the user whose session is started
   * @return {number} 
   */
  getCurrentId(){
    return this.getCurrentSession().id;
  }

  /**
   * logout method 
   * 
   * Delete the session and redirect to / login
   */
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
