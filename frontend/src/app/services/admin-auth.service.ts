import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private isLoggedIn = false;
  private adminName: string = '';
  private aid:string | null = '';
  private email:string | null = '';
  private contact_no:string | null = '';

  constructor() {}

  login(adminName: string,aid: string,email:string,contact_no:string): void {
    this.isLoggedIn = true;
    this.adminName = adminName;
    this.aid = aid;
    this.email = email;
    this.contact_no = contact_no;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.adminName = "";
    this.aid = null; 
    this.contact_no = null;
    this.email = null;
  }

  getLoginState(): boolean {
    return this.isLoggedIn;
  }

  getAdminName(): string {
    return this.adminName;
  }

  getAdminId(): string | null {
    // console.log(this.aid);
    return this.aid;
  }
  getAdminEmail(): string | null {
    // console.log(this.aid);
    return this.email;
  }
  getAdminContact(): string | null {
    // console.log(this.aid);
    return this.contact_no;
  }
}