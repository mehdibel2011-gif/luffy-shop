import React, { useMemo, useState } from 'react';

const products = [
  { id: 1, name: 'Monkey D. Luffy', series: 'Film Stampede · Capitaine', price: 49.99, category: 'Équipage', image: 'https://www.onepiece-movie.jp/character/img/chara-01_pc.png', label: 'Le favori', bg: 'sand' },
  { id: 2, name: 'Roronoa Zoro', series: 'Film Stampede · Bretteur', price: 39.99, category: 'Équipage', image: 'https://www.onepiece-movie.jp/character/img/chara-02_pc.png', label: 'Populaire', bg: 'mint' },
  { id: 3, name: 'Nami', series: 'Film Stampede · Navigatrice', price: 34.99, category: 'Équipage', image: 'https://www.onepiece-movie.jp/character/img/chara-03_pc.png', label: 'Nouveauté', bg: 'peach' },
  { id: 4, name: 'Usopp', series: 'Film Stampede · Tireur', price: 29.99, category: 'Équipage', image: 'https://www.onepiece-movie.jp/character/img/chara-04_pc.png', label: 'Collection', bg: 'sand' },
  { id: 5, name: 'Sanji', series: 'Film Stampede · Cuisinier', price: 32.99, category: 'Équipage', image: 'https://www.onepiece-movie.jp/character/img/chara-05_pc.png', label: 'Collection', bg: 'peach' },
  { id: 6, name: 'Trafalgar Law', series: 'Film Stampede · Supernova', price: 44.99, category: 'Alliés', image: 'https://www.onepiece-movie.jp/character/img/chara-10_pc.png', label: 'Édition spéciale', bg: 'mint' },
];

const money = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

