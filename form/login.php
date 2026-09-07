<?php
header("Content-Type: application/json; charset=UTF-8");

$input = file_get_contents("php://input");
$dados = json_decode($input, true);

$arquivo = "usuarios.json";

// Carrega os usuários cadastrados
if (file_exists($arquivo)) {
    $usuarios = json_decode(file_get_contents($arquivo), true);
    if (!is_array($usuarios)) {
        $usuarios = [];
    }
} else {
    $usuarios = [];
}

$usuarioEncontrado = null;

// Procura pelo usuário e verifica a senha com password_verify
foreach ($usuarios as $u) {
    if ($u["usuario"] === $dados["usuario"] && password_verify($dados["senha"], $u["senha"])) {
        $usuarioEncontrado = $u;
        break; // interrompe imediatamente um loop
    }
}

if ($usuarioEncontrado) {
    echo json_encode([
        "status" => "ok",
        "mensagem" => "Login realizado com sucesso!",
        "usuario" => $usuarioEncontrado["usuario"]
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Usuário ou senha inválidos."
    ]);
}
?>
