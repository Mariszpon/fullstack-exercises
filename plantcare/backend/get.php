<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "conexao.php";

// Consulta
$sql = $pdo->prepare("
SELECT *
FROM plantas
WHERE ativo = 1
");

$sql->execute();

// Retorna JSON
echo json_encode(
    $sql->fetchAll(PDO::FETCH_ASSOC)
);
