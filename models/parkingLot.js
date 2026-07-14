import ParkingSpot from './parkingSpot.js';
import Vehicle from './vehicle.js';

class ParkingLot {
    constructor() {
        this.spots = [];
        for (let i = 1; i <= 5; i++) { 
            this.spots.push(new ParkingSpot(i, "car"));
        }
        for (let i = 6; i <= 10; i++) { 
            this.spots.push(new ParkingSpot(i, "bike"));
        }
        for (let i = 11; i <= 13; i++) { 
            this.spots.push(new ParkingSpot(i, "truck"));
        }

    }

    findAvailableSpot(vehicleType) {
        for(let i=0 ; i< this.spots.length; i++) {
            if(this.spots[i].spotType === vehicleType && !this.spots[i].isOccupied) {
                return this.spots[i];
            }
        }
        return null;
    }

    parkVehicle(vehicleNumber, vehicleType) {
        const availableSpot = this.findAvailableSpot(vehicleType);
        if(availableSpot === null) {
            return { success: false, message: "No spot available" };
        }
        const vehicle = new Vehicle(vehicleNumber, vehicleType);
        availableSpot.occupy(vehicle);
        return { success: true, spotNumber: availableSpot.spotNumber, message: "Parked successfully" };
    }

    removeVehicle(spotNumber) {
        const spot = this.spots.find(s => s.spotNumber === spotNumber);

        if(!spot) {
            return {success: false, message: "Spot not found"};
        }

        if(!spot.isOccupied) {
            return {success: false, message: "Spot already empty"};
        }

        const exitTime = new Date();
        const durationInMinutes = Math.ceil((exitTime - spot.vehicle.entryTime) / (1000 * 60));
        const fee = durationInMinutes * 2;
        spot.vacate();
        return { success: true, fee: fee, duration: durationInMinutes };
    }

    getAvailableSpots() {
        return this.spots.filter(spot => !spot.isOccupied);
    }

    getStatus() {
        const total = this.spots.length;
        const occupied = this.spots.filter(spot => spot.isOccupied).length;
        const available = total - occupied;
        return { total, occupied, available };
    }
}

export default ParkingLot;