const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

main()
.then(()=> console.log("Database is connected"))
.catch (error => console.log(error));

async function main() {
    await mongoose.connect(uri);
}

module.exports = main;