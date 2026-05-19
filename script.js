// ==========================================
// 1. DATA PRODUKTŮ (Databáze detailů)
// ==========================================
const productsData = {
    fusilli: {
        title: "Barilla Fusilli N°. 98",
        price: 59,
        desc: "Prvotřídní bezvaječné těstoviny vyrobené ze 100% krupice z tvrdé pšenice (semoliny). Jejich precizní spirálovitý tvar byl navržen tak, aby na svém povrchu udržel maximální množství omáčky, což z nich dělá ideální volbu pro lehká pesta i bohaté sýrové variace.\n\nBalení: 500g | Doba varu: 11 minut | Alergeny: Lepek.",
        images: ["images/Barilla_Fusilli_N.98.webp", "https://wikimedia.org"]
    },
    conchiglie: {
        title: "Barilla Conchiglie Rigate N°. 93",
        price: 59,
        desc: "Tradiční italské těstoviny ve tvaru mušliček. Výrazné vnější rýhování a hluboká vnitřní dutina fungují jako dokonalá kapsa na omáčku. Nejlépe se kombinují s hustými rajčatovo-masovými omáčkami typu Bolognese nebo jemnými zeleninovými krémy.\n\nBalení: 500g | Doba varu: 12 minut | Alergeny: Lepek.",
        images: ["images/Barilla_Conchiglie_Rigate_N.93.webp", "https://wikimedia.org"]
    },
    penne: {
        title: "Barilla Penne Rigate N°. 73",
        price: 59,
        desc: "Kultovní šikmo zkosené trubičky s podélným rýhováním patří mezi nejoblíbenější tvary v celé Itálii. Jsou nekompromisní v kombinaci s pálivou omáčkou Arrabbiata, omáčkou Carbonara nebo k zapékání v troubě.\n\nBalení: 500g | Doba varu: 11 minut | Alergeny: Lepek.",
        images: ["images/Barilla_Penne_Rigate_N.73.webp", "https://wikimedia.org"]
    },
    basilico: {
        title: "Barilla Basilico Omáčka",
        price: 79,
        desc: "Autentická italská omáčka připravená z pomalu pasírovaných slunečných rajčat a voňavých lístků čerstvé bazalky. Neobsahuje žádné konzervanty ani umělá barviva.\n\nBalení: 400g | Vyrobeno v Itálii.",
        images: ["images/Barilla_Basilico_Omacka.webp", "https://wikimedia.org"]
    },
    aranciata: {
        title: "San Pellegrino Aranciata",
        price: 45,
        desc: "Prémiový italský perlivý nápoj s obsahem 20% šťávy ze zralých sicilských pomerančů. Dokonalé letní osvěžení s vyváženou sladkokyselou chutí.\n\nBalení: 330ml (Plech).",
        images: ["images/San_Pellegrino_Aranciata.webp", "https://wikimedia.org"]
    }
};

// Globální stav košíku
let cart = [];
let currentProductInDetail = null;

// DOM Elementy
const mainStorePage = document.getElementById('mainStorePage');
const productDetailPage = document.getElementById('productDetailPage');
const cartPage = document.getElementById('cartPage');

// ==========================================
// 2. GLOBÁLNÍ PŘEPÍNÁNÍ STRÁNEK
// ==========================================
let showPage = function(pageId) {
    if (mainStorePage) mainStorePage.style.display = pageId === 'store' ? 'block' : 'none';
    if (productDetailPage) productDetailPage.style.display = pageId === 'detail' ? 'block' : 'none';
    if (cartPage) cartPage.style.display = pageId === 'cart' ? 'block' : 'none';
    
    // Podpora pro celoobrazovkové zobrazení dokumentů
    if (document.getElementById('vopPage')) document.getElementById('vopPage').style.display = pageId === 'vop' ? 'block' : 'none';
    if (document.getElementById('gdprPage')) document.getElementById('gdprPage').style.display = pageId === 'gdpr' ? 'block' : 'none';
    if (document.getElementById('reklamacePage')) document.getElementById('reklamacePage').style.display = pageId === 'reklamace' ? 'block' : 'none';
    
    window.scrollTo(0, 0);
};

// Výchozí nastavení – zobrazíme hlavní stranu obchodu
showPage('store');

// Navázání událostí pro tlačítka "Zpět" a logo
document.getElementById('brandLogo').addEventListener('click', () => showPage('store'));
document.getElementById('backToStoreBtn').addEventListener('click', () => showPage('store'));
document.getElementById('backToStoreFromCartBtn').addEventListener('click', () => showPage('store'));

document.querySelectorAll('.back-to-store-global').forEach(btn => {
    btn.addEventListener('click', () => showPage('store'));
});

// ==========================================
// 3. PŘEPÍNÁNÍ KATEGORIÍ (Filtry)
// ==========================================
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const selectedCategory = this.getAttribute('data-category');
        document.querySelectorAll('.product-card').forEach(card => {
            if (card.getAttribute('data-cat') === selectedCategory) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// ==========================================
// 4. OTEVŘENÍ DETAILU PRODUKTU
// ==========================================
document.querySelectorAll('.view-product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const prodId = this.getAttribute('data-id');
        const prod = productsData[prodId];
        currentProductInDetail = prod;

        document.getElementById('detailTitle').innerText = prod.title;
        document.getElementById('detailPrice').innerText = `${prod.price} Kč`;
        document.getElementById('detailDescription').innerText = prod.desc;

        const mainImg = document.getElementById('mainDetailImg');
        mainImg.src = prod.images[0];

        const thumbRow = document.getElementById('thumbRow');
        if (thumbRow) {
            thumbRow.innerHTML = "";
            prod.images.forEach((imgUrl, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgUrl;
                if (index === 0) thumb.classList.add('active-thumb');
                
                thumb.addEventListener('click', function() {
                    mainImg.src = imgUrl;
                    document.querySelectorAll('.thumb-row img').forEach(t => t.classList.remove('active-thumb'));
                    this.classList.add('active-thumb');
                });
                thumbRow.appendChild(thumb);
            });
        }

        showPage('detail');
    });
});

