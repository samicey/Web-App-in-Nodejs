const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');


const app = express();
const PORT = process.env.PORT || 4200;

app.get('/',(req,res)=>{
    res.send('App is running')
})
app.listen(PORT, ()=>{
    debug(`App listening on PORT ${chalk.green(PORT)}`)
})