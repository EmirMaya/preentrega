/* -----------IMPORTS------------ */
import { Router } from "express";
import { Container } from "../middleware/api/fileManager.js";

import __dirname from '../until.js';

const db = new Container();

const router = Router();



router.get('/:id/products', async (req, res) => {

    try {
        ///TRAER TODOS LOS PRODUCTOS
        const carts = await db.getCarts();
        console.log(carts);
        let id = req.params.id;
        if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
        if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > carts.length) return res.status(404).send({ error: 'producto no encontrado' })
        let cart = carts.find(cart => cart.id == id);
        res.send(cart.products)
    } catch (e) {
        console.log(`Error GET PRODUCTS IN CART: ${e}`);
    }
})


router.post('/', async (req, res) => {
    try {
        console.log(Date.now());
        let carts = await db.getCarts()

        let lastId = 0;

        if (carts.length > 0) {
            lastId = carts[carts.length - 1].id
        }
        let cartItems = []
        var currentdate = new Date().toLocaleString();
;
        const newCart = {
            id: lastId + 1,
            timeStamp: req.body.timeStamp ? req.body.timeStamp : currentdate,
            products: cartItems
        }

        await db.saveCarts(newCart);
        res.redirect('/')
    } catch (e) {
        console.log(`ERROR POST /productos: ${e}`)
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const carts = await db.getCarts()
        // console.log(carts);
        let id = req.params.id;
        if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
        if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > carts.length) return res.status(404).send({ error: 'producto no encontrado' })
        const newArray = carts.filter(prod => prod.id != id);
        console.log(newArray);
        await db.saveCart(newArray);
        res.send(newArray);
    } catch (e) {
        console.log('ERROR DELETE: ' + e);
    }
})

router.post('/:id/products', async (req, res) => {
    try {
        console.log(Date.now());
        let carts = await db.getCarts();
        let products = await db.getAll();
        
        let lastId = 0;
        //por ahora harcodeo el id del prodcuto
        let id = req.params.id;
        if (carts.length > 0) {
            lastId = carts[carts.length - 1].id
        }
        let cartItems = []
        var currentdate = new Date().toLocaleString();
        var prodId = products.find(prod => prod.id == id)
        console.log(prodId.id);
        const prod = {
            id: prodId.id,
            quantity:3
        };
        cartItems.push(prod);
        const newCart = {
            id: lastId + 1,
            timeStamp: req.body.timeStamp ? req.body.timeStamp : currentdate,
            products: cartItems
        }

        await db.saveCarts(newCart);
        res.redirect('/')
    } catch (e) {
        console.log(`ERROR POST /productos: ${e}`)
    }
})

router.delete('/:id/products/:prod_id', async (req, res) => {
    try {
        const carts = await db.getCarts()
        // console.log(carts);
        let id = req.params.id;
        let prodId = req.params.prod_id;
     
        if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
        if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > carts.length) return res.status(404).send({ error: 'carro no encontrado' })
        let cart = carts.find(cart => cart.id == id);
        if (isNaN(req.params.prod_id)) return res.status(400).send("El parámetro debe ser númerico")
        //no se como llamar al array de productos dentro el carro para que esté bien esta validación
        if (parseInt(req.params.prod_id) < 1 || parseInt(req.params.prod_id) > carts.length) return res.status(404).send({ error: 'producto no encontrado' })
        
     
        let prod  = cart.products.filter(prod => prod.id != prodId)
        cart.products = prod;
        let pos = carts.indexOf(cart)
        // console.log(pos);
        carts.splice(pos,1,cart)
        // console.log(carts);
        await db.deleteAllCarts()
        await db.saveCarts(carts);
        res.send(cart);
    } catch (e) {
        console.log('ERROR DELETE: ' + e);
    }
})


export default router;