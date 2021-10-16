// al implementar babel se puede implementar con import
// import express from 'express'
const express = require('express');
const morgan =require('morgan');
const cors = require('cors');
const path = require('path')

const app= express();

//CONEXION A BASE DATOS
const mongoose = require('mongoose');
//const uri = 'mongodb://localhost:27017/local';  dirección local 
// cloud:  mongodb+srv://admin:1234@miprimercluster.xuns1.mongodb.net/test?authSource=admin&replicaSet=atlas-123y0k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
const uri = 'mongodb+srv://admin:1234@miprimercluster.xuns1.mongodb.net/plantaPersonal?authSource=admin&replicaSet=atlas-123y0k-shard-0&readPreference=primary&ssl=true';
const nombreDB = "plantaPersonal"

const options = {dbName: nombreDB,useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(uri,options).then(
    ()=>{
        console.log("conectado a base de datos mongo: " + options.dbName)
    },
    err=>{
        err
    }
);


//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*RUTA (para validar conección al servidor)
app.get('/',function(req,res){
    res.send('hola mundo')
});*/

app.use('/api',require('./routes/empleado'));

const history = require('connect-history-api-fallback');
app.use(express.static(path.join(__dirname,'public')));

/* PUERTO ESTATICO
app.listen(3000,function(){
    console.log('Servidor escucha por puerto 3000')
})
*/

//CONFIGURACION PUERTO AUTOMATICO
app.set('puerto',process.env.PORT || 3000);
app.listen(app.get('puerto'),function(){
    console.log('Servidor escucha por puerto: ' + app.get('puerto'))
})