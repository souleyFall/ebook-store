<?php
function getUsers() {
    // Dans un environnement réel, ces données viendraient d'une base de données
    // Les mots de passe seraient hachés, ceci est simplifié pour l'exemple
    return [
        [
            'id' => 1,
            'name' => 'Admin',
            'email' => 'root@root',
            'password' => 'root', // En production, utilisez password_hash()
            'role' => 'admin',
        ],
        [
            'id' => 2,
            'name' => 'Client Test',
            'email' => 'client@client',
            'password' => 'client', // En production, utilisez password_hash()
            'role' => 'customer',
        ],
    ];
}

function getUserByEmail($email) {
    $users = getUsers();
    foreach ($users as $user) {
        if ($user['email'] === $email) {
            return $user;
        }
    }
    return null;
}
