export class LoginObject {

    email: string;
    password: string;
    constructor(object: any) {
        this.email = object.email;
        this.password = object.password;
    }
}
