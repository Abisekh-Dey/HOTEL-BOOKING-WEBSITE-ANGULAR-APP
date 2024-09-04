export class Booking {

    constructor(
                public roomId: string|null,
                public userId: string|null,
                public checkIn: Date|null,
                public checkOut: Date|null,
                public guests: {name:string|null, age:number, contact:string|null}[],
        ) {
    }
}
