const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const updateAdmin = async () => {
    await connectDB();
    const User = require('./src/models/User');
    const result = await User.updateOne({ email: 'admin@smartwaste.com' }, { isVerified: true });
    console.log('Update result:', result);
    process.exit(0);
};

updateAdmin();