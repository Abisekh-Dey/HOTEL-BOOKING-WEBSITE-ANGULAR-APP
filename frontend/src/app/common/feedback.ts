export class Feedback {
    constructor(
      public name: string,
      public email: string,
      public subject: string,
      public message: string,
      public dateofmessage?:string,
      public _id?:string
  ){}
  }