import { Component } from '@angular/core';
import { Room } from '../../common/room';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
//   rooms: Room[] = [];
  
//   constructor(private roomService: RoomService) { }

//   ngOnInit() {
//     this.listrooms();
//   }

//   listrooms() {
//     this.roomService.getRoomList().subscribe(
//       data => {
//         this.rooms = data;
//       }
//     )
//   }
}
