// Guardando endereço dos arquivos PHP
const API = "http://localhost/plantcare/backend";

// Pegando elementos
const nome = document.getElementById("nome");
const especie = document.getElementById("especie");
const ambiente = document.getElementById("ambiente");
const rega = document.getElementById("rega");
const idPlanta = document.getElementById("idPlanta");

const btnCadastrar = document.getElementById("btnCadastrar");

// Executa GET ao abrir
listarPlantas();

btnCadastrar.addEventListener("click", salvarPlanta);

// GET
async function listarPlantas() {

    // Busca dados + converte para JSON
    const resposta = await fetch(`${API}/get.php`);
    const dados = await resposta.json();

    let html = "";

    // Percorre regustris
    dados.forEach(planta => {

        // Monta tabela
        html += `
        <tr>
            <td>${planta.id}</td>
            <td>${planta.nome}</td>
            <td>${planta.especie}</td>
            <td>${planta.ambiente}</td>
            <td>${planta.frequencia_rega}</td>

            <td>

                <button
                class="btnAtualizar"
                onclick="carregarEdicao(
                ${planta.id},
                '${planta.nome}',
                '${planta.especie}',
                '${planta.ambiente}',
                '${planta.frequencia_rega}'
                )">Atualizar</button>

                <button
                class="btnExcluir"
                onclick="excluirPlanta(${planta.id})">
                Excluir
                </button>

            </td>
        </tr>
        `;
    });

    // Atualiza tabela
    document.getElementById("listaPlantas").innerHTML = html;
}

// POST
async function salvarPlanta() {

    // Se for vazio, cadastra. Se não, atualiza.
    if(idPlanta.value === ""){
        cadastrarPlanta();
    } else {
        atualizarPlanta();
    }
}

async function cadastrarPlanta() {

    // Cria objeto
    const planta = {

        nome: nome.value,
        especie: especie.value,
        ambiente: ambiente.value,
        frequencia_rega: rega.value

    };

    // Envia pro PHP
    await fetch(`${API}/post.php`, {

        // Método POST
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        // Envia JSON
        body: JSON.stringify(planta)

    });

    limparCampos();
    // Faz novo GET
    listarPlantas();
}

// PUT
function carregarEdicao(id,nomeAtual,especieAtual,ambienteAtual,regaAtual){

    // Guarda ID
    idPlanta.value = id;

    // Coloca dados nos inputs
    nome.value = nomeAtual;
    especie.value = especieAtual;
    ambiente.value = ambienteAtual;
    rega.value = regaAtual;

    // Muda texto do botão
    btnCadastrar.textContent = "Salvar Alteração";
}

async function atualizarPlanta(){

    const planta = {
        id: idPlanta.value,
        nome: nome.value,
        especie: especie.value,
        ambiente: ambiente.value,
        frequencia_rega: rega.value

    };

    // Envia pro php
    await fetch(`${API}/put.php`, {

        // Método PUT
        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(planta)

    });

    // Atualiza tabela
    limparCampos();
    listarPlantas();
}

// DELETE
async function excluirPlanta(id){

    // Envia pro php
    await fetch(`${API}/delete.php`,{

        // Método DELETE
        method:"DELETE",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            id:id
        })

    });

    // Atualiza tabela
    listarPlantas();
}

function limparCampos(){

    nome.value = "";
    especie.value = "";
    ambiente.value = "";
    rega.value = "";

    idPlanta.value = "";

    btnCadastrar.textContent = "Cadastrar";
}
