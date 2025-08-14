const mongoose = require("mongoose");

const MONGO_DB_URL = "mongodb+srv://harshjaa892:speeddemonking@cluster0.2qjiqt3.mongodb.net";
const DB_NAME = "habit-app";

const connectDb = async () => {
    try {
        await mongoose.connect(`${MONGO_DB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`✅ MongoDB connected`);
    } catch (err) {
        console.error('❌ MongoDB error:', err);
    }
};

module.exports = connectDb;
