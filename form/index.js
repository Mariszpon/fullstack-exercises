// - - - ANIMAÇÃO - - -

const container = document.querySelector('.container');
const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');

sign_up_btn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
});     

// document.querySelector('.container') → pega o elemento com a classe .container.
// Diferença pro getElementById → pega só pelo id)
// querySelector → pega qualquer coisa usando seletores CSS


// sign_up_btn.addEventListener('click', ...) → quando o botão de cadastro é clicado, o JS adiciona a classe sign-up-mode ao container.
// Isso ativa o CSS que criei pra mostrar a tela de cadastro (provavelmente com animação, transição, etc.).

// .addEventListener('click', ...) → “quando alguém clicar nesse botão, execute uma função”
// O 'click' é o tipo de evento que você está ouvindo. Poderia ser 'mouseover', 'keydown', etc.

// () => { ... } → Essa é uma arrow function (função de seta)
// Ela define o que vai acontecer quando o clique for detectado
// No caso, o que está dentro das chaves { ... } é a ação que será executada.
// Dentro dos parênteses você colocaria parâmetros que a função recebe.
// Como não precisa de nenhum parâmetro (não usa informações extras do clique), os parênteses ficam vazios.

// container.classList.add('sign-up-mode');
// .classList é uma lista de todas as classes que esse elemento (container) tem
// .add('sign-up-mode') adiciona a classe sign-up-mode ao container
// Resultado: o CSS que depende dessa classe entra em ação
// container.classList.remove('sign-up-mode');
// O .remove faz o contrário do .add, removendo a classe sign-up-mode do container
// Resultado: o layout volta pro estado original


// sign_in_btn.addEventListener('click', ...) → quando o botão de login é clicado, o JS remove a classe sign-up-mode.
// Isso volta o container pro estado original, mostrando a tela de login.



// - - - VALIDAÇÃO - - -

const dados = {
  usuario: document.querySelector("input[placeholder='Nome de Usuário']").value,
  email: document.querySelector("input[placeholder='Email']").value,
  telefone: document.querySelector("input[placeholder='Número de Telefone']").value,
  nascimento: document.querySelector("input[placeholder='Data de nascimento']").value,
  senha: document.querySelector("input[placeholder='Senha']").value,
  confirmacao: document.querySelector("input[placeholder='Confirmação de senha']").value
};

/*
Fetch pega os valores digitados nos inputs do formulário e manda para o servidor.
method: "POST", = Método que indica que estou mandando informações além de pedir
Headers: = como os dados estão sendo enviados e o que o servidor deve esperar.
body: = é o conteúdo que vai ser enviado.
body: JSON.stringify(dados) = transforma o objeto JS em texto JSON para o PHP entender.
*/
fetch("processa.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json" /*formato*/
  },
  body: JSON.stringify(dados)
})

/*
.then(response => response.json()) = Quando o servidor responde, o JS pega a resposta e transforma em JSON.
Ou seja, transforma o texto que o PHP devolveu (echo json_encode(...)) em um objeto JavaScript.

.then(data => {
  console.log("Resposta do servidor:", data);
})
Depois que a resposta foi convertida em JSON, ela cai aqui como data.
Usa esse data para mostrar mensagens na tela, atualizar o layout, etc

.catch(error => console.error("Erro:", error))
Se acontecer algum problema (servidor fora do ar, erro de rede, JSON inválido), o código cai aqui.
O catch serve para tratar erros e evitar que o programa quebre.
Nesse caso, ele mostra no console:
“Erro: error”
error serve pra mostrar o motivo do problema
*/
.then(response => response.json())
.then(data => {
  console.log("Resposta do servidor:", data);
})
.catch(error => console.error("Erro:", error))
