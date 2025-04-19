import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


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
                $${formatCurrency(product.priceCents)}
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




document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // get the product id from the button
        const productId = button.dataset.productId;

        // get the number of quantity from the selector button
        const quantitySelector = document.querySelector(`.js-button-quantity[data-product-id="${productId}"]`);
        const quantity = parseInt(quantitySelector.value, 10);

        addToCart(productId, quantity);
        calculateCartQuantity();

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

calculateCartQuantity('.js-cart-quantity'); 
