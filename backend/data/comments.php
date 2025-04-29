<?php

function getComments() {
    // Dans un environnement réel, ces données viendraient d'une base de données
    return [
        [
            'id' => 1,
            'productId' => 1,
            'userId' => 2,
            'userName' => 'Client Test',
            'comment' => 'Excellent livre pour les débutants en JavaScript. Très clair et bien expliqué.',
            'rating' => 5,
            'createdAt' => '2025-03-10T08:45:00Z'
        ],
        [
            'id' => 2,
            'productId' => 1,
            'userId' => 3,
            'userName' => 'Laura Blanc',
            'comment' => 'Bon contenu mais quelques exemples sont un peu dépassés.',
            'rating' => 4,
            'createdAt' => '2025-03-05T14:20:00Z'
        ],
        [
            'id' => 3,
            'productId' => 2,
            'userId' => 2,
            'userName' => 'Client Test',
            'comment' => 'Le meilleur livre sur React que j\'ai lu jusqu\'à présent. Très complet.',
            'rating' => 5,
            'createdAt' => '2025-03-15T10:30:00Z'
        ],
        [
            'id' => 4,
            'productId' => 3,
            'userId' => 4,
            'userName' => 'Thomas Robert',
            'comment' => 'Contenu avancé bien expliqué, mais manque d\'exemples pratiques.',
            'rating' => 4,
            'createdAt' => '2025-03-12T16:15:00Z'
        ],
    ];
}

function getCommentsByProductId($productId) {
    $allComments = getComments();
    $productComments = [];
    
    foreach ($allComments as $comment) {
        if ($comment['productId'] == $productId) {
            $productComments[] = $comment;
        }
    }
    
    return $productComments;
}
