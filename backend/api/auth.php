<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../config.php';
require_once '../data/users.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'register':
        handleRegister();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        handleCheckAuth();
        break;
    default:
        jsonResponse(['success' => false, 'message' => 'Action non reconnue'], 400);
}

function handleLogin() {
    // Vérifier si la méthode est POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Méthode non autorisée'], 405);
    }
    
    // Récupérer les données envoyées
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['email']) || !isset($data['password'])) {
        jsonResponse(['success' => false, 'message' => 'Email et mot de passe requis'], 400);
    }
    
    $email = $data['email'];
    $password = $data['password'];
    
    // Trouver l'utilisateur par email
    $user = getUserByEmail($email);
    
    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (!$user || $user['password'] !== $password) { // En production, utilisez password_verify()
        jsonResponse(['success' => false, 'message' => 'Email ou mot de passe incorrect'], 401);
    }
    
    // Connexion réussie, stocker les informations de l'utilisateur en session
    $userSession = [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'],
    ];
    
    $_SESSION['user'] = $userSession;
    
    jsonResponse([
        'success' => true, 
        'message' => 'Connexion réussie',
        'user' => $userSession
    ]);
}

function handleLogout() {
    // Détruire la session
    session_destroy();
    
    jsonResponse([
        'success' => true, 
        'message' => 'Déconnexion réussie'
    ]);
}

function handleCheckAuth() {
    if (isLoggedIn()) {
        jsonResponse([
            'authenticated' => true,
            'user' => getCurrentUser()
        ]);
    } else {
        jsonResponse([
            'authenticated' => false
        ]);
    }
}

function handleRegister() {
    // Cette fonction serait implémentée pour enregistrer de nouveaux utilisateurs
    // Comme nous n'avons pas de base de données, elle est simplifiée ici
    jsonResponse(['success' => false, 'message' => 'Fonctionnalité non implémentée'], 501);
}
