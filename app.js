import express from 'express';
import dotenv from 'dotenv';
import parkingRoutes from './routes/parkingRoutes.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());



app.use('/api/parking', parkingRoutes);


app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on port', process.env.PORT || 3001);
})

