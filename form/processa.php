<?php
header("Content-Type: application/json; charset=UTF-8");
// Resposta em JSON
// Charset é pra não dar problema com acentos e caracteres especiais

/* Lê os dados enviados pelo fetch
$input → é string que tem os dados enviados do navegador
file_get_contents →  lê o conteúdo de um arquivo/fluxo
php://input → fluxo contém os dados enviados na requisição HTTP
Qnd o JavaScript faz fetch("processa.php", { method: "POST", body: JSON.stringify(dados) }), esse JSON cai dentro do php://input.
Resultado: a variável $input vai conter uma string com o JSON enviado.

json_decode → transforma uma string JSON em uma estrutura que o PHP entende
O segundo parâmetro true faz com que o resultado seja um array associativo (em vez de um objeto).
*/
$input = file_get_contents("php://input"); //lê
$dados = json_decode($input, true); //traduz

// Caminho do arquivo JSON
$arquivo = "usuarios.json";

/* Se já existe, carrega os dados atuais
else = faz array vazia
*/
if (file_exists($arquivo)) {
    $usuarios = json_decode(file_get_contents($arquivo), true);
} else {
    $usuarios = [];
}

// Adiciona o novo cadastro
// transforma a senha em um hash (criptografa a senha)
// PASSWORD_DEFAULT indica qual algoritmo de criptografia deve ser usado para gerar o hash da senha.
$dados["senha"] = password_hash($dados["senha"], PASSWORD_DEFAULT);

/* checar se já existe usuário com o mesmo nome
foreach → percorre cada elemento do array $usuarios, um loop
as $u → para cada elemento dentro de $usuarios, coloque esse elemento temporariamente na variável $u
echo → imprime e json_encode → transforma array em JSON
exit → encerra a execução do script, não executando o restante do código
*/
foreach ($usuarios as $u) {
    if ($u["usuario"] === $dados["usuario"]) {
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Usuário já cadastrado."
        ]);
        exit;
    }
}

// Adiciona o novo cadastro
// obs: $dados é o novo usuário
$usuarios[] = $dados;

// Salva de volta no arquivo
// file_put_contents escreve dados em arquivo
// JSON_PRETTY_PRIN deixa o JSON bonitinho e identado, em vez de tudo numa linha só.
file_put_contents($arquivo, json_encode($usuarios, JSON_PRETTY_PRINT));

// Resposta para o frontend
echo json_encode([
    "status" => "ok",
    "mensagem" => "Usuário salvo com sucesso!",
    "recebido" => $dados
]);
?>
