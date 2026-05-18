// 1. DATA PRODUKTŮ (Databáze detailů)
const productsData = {
    fusilli: {
        title: "Barilla Fusilli N°. 98",
        price: 59,
        desc: "Prvotřídní bezvaječné těstoviny vyrobené ze 100% krupice z tvrdé pšenice (semoliny). Jejich precizní spirálovitý tvar byl navržen tak, aby na svém povrchu udržel maximální množství omáčky, což z nich dělá ideální volbu pro lehká pesta i bohaté sýrové variace.\n\nBalení: 500g | Doba varu: 11 minut | Alergeny: Lepek.",
        images: [
            "images/Barilla Fusilli N.98.webp",
            "https://wikimedia.org"
        ]
    },
    conchiglie: {
        title: "Barilla Conchiglie Rigate N°. 93",
        price: 59,
        desc: "Tradiční italské těstoviny ve tvaru mušliček. Výrazné vnější rýhování a hluboká vnitřní dutina fungují jako dokonalá kapsa na omáčku. Nejlépe se kombinují s hustými rajčatovo-masovými omáčkami typu Bolognese nebo jemnými zeleninovými krémy.\n\nBalení: 500g | Doba varu: 12 minut | Alergeny: Lepek.",
        images: [
            "images/Barilla Conchiglie Rigate N.93.webp",
            "https://wikimedia.org"
        ]
    },
    penne: {
        title: "Barilla Penne Rigate N°. 73",
        price: 59,
        desc: "Kultovní šikmo zkosené trubičky s podélným rýhováním patří mezi nejoblíbenější tvary v celé Itálii. Jsou nekompromisní v kombinaci s pálivou omáčkou Arrabbiata, omáčkou Carbonara nebo k zapékání v troubě.\n\nBalení: 500g | Doba varu: 11 minut | Alergeny: Lepek.",
        images: [
            "images/Barilla Penne Rigate N.73.webp",
            "https://wikimedia.org"
        ]
    },
    basilico: {
        title: "Barilla Basilico Omáčka",
        price: 79,
        desc: "Autentická italská omáčka připravená z pomalu pasírovaných slunečných rajčat a voňavých lístků čerstvé bazalky. Neobsahuje žádné konzervanty ani umělá barviva.\n\nBalení: 400g | Vyrobeno v Itálii.",
        images: ["https://wikimedia.org"]
    },
    aranciata: {
        title: "San Pellegrino Aranciata",
        price: 45,
        desc: "Prémiový italský perlivý nápoj s obsahem 20% šťávy ze zralých sicilských pomerančů. Dokonalé letní osvěžení s vyváženou sladkokyselou chutí.\n\nBalení: 330ml (Plech).",
        images: ["https://wikimedia.org"]
    }
};

// DATA PRÁVNÍCH DOKUMENTŮ
const legalDocs = {
    vop: {
        title: "Všeobecné obchodní podmínky (VOP)",
        content: "1. ÚVODNÍ USTANOVENÍ\nTyto obchodní podmínky platí pro nákup v internetovém obchodě Pastaholik.cz. Podmínky blíže vymezují a upřesňují práva a povinnosti prodávajícího a kupujícího.\n\n2. OBJEDNÁVKA A UZAVŘENÍ KUPNÍ SMLOUVY\nVšechny objednávky podané prostřednictvím tohoto e-shopu jsou závazné. Podáním objednávky kupující stvrzuje, že se seznámil s těmito obchodními podmínkami.\n\n3. ODSTOUPENÍ OD SMLOUVY\nKupující spotřebitel má právo v souladu s § 1829 odst. 1 občanského zákoníku odstoupit od smlouvy bez udání důvodů ve lhůtě 14 dnů od převzetí zboží."
    },
    gdpr: {
        title: "Ochrana osobních údajů (GDPR)",
        content: "1. SPRÁVCE OSOBNÍCH ÚDAJŮ\nSprávcem osobních údajů podle nařízení GDPR je provozovatel e-shopu Pastaholik.cz.\n\n2. ROZSAH ZPRACOVÁNÍ ÚDAJŮ\nZpracováváme pouze údaje nezbytné pro vyřízení objednávky a doručení zboží: Jméno, příjmení, doručovací adresa, e-mail a telefonní číslo.\n\n3. DOBA UCHOVÁNÍ ÚDAJŮ\nOsobní údaje jsou uchovávány po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu (maximálně po dobu 10 let od ukončení smluvního vztahu)."
    },
    reklamace: {
        title: "Reklamační řád",
        content: "1. PRÁVA Z VADNÉHO PLNĚNÍ\nProdávající odpovídá kupujícímu, že zboží při převzetí nemá vady a že se u potravinářského zboží nesnížila jeho kvalita před uplynutím data spotřeby.\n\n2. LHŮTY PRO REKLAMACI\nKupující je povinen zboží prohlédnout bez zbytečného odkladu po jeho převzetí. Vady potravinářského zboží musí být reklamovány neprodleně, nejpozději do data minimální trvanlivosti.\n\n3. VYŘÍZENÍ REKLAMACE\nO reklamaci prodávající rozhodne ihned, ve složitých případech do 3 pracovních dnů. Reklamace včetně odstranění vady bude vyřízena nejpozději do 30 dnů ode dne uplatnění."
    }
};

// 2. STAV NÁKUPNÍHO KOŠÍKU
let cart = [];
let currentProductInDetail = null;

// DOM Elementy
const mainStorePage = document.getElementById('mainStorePage');
const productDetailPage = document.getElementById('productDetailPage');
const cartPage = document.getElementById('cartPage');
const legalPage = document.getElementById('legalPage');

// 3. PŘEPÍNÁNÍ STRÁNEK
function showPage(pageId) {
    mainStorePage.style.display = pageId === 'store' ? 'block' : 'none';
    productDetailPage.style.display = pageId === 'detail' ? 'block' : 'none';
    cartPage.style.display = pageId === 'cart' ? 'block' : 'none';
    legalPage.style.display = pageId === 'legal' ? 'block' : 'none';
    window.scrollTo(0, 0);
}

// Navigační tlačítka zpět
document.getElementById('brandLogo').addEventListener('click', () => showPage('store'));
document.getElementById('backToStoreBtn').addEventListener('click', () => showPage('store'));
document.getElementById('backToStoreFromCartBtn').addEventListener('click', () => showPage('store'));
document.getElementById('backToStoreFromLegalBtn').addEventListener('click', () => showPage('store'));

// 4. PŘEPÍNÁNÍ KATEGORIÍ (Filtry)
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

// 5. OTEVŘENÍ DETAILU PRODUKTU
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

        showPage('detail');
    });
});

// 6. AKTUALIZACE KOŠÍKU A VÝPOČTY
function updateCartWidget() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cartCount').innerText = totalCount;
    document.getElementById('cartTotal').innerText = totalCost;
}

// Univerzální funkce pro zápis do pole košíku
function addItemToCart(title, price) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: price,
            quantity: 1
        });
    }
    updateCartWidget();
}

// Přidání do košíku z hlavní produktové mřížky (Tlačítko Do košíku)
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const productPrice = parseInt(this.getAttribute('data-price'), 10);
        
        addItemToCart(productName, productPrice);

        // Vizuální odezva na tlačítku v mřížce
        const originalText = this.innerText;
        this.innerText = "Přidáno!";
        this.style.backgroundColor = "#059669"; 
        
        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = "#2563eb";
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
        this.style.backgroundColor = "#2563eb";
    }, 1000);
});

// 7. ZOBRAZENÍ STRÁNKY KOŠÍKU (PŘEHLED)
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
                document.getElementById('cartWidget').click(); // Překreslí obsah košíku
            });
        });
    }

    // Výpočet celkové částky v košíku
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartPageTotal').innerText = totalCost;

    showPage('cart');
});

// 8. TLAČÍTKO ZAPLATIT
document.getElementById('checkoutPayBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Nelze zaplatit prázdný košík!");
        return;
    }
    const finalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Nákupní Košík PASTAHOLIK.cz:\n\nCelková částka k úhradě: ${finalCost} Kč\n\nNyní by následovalo přesměrování k platbě.`);
    cart = [];
    updateCartWidget();
    showPage('store');
});

// ==========================================
// 9. LOGIKA PRO ZOBRAZENÍ DOKUMENTŮ V PATIČCE
// ==========================================

// Výběr prvků z HTML
const modalVop = document.getElementById('vopModal');
const modalGdpr = document.getElementById('gdprModal');
const modalReklamace = document.getElementById('reklamaceModal');


// Globální nucené přepsání navigace pro všechny podstránky webu
showPage = function(pageId) {
    // Skrytí nebo zobrazení hlavních modulů e-shopu podle ID
    if (document.getElementById('mainStorePage')) document.getElementById('mainStorePage').style.display = pageId === 'store' ? 'block' : 'none';
    if (document.getElementById('productDetailPage')) document.getElementById('productDetailPage').style.display = pageId === 'detail' ? 'block' : 'none';
    if (document.getElementById('cartPage')) document.getElementById('cartPage').style.display = pageId === 'cart' ? 'block' : 'none';
    
    // Nucené zobrazení celoobrazovkových stránek s dokumenty v patičce
    if (document.getElementById('vopPage')) document.getElementById('vopPage').style.display = pageId === 'vop' ? 'block' : 'none';
    if (document.getElementById('gdprPage')) document.getElementById('gdprPage').style.display = pageId === 'gdpr' ? 'block' : 'none';
    if (document.getElementById('reklamacePage')) document.getElementById('reklamacePage').style.display = pageId === 'reklamace' ? 'block' : 'none';
    
    // Automatický návrat posuvníku prohlížeče nahoru pro čistý přechod
    window.scrollTo(0, 0);
};

// Navázání událostí pro proklikávání odkazů v patičce
document.getElementById('linkVop').addEventListener('click', function(e) { e.preventDefault(); showPage('vop'); });
document.getElementById('linkGdpr').addEventListener('click', function(e) { e.preventDefault(); showPage('gdpr'); });
document.getElementById('linkReklamace').addEventListener('click', function(e) { e.preventDefault(); showPage('reklamace'); });

// Zprovoznění tlačítek "Zpět" u všech dokumentů najednou
document.querySelectorAll('.back-to-store-global').forEach(btn => {
    btn.addEventListener('click', () => showPage('store'));
});
