import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
    role?: string;
    createdAt: Date;
}


const userSchema = new mongoose.Schema<UserAttrs>({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true, // missing error message for unique
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: [
                "user",
                "admin"
            ],
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare (enteredPassword, this.password)
}

export default mongoose.model("User", userSchema)