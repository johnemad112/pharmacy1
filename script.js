// قائمة المنتجات
const products = [
       {
        name: "بانادول",
        price: 25,
        image: "https://example.com/panadol.jpg",
        category: "medicine",
        quantity: 50
    },
    {
        name: "فيتامين C",
        price: 15,
        image: "https://example.com/vitaminC.jpg",
        category: "vitamins",
        quantity: 30
    },
    {
        name: "ميزان حرارة",
        price: 60,
        image: "https://example.com/thermometer.jpg",
        category: "devices",
        quantity: 20
    }
    { name: "دواء مسكن", price: 20, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { name: "فيتامين C", price: 15, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400" },
    { name: "جهاز قياس ضغط", price: 120, img: "https://images.unsplash.com/photo-1588776814546-2f9f4b4b2ff6?w=400" },
    { name: "ميزان حرارة", price: 25, img: "https://images.unsplash.com/photo-1588774069270-3a9a6aefc7e5?w=400" },
    { name: "شراب فيتامين د", price: 30, img: "https://images.unsplash.com/photo-1617396900799-efda33d07d59?w=400" }
    { name: "بانادول", price: 25, category: "medicine", quantity: 100, img: "https://i.imgur.com/4Hk8Ygk.jpg" },
    { name: "كونجستال", price: 30, category: "medicine", quantity: 80, img: "https://i.imgur.com/bxJcspW.jpg" },
    { name: "فلوموكس", price: 45, category: "medicine", quantity: 60, img: "https://i.imgur.com/fJm9lMp.jpg" },
    { name: "كتافلام", price: 35, category: "medicine", quantity: 90, img: "https://i.imgur.com/7ThzbmM.jpg" },
    { name: "اموكسيل", price: 40, category: "medicine", quantity: 70, img: "https://i.imgur.com/EJg8nU0.jpg" },
    { name: "فيتامين سي", price: 50, category: "vitamins", quantity: 120, img: "https://i.imgur.com/TYN7iMZ.jpg" },
    { name: "فيتامين د", price: 60, category: "vitamins", quantity: 110, img: "https://i.imgur.com/24oU2Lb.jpg" },
    { name: "زنك", price: 55, category: "vitamins", quantity: 95, img: "https://i.imgur.com/EReJYYp.jpg" },
    { name: "أوميجا 3", price: 90, category: "vitamins", quantity: 85, img: "https://i.imgur.com/uxjZ0XE.jpg" },
    { name: "كالسيوم", price: 70, category: "vitamins", quantity: 60, img: "https://i.imgur.com/ucQHyeA.jpg" },
    { name: "جهاز قياس الضغط", price: 650, category: "devices", quantity: 20, img: "https://i.imgur.com/3J32B6O.jpg" },
    { name: "جهاز قياس السكر", price: 500, category: "devices", quantity: 25, img: "https://i.imgur.com/y9ezYl2.jpg" },
    { name: "ميزان حرارة ديجيتال", price: 150, category: "devices", quantity: 40, img: "https://i.imgur.com/3dGJKnR.jpg" },
    { name: "جهاز استنشاق", price: 400, category: "devices", quantity: 15, img: "https://i.imgur.com/H4yV7Lb.jpg" },
    { name: "مشاية طبية", price: 1200, category: "devices", quantity: 10, img: "https://i.imgur.com/lMbWe0J.jpg" },
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

