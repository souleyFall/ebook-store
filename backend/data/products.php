<?php
function getProducts() {
    // Dans un environnement réel, ces données viendraient d'une base de données
    return [
        [
            'id' => 1,
            'title' => 'Introduction à JavaScript',
            'description' => 'Ce livre couvre les bases de JavaScript pour les débutants. Vous apprendrez la syntaxe, les fonctions, les objets et comment manipuler le DOM pour créer des applications web interactives.',
            'price' => 19.99,
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiBpP3cQnJNnN9anuEvtJ4t1t6d5xQl9UNgQ&s',
            'category' => 'Développement Web',
            'author' => 'Jean Dupont',
            'rating' => 4.5,
            'ratingCount' => 24,
            'createdAt' => '2025-01-15T10:30:00Z'
        ],
        [
            'id' => 2,
            'title' => 'Maîtriser React JS',
            'description' => 'Apprenez à créer des applications web modernes avec React JS. Ce guide complet vous enseigne les hooks, le context API, Redux et les meilleures pratiques pour développer des interfaces utilisateur performantes.',
            'price' => 29.99,
            'image' => 'https://www.kozhuhds.com/_astro/react.4a6bdbb5_Z1MNHE0.webp',
            'category' => 'Développement Web',
            'author' => 'Sophie Martin',
            'rating' => 5.0,
            'ratingCount' => 18,
            'createdAt' => '2025-02-03T14:45:00Z'
        ],
        [
            'id' => 3,
            'title' => 'PHP Avancé et Architecture MVC',
            'description' => 'Découvrez les techniques avancées de PHP et comment implémenter le pattern MVC. Ce livre aborde également les bonnes pratiques de sécurité, l\'optimisation des performances et l\'intégration avec les bases de données.',
            'price' => 24.99,
            'image' => 'https://hamza-sehouli.com/storage/01J60QJJXZZ6TXJTBPJZM1ZCNS.png',
            'category' => 'Développement Backend',
            'author' => 'Michel Leroy',
            'rating' => 4.2,
            'ratingCount' => 15,
            'createdAt' => '2025-01-25T09:15:00Z'
        ],
        [
            'id' => 4,
            'title' => 'CSS Moderne avec Flexbox et Grid',
            'description' => 'Maîtrisez les techniques modernes de mise en page avec CSS Flexbox et Grid. Apprenez à créer des layouts responsives, des animations et des interfaces utilisateur élégantes.',
            'price' => 18.99,
            'image' => 'https://olivierschmitt.fr/wp-content/uploads/2015/04/web-css_logo.jpg',
            'category' => 'Développement Web',
            'author' => 'Emilie Petit',
            'rating' => 4.7,
            'ratingCount' => 21,
            'createdAt' => '2025-02-10T16:20:00Z'
        ],
        [
            'id' => 5,
            'title' => 'Sécurité des Applications Web',
            'description' => 'Ce guide essentiel couvre toutes les vulnérabilités courantes des applications web et comment les prévenir. Apprenez à protéger vos sites contre les injections SQL, XSS, CSRF et autres attaques.',
            'price' => 32.99,
            'image' => 'data:image/jpeg;base64,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',
            'category' => 'Cybersécurité',
            'author' => 'Alexandre Dubois',
            'rating' => 4.8,
            'ratingCount' => 30,
            'createdAt' => '2025-01-05T11:10:00Z'
        ],
    ];
}

function getProductById($id) {
    $products = getProducts();
    foreach ($products as $product) {
        if ($product['id'] == $id) {
            return $product;
        }
    }
    return null;
}