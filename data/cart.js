export const cart = [];

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