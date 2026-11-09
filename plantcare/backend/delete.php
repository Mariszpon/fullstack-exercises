<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    http_response_code(200);
    exit();
}

require "conexao.php";

$dados = json_decode(
file_get_contents("php://input"),
true
);

// Soft delete
$sql = $pdo->prepare("
UPDATE plantas
SET ativo = 0
WHERE id = ?
");

$sql->execute([
    $dados["id"]
]);

echo json_encode([
    "mensagem" => "Planta excluída"
]);
