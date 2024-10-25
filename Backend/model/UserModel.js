import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";




export const User = sequelize.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull : false,
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false,
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})