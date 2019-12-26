const express = require('express');
const path = require('path')
const chalk = require('chalk');// to set colors to codes
const debug = require('debug')('app');// for stronger debugging capabillities
const morgan = require('morgan');// morgan is used to log out web requests to your console


const app = express();

// MIDDLEWARES
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));

//This code serves the static js and css from the node_modules directory in order to easily run updates
// The program flow first checks in public then proceeds to check in other specified directories if the file is not found
app.use('/public/css',express.static(path.join(__dirname,'node_modules','bootstrap/dist/css')));
app.use('/public/js',express.static(path.join(__dirname,'node_modules','jquery/dist')));
app.use('/public/js',express.static(path.join(__dirname,'node_modules','bootstrap/dist/js')));



const PORT = process.env.PORT || 4200;

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})
app.listen(PORT, ()=>{
    debug(`App listening on PORT ${chalk.green(PORT)}`)
})
 
