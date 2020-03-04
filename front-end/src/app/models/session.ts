/*Stores the token and the role of the current session.*/
export class Session {
    constructor(public accessToken: string, public tokenType: string, public id: number, public rol: string) {}
}
