export class UserSignup {
    constructor(
      public name: string,
      public email: string,
      public contact_no: string,
      public password: string,
      public confirmPassword: string,
      public _id?:string,
      public dateofcreation?:string,
    ) {}
}
  