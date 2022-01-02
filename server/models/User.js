const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        max: 10,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        required: true
    },
    forget_otp: {
        type: String,
        default: null
    },
    forget_time: {
      type: String,
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    createdAt: {
        type: String,
        default: Date.now
    }
})

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY, {expiresIn: '15d'});
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = module.exports = mongoose.model("User", UserSchema);
