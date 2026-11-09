<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    http_response_code(200);
    exit();
}

require "conexao.php";

// Recebe JSON
$dados = json_decode(
file_get_contents("php://input"),
true
);

// Prepara INSERT
$sql = $pdo->prepare("
INSERT INTO plantas
(nome, especie, ambiente, frequencia_rega)
VALUES (?, ?, ?, ?)
");

$sql->execute([

    $dados["nome"],
    $dados["especie"],
    $dados["ambiente"],
    $dados["frequencia_rega"]

]);

echo json_encode([
    "mensagem" => "Planta cadastrada"
]);