// ==========================================
// 5. NÁKUPNÍ KOŠÍK (Logika a výpočty)
// ==========================================
function updateCartWidget() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cartCount').innerText = totalCount;
    document.getElementById('cartTotal').innerText = totalCost;
}

function addItemToCart(title, price) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: parseInt(price, 10),
            quantity: 1
        });
    }
    updateCartWidget();
}

// Přidání do košíku z hlavní produktové mřížky
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Zamezí otevření detailu při kliku na tlačítko
        const productName = this.getAttribute('data-product');
        const productPrice = this.getAttribute('data-price');
        
        addItemToCart(productName, productPrice);

        // Vizuální odezva na tlačítku
        const originalText = this.innerText;
        this.innerText = "Přidáno!";
        this.style.backgroundColor = "#059669"; 
        
        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = "";
        }, 800);
    });
});

// Přidání do košíku ze stránky detailu produktu
document.getElementById('addToCartFromDetailBtn').addEventListener('click', function() {
    if (!currentProductInDetail) return;

    addItemToCart(currentProductInDetail.title, currentProductInDetail.price);

    this.innerText = "Přidáno v pořádku!";
    this.style.backgroundColor = "#059669";
    setTimeout(() => {
        this.innerText = "Přidat do košíku";
        this.style.backgroundColor = "";
    }, 1000);
});

// Otevření a vykreslení přehledu stránky košíku
document.getElementById('cartWidget').addEventListener('click', function() {
    const listContainer = document.getElementById('cartItemsList');
    listContainer.innerHTML = "";

    if (cart.length === 0) {
        listContainer.innerHTML = "<p style='color:#94a3b8; padding:20px 0; text-align:center;'>Váš košík zeje prázdnotou...</p>";
    } else {
        cart.forEach((item, index) => {
            const itemRow = document.createElement('div');
            itemRow.className = "cart-item";
            itemRow.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.price} Kč x ${item.quantity} ks</p>
                </div>
                <button class="remove-item-btn" data-index="${index}" style="background:none; border:none; color:#f87171; cursor:pointer; font-weight:600;">Odebrat</button>
            `;
            listContainer.appendChild(itemRow);
        });

        // Aktivace odebíracích tlačítek uvnitř košíku
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-index'), 10);
                cart.splice(idx, 1);
                updateCartWidget();
                document.getElementById('cartWidget').click(); // Znovu překreslí obsah košíku
            });
        });
    }

    // Výpočet celkové částky v košíku
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartPageTotal').innerText = totalCost;

    showPage('cart');
});

// ==========================================
// 6. MODÁLNÍ OKNA (Právní dokumenty v patičce)
// ==========================================
document.getElementById('linkVop').addEventListener('click', function(e) { e.preventDefault(); document.getElementById('vopModal').style.display = 'flex'; });
document.getElementById('linkGdpr').addEventListener('click', function(e) { e.preventDefault(); document.getElementById('gdprModal').style.display = 'flex'; });
document.getElementById('linkReklamace').addEventListener('click', function(e) { e.preventDefault(); document.getElementById('reklamaceModal').style.display = 'flex'; });

document.getElementById('closeVop').addEventListener('click', () => document.getElementById('vopModal').style.display = 'none');
document.getElementById('closeGdpr').addEventListener('click', () => document.getElementById('gdprModal').style.display = 'none');
document.getElementById('closeReklamace').addEventListener('click', () => document.getElementById('reklamaceModal').style.display = 'none');

// Zavření modálního okna kliknutím mimo obsah
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ==========================================
// 7. TLAČÍTKO ZAPLATIT (Přesměrování na bránu)
// ==========================================
document.getElementById('checkoutPayBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Nelze zaplatit prázdný košík!");
        return;
    }

    this.innerText = "Přesměrovávám na platební bránu...";
    this.disabled = true;

    // Příprava čistých dat košíku pro PHP skript
    const itemsToPost = cart.map(item => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity
    }));

    // Odeslání API požadavku do backendu
    fetch('create-checkout-session.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: itemsToPost }),
    })
    .then(response => {
        if (!response.ok) throw new Error('Chyba na straně serveru');
        return response.json();
    })
    .then(session => {
        if (session.url) {
            window.location.href = session.url; // Přesměrování na platební bránu Stripe
        } else {
            alert('Chyba: Nepodařilo se vygenerovat odkaz k platbě.');
            resetPayButton();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Chyba komunikace. Pokud testujete ve VS Code, musíte kód spouštět přes lokální PHP server (XAMPP / příkaz php -S).');
        resetPayButton();
    });
});

function resetPayButton() {
    const btn = document.getElementById('checkoutPayBtn');
    btn.innerText = "Zaplatit objednávku";
    btn.disabled = false;
}
