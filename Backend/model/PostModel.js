import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Post = sequelize.define("Post",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false 
    }
    
})