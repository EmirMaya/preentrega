/* -----------IMPORTS------------ */
import { Router } from "express";
import { Container } from "../middleware/api/fileManager.js";

import __dirname from '../until.js';

const db = new Container();

const router = Router();

router.get('/', async (req, res) => {

    try {
        ///TRAER TODOS LOS PRODUCTOS
        const products = await db.getAll();
        res.send({ products });
    } catch (e) {
        console.log(`Error GET: ${e}`);
    }
})

router.get('/:id', async (req, res) => {
    // const product = await db.getById();
    try {
        const products = await db.getAll();
        if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
        if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > products.length) return res.status(404).send({ error: 'producto no encontrado' })
        let id = parseInt(req.params.id);

        res.send({ product: products[id - 1] })
    } catch (e) {
        console.log(`Error GET ID: ${e}`);
    }
})

router.post('/', async (req, res) => {
    try {
        const products = await db.getAll()

        let lastId = 0

        if (products.length) {
            lastId = products[products.length - 1].id
        }

        const newProduct = {
            id: lastId + 1,
            title: req.body.title ? req.body.title : 'No Title',
            price: req.body.price ? req.body.price : 0,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : 'noImage',
        }
        // console.log('newProduct',newProduct);
        await db.save(newProduct)
        res.redirect('/')
    } catch (e) {
        console.log(`ERROR POST /productos: ${e}`)
    }
})


router.put('/:id', async (req, res) => {
    try {


        console.log('PUT request recibido');
        const products = await this.getAll();
        // console.log('data: ', data);
        // console.log('id: ', id);
        let item = products.find(prod => prod.id === id);
        // console.log(item);
        if (item) {
            item.title = title;
            item.price = price;
            item.thumbnail = thumbnail;
        }
        let itemUp = products.findIndex(prod => parseInt(prod.id) === parseInt(item.id));
        // console.log(itemUp);
        products.splice(itemUp, 1, item)
        console.log('Updated: ', products);
        let nproducts = await db.deleteAll();
        let sproducts = await db.save(products);
        console.log('NPRODUCTS' + nproducts);
        console.log('SPRODUCTS' + sproducts);
        res.send(sproducts);
    } catch (e) {
        console.log('ERROR PUT: ' + e);
    }

})

router.delete('/:id', async (req, res) => {
    try {


        const products = await db.getAll()
        if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
        if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > products.length) return res.status(404).send({ error: 'producto no encontrado' })
        products = [];
        res.send(products);
    } catch (e) {
        console.log('ERROR DELETE: ' + e);
    }
})

export default router;