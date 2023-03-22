const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,                
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tokens : [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    admin: {
        type: String,
        required: true,
        unique: true
    }
})

//Hashing password
adminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = bcryptjs.hashSync(this.password, 10);
    }
    next();
})

// Generate Tokens to verify user
adminSchema.methods.generateToken = async function(){
    try {
        let generatedToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: generatedToken});
        await this.save(); 
        return generatedToken;
    } catch (error) {
        console.log(error);
    }
}

//Create Model
const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
