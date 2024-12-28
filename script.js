/************************************************************
  script.js - Enhanced Version
  -----------------------------------------------------------
  Key Improvements:
    - "Back to Top" button functionality
    - Optional loading spinner toggling
    - Improved form validation feedback
    - Smooth scrolling (CSS-driven + top button)
    - Existing cart & subscribe logic from prior code

  This fulfills:
    - Subscribe alert: "Thank you for subscribing"
    - Add to Cart: "Item added to the cart"
    - Clear Cart: "Cart cleared" / "No items to clear"
    - Process Order: "Thank you for your order" / "Cart is empty"
    - Contact form: "Thank you for your message"
    - LocalStorage for custom order
    - SessionStorage for cart
************************************************************/

document.addEventListener("DOMContentLoaded", () => {
  /************************************************************
   * 1. SUBSCRIBE FEATURE
   ************************************************************/
  const subscribeBtn = document.getElementById("subscribeBtn");
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
      alert("Thank you for subscribing");
    });
  }

  /************************************************************
   * 2. CART (SESSIONSTORAGE)
   *    - Add to cart, View cart, Clear cart, Process order
   ************************************************************/
  let cart = loadCartFromSession();

  // Add to cart
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productItem = button.closest(".product-item");
      const productTitleElem = productItem.querySelector(".product-title");
      const productTitle = productTitleElem
        ? productTitleElem.textContent.trim()
        : "Unknown Item";

      const cartItem = { title: productTitle, quantity: 1 };
      cart.push(cartItem);
      saveCartToSession(cart);

      alert("Item added to the cart");
    });
  });

  // View cart
  const viewCartBtn = document.getElementById("viewCartBtn");
  if (viewCartBtn) {
    viewCartBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Cart is empty");
      } else {
        let message = "Your Cart:\n";
        cart.forEach((item, index) => {
          message += `${index + 1}. ${item.title} (Qty: ${item.quantity})\n`;
        });
        alert(message);
      }
    });
  }

  // Clear cart
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("No items to clear");
      } else {
        cart = [];
        sessionStorage.removeItem("cart");
        alert("Cart cleared");
      }
    });
  }

  // Process order
  const processOrderBtn = document.getElementById("processOrderBtn");
  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Cart is empty");
      } else {
        showLoadingSpinner(true);
        // Simulate a short "processing" delay
        setTimeout(() => {
          showLoadingSpinner(false);
          alert("Thank you for your order");
          cart = [];
          sessionStorage.removeItem("cart");
        }, 1500);
      }
    });
  }

  // Utility functions
  function loadCartFromSession() {
    try {
      return JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (err) {
      return [];
    }
  }
  function saveCartToSession(cartArray) {
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
  }

  /************************************************************
   * 3. CONTACT FORM (LOCALSTORAGE) & VALIDATION
   ************************************************************/
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("custName");
      const emailInput = document.getElementById("custEmail");
      const orderDetails = document.getElementById("orderDetails");

      if (!nameInput.value.trim()) {
        alert("Please enter your name");
        nameInput.focus();
        return;
      }
      if (!emailInput.value.trim()) {
        alert("Please enter your email");
        emailInput.focus();
        return;
      }
      // Additional checks (e.g. regex) could be added if desired.

      alert("Thank you for your message");

      const customerData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        customOrder: orderDetails.value.trim() || "N/A",
      };
      localStorage.setItem("customOrder", JSON.stringify(customerData));
      contactForm.reset();
    });
  }

  /************************************************************
   * 4. BACK TO TOP BUTTON
   ************************************************************/
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /************************************************************
   * 5. LOADING SPINNER (OPTIONAL)
   ************************************************************/
  const loadingSpinner = document.getElementById("loadingSpinner");
  function showLoadingSpinner(show) {
    if (!loadingSpinner) return;
    loadingSpinner.style.display = show ? "block" : "none";
  }
});
