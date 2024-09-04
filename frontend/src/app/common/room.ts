export class Room {

    constructor(
                public number: string,
                public type: string,
                public price: number,
                public isAc: string,
                public hotelId: string,
                public images: string[] = [],
                public roomId?: string
        ) {
    }
}
