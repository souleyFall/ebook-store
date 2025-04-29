<?php

require_once '../data/products.php';
require_once '../config.php';
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'list':
        handleListProducts();
        break;
    case 'get':
        handleGetProduct();
        break;
    case 'add':
        handleAddProduct();
        break;
    case 'update':
        handleUpdateProduct();
        break;
    case 'delete':
        handleDeleteProduct();
        break;
    default:
        jsonResponse(['success' => false, 'message' => 'Action non reconnue'], 400);
}

function handleListProducts() {
    $products = getProducts();
    jsonResponse(['success' => true, 'products' => $products]);
}

function handleGetProduct() {
    if (!isset($_GET['id'])) {
        jsonResponse(['success' => false, 'message' => 'ID de produit requis'], 400);
    }
    
    $productId = $_GET['id'];
    $product = getProductById($productId);
    
    if (!$product) {
        jsonResponse(['success' => false, 'message' => 'Produit non trouvé'], 404);
    }
    
    jsonResponse(['success' => true, 'product' => $product]);
}

function handleAddProduct() {
    // Vérifier si l'utilisateur est admin
    if (!isAdmin()) {
        jsonResponse(['success' => false, 'message' => 'Accès refusé'], 403);
    }
    
    // Vérifier si la méthode est POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Méthode non autorisée'], 405);
    }
    
    // Récupérer les données envoyées
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validation des données (simplifiée)
    if (!isset($data['title']) || !isset($data['description']) || !isset($data['price'])) {
        jsonResponse(['success' => false, 'message' => 'Données incomplètes'], 400);
    }
    
    // Dans un environnement réel, nous ajouterions le produit à la base de données
    // Ici, nous simulons juste une réponse réussie
    jsonResponse([
        'success' => true, 
        'message' => 'Produit ajouté avec succès',
        'productId' => 6 // Simuler un ID généré
    ]);
}

function handleUpdateProduct() {
    // Vérifier si l'utilisateur est admin
    if (!isAdmin()) {
        jsonResponse(['success' => false, 'message' => 'Accès refusé'], 403);
    }
    
    // Vérifier si la méthode est PUT
    if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
        jsonResponse(['success' => false, 'message' => 'Méthode non autorisée'], 405);
    }
    
    // Vérifier si l'ID est fourni
    if (!isset($_GET['id'])) {
        jsonResponse(['success' => false, 'message' => 'ID de produit requis'], 400);
    }
    
    $productId = $_GET['id'];
    $product = getProductById($productId);
    
    if (!$product) {
        jsonResponse(['success' => false, 'message' => 'Produit non trouvé'], 404);
    }
    
    // Récupérer les données envoyées
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Dans un environnement réel, nous mettrions à jour le produit dans la base de données
    // Ici, nous simulons juste une réponse réussie
    jsonResponse([
        'success' => true, 
        'message' => 'Produit mis à jour avec succès'
    ]);
}

function handleDeleteProduct() {
    // Vérifier si l'utilisateur est admin
    if (!isAdmin()) {
        jsonResponse(['success' => false, 'message' => 'Accès refusé'], 403);
    }
    
    // Vérifier si la méthode est DELETE
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        jsonResponse(['success' => false, 'message' => 'Méthode non autorisée'], 405);
    }
    
    // Vérifier si l'ID est fourni
    if (!isset($_GET['id'])) {
        jsonResponse(['success' => false, 'message' => 'ID de produit requis'], 400);
    }
    
    $productId = $_GET['id'];
    $product = getProductById($productId);
    
    if (!$product) {
        jsonResponse(['success' => false, 'message' => 'Produit non trouvé'], 404);
    }
    
    // Dans un environnement réel, nous supprimerions le produit de la base de données
    // Ici, nous simulons juste une réponse réussie
    jsonResponse([
        'success' => true, 
        'message' => 'Produit supprimé avec succès'
    ]);
}
