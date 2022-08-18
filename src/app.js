/* -----------IMPORTS------------ */

import express from 'express';
import  handlebars  from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import __dirname from './until.js';
import fs from 'fs';
import { Server } from 'http';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

const PORT = process.env.PORT || 8080; //para glitch

const server = app.listen(PORT, ()=>{
    console.log('Listening on PORT '+PORT);
})
server.on('error',(e)=>console.log(`Server error: ${e}`));

//socket.io
// const io = new Server(server);

/* -----------MIDDLEWARES------------ */
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);
app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter);



