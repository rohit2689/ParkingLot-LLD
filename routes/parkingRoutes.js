import express from 'express';
import ParkingLot from '../models/parkingLot.js';

const router = express.Router();
const parkingLot = new ParkingLot();

router.post('/park', (req, res) => {
    try {
        const { vehicleNum, vehicleType } = req.body;
        const result = parkingLot.parkVehicle(vehicleNum, vehicleType);
        
        if (result.success) {
            res.status(200).json({ success: true, message: result.message, spotNumber: result.spotNumber });   
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/exit', (req, res) => {
    try {
        const { spotNum } = req.body;
        const result = parkingLot.removeVehicle(spotNum);
        if (result.success) {
            res.status(200).json({ success: true, message: "Vehicle exited", fee: result.fee, duration: result.duration });
        } else {
            res.status(400).json({ success: false, message: result.message })
        }

    } catch(err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.get('/available', (req, res) => {
    try {
        const spots = parkingLot.getAvailableSpots();
        res.status(200).json(spots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/status', (req, res) => {
    try {
        const parSpot = parkingLot.getStatus();
        res.status(200).json({ success: true, status: parSpot });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default router;