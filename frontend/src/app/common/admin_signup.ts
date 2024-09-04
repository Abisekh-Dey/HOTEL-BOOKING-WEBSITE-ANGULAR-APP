export class AdminSignup {
  constructor(
    public name: string,
    public email: string,
    public contact_no: string,
    public password: string,
    public confirmPassword: string,
    public authentication_password: string,
    public _id?:string,
    public dateofcreation?:string,
){}
}