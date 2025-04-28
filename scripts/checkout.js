// Importing the cart data, removeFromCart function, products data, and formatCurrency utility
import { cart, removeFromCart, calculateCartQuantity, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';



// Initialize an empty string to hold the HTML for the cart summary
let cartSummaryHTML = '';

// Loop through each item in the cart
cart.forEach((cartItem) => {
    const productId = cartItem.productId; // Get the product ID from the cart item

    let matchingProduct;

    // Find the product in the products array that matches the product ID
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product; // Assign the matching product
        }
    });


    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Generate the HTML for the cart item and append it to cartSummaryHTML
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>  
          <div class="product-quantity js-product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-input">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
});


function deliveryOptionsHTML(matchingProduct, cartItem) {
  let deliveryHTML = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
    
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

    deliveryHTML +=`
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return deliveryHTML;
}


// Insert the generated cart summary HTML into the order summary container
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Add event listeners to all delete links
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId; // Get the product ID from the delete link
        removeFromCart(productId); // Remove the item from the cart

        // Find the container for the cart item and remove it from the DOM
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    });
});

calculateCartQuantity('.js-checkout-quantity'); // Call the function to update the checkout items quantity

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});