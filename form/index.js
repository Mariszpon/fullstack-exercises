document.addEventListener("DOMContentLoaded", () => {
/*
 garante que o JavaScript só rode depois que todo o HTML foi carregado pelo navegador.
 document é a página inteira (DOM)
 addEventListener("DOMContentLoaded", ...) → cria um “ouvinte” que espera o evento chamado DOMContentLoaded.
 Esse evento dispara quando o navegador já terminou de montar a estrutura do HTML 
*/

//- - - ANIMAÇÃO - - -

  const container = document.querySelector('.container');
  const sign_in_btn = document.querySelector('#sign-in-btn');
  const sign_up_btn = document.querySelector('#sign-up-btn');

  sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
  });

  sign_in_btn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });     

/*
 document.querySelector('.container') → pega o elemento com a classe .container.
 Diferença pro getElementById → pega só pelo id)
 querySelector → pega qualquer coisa usando seletores CSS


 sign_up_btn.addEventListener('click', ...) → quando o botão de cadastro é clicado, o JS adiciona a classe sign-up-mode ao container.
 Isso ativa o CSS que criei pra mostrar a tela de cadastro (provavelmente com animação, transição, etc.).

 .addEventListener('click', ...) → “quando alguém clicar nesse botão, execute uma função”
 O 'click' é o tipo de evento que você está ouvindo. Poderia ser 'mouseover', 'keydown', etc.

 () => { ... } → Essa é uma arrow function (função de seta)
 Ela define o que vai acontecer quando o clique for detectado
 No caso, o que está dentro das chaves { ... } é a ação que será executada.
 Dentro dos parênteses você colocaria parâmetros que a função recebe.
 Como não precisa de nenhum parâmetro (não usa informações extras do clique), os parênteses ficam vazios.

 container.classList.add('sign-up-mode');
 .classList é uma lista de todas as classes que esse elemento (container) tem
 .add('sign-up-mode') adiciona a classe sign-up-mode ao container
 Resultado: o CSS que depende dessa classe entra em ação
 container.classList.remove('sign-up-mode');
O .remove faz o contrário do .add, removendo a classe sign-up-mode do container
Resultado: o layout volta pro estado original


sign_in_btn.addEventListener('click', ...) → quando o botão de login é clicado, o JS remove a classe sign-up-mode.
  Isso volta o container pro estado original, mostrando a tela de login.
*/

// - - - CADASTRO - - -

  const formCadastro = document.querySelector(".sign-up-form");

  formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = {
      usuario: formCadastro.querySelector("input[name='usuario']").value,
      email: formCadastro.querySelector("input[name='email']").value,
      telefone: formCadastro.querySelector("input[name='telefone']").value,
      nascimento: formCadastro.querySelector("input[name='nascimento']").value,
      senha: formCadastro.querySelector("input[name='senha']").value,
      confirmacao: formCadastro.querySelector("input[name='confirmacao']").value
    };

    fetch("processa.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta do servidor:", data);
    })
    .catch(error => console.error("Erro:", error));
  });


  /*
  Explicações:

  Fetch pega os valores digitados nos inputs do formulário e manda para o servidor
  method: "POST", = Método que indica que estou mandando informações além de pedir
  Headers: = como os dados estão sendo enviados e o que o servidor deve esperar
  "Content-Type": tipo de conteúdo
  "application/json" = o corpo (body) da requisição está em formato JSON.
  body: = é o conteúdo que vai ser enviado.
  body: JSON.stringify(dados) = transforma o objeto JS em texto JSON para o PHP entender

  .then(response => response.json()) = Quando o servidor responde, o JS pega a resposta e transforma em JSON.
  Ou seja, transforma o texto que o PHP devolveu em um objeto JavaScript
  
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
  error serve pra mostrar detalhes do que deu errado, como mensagem de erro, stack trace, etc.
  */

 //- - - LOGIN - - -
  const formLogin = document.querySelector(".sign-in-form");

  formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = {
      usuario: formLogin.querySelector("input[name='usuario']").value,
      senha: formLogin.querySelector("input[name='senha']").value
    };

    fetch("login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta do servidor:", data);
      if (data.status === "ok") {
        alert("Bem-vindo, " + data.usuario + "!");
      } else {
        alert(data.mensagem);
      }
    })
    .catch(error => console.error("Erro:", error));
  });
});

/*   
formLogin.addEventListener("submit", = quando você clica no botão Login, essa função vai ser executada
 function(event) {event.preventDefault(); = cancela o comportamento padrão do formulário.

if (data.status === "ok") = vê o status do login.php

*/