function BrandMark() {
  return <a className="brand" href="#home" aria-label="Grand Line Market, accueil"><span className="brand-icon">GL<span>✳</span></span><span className="brand-text">GRAND LINE<small>MARKET / COLLECTOR CLUB</small></span></a>;
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tout voir');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');

  const shown = useMemo(() => products.filter(p =>
    (category === 'Tout voir' || (category === 'Équipage' ? p.category === 'Équipage' : p.category === 'Alliés')) &&
    (p.name + ' ' + p.series).toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  const count = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + products.find(p => p.id === item.id).price * item.qty, 0);

  function add(id) {
    setCart(old => old.some(i => i.id === id)
      ? old.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      : [...old, { id, qty: 1 }]);
    setToast('Ajouté à ton sac de voyage ✓');
    window.setTimeout(() => setToast(''), 2200);
  }
  function changeQty(id, amount) {
    setCart(old => old.map(i => i.id === id ? { ...i, qty: i.qty + amount } : i).filter(i => i.qty > 0));
  }

  return <div className="site-shell">
    <div className="announcement"><span>✦</span> UNE NOUVELLE AVENTURE POUR LES COLLECTIONNEURS <span>✦</span></div>
    <header className="site-header">
      <BrandMark />
      <nav><a href="#shop">La boutique</a><a href="#story">Notre esprit</a><a href="#promise">Nos promesses</a></nav>
      <div className="header-actions">
        <label className="search-box"><span>⌕</span><input aria-label="Rechercher un personnage" placeholder="Trouver un trésor…" value={query} onChange={e => setQuery(e.target.value)} /></label>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier">Sac <span>{count}</span></button>
      </div>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot"></span> LE CLUB DES COLLECTIONNEURS</p>
          <h1>Le monde est<br/>à <em>collectionner.</em></h1>
          <p className="hero-description">Des personnages légendaires, des pièces à exposer et toute l’énergie de Grand Line. Trouve le prochain trésor de ton étagère.</p>
          <div className="hero-buttons"><a className="button button-dark" href="#shop">Explorer la collection <span>↗</span></a><a className="text-link" href="#story">Découvrir notre univers <span>→</span></a></div>
          <div className="hero-note"><div className="avatar-stack"><span>☠</span><span>波</span><span>★</span></div><p><b>Pour les fans, par des fans.</b><small>La passion est notre boussole.</small></p></div>
        </div>
        <div className="hero-art">
          <div className="sun-disc"></div><div className="hero-stamp">COLLECT<br/>YOUR<br/>DREAMS</div>
          <img className="hero-character" src="https://www.onepiece-movie.jp/character/img/chara-01_pc.png" alt="Monkey D. Luffy, visuel officiel du film One Piece Stampede" />
          <div className="floating-note"><span>01 / 06</span><b>CAPTAIN’S PICK</b></div>
          <div className="wave wave-one"></div><div className="wave wave-two"></div>
        </div>
        <div className="vertical-label">GRAND LINE MARKET · EST. 2026</div>
      </section>

      <section className="promise-strip" id="promise">
        <div><span className="promise-icon">✳</span><p><b>La sélection des fans</b><small>Une collection pleine de caractère</small></p></div>
        <div><span className="promise-icon">↗</span><p><b>Le plaisir de découvrir</b><small>De nouveaux trésors à chaque visite</small></p></div>
        <div><span className="promise-icon">♡</span><p><b>Un site pensé pour toi</b><small>Simple sur mobile comme sur PC</small></p></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-top"><div><p className="eyebrow">LA SÉLECTION DU MOMENT</p><h2>Les trésors <em>du bord.</em></h2></div><p className="section-intro">Choisis ton équipage. Chaque personnage a son histoire.</p></div>
        <div className="shop-controls"><div className="category-tabs">{['Tout voir', 'Équipage', 'Alliés'].map(c => <button key={c} className={category === c ? 'tab active' : 'tab'} onClick={() => setCategory(c)}>{c}</button>)}</div><span className="result-count">{shown.length} ARTICLES</span></div>
        <div className="product-grid">{shown.map((p, index) => <article className="product-card" key={p.id}>
          <div className={'product-image ' + p.bg}><span className="product-label">{p.label}</span><img src={p.image} alt={p.name + ' — visuel officiel One Piece'} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('image-fallback'); }} /><span className="image-fallback-text">ONE<br/>PIECE</span><span className="card-number">0{index + 1}</span></div>
          <div className="product-meta"><div><p className="product-series">{p.series}</p><h3>{p.name}</h3></div><button className="add-button" onClick={() => add(p.id)} aria-label={'Ajouter ' + p.name + ' au panier'}>＋</button></div>
          <div className="product-bottom"><span className="stock-dot"></span> Sélection collector <b>{money(p.price)}</b></div>
        </article>)}</div>
        {shown.length === 0 && <p className="empty-state">Aucun trésor trouvé. Essaie un autre nom.</p>}
        <p className="disclaimer">Prototype de boutique non affilié à la licence. Visuels distants issus du site officiel du film One Piece Stampede ; leur disponibilité peut varier.</p>
      </section>

      <section className="story-section" id="story">
        <div className="story-art"><div className="story-circle">FOLLOW<br/>YOUR<br/><b>WAVE</b></div><img src="https://www.onepiece-movie.jp/character/img/chara-02_pc.png" alt="Roronoa Zoro — visuel officiel" loading="lazy" onError={e => e.currentTarget.style.display='none'} /><span className="story-caption">NO MAP. NO LIMITS.</span></div>
        <div className="story-copy"><p className="eyebrow">NOTRE PHILOSOPHIE</p><h2>La passion<br/>ne connaît <em>pas de port.</em></h2><p>Une bonne collection ne se résume pas à une étagère : elle garde près de soi les histoires, les rêves et les personnages qui nous inspirent.</p><a className="button button-dark" href="#shop">Trouver mon prochain trésor <span>↗</span></a></div>
      </section>

      <section className="newsletter"><div><p className="eyebrow">UNE BOUTEILLE À LA MER</p><h2>Les nouveautés<br/>prennent le <em>large.</em></h2><p>Reçois les prochaines sélections et les nouveautés du club.</p></div><form onSubmit={e => { e.preventDefault(); setToast('Merci ! Inscription de démonstration uniquement.'); window.setTimeout(() => setToast(''), 2500); e.currentTarget.reset(); }}><input type="email" placeholder="Ton e-mail" aria-label="Ton e-mail" required /><button type="submit">Rejoindre le club ↗</button><small>Prototype : aucune adresse n’est envoyée ni enregistrée.</small></form></section>
    </main>
    <footer className="footer"><BrandMark/><span>Un prototype fait avec passion pour les collectionneurs.</span><span>© 2026 GRAND LINE MARKET</span></footer>

    {cartOpen && <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false); }}><aside className="cart-drawer" aria-label="Panier"><div className="drawer-heading"><div><p className="eyebrow">TON BUTIN</p><h2>Mon sac <em>({count})</em></h2></div><button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Fermer">×</button></div>
      {cart.length === 0 ? <div className="empty-cart"><span>✳</span><h3>Le sac est encore vide.</h3><p>Il est temps de partir à la recherche d’un trésor.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explorer la boutique ↗</button></div> : <><div className="cart-lines">{cart.map(item => { const p = products.find(x => x.id === item.id); return <div className="cart-line" key={item.id}><img src={p.image} alt="" onError={e => e.currentTarget.style.display='none'} /><div><b>{p.name}</b><small>{money(p.price)}</small><div className="quantity"><button onClick={() => changeQty(p.id, -1)} aria-label="Retirer un article">−</button><span>{item.qty}</span><button onClick={() => changeQty(p.id, 1)} aria-label="Ajouter un article">＋</button></div></div><strong>{money(p.price * item.qty)}</strong></div>; })}</div><div className="cart-total"><span>Total estimé</span><b>{money(total)}</b><button className="button button-dark" onClick={() => { setToast('Le paiement est désactivé dans cette démo.'); window.setTimeout(() => setToast(''), 2500); }}>Continuer <span>↗</span></button><small>Prototype uniquement : aucune commande ni paiement réel.</small></div></>}
    </aside></div>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

export default App;