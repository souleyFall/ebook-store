<?php

require_once '../data/comments.php';
require_once '../config.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'list':
        handleListComments();
        break;
    case 'add':
        handleAddComment();
        break;
    default:
        jsonResponse(['success' => false, 'message' => 'Action non reconnue'], 400);
}

function handleListComments() {
    if (!isset($_GET['productId'])) {
        jsonResponse(['success' => false, 'message' => 'ID de produit requis'], 400);
    }
    
    $productId = $_GET['productId'];
    $comments = getCommentsByProductId($productId);
    
    jsonResponse(['success' => true, 'comments' => $comments]);
}

function handleAddComment() {
    // Vérifier si l'utilisateur est connecté
    if (!isLoggedIn()) {
        jsonResponse(['success' => false, 'message' => 'Vous devez être connecté pour laisser un commentaire'], 403);
    }
    
    // Vérifier si la méthode est POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Méthode non autorisée'], 405);
    }
    
    // Récupérer les données envoyées
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validation des données
    if (!isset($data['productId']) || !isset($data['comment']) || !isset($data['rating'])) {
        jsonResponse(['success' => false, 'message' => 'Données incomplètes'], 400);
    }
    
    // Vérifier si le produit existe
    $product = getProductById($data['productId']);
    if (!$product) {
        jsonResponse(['success' => false, 'message' => 'Produit non trouvé'], 404);
    }
    
    // Dans un environnement réel, nous ajouterions le commentaire à la base de données
    // Ici, nous simulons juste une réponse réussie
    jsonResponse([
        'success' => true, 
        'message' => 'Commentaire ajouté avec succès',
        'commentId' => 5 // Simuler un ID généré
    ]);
}
