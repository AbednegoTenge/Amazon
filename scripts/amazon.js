import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

//looping through products
products.forEach(product => {
    // adding each product to the productsHTML string
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class='js-button-quantity' data-product-id=${product.id}>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart" data-product-id="${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

// inserting the productsHTML string into the products grid
document.querySelector('.js-products-grid').innerHTML = productsHTML;


function addToCart(productId, quantity) {
    let matchingItem;

    // check if the product is already in the cart
    cart.forEach((item) => {
        if (productId === item.productId) {
            // if it is, let the item be the matchingItem
            matchingItem = item;
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

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // get the product id from the button
        const productId = button.dataset.productId;

        // get the number of quantity from the selector button
        const quantitySelector = document.querySelector(`.js-button-quantity[data-product-id="${productId}"]`);
        const quantity = parseInt(quantitySelector.value, 10);

        addToCart(productId, quantity);

        // update quantity of the product in cart
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        // update the cart quantity in the header
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

        // show the added to cart message
        setTimeout(() => {
            const addedToCartElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
            if (addedToCartElement) {
                addedToCartElement.style.opacity = '1';

                // hide the added to cart message after 2 seconds
                setTimeout(() => {
                    addedToCartElement.style.opacity = '0';
                }, 2000);
            }
        }, 0);
    });
});
