import { Router } from "express";
import __dirname from '../until.js';
import { Container } from "../middleware/api/fileManager.js";

const db = new Container();
const router = Router();

router.get('/api/products', (req, res) => {
    const products = db.getAll();
    res.render('products', {

        hasProducts:products.length>0,
        products
    });
})

router.get('/api/cart', (req, res) => {
    const products = db.getAll();
    res.render('cart', {
        products
    });
})

export default router;