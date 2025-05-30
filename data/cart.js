export let cart = JSON.parse(localStorage.getItem('cart'));
 
if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

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
    saveToStorage();
}


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity(selector) {
    // update quantity of the product in cart
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    // update the cart quantity in the header
    if (selector === '.js-checkout-quantity') {
        document.querySelector(selector).innerHTML = `${cartQuantity} items`;
    } else if (selector === '.js-cart-quantity') {
        document.querySelector(selector).innerHTML = cartQuantity;
    }

}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    // check if the product is already in the cart
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            // if it is, let the item be the matchingItem
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}