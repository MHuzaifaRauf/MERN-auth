import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
    },
    password: { 
        type: String, 
        required: true 
    },
}, {
    // Here the timestamps are automatically added to the document, with createdAt and updatedAt fields.
    timestamps: true,
});

// Hashing our password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;