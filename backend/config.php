<?php
// config.php
session_start();
header('Content-Type: application/json');

// Permettre les requêtes CORS depuis le frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gestion des requêtes OPTIONS préliminaires (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Fonction pour générer une réponse JSON
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return isset($_SESSION['user']);
}

// Fonction pour vérifier si l'utilisateur est administrateur
function isAdmin() {
    return isLoggedIn() && $_SESSION['user']['role'] === 'admin';
}

// Fonction pour obtenir les données de l'utilisateur courant
function getCurrentUser() {
    return isLoggedIn() ? $_SESSION['user'] : null;
}

