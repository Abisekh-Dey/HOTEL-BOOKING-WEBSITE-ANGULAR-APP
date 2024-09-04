import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {
  private destination: string = '';
  private checkInDate: string = '';
  private checkOutDate: string = '';
  private rooms: number = 0;
  private guests: number = 0;
  private pricePerNight: number = 0;

  setSearchData(data: any): void {
    this.destination = data.destination;
    this.checkInDate = data.checkInDate;
    this.checkOutDate = data.checkOutDate;
    this.rooms = data.rooms;
    this.guests = data.guests;
    this.pricePerNight = data.pricePerNight;
  }

  getSearchData(): any {
    return {
      destination: this.destination,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      rooms: this.rooms,
      guests: this.guests,
      pricePerNight: this.pricePerNight,
    };
  }
}
