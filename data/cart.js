export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export  function addToCart(productId, quantity) {
    let matchingItem;

    // check if the product is already in the cart
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            // if it is, let the item be the matchingItem
            matchingItem = cartItem;
        }
    });

    // if the product is already in the cart, update the quantity
    // if it is not, add it to the cart
    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity
        })
    }
}