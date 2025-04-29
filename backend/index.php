<?php
// Configuration de base
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

// Gestion des requêtes preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusion du fichier de configuration
require_once __DIR__ . '/config.php';

// Définition des chemins
define('API_PATH', __DIR__ . '/api');
define('DATA_PATH', __DIR__ . '/data');

// Récupération de l'URL demandée
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = '/backend'; // Ajustez selon votre configuration

// Extraction du chemin d'API en retirant le chemin de base
$api_path = str_replace($base_path, '', $request_uri);
$api_path = trim($api_path, '/');

// Récupération de la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Récupération des données de la requête
$input = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    $input = [];
}

// Fonction pour répondre avec un JSON
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Routage vers les endpoints d'API
$route_parts = explode('/', $api_path);
$main_route = $route_parts[0] ?? '';

switch ($main_route) {
    case 'auth':
        require_once API_PATH . '/auth.php';
        break;
        
    case 'products':
        require_once API_PATH . '/products.php';
        break;
        
    case 'cart':
        require_once API_PATH . '/cart.php';
        break;
        
    case 'comments':
        require_once API_PATH . '/comments.php';
        break;
        
    case 'orders':
        require_once API_PATH . '/orders.php';
        break;
        
    case '':
        // Page d'accueil de l'API
        jsonResponse([
            'status' => 'success',
            'message' => 'Bienvenue sur l\'API E-Shop',
            'endpoints' => [
                'auth' => '/auth',
                'products' => '/products',
                'cart' => '/cart',
                'comments' => '/comments',
                'orders' => '/orders'
            ]
        ]);
        break;
        
    default:
        // Endpoint non trouvé
        jsonResponse([
            'status' => 'error',
            'message' => 'Endpoint non trouvé'
        ], 404);
        break;
}

// Si on arrive ici, c'est que le fichier d'API n'a pas terminé l'exécution
jsonResponse([
    'status' => 'error',
    'message' => 'Une erreur inattendue s\'est produite'
], 500);
?>
