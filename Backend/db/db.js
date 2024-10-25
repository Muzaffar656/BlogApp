import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("verify","root","muzaffarM1@",{
    host:"localhost",
    dialect:"mysql",
    pool:{max:5,idle:10000,min:0}
})


sequelize.authenticate().then(()=>console.log('Mysql Connected')).catch((e)=>{console.log(e)})