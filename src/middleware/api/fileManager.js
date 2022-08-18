/* -----------IMPORTS------------ */
import fs from 'fs';
import __dirname from '../../until.js';
const productsPath = __dirname + '/db/products.json';
const cartsPath = __dirname + '/db/carts.json';
/* -----------CLASE------------ */

export class Container {


    /* -----------Funciones------------ */
    getAll = async () => {
        return await this.getProducts();
    }

    save = async (object) => {
        console.log('llegaste hasta aca: ' + object.id);
        let data = await this.getAll();
        if (data.length) {
            //si ya hay productos el id es el siguiente num
            const prod = await { ...object, id: data[data.length - 1].id + 1 };
            data.push(prod);
        } else {
            //si no, empieza desde 1
            const prod = await { ...object, id: 1 };
            data.push(prod); //pusheo en data el producto
        }
        return await this.saveProducts(data);
    }


    getById = async (id) => {
        const data = await this.getAll();
        return data.find((element) => element.id === id);
    }

    deleteById = async (id) => {
        const data = await this.getAll();
        //filtra los ids que no son iguales al que quiero eliminar y guarda en un nuevo array
        const newArray = data.filter(prod => prod.id != id);
        await this.saveProducts(newArray);
    }

    deleteAll = async () => {
        const emptyArray = [];
        await this.saveProducts(emptyArray);
    }

    getCount = async () => {
        return data = await this.getAll().count();
    }


    //-----------fs
    getProducts = async () => {
        try {
            if (fs.existsSync(productsPath)) {
                const data = await fs.promises.readFile(productsPath, 'utf-8');
                return JSON.parse(data);
            } else {
                //devueleve el json array vacip
                return [];
            }
        } catch (e) {
            console.log(`Error get products: ${e}`);
            return [];
        }
    }

    saveProducts = async (data) => {
        try {
            await fs.promises.writeFile(productsPath, JSON.stringify(data, null, '\t'));
        } catch (e) {
            console.log(`Error save : ${e}`);
        }
    }

    updateData = async (id, title, price, thumbnail) => {
        const data = await this.getAll();
        // console.log('data: ', data);
        // console.log('id: ', id);
        let item = data.find(prod => prod.id === id);
        // console.log(item);
        if (item) {
            item.title = title;
            item.price = price;
            item.thumbnail = thumbnail;
        }
        let itemUp = data.findIndex(prod => parseInt(prod.id) === parseInt(item.id));
        // console.log(itemUp);
        data.splice(itemUp, 1, item)
        console.log('Updated: ', data);
        await this.deleteAll();
        await this.save(data);
    }


    ////CARRO

    deleteAllCarts = async () => {
        const emptyArray = [];
        await this.saveCart(emptyArray);
    }

    saveCarts = async (object) => {
        console.log('llegaste hasta aca: ' + object.id);
        let data = await this.getCarts();
        if (data.length) {
            //si ya hay productos el id es el siguiente num
            const prod = await { ...object, id: data[data.length - 1].id + 1 };
            data.push(prod);
        } else {
            //si no, empieza desde 1
            const prod = await { ...object, id: 1 };
            data.push(prod); //pusheo en data el producto
        }
        return await this.saveCart(data);
    }


    saveCart = async (data) => {
        try {
            await fs.promises.writeFile(cartsPath, JSON.stringify(data, null, '\t'));
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    getAllCart = async () => {
        return await this.getCarts();
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(cartsPath)) {
                const data = await fs.promises.readFile(cartsPath, 'utf-8');
                return JSON.parse(data);
            } else {
                //devueleve el json array vacip
                return [];
            }
        } catch (e) {
            console.log(`Error: ${e}`);
            return [];
        }
    }

}