const express = require("express");
const cors = require("cors");
const main = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const guestRoutes = require("./routes/guestRoutes");
const emailRoutes = require("./routes/emailRoutes");
const menuRoutes = require("./routes/menuRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { authMiddleware } = require("./middleware/authMiddle");
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

main();

app.use("/", userRoutes);
app.use("/reserve",reservationRoutes);
app.use("/guest",guestRoutes);
app.use("/viewmenu",menuRoutes)
app.use("/email",emailRoutes);
app.use("/admin",adminRoutes);
app.listen(port, () => console.log(`Server starts listening on port ${port}`));