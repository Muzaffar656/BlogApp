import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";


export const Like = sequelize.define('Like',{
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }

},{})