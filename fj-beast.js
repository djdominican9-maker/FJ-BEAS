// ============================================
    // DATA
    // ============================================
    const defaultBeats = [
        { id: 1, title: "Perdiendo el Control", artist: "BeastProducer", genre: "Trap", bpm: 140, key: "Cm", basePrice: 29.99, cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 180 },
        { id: 2, title: "Laura", artist: "NeonBeats", genre: "Reggaeton", bpm: 95, key: "Am", basePrice: 34.99, cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 195 },
        { id: 3, title: "Midnight Vibes", artist: "CyberSoul", genre: "R&B", bpm: 78, key: "F#m", basePrice: 39.99, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 210 },
        { id: 4, title: "Callejero", artist: "BeastProducer", genre: "Corrido Tumbado", bpm: 125, key: "Dm", basePrice: 29.99, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 165 },
        { id: 5, title: "Neon Nights", artist: "NeonBeats", genre: "Trap", bpm: 145, key: "Gm", basePrice: 24.99, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 200 },
        { id: 6, title: "Baila Conmigo", artist: "CyberSoul", genre: "Reggaeton", bpm: 98, key: "Em", basePrice: 32.99, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 188 },
        { id: 7, title: "Deep Space", artist: "BeastProducer", genre: "R&B", bpm: 72, key: "Bm", basePrice: 44.99, cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 225 },
        { id: 8, title: "El Jefe", artist: "NeonBeats", genre: "Corrido Tumbado", bpm: 130, key: "Am", basePrice: 34.99, cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 175 },
        { id: 9, title: "Galaxy Drift", artist: "CyberSoul", genre: "Trap", bpm: 138, key: "Cm", basePrice: 27.99, cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 192 },
        { id: 10, title: "Luna Llena", artist: "BeastProducer", genre: "Reggaeton", bpm: 92, key: "Dm", basePrice: 31.99, cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 205 },
        { id: 11, title: "Cyber Heart", artist: "NeonBeats", genre: "R&B", bpm: 80, key: "Gm", basePrice: 36.99, cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: 215 },
        { id: 12, title: "Tumbado Life", artist: "CyberSoul", genre: "Corrido Tumbado", bpm: 128, key: "Em", basePrice: 29.99, cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: 170 }
    ];

    const adminBeats = JSON.parse(localStorage.getItem('beaststore_admin_beats')) || [];
    const beatsData = [...defaultBeats, ...adminBeats];

    const licenseOptions = {
        basic: { name: "Basica (WAV)", extra: 0 },
        premium: { name: "Premium (Stems)", extra: 20 },
        unlimited: { name: "Ilimitada", extra: 70 }
    };

    const utils = {
        formatTime(seconds) {
            if (!seconds || isNaN(seconds)) return "0:00";
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },
        formatPrice(price) {
            return `$${parseFloat(price).toFixed(2)}`;
        }
    };

    // ============================================
    // TOAST MANAGER
    // ============================================
    const toastManager = {
        container: document.getElementById('toast-container'),
        show(message, type = 'info', duration = 3000) {
            if (!this.container) return;
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
            toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span style="font-size: 14px; font-weight: 600;">${message}</span>`;
            this.container.appendChild(toast);
            setTimeout(() => {
                toast.style.animation = 'toastOut 0.3s ease-out forwards';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
    };

    // ============================================
    // VIEW SWITCHER
    // ============================================
    function switchView(viewId) {
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        const section = document.getElementById('view-' + viewId);
        const nav = document.getElementById('nav-' + viewId);
        if (section) section.classList.add('active');
        if (nav) nav.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleCart(forceOpen) {
        const cart = document.getElementById('cart-section');
        const toggle = document.getElementById('cart-toggle');
        if (!cart || !toggle) return;
        const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !cart.classList.contains('open');
        cart.classList.toggle('open', shouldOpen);
        toggle.setAttribute('aria-expanded', String(shouldOpen));
    }

    // ============================================
    // STORE MANAGER
    // ============================================
    const storeManager = {
        currentFilter: 'Todos',
        currentSearch: '',
        init() {
            this.renderBeats();
            this.renderTrends();
        },
        getFilteredBeats() {
            return beatsData.filter(beat => {
                const matchesGenre = this.currentFilter === 'Todos' || beat.genre === this.currentFilter;
                const searchLower = this.currentSearch.toLowerCase();
                const matchesSearch = !this.currentSearch ||
                    beat.title.toLowerCase().includes(searchLower) ||
                    beat.artist.toLowerCase().includes(searchLower) ||
                    beat.genre.toLowerCase().includes(searchLower) ||
                    beat.key.toLowerCase().includes(searchLower);
                return matchesGenre && matchesSearch;
            });
        },
        renderBeats() {
            const grid = document.getElementById('shop-grid');
            if (!grid) return;
            const beats = this.getFilteredBeats();
            if (beats.length === 0) {
                grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><i class="fa-solid fa-satellite"></i><h3>No se encontraron beats</h3><p>Intenta con otro termino de busqueda o genero.</p></div>`;
                return;
            }
            grid.innerHTML = beats.map(beat => this.createBeatCard(beat)).join('');
        },
        renderTrends() {
            const grid = document.getElementById('trends-grid');
            if (!grid) return;
            const trends = [...beatsData].sort((a, b) => b.basePrice - a.basePrice).slice(0, 4);
            grid.innerHTML = trends.map(beat => this.createBeatCard(beat)).join('');
        },
        createBeatCard(beat) {
            return `<div class="beat-card" data-id="${beat.id}">
                <div class="cover-wrapper" style="background: url('${beat.cover}') center/cover no-repeat;">
                    <div class="play-overlay" onclick="player.loadAndPlay(${beat.id})"><i class="fa-solid fa-play"></i></div>
                </div>
                <div class="beat-title">${beat.title}</div>
                <div class="beat-meta">
                    <span><i class="fa-solid fa-user"></i> ${beat.artist}</span>
                    <span><i class="fa-solid fa-drum"></i> ${beat.bpm} BPM</span>
                    <span><i class="fa-solid fa-music"></i> ${beat.key}</span>
                </div>
                <div class="beat-meta">
                    <span style="background: rgba(157,78,221,0.2); padding: 2px 8px; border-radius: 6px; font-size: 11px; color: var(--neon-purple);">${beat.genre}</span>
                </div>
                <div class="price-row">
                    <div class="price-select-box"><span class="price" id="price-${beat.id}">${utils.formatPrice(beat.basePrice)}</span></div>
                    <select class="license-select" id="license-${beat.id}" onchange="storeManager.updatePrice(${beat.id})">
                        <option value="basic">${licenseOptions.basic.name} (+$0)</option>
                        <option value="premium">${licenseOptions.premium.name} (+$20)</option>
                        <option value="unlimited">${licenseOptions.unlimited.name} (+$70)</option>
                    </select>
                    <button class="btn btn-cart" onclick="cartManager.addToCart(${beat.id})"><i class="fa-solid fa-cart-plus"></i> Agregar al Carrito</button>
                    <button class="btn btn-download" onclick="player.loadAndPlay(${beat.id})"><i class="fa-solid fa-play"></i> Escuchar</button>
                </div>
            </div>`;
        },
        updatePrice(beatId) {
            const beat = beatsData.find(b => b.id === beatId);
            if (!beat) return;
            const licenseType = document.getElementById(`license-${beatId}`)?.value;
            if (!licenseType) return;
            const total = beat.basePrice + licenseOptions[licenseType].extra;
            const priceEl = document.getElementById(`price-${beatId}`);
            if (priceEl) priceEl.textContent = utils.formatPrice(total);
        },
        filterBeats() {
            this.currentSearch = document.getElementById('search-input')?.value || '';
            this.renderBeats();
        },
        filterGenre(genre, element) {
            this.currentFilter = genre;
            document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
            if (element) element.classList.add('active');
            this.renderBeats();
        }
    };

    // ============================================
    // CART MANAGER
    // ============================================
    const cartManager = {
        items: [],
        selectedPayment: 'card',
        init() {
            const saved = localStorage.getItem('beaststore_cart');
            if (saved) {
                try { this.items = JSON.parse(saved); } catch(e) { this.items = []; }
            }
            this.renderCart();
        },
        save() {
            localStorage.setItem('beaststore_cart', JSON.stringify(this.items));
        },
        addToCart(beatId) {
            const beat = beatsData.find(b => b.id === beatId);
            if (!beat) {
                toastManager.show('Beat no encontrado', 'error');
                return;
            }
            const licenseSelect = document.getElementById(`license-${beatId}`);
            const licenseType = licenseSelect ? licenseSelect.value : 'basic';
            const license = licenseOptions[licenseType];
            const finalPrice = beat.basePrice + license.extra;

            this.items.push({
                id: Date.now(),
                beatId: beat.id,
                title: beat.title,
                artist: beat.artist,
                audioUrl: beat.audioUrl,
                licenseType: licenseType,
                licenseName: license.name,
                price: finalPrice
            });
            this.save();
            this.renderCart();
            toastManager.show(`"${beat.title}" agregado al carrito`, 'success');
        },
        removeFromCart(cartItemId) {
            const item = this.items.find(i => i.id === cartItemId);
            this.items = this.items.filter(i => i.id !== cartItemId);
            this.save();
            this.renderCart();
            if (item) toastManager.show(`"${item.title}" eliminado`, 'info');
        },
        getTotal() {
            return this.items.reduce((sum, item) => sum + item.price, 0);
        },
        renderCart() {
            const list = document.getElementById('cart-list');
            const count = document.getElementById('cart-count');
            const total = document.getElementById('cart-total');
            if (!list || !count || !total) return;

            count.textContent = `${this.items.length} item${this.items.length !== 1 ? 's' : ''}`;
            const toggleCount = document.getElementById('cart-toggle-count');
            if (toggleCount) toggleCount.textContent = this.items.length;
            total.textContent = utils.formatPrice(this.getTotal());

            if (this.items.length === 0) {
                list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-cart-shopping"></i><p style="font-size: 14px;">Tu bodega esta vacia</p><p style="font-size: 12px; margin-top: 5px;">Agrega beats para comenzar</p></div>`;
                return;
            }
            list.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.artist} - ${item.licenseName}</p>
                        <span>${utils.formatPrice(item.price)}</span>
                    </div>
                    <button class="btn-remove" onclick="cartManager.removeFromCart(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `).join('');
        },
        openCheckout() {
            if (this.items.length === 0) {
                toastManager.show('Tu carrito esta vacio', 'error');
                return;
            }
            const modal = document.getElementById('checkout-modal');
            const itemsContainer = document.getElementById('checkout-items');
            const totalEl = document.getElementById('checkout-total');
            if (!modal || !itemsContainer || !totalEl) return;

            itemsContainer.innerHTML = this.items.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-neon); font-size: 14px;">
                    <span>${item.title} (${item.licenseName})</span>
                    <span style="color: var(--neon-green); font-weight: 700;">${utils.formatPrice(item.price)}</span>
                </div>
            `).join('');
            totalEl.textContent = utils.formatPrice(this.getTotal());
            modal.classList.add('active');
            this.selectPayment('card');
        },
        closeCheckout() {
            document.getElementById('checkout-modal')?.classList.remove('active');
        },
        selectPayment(method) {
            this.selectedPayment = method;
            document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
            const selected = document.querySelector(`.payment-method[data-method="${method}"]`);
            if (selected) selected.classList.add('selected');
            document.querySelectorAll('.card-form').forEach(el => el.classList.remove('active'));
            if (method === 'card') document.getElementById('card-form')?.classList.add('active');
            else if (method === 'paypal') document.getElementById('paypal-form')?.classList.add('active');
            else if (method === 'crypto') document.getElementById('crypto-form')?.classList.add('active');
        },
        formatCardNumber(input) {
            let value = input.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += ' ';
                formatted += value[i];
            }
            input.value = formatted;
            this.updateCardDisplay();
        },
        formatExpiry(input) {
            let value = input.value.replace(/[^0-9]/g, '');
            if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
            input.value = value;
            this.updateCardDisplay();
        },
        updateCardDisplay() {
            const number = document.getElementById('card-number')?.value || '#### #### #### ####';
            const name = document.getElementById('card-name')?.value.toUpperCase() || 'NOMBRE COMPLETO';
            const expiry = document.getElementById('card-expiry')?.value || 'MM/AA';
            const cvc = document.getElementById('card-cvc')?.value || '***';
            const numEl = document.getElementById('card-display-number');
            const nameEl = document.getElementById('card-display-name');
            const expEl = document.getElementById('card-display-expiry');
            const cvcEl = document.getElementById('card-display-cvc');
            if (numEl) numEl.textContent = number;
            if (nameEl) nameEl.textContent = name;
            if (expEl) expEl.textContent = expiry;
            if (cvcEl) cvcEl.textContent = cvc;
        },
        validateCard() {
            const number = document.getElementById('card-number')?.value.replace(/\s/g, '') || '';
            const name = document.getElementById('card-name')?.value.trim() || '';
            const expiry = document.getElementById('card-expiry')?.value || '';
            const cvc = document.getElementById('card-cvc')?.value || '';
            if (number.length < 13) { toastManager.show('Numero de tarjeta invalido', 'error'); return false; }
            if (!name) { toastManager.show('Ingresa el nombre del titular', 'error'); return false; }
            if (!/^\d{2}\/\d{2}$/.test(expiry)) { toastManager.show('Fecha de expiracion invalida (MM/AA)', 'error'); return false; }
            if (cvc.length < 3) { toastManager.show('CVC invalido', 'error'); return false; }
            return true;
        },
        processPayment() {
            const email = document.getElementById('checkout-email')?.value?.trim();
            const name = document.getElementById('checkout-name')?.value?.trim();
            if (!email || !name) { toastManager.show('Completa todos los campos', 'error'); return; }
            if (this.selectedPayment === 'card' && !this.validateCard()) return;
            if (this.selectedPayment === 'paypal') {
                const paypalEmail = document.getElementById('paypal-email')?.value?.trim();
                if (!paypalEmail) { toastManager.show('Ingresa tu email de PayPal', 'error'); return; }
            }

            const btn = document.querySelector('#checkout-modal .btn-checkout');
            if (!btn) return;
            const originalText = btn.innerHTML;
            let processingText = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
            if (this.selectedPayment === 'paypal') processingText = '<i class="fa-solid fa-spinner fa-spin"></i> Conectando con PayPal...';
            if (this.selectedPayment === 'crypto') processingText = '<i class="fa-solid fa-spinner fa-spin"></i> Generando wallet...';
            btn.innerHTML = processingText;
            btn.disabled = true;

            setTimeout(() => {
                const purchasedItems = [...this.items];
                const firstItem = purchasedItems[0];
                const order = {
                    id: 1000 + Math.floor(Math.random() * 9000),
                    customer: name,
                    email: email,
                    items: this.items.length,
                    total: this.getTotal(),
                    paymentMethod: this.selectedPayment,
                    status: 'completed',
                    date: new Date().toISOString().split('T')[0]
                };
                let orders = JSON.parse(localStorage.getItem('beaststore_orders')) || [];
                orders.push(order);
                localStorage.setItem('beaststore_orders', JSON.stringify(orders));
                if (firstItem) {
                    localStorage.setItem('beaststore_last_purchase', JSON.stringify({
                        title: firstItem.title,
                        artist: firstItem.artist,
                        audioUrl: firstItem.audioUrl,
                        licenseType: firstItem.licenseType,
                        licenseName: firstItem.licenseName,
                        purchasedAt: new Date().toISOString()
                    }));
                }

                const licenseValues = {
                    basic: 'Básica (WAV)',
                    premium: 'Premium (Stems)',
                    unlimited: 'Ilimitada'
                };
                const contractName = document.getElementById('contract-name');
                const contractEmail = document.getElementById('contract-email');
                const contractBeat = document.getElementById('contract-beat');
                const contractLicense = document.getElementById('contract-license');
                if (contractName) contractName.value = name;
                if (contractEmail) contractEmail.value = email;
                if (contractBeat && firstItem) contractBeat.value = firstItem.title;
                if (contractLicense && firstItem) contractLicense.value = licenseValues[firstItem.licenseType] || '';
                updateContractPreview();

                this.items = [];
                this.save();
                this.renderCart();
                this.closeCheckout();
                btn.innerHTML = originalText;
                btn.disabled = false;

                let successMsg = 'Pago completado! Revisa tu email.';
                if (this.selectedPayment === 'paypal') successMsg = 'Pago via PayPal completado!';
                if (this.selectedPayment === 'crypto') successMsg = 'Direccion de wallet generada. Transaccion en proceso.';
                toastManager.show(successMsg, 'success', 5000);
                switchView('contract');
            }, 2500);
        }
    };

    // ============================================
    // PLAYER
    // ============================================
    const player = {
        audio: new Audio(),
        currentBeat: null,
        isPlaying: false,
        progressInterval: null,
        volume: 0.8,
        isMuted: false,
        playlist: [],
        currentIndex: 0,
        init() {
            this.audio.volume = this.volume;
            this.audio.addEventListener('ended', () => {
                this.isPlaying = false;
                this.updatePlayButton();
                this.next();
            });
            this.audio.addEventListener('loadedmetadata', () => {
                const durEl = document.getElementById('progress-duration');
                if (durEl) durEl.textContent = utils.formatTime(this.audio.duration || 0);
            });
            this.audio.addEventListener('error', () => {
                toastManager.show('Error al cargar el audio', 'error');
                this.isPlaying = false;
                this.updatePlayButton();
            });
        },
        loadAndPlay(beatId) {
            const beat = beatsData.find(b => b.id === beatId);
            if (!beat) return;
            this.currentBeat = beat;
            this.playlist = beatsData;
            this.currentIndex = beatsData.findIndex(b => b.id === beatId);

            const titleEl = document.getElementById('player-title');
            const subEl = document.getElementById('player-sub');
            const coverEl = document.getElementById('player-cover');
            if (titleEl) titleEl.textContent = beat.title;
            if (subEl) subEl.textContent = `${beat.artist} - ${beat.genre}`;
            if (coverEl) coverEl.innerHTML = `<img src="${beat.cover}" alt="${beat.title}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`;

            this.audio.src = beat.audioUrl;
            this.audio.load();
            this.play();
        },
        play() {
            if (!this.currentBeat) return;
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    this.updatePlayButton();
                    this.startProgressUpdate();
                }).catch(err => {
                    toastManager.show('No se pudo reproducir el audio', 'error');
                });
            }
        },
        pause() {
            this.audio.pause();
            this.isPlaying = false;
            this.updatePlayButton();
            this.stopProgressUpdate();
        },
        togglePlay() {
            if (!this.currentBeat) {
                if (beatsData.length > 0) this.loadAndPlay(beatsData[0].id);
                return;
            }
            this.isPlaying ? this.pause() : this.play();
        },
        prev() {
            if (!this.currentBeat || this.playlist.length === 0) return;
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
            this.loadAndPlay(this.playlist[this.currentIndex].id);
        },
        next() {
            if (!this.currentBeat || this.playlist.length === 0) return;
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
            this.loadAndPlay(this.playlist[this.currentIndex].id);
        },
        seek(event) {
            if (!this.audio.duration) return;
            const bar = event.currentTarget;
            const rect = bar.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
            this.updateProgress();
        },
        setVolume(event) {
            const bar = event.currentTarget;
            const rect = bar.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            this.volume = Math.max(0, Math.min(1, percent));
            this.audio.volume = this.volume;
            const volBar = document.getElementById('volume-bar');
            if (volBar) volBar.style.width = `${this.volume * 100}%`;
            this.isMuted = this.volume === 0;
            this.updateVolumeIcon();
        },
        toggleMute() {
            if (this.isMuted) {
                this.audio.volume = this.volume || 0.8;
                this.isMuted = false;
            } else {
                this.audio.volume = 0;
                this.isMuted = true;
            }
            this.updateVolumeIcon();
        },
        updateVolumeIcon() {
            const icon = document.getElementById('volume-icon');
            if (!icon) return;
            if (this.isMuted || this.audio.volume === 0) icon.className = 'fa-solid fa-volume-xmark';
            else if (this.audio.volume < 0.5) icon.className = 'fa-solid fa-volume-low';
            else icon.className = 'fa-solid fa-volume-high';
        },
        updatePlayButton() {
            const btn = document.getElementById('player-btn');
            if (btn) btn.className = this.isPlaying ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play';
        },
        startProgressUpdate() {
            this.stopProgressUpdate();
            this.progressInterval = setInterval(() => this.updateProgress(), 100);
        },
        stopProgressUpdate() {
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }
        },
        updateProgress() {
            if (!this.audio.duration) return;
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            const bar = document.getElementById('player-progress-bar');
            const timeEl = document.getElementById('progress-time');
            if (bar) bar.style.width = `${percent}%`;
            if (timeEl) timeEl.textContent = utils.formatTime(this.audio.currentTime);
        }
    };

    // ============================================
    // CHAT BOT
    // ============================================
    const beastChat = {
        isOpen: false,
        messagesContainer: null,
        input: null,
        typing: null,
        quickReplies: null,
        toggleBtn: null,
        toggleIcon: null,
        sendBtn: null,
        closeBtn: null,

        knowledge: {
            greetings: ['hola', 'buenas', 'hey', 'saludos', 'que tal', 'hi', 'hello', 'como estas', 'que hay'],
            goodbye: ['adios', 'chao', 'hasta luego', 'nos vemos', 'bye', 'hasta pronto'],
            thanks: ['gracias', 'thank', 'agradezco', 'te lo agradezco', 'gracias por'],
            precio: ['precio', 'cuanto cuesta', 'cuanto vale', 'costo', 'tarifa', 'precios', 'licencia', 'licencias', 'plan', 'planes', 'cuanto'],
            basic: ['basica', 'basic', 'wav'],
            premium: ['premium', 'stems', 'pistas separadas'],
            unlimited: ['ilimitada', 'unlimited', 'cosmica', 'ilimitado'],
            pago: ['pago', 'pagar', 'tarjeta', 'paypal', 'cripto', 'bitcoin', 'metodo de pago', 'puedo pagar', 'formas de pago'],
            descarga: ['descargar', 'download', 'archivo', 'mp3', 'wav', 'stem', 'obtener', 'donde descargo'],
            reembolso: ['reembolso', 'devolucion', 'devolver', 'rembolso', 'dinero', 'regresar', 'cancelar compra'],
            cuenta: ['cuenta', 'registro', 'login', 'iniciar sesion', 'password', 'contrasena', 'olvide', 'suspension', 'bloqueada'],
            beat: ['beat', 'instrumental', 'pista', 'produccion', 'genero', 'bpm', 'escala', 'key', 'demo', 'escuchar'],
            soporte: ['soporte', 'ayuda', 'help', 'problema', 'error', 'bug', 'falla', 'no funciona', 'contacto', 'email', 'correo'],
            legal: ['legal', 'derechos', 'propiedad intelectual', 'autor', 'copyright', 'licencia', 'terminos', 'condiciones', 'politica', 'politicas'],
        },

        quickOptions: [
            '💰 Precios y licencias',
            '💳 Métodos de pago',
            '⬇️ Descargas',
            '📋 Políticas',
            '❓ Reembolsos',
            '🎵 Sobre los beats'
        ],

        init() {
            this.messagesContainer = document.getElementById('chat-messages');
            this.input = document.getElementById('chat-input');
            this.typing = document.getElementById('chat-typing');
            this.quickReplies = document.getElementById('chat-quick-replies');
            this.toggleBtn = document.getElementById('chat-toggle');
            this.toggleIcon = document.getElementById('chat-toggle-icon');
            this.sendBtn = document.getElementById('chat-send');
            this.closeBtn = document.getElementById('chat-close-btn');

            if (!this.toggleBtn || !this.messagesContainer) return;

            this.toggleBtn.addEventListener('click', () => this.toggle());
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
            if (this.sendBtn) this.sendBtn.addEventListener('click', () => this.sendMessage());
            if (this.input) {
                this.input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });
            }

            this.addMessage('bot', '¡Hola! Soy **FJ BeastBot**, tu asistente virtual de FJ BEAST. 🚀\n\n¿En qué puedo ayudarte hoy? Puedes escribirme o usar los botones rápidos de abajo.');
            this.showQuickReplies();

            if (!localStorage.getItem('beaststore_chat_seen')) {
                setTimeout(() => {
                    if (!this.isOpen) this.open();
                    localStorage.setItem('beaststore_chat_seen', 'true');
                }, 8000);
            }
        },

        toggle() { this.isOpen ? this.close() : this.open(); },

        open() {
            this.isOpen = true;
            document.getElementById('chat-window')?.classList.add('active');
            if (this.toggleIcon) this.toggleIcon.className = 'fa-solid fa-chevron-down';
            if (this.toggleBtn) this.toggleBtn.classList.remove('pulse');
            if (this.input) this.input.focus();
        },

        close() {
            this.isOpen = false;
            document.getElementById('chat-window')?.classList.remove('active');
            if (this.toggleIcon) this.toggleIcon.className = 'fa-solid fa-comments';
            if (this.toggleBtn) this.toggleBtn.classList.add('pulse');
        },

        addMessage(sender, text) {
            if (!this.messagesContainer) return;
            const msg = document.createElement('div');
            msg.className = 'chat-msg ' + sender;
            msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

            const time = document.createElement('div');
            time.className = 'chat-msg-time';
            time.textContent = new Date().toLocaleTimeString('es', {hour: '2-digit', minute:'2-digit'});
            msg.appendChild(time);

            this.messagesContainer.appendChild(msg);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        },

        showTyping() {
            if (this.typing) this.typing.classList.add('active');
            if (this.messagesContainer) this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        },

        hideTyping() {
            if (this.typing) this.typing.classList.remove('active');
        },

        showQuickReplies() {
            if (!this.quickReplies) return;
            this.quickReplies.innerHTML = this.quickOptions.map(opt =>
                '<button class="chat-quick-btn">' + opt + '</button>'
            ).join('');

            this.quickReplies.querySelectorAll('.chat-quick-btn').forEach((btn, index) => {
                btn.addEventListener('click', () => this.handleQuickReply(this.quickOptions[index]));
            });
        },

        hideQuickReplies() {
            if (this.quickReplies) this.quickReplies.innerHTML = '';
        },

        handleQuickReply(text) {
            this.sendMessage(text, true);
        },

        sendMessage(text, isQuick) {
            const message = text || (this.input ? this.input.value.trim() : '');
            if (!message) return;

            if (!isQuick && this.input) {
                this.input.value = '';
                this.hideQuickReplies();
            }

            this.addMessage('user', message);
            this.showTyping();

            const delay = 800 + Math.random() * 1200;

            setTimeout(() => {
                this.hideTyping();
                const response = this.generateResponse(message.toLowerCase());
                this.addMessage('bot', response);
                this.showQuickReplies();
            }, delay);
        },

        generateResponse(input) {
            const k = this.knowledge;

            if (k.greetings.some(w => input.includes(w))) {
                const greetings = [
                    '¡Hola! 👋 Bienvenido a FJ BEAST. Soy FJ BeastBot, tu asistente virtual. ¿En qué puedo ayudarte?',
                    '¡Hey! 🚀 ¿Cómo va todo? Estoy aquí para resolver tus dudas sobre beats, licencias y más.',
                    '¡Buenas! Soy BeastBot. ¿Buscas alguna instrumental en particular o tienes alguna duda?'
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            }

            if (k.goodbye.some(w => input.includes(w))) {
                return '¡Hasta luego! 🎵 Si necesitas algo más, aquí estaré. ¡Que tengas un gran día creativo!';
            }

            if (k.thanks.some(w => input.includes(w))) {
                return '¡De nada! 😊 Estoy aquí para lo que necesites. ¿Algo más en lo que pueda ayudarte?';
            }

            if (k.basic.some(w => input.includes(w))) {
                return '**Licencia Básica (WAV)** — Desde **$29.99**\n\n✅ Archivo WAV de alta calidad\n✅ Uso en streaming hasta 10,000 reproducciones\n✅ Ideal para proyectos emergentes\n\n¿Te gustaría saber sobre las otras licencias?';
            }

            if (k.premium.some(w => input.includes(w))) {
                return '**Premium Pass (Stems)** — Desde **$49.99**\n\n✅ Incluye todo lo de la Básica\n✅ **Stems/pistas separadas** para mezcla profesional\n✅ Mayor control sobre tu producción\n✅ Perfecto para artistas que quieren personalizar el beat';
            }

            if (k.unlimited.some(w => input.includes(w))) {
                return '**Ilimitada Cósmica** — Desde **$99.99**\n\n🌟 **Derechos ilimitados** de distribución comercial\n🌟 Streaming, videos musicales y radio sin límites\n🌟 Incluye stems y archivo WAV\n🌟 La mejor opción para hits profesionales\n\n¿Te interesa esta licencia para algún beat específico?';
            }

            if (k.precio.some(w => input.includes(w))) {
                return '**💰 Nuestras Licencias:**\n\n• **Básica (WAV)** — $29.99\n• **Premium (Stems)** — $49.99\n• **Ilimitada Cósmica** — $99.99\n\nCada una incluye diferentes niveles de derechos de uso. Puedes seleccionar la licencia directamente en la tarjeta de cada beat.\n\n¿Te gustaría saber más sobre alguna licencia en específico?';
            }

            if (k.pago.some(w => input.includes(w))) {
                return '**💳 Métodos de Pago Aceptados:**\n\n• **Tarjeta de Crédito/Débito** (Visa, Mastercard, Amex)\n• **PayPal** — Pago seguro con tu cuenta\n• **Criptomonedas** — Bitcoin, Ethereum, USDT\n\nTodos los pagos se procesan de forma segura y encriptada. 🔒\n\n¿Tienes alguna duda sobre el proceso de pago?';
            }

            if (k.descarga.some(w => input.includes(w))) {
                return '**⬇️ Sobre las Descargas:**\n\nUna vez completado tu pago, recibirás un email con los links de descarga. También puedes acceder a tus compras desde tu cuenta.\n\n📦 **Incluye según tu licencia:**\n• Básica → Archivo WAV\n• Premium → WAV + Stems separados\n• Ilimitada → WAV + Stems + Derechos comerciales\n\n¿Tienes problemas con alguna descarga?';
            }

            if (k.reembolso.some(w => input.includes(w))) {
                return '**❓ Política de Reembolsos:**\n\nPor la naturaleza digital de nuestros productos, las ventas son **generalmente finales**.\n\n⚠️ **Excepciones:**\n• Error de facturación\n• Archivo dañado o incorrecto\n• Problemas técnicos atribuibles a FJ BEAST\n\nSi aplica tu caso, contáctanos en **soporte@beaststore.com** y revisaremos tu solicitud en 24-48h.';
            }

            if (k.cuenta.some(w => input.includes(w))) {
                return '**👤 Cuentas y Acceso:**\n\n• Tu carrito se guarda automáticamente en el navegador\n• Las órdenes se almacenan en localStorage\n• Si olvidaste algo, revisa tu historial de compras\n\n⚠️ **Suspensión:** Las cuentas pueden suspenderse por incumplimiento de políticas (revender beats, reclamar autoría, etc.).\n\n¿Necesitas ayuda con algo específico de tu cuenta?';
            }

            if (k.beat.some(w => input.includes(w))) {
                return '**🎵 Nuestros Beats:**\n\nContamos con instrumentales en diversos géneros:\n• **Trap** — 140 BPM promedio\n• **Reggaeton** — 92-98 BPM\n• **R&B** — 72-80 BPM\n• **Corrido Tumbado** — 125-130 BPM\n\nCada beat incluye info de BPM, escala musical y precios. Puedes escuchar la demo antes de comprar.\n\n¿Buscas algún género o estilo en particular?';
            }

            if (k.soporte.some(w => input.includes(w))) {
                return '**🛟 Soporte FJ BEAST:**\n\nEstoy aquí para ayudarte con la mayoría de dudas. Si necesitas atención humana:\n\n📧 **Email:** soporte@beaststore.com\n⏱️ **Tiempo de respuesta:** 24-48 horas\n\nTambién puedes revisar nuestras **Políticas** para más información sobre términos y condiciones.';
            }

            if (k.legal.some(w => input.includes(w))) {
                return '**📋 Información Legal:**\n\n• Todas las instrumentales son propiedad intelectual de FJ BEAST\n• La compra otorga **licencia de uso**, no propiedad\n• Está prohibido revender, redistribuir o reclamar autoría\n• Cumplimos con protección de datos personales\n\nPuedes descargar el documento completo de políticas desde el footer de la página o preguntarme sobre algún punto específico.';
            }

            const defaults = [
                'Interesante... 🤔 No estoy seguro de haber entendido bien. Puedo ayudarte con:\n\n• 💰 Precios y licencias\n• 💳 Métodos de pago\n• ⬇️ Descargas\n• ❓ Reembolsos\n• 📋 Políticas\n\n¿Sobre cuál te gustaría saber más?',
                'Hmm, esa pregunta es nueva para mí. 😅 Intenta ser más específico o usa los botones rápidos de abajo. También puedes escribir palabras clave como "precio", "pago", "descarga" o "reembolso".',
                'No tengo una respuesta exacta para eso, pero puedo ayudarte con temas relacionados a beats, licencias, pagos y soporte. ¿Quieres que te explique alguno de esos temas?'
            ];
            return defaults[Math.floor(Math.random() * defaults.length)];
        }
    };

    // ============================================
    // SIGNATURE & CONTRACT
    // ============================================
    let signaturePad = null;
    let isSigned = false;
    let savedSignature = null;

    function initSignatureCanvas() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width || 600;
        canvas.height = 150;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width),
                y: (clientY - rect.top) * (canvas.height / rect.height)
            };
        }

        function startDraw(e) {
            e.preventDefault();
            isDrawing = true;
            const pos = getPos(e);
            lastX = pos.x;
            lastY = pos.y;
        }

        function draw(e) {
            e.preventDefault();
            if (!isDrawing) return;
            const pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            lastX = pos.x;
            lastY = pos.y;
        }

        function endDraw() { isDrawing = false; }

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseout', endDraw);
        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', endDraw);

        signaturePad = { canvas, ctx };
    }

    function clearSignature() {
        if (!signaturePad) return;
        const { canvas, ctx } = signaturePad;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        isSigned = false;
        savedSignature = null;
        document.getElementById('signed-stamp')?.classList.remove('active');
        const previewSig = document.getElementById('preview-signature');
        if (previewSig) { previewSig.style.display = 'none'; previewSig.src = ''; }
        const btn = document.getElementById('btn-download-signed');
        if (btn) btn.disabled = true;
        toastManager.show('Firma limpiada', 'info');
    }

    function updateContractPreview() {
        const name = document.getElementById('contract-name')?.value || '';
        const doc = document.getElementById('contract-doc')?.value || '';
        const email = document.getElementById('contract-email')?.value || '';
        const address = document.getElementById('contract-address')?.value || '';
        const country = document.getElementById('contract-country')?.value || '';
        const license = document.getElementById('contract-license')?.value || '';

        const previewName = document.getElementById('preview-name');
        const previewDoc = document.getElementById('preview-doc');
        const previewEmail = document.getElementById('preview-email');
        const previewAddress = document.getElementById('preview-address');
        const previewCountry = document.getElementById('preview-country');
        const previewLicense = document.getElementById('preview-license');
        const previewSignName = document.getElementById('preview-sign-name');
        const previewDate = document.getElementById('preview-date');
        const previewNum = document.getElementById('preview-contract-num');
        const previewPrice = document.getElementById('preview-price');

        if (previewName) previewName.textContent = name || '______________________________________';
        if (previewDoc) previewDoc.textContent = doc || '_____________________________';
        if (previewEmail) previewEmail.textContent = email || '_____________________________________';
        if (previewAddress) previewAddress.textContent = address || '___________________________________________';
        if (previewCountry) previewCountry.textContent = country || '_______________________________________________';
        if (previewLicense) previewLicense.textContent = license || '_____________________';
        if (previewSignName) previewSignName.textContent = name || '_______________________________';

        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2,'0')} / ${(today.getMonth()+1).toString().padStart(2,'0')} / ${today.getFullYear()}`;
        if (previewDate) previewDate.textContent = dateStr;

        if (previewNum && previewNum.textContent.includes('__________')) {
            const contractNum = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
            previewNum.textContent = contractNum;
        }

        const prices = {
            'Básica (WAV)': 'US$ 29.99',
            'Premium (Stems)': 'US$ 49.99',
            'Ilimitada': 'US$ 99.99',
            'Exclusiva': 'US$ Contactar'
        };
        if (previewPrice) previewPrice.textContent = prices[license] || 'US$ ___________________';
    }

    function signContract() {
        if (!signaturePad) {
            toastManager.show('Error al inicializar la firma', 'error');
            return;
        }

        const { canvas, ctx } = signaturePad;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let hasDrawing = false;
        for (let i = 3; i < imageData.length; i += 4) {
            if (imageData[i] > 0 && (imageData[i-3] < 255 || imageData[i-2] < 255 || imageData[i-1] < 255)) {
                hasDrawing = true; break;
            }
        }

        if (!hasDrawing) {
            toastManager.show('Dibuja tu firma en el recuadro blanco', 'error');
            return;
        }

        const name = document.getElementById('contract-name')?.value.trim();
        if (!name) {
            toastManager.show('Ingresa tu nombre completo antes de firmar', 'error');
            return;
        }

        savedSignature = canvas.toDataURL('image/png');
        isSigned = true;

        const previewSig = document.getElementById('preview-signature');
        if (previewSig) { previewSig.src = savedSignature; previewSig.style.display = 'block'; }

        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2,'0')}/${(today.getMonth()+1).toString().padStart(2,'0')}/${today.getFullYear()} ${today.getHours().toString().padStart(2,'0')}:${today.getMinutes().toString().padStart(2,'0')}`;
        const signDate = document.getElementById('sign-date');
        if (signDate) signDate.textContent = dateStr;

        const stamp = document.getElementById('signed-stamp');
        if (stamp) stamp.classList.add('active');

        const btn = document.getElementById('btn-download-signed');
        if (btn) btn.disabled = false;
        const trackBtn = document.getElementById('btn-download-track');
        if (trackBtn) trackBtn.disabled = !localStorage.getItem('beaststore_last_purchase');

        const code = 'BST-' + Math.random().toString(36).substring(2, 12).toUpperCase() + '-' + Math.random().toString(36).substring(2, 12).toUpperCase();
        const previewCode = document.getElementById('preview-code');
        if (previewCode) previewCode.textContent = code;

        toastManager.show('¡Contrato firmado digitalmente!', 'success');
    }

    function downloadLicensedTrack() {
        if (!isSigned) {
            toastManager.show('Firma el contrato primero', 'error');
            return;
        }

        let purchase;
        try { purchase = JSON.parse(localStorage.getItem('beaststore_last_purchase')); } catch (error) { purchase = null; }
        if (!purchase?.audioUrl) {
            toastManager.show('No se encontró la pista de la compra', 'error');
            return;
        }

        const extension = purchase.audioUrl.split('?')[0].split('.').pop() || 'mp3';
        const safeTitle = (purchase.title || 'pista').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '');
        const link = document.createElement('a');
        link.href = purchase.audioUrl;
        link.download = `FJ_BEAST_${safeTitle}_${purchase.licenseType || 'basic'}.${extension}`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toastManager.show(`Descarga iniciada: ${purchase.licenseName || 'licencia adquirida'}`, 'success');
    }

    function downloadContract() {
        const contractText = `CONTRATO DE LICENCIA Y COMPRA DE INSTRUMENTAL MUSICAL

FJ BEAST

Número de Contrato: BS-__________
Fecha: ____ / ____ / ______

PARTES DEL CONTRATO

PROPIETARIO Y LICENCIANTE:
FJ BEAST

CLIENTE Y LICENCIATARIO:
Nombre Completo: ______________________________________
Documento de Identidad: _________________________________
Correo Electrónico: _____________________________________
Dirección: _____________________________________________
País: _________________________________________________

PRIMERA: OBJETO DEL CONTRATO
LA EMPRESA concede al CLIENTE una licencia de uso sobre la instrumental musical descrita.

SEGUNDA: PROPIEDAD INTELECTUAL
La compra de la instrumental no transfiere la propiedad intelectual ni los derechos de autor de la obra, salvo que se especifique expresamente mediante una Licencia Exclusiva.

TERCERA: DERECHOS DEL CLIENTE
El CLIENTE podrá utilizar la instrumental únicamente de acuerdo con las condiciones de la licencia adquirida.

CUARTA: PROHIBICIONES
El CLIENTE no podrá revender, regalar o redistribuir la instrumental. No podrá reclamarse autor o propietario de la instrumental.

QUINTA: PAGOS
El CLIENTE declara haber realizado el pago correspondiente mediante el método autorizado por FJ BEAST.

SEXTA: ENTREGA DEL PRODUCTO
Una vez confirmado el pago, LA EMPRESA entregará al CLIENTE los archivos digitales correspondientes.

SÉPTIMA: LIMITACIÓN DE RESPONSABILIDAD
LA EMPRESA no será responsable por pérdidas económicas, daños indirectos o uso indebido de la instrumental.

OCTAVA: VIGENCIA
El presente contrato entrará en vigor a partir de la fecha de su firma digital.

NOVENA: LEGISLACIÓN APLICABLE
El presente contrato se regirá e interpretará conforme a las leyes aplicables de la jurisdicción correspondiente.`;

        const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FJ_BEAST_Contrato_Licencia.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toastManager.show('Contrato descargado exitosamente', 'success');
    }

    function downloadSignedContract() {
        if (!isSigned || !savedSignature) {
            toastManager.show('Firma el contrato primero', 'error');
            return;
        }

        const name = document.getElementById('contract-name')?.value || '';
        const doc = document.getElementById('contract-doc')?.value || '';
        const email = document.getElementById('contract-email')?.value || '';
        const address = document.getElementById('contract-address')?.value || '';
        const country = document.getElementById('contract-country')?.value || '';
        const license = document.getElementById('contract-license')?.value || '';
        const beat = document.getElementById('contract-beat')?.value || '';
        const contractNum = document.getElementById('preview-contract-num')?.textContent || 'BS-000000';
        const dateStr = document.getElementById('preview-date')?.textContent || '';
        const code = document.getElementById('preview-code')?.textContent || '';
        const signDateStr = document.getElementById('sign-date')?.textContent || '';

        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = 800;
        exportCanvas.height = 1100;
        const ctx = exportCanvas.getContext('2d');

        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        ctx.strokeStyle = '#241b4e';
        ctx.lineWidth = 3;
        ctx.strokeRect(15, 15, 770, 1070);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, 760, 1060);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 22px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CONTRATO DE LICENCIA Y COMPRA', 400, 60);
        ctx.font = 'bold 18px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('FJ BEAST', 400, 90);

        ctx.fillStyle = '#9d4edd';
        ctx.beginPath();
        ctx.arc(400, 115, 8, 0, Math.PI * 2);
        ctx.fill();

        let y = 150;
        const lh = 20;

        function sectionTitle(text, yy) {
            ctx.fillStyle = '#9d4edd';
            ctx.font = 'bold 14px "Plus Jakarta Sans", Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(text, 40, yy);
            ctx.fillStyle = '#9d4edd';
            ctx.fillRect(40, yy + 5, 200, 1);
            return yy + lh + 5;
        }

        function bodyText(text, yy, indent = 0) {
            ctx.fillStyle = '#f0f2f5';
            ctx.font = '12px "Courier New", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(text, 40 + indent, yy);
            return yy + lh;
        }

        y = sectionTitle('INFORMACIÓN DEL CONTRATO', y);
        y = bodyText(`Número: ${contractNum}`, y);
        y = bodyText(`Fecha: ${dateStr}`, y);
        y += 10;

        y = sectionTitle('PARTES', y);
            y = bodyText('LICENCIANTE: FJ BEAST', y);
        y = bodyText(`LICENCIATARIO: ${name}`, y);
        y = bodyText(`Documento: ${doc}`, y);
        y = bodyText(`Email: ${email}`, y);
        y = bodyText(`Dirección: ${address}`, y);
        y = bodyText(`País: ${country}`, y);
        y += 10;

        y = sectionTitle('OBJETO DEL CONTRATO', y);
        y = bodyText(`Instrumental: ${beat || 'No especificada'}`, y);
        y = bodyText(`Licencia: ${license}`, y);
        y += 10;

        y = sectionTitle('TÉRMINOS Y CONDICIONES', y);
        y = bodyText('1. La compra NO transfiere propiedad intelectual.', y);
        y = bodyText('2. El cliente puede grabar y distribuir según la licencia.', y);
        y = bodyText('3. PROHIBIDO revender, redistribuir o reclamar autoría.', y);
            y = bodyText('4. FJ BEAST no se hace responsable por uso indebido.', y);
        y = bodyText('5. El contrato entra en vigor desde la firma digital.', y);
        y += 15;

        y = sectionTitle('FIRMA DIGITAL DEL CLIENTE', y);
        y += 10;

        const sigImg = new Image();
        sigImg.onload = function() {
            ctx.drawImage(sigImg, 40, y, 280, 70);
            y += 90;

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 12px "Plus Jakarta Sans", Arial, sans-serif';
            ctx.fillText(name, 40, y); y += lh;

            ctx.fillStyle = '#8a8ea8';
            ctx.font = '11px "Courier New", monospace';
            ctx.fillText(`Firmado el: ${signDateStr}`, 40, y); y += lh;
            ctx.fillText(`Código: ${code}`, 40, y); y += lh;
            ctx.fillText(`IP: ${navigator.userAgent.substring(0, 50)}`, 40, y);

            ctx.fillStyle = '#8a8ea8';
            ctx.font = '10px "Plus Jakarta Sans", Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Este documento fue generado digitalmente por FJ BEAST', 400, 1070);
            ctx.fillText('FJ BEAST | © 2026 Cyber Galaxy Edition', 400, 1085);

            const link = document.createElement('a');
            link.download = `FJ_BEAST_Contrato_${contractNum}.png`;
            link.href = exportCanvas.toDataURL('image/png');
            link.click();

            toastManager.show('Contrato firmado descargado como imagen', 'success');
        };
        sigImg.onerror = function() {
            toastManager.show('Error al generar el contrato', 'error');
        };
        sigImg.src = savedSignature;
    }

    // ============================================
    // POLICIES
    // ============================================
    function openPolicies() {
        document.getElementById('policies-modal')?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePolicies() {
        document.getElementById('policies-modal')?.classList.remove('active');
        document.body.style.overflow = '';
    }

    function downloadPolicies() {
        const policiesText = `POLÍTICAS Y TÉRMINOS - FJ BEAST

📋 Política de la Empresa

1. Misión
Proporcionar instrumentales y servicios musicales de alta calidad a artistas, productores y creadores de contenido, ofreciendo una experiencia de compra segura, rápida y profesional.

2. Visión
Convertirnos en una de las principales plataformas de venta de instrumentales y licencias musicales a nivel internacional, impulsando el crecimiento de artistas emergentes y profesionales.

3. Valores
• Profesionalismo
• Transparencia
• Creatividad e innovación
• Responsabilidad
• Respeto hacia nuestros clientes y colaboradores
• Calidad en nuestros productos y servicios

4. Calidad del Servicio
FJ BEAST se compromete a ofrecer instrumentales originales y de alta calidad, mantener la plataforma disponible y segura, proporcionar información clara sobre precios y licencias, y atender las consultas de los clientes de manera oportuna y profesional.

5. Seguridad y Privacidad
Toda la información personal y de pago proporcionada por los clientes será tratada de manera confidencial y utilizada únicamente para fines relacionados con las operaciones de la plataforma.

6. Propiedad Intelectual
Todas las instrumentales, diseños, logotipos, marcas y contenidos publicados en FJ BEAST están protegidos por las leyes de propiedad intelectual y no podrán ser utilizados sin autorización expresa de la empresa.

👤 Política del Cliente

1. Uso de la Plataforma
Al utilizar FJ BEAST, el cliente acepta cumplir con todas las políticas, términos y condiciones establecidos por la empresa.

2. Compras y Licencias
• Cada instrumental adquirida incluye únicamente los derechos especificados en la licencia seleccionada.
• La compra de una instrumental no transfiere la propiedad intelectual de la obra.
• Las licencias tienen limitaciones y condiciones que deben ser respetadas.

3. Pagos
• Todos los pagos deben realizarse mediante los métodos de pago autorizados por la plataforma.
• Los precios pueden cambiar sin previo aviso.
• Las compras se procesarán únicamente después de la confirmación del pago.

4. Reembolsos
Debido a la naturaleza digital de los productos, las ventas son generalmente finales y no reembolsables, excepto en casos de:
• Error de facturación.
• Archivo dañado o incorrecto.
• Problemas técnicos atribuibles a la plataforma.

5. Uso Permitido
• Descargar y utilizar las instrumentales según los términos de la licencia adquirida.
• Publicar proyectos musicales respetando las limitaciones de la licencia.

6. Uso Prohibido
• Revender, compartir o redistribuir las instrumentales sin autorización.
• Reclamar la autoría de una instrumental adquirida.
• Utilizar el contenido para actividades ilegales o que infrinjan derechos de terceros.
• Manipular o intentar vulnerar la seguridad de la plataforma.

7. Suspensión de Cuenta
FJ BEAST se reserva el derecho de suspender o cancelar la cuenta de cualquier usuario que incumpla estas políticas, sin obligación de realizar reembolsos.

8. Modificaciones
La empresa podrá actualizar estas políticas en cualquier momento. El uso continuo de la plataforma constituye la aceptación de dichas modificaciones.`;

        const blob = new Blob([policiesText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FJ_BEAST_Politicas.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toastManager.show('Políticas descargadas', 'success');
    }

    // ============================================
    // INIT
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        storeManager.init();
        cartManager.init();
        player.init();
        beastChat.init();
        initSignatureCanvas();
        updateContractPreview();

        // Modal close on backdrop click
        document.getElementById('checkout-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'checkout-modal') cartManager.closeCheckout();
        });
        document.getElementById('policies-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'policies-modal') closePolicies();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cartManager.closeCheckout();
                closePolicies();
                beastChat.close();
            }
        });

        // Storage sync
        window.addEventListener('storage', (e) => {
            if (e.key === 'beaststore_admin_beats') {
                location.reload();
            }
        });
    });
