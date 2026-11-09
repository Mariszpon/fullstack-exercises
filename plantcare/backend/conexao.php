<?php

// Credenciais
$host = "localhost";
$dbname = "plantcare";
$user = "root";
$pass = "";

// try e catch pra capturar os errinhos
try {

    // Conexão PDO
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $user,
        $pass
    );

    // Ativa exceções
    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch(PDOException $e){

    echo json_encode([
        "erro" => "Erro de conexão"
    ]);

    exit;
}
