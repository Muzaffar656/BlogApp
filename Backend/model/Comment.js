import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";


export const Comments = sequelize.define('Comments',{
    comment:{
        type:DataTypes.STRING,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }

},{})