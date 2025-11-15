const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const main = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const guestRoutes = require("./routes/guestRoutes");
const emailRoutes = require("./routes/emailRoutes");
const menuRoutes = require("./routes/menuRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { authMiddleware } = require("./middleware/authMiddle");
const port = process.env.PORT || 8020;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { 
    res.json({
        message: "ReserveRestaurant API is running successfully",
        version: "1.0.0",
        database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    })
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    });
});

app.use("/api", userRoutes);
app.use("/api/reserve", reservationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/viewmenu", menuRoutes);
app.use("/api/email", emailRoutes);
app.use('/api/contact', contactRoutes);


main()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => console.log(`Server starts listening on port ${port}`));
    })
    .catch((err) => {
        console.error("Database connection failed", err);
        process.exit(1);
    });
    
app.listen(port, () => console.log(`Server starts listening on port ${port}`));