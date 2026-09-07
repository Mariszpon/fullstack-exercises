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
