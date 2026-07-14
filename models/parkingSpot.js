class ParkingSpot {
    constructor(spotNumber, spotType) {
        this.spotNumber = spotNumber;
        this.spotType = spotType;
        this.isOccupied = false;
        this.vehicle = null;
    }

    occupy(vehicle) {
        this.isOccupied = true;
        this.vehicle = vehicle;
    }

    vacate() {
        const vehicle = this.vehicle;
        this.isOccupied = false;
        this.vehicle = null;
        return vehicle;
    }
}

export default ParkingSpot;