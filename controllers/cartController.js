const cartService = require('../services/cartServices');

async function getCart(req, res) {
    try {
        const carts = await cartService.getCart();
        res.json(carts);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al obtener los carritos' });
    }
}

async function getCartById(req, res) {
    const cid = req.params.id;
    try {
        const cart = await cartService.getCartById(cid);
        res.json(cart);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
    }
}

async function addCart(req, res) {
    try {
        const cart = await cartService.addCart(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al agregar el carrito' });
    }
}   

async function addProductToCart(req, res) {
    const cid = req.params.id;
    const pid = req.params.id;
    try {
        const cart = await cartService.addProductToCart(cid, pid);
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
}

async function removeProductFromCart(req, res) {
    const cid = req.params.id;
    const pid = req.params.id;
    try {
        await cartService.removeProductFromCart(cid, pid);
    res.status(204).json({ status: 'success', message: 'Producto eliminado del carrito con éxito' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
}

async function updateCart(req, res) {
    const cartId = req.params.cid;
    const updatedProducts = req.body.products;
    try {
        await cartService.updateCart(cartId, updatedProducts);
        res.status(200).json({ status: 'success', message: 'Carrito actualizado con éxito' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
}

async function updateProductQuantity(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    try {
        await cartService.updateProductQuantity(cartId, productId, quantity);
        res.status(200).json({ status: 'success', message: 'Carrito actualizado con éxito' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
}

async function purchaseCart (req, res) {
    try {
        const cartId = req.params.id;
        const result = await cartService.purchaseCart(cartId);
        const cart = await Cart.findById(cartId);
    cart.items = cart.items.filter((item) => !result.productsNotPurchased.includes(item.product));
    await cart.save();

    res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al realizar la compra' });
}
}

module.exports = {
    getCart,
    getCartById,
    addCart,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantity,
    purchaseCart
}