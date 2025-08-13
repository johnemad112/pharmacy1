// قائمة المنتجات
const products = [
    { name: "دواء مسكن", price: 20, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { name: "فيتامين C", price: 15, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400" },
    { name: "جهاز قياس ضغط", price: 120, img: "https://images.unsplash.com/photo-1588776814546-2f9f4b4b2ff6?w=400" },
    { name: "ميزان حرارة", price: 25, img: "https://images.unsplash.com/photo-1588774069270-3a9a6aefc7e5?w=400" },
    { name: "شراب فيتامين د", price: 30, img: "https://images.unsplash.com/photo-1617396900799-efda33d07d59?w=400" }
];

// 🛒 بيانات السلة
let cart = [];

// عرض المنتجات
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>السعر: ${product.price} جنيه</p>
                <button class="buy-btn" onclick="addToCart(${index})">أضف للسلة</button>
            </div>
        `;
    });
}

// 🔍 البحث عن المنتجات
function searchProducts() {
    const searchText = document.getElementById("search-box").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchText));
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    filtered.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>السعر: ${product.price} جنيه</p>
                <button class="buy-btn" onclick="addToCart(${products.indexOf(product)})">أضف للسلة</button>
            </div>
        `;
    });
}

// 🛒 إضافة للسلة
function addToCart(index) {
    cart.push(products[index]);
    updateCart();
}

// تحديث السلة
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += <li>${item.name} - ${item.price} جنيه</li>;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total;
}

// 📧 إرسال الطلب عبر EmailJS
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const buyer_name = document.getElementById("buyer_name").value;
    const buyer_phone = document.getElementById("buyer_phone").value;
    const buyer_email = document.getElementById("buyer_email").value;
    const buyer_address = document.getElementById("buyer_address").value;

    const order_list = cart.map(item => `${item.name} - ${item.price} جنيه`).join("\n");
    const order_total = document.getElementById("cart-total").textContent;

    const templateParams = {
        buyer_name,
        buyer_phone,
        buyer_email,
        buyer_address,
        order_list,
        order_total
    };

    emailjs.send("service_bduy4fu", "template_xi2co54", templateParams)
        .then(function(response) {
            alert("✅ تم إرسال الطلب بنجاح!");
            cart = [];
            updateCart();
            document.getElementById("orderForm").reset();
        }, function(error) {
            alert("❌ حدث خطأ أثناء إرسال الطلب!");
        });
});

// عرض المنتجات عند تحميل الصفحة
displayProducts();