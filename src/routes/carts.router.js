/* -----------IMPORTS------------ */
import { Router } from "express";
import { Container } from "../middleware/api/fileManager.js";

import __dirname from '../until.js';

const db = new Container();

const router = Router();



router.get('/:id/products', async (req, res) => {

    try {
        ///TRAER TODOS LOS PRODUCTOS
        const products = await db.getAll();
        res.send({ products });
    } catch (e) {
        console.log(`Error GET PRODUCTS IN CART: ${e}`);
    }
})


router.post('/', async (req, res) => {
    try {
        const carts = await db.getAll()

        let lastId = 0;

        if (carts.length) {
            lastId = carts[carts.length - 1].id
        }

        const newCart = {
            id: lastId + 1,
            prodId: req.body.prodId ? req.body.prodId : 'id',
            price: req.body.price ? req.body.price : 0,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : 'noImage',
        }
       
        await db.save(newProduct)
        res.redirect('/')
    } catch (e) {
        console.log(`ERROR POST /productos: ${e}`)
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const products = await db.getAll()
        if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
        if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > products.length) return res.status(404).send({ error: 'producto no encontrado' })
        products = []
        res.send(newArray);
    } catch (e) {
        console.log('ERROR DELETE: ' + e);
    }
})

export default router;