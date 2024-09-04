export class UserLogin {
    constructor(
      public email: string,
      public password: string,
      public contact_no?: string,
      public rememberMe: boolean = false
    ) {}
}
  