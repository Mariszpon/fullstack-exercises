<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    http_response_code(200);
    exit();
}

require "conexao.php";

// Recebe dados
$dados = json_decode(
file_get_contents("php://input"),
true
);

// Faz UPDATE
$sql = $pdo->prepare("
UPDATE plantas
SET
nome = ?,
especie = ?,
ambiente = ?,
frequencia_rega = ?
WHERE id = ?
");

$sql->execute([

    $dados["nome"],
    $dados["especie"],
    $dados["ambiente"],
    $dados["frequencia_rega"],
    $dados["id"]

]);

echo json_encode([
    "mensagem" => "Atualizada"
]);
