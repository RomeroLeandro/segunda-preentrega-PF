const { Router } = require('express');
const cartController = require('../controllers/cartController');
const cartRouter = Router();

cartRouter.get('/', cartController.getCart);
cartRouter.get('/:cid', cartController.getCartById);
cartRouter.post('/', cartController.addCart);
cartRouter.post('/:cid/products/:pid', cartController.addProductToCart);
cartRouter.delete('/:cid/products/:pid', cartController.removeProductFromCart);
cartRouter.put('/:cid', cartController.updateCart);
cartRouter.put('/:cid/products/:pid', cartController.updateProductQuantity);
cartRouter.post('/:cid/puurchase', cartController.purchaseCart);

module.exports = cartRouter;
