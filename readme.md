# Monquotidien Massira — Site vitrine (vanilla HTML/CSS/JS)

- Pile: HTML5 + CSS3 + JavaScript (sans frameworks)
- Pages/sections: Hero, À propos, Menu (filtrable), Galerie (lightbox), Avis, Localisation/Contact, Footer
- Accessibilité: sémantique, alt text, navigation clavier, contrastes élevés, focus visibles
- SEO: balises OG/Twitter, JSON-LD LocalBusiness, métadonnées
- Performance: images lazy-load, CSS/JS minifiés (`styles.min.css`, `app.min.js`), impression du menu en PDF
- i18n: Français par défaut, anglais via interrupteur (statique)

## Lancer

Ouvrir `index.html` dans un navigateur. Aucun build requis.

## Contenu & sources (obligatoire, sans placeholders)

- Nom & type: « Monquotidien Massira — Café • Boulangerie • Pâtisserie • Restaurant » (brand: mon-quotidien.ma)
- Adresse: Doha forum 1 lot numéro 1, Magasin N°1, en face du complexe sportif Zerktouni, Marrakech
- Téléphone: `+212 5 24 34 14 61` (tel link: `tel:+212524341461`)
- Carte: coordonnées 31.6280687, -8.0537533 (Google Maps embed + bouton Itinéraire)
- Cuisines/mots-clés: Italian, French, Moroccan, International, Mediterranean; breakfast, lunch, dinner; bakery/pastry
- Réseaux: Instagram `@monquotidien.ma`

### Menu — Ingestion

- La page `app.js` interroge: `https://r.jina.ai/http://www.eat.ma/marrakech/monquotidien` pour récupérer les images du menu (scans publics Eat.ma), contournant CORS. Les vignettes « Page de menu » apparaissent dans la section Menu avec lien source.
- Si vous disposez d’une page TopMenu, ajoutez son URL et un parseur similaire (les points d’entrée sont regroupés dans `fetchEatMenu()` — à dupliquer/adapter).
- Les prix ne sont affichés que s’ils sont présents publiquement. Les scans Eat.ma ne contiennent pas de texte prix exploitable côté client; par conséquent le site affiche les pages du menu comme référence fidèle sans inventer d’informations.

Astuce: si vous extrayez les items/prix au format JSON, vous pouvez alimenter directement la grille via un `menu.json` (non requis). Exemple de schéma attendu:

```json
[{ "category":"Viennoiseries", "name":"Croissant au beurre", "desc":"Beurre AOP", "price":"15 DH" }]
```

### Galerie

- Utilise vos images locales du dossier `img/`. Ajoutez simplement des fichiers pour étoffer la grille (noms libres). Les images existantes: `gallery-1.jpeg` … `gallery-8.jpeg`, `traiteur-img1.jpg`, `traiteur-img2.jpg`, `dashbord.jpg`.

### Avis

- Slider d’extraits courts, sourcés « Tripadvisor » avec lien « Lire plus sur Tripadvisor ».

## Accessibilité

- Navigation clavier (skip-link, focus), contrastes 4.5:1 sur le texte courant, éléments interactifs accessibles (aria-roles/labels), visionneuse contrôlable au clavier.

## SEO/Performance

- Titre, meta description, OG/Twitter; Schema.org LocalBusiness (nom, adresse, téléphone, géo, cuisines)
- Lazy-load des images, CSS/JS minifiés. Bouton « Télécharger le menu (PDF) » active l’impression de la section Menu.

## Personnalisation

- Logo: placez votre logo à `img/logo.webp` et remplacez la source dans le header/SEO si souhaité.
- Couleurs/typo: variables dans `:root` de `styles.css`.

## Notes

- Horaires: « Vérifier les horaires par téléphone » (aucune copie d’horaires non confirmés).
- Aucune invention de prix: tout prix doit provenir d’une source publique.
- Le parsing Eat.ma s’appuie sur des images de menu (sources vérifiées au 2025-09). Si vous souhaitez des cartes d’items détaillées (nom/description/prix), fournissez un `menu.json` extrait des sources ou exposez une page avec texte structurée.
