// Array para armazenar os amigos
const amigos = [];

// Função para adicionar um amigo
function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const nome = input.value.trim();

  if (!nome) {
    alert('Por favor, insira um nome válido.');
    return;
  }

  if (amigos.includes(nome)) {
    alert(`O nome "${nome}" já está na lista!`);
    return;
  }

  amigos.push(nome);
  atualizarLista();
  input.value = '';
  input.focus();
}

// Função para atualizar a lista exibida
function atualizarLista() {
  const lista = document.getElementById('listaAmigos');
  lista.innerHTML = '';

  amigos.forEach((amigo) => {
    const item = document.createElement('li');
    item.textContent = amigo;
    lista.appendChild(item);
  });
}

// Função para sortear o amigo secreto
function sortearAmigo() {
  const resultadoDiv = document.getElementById('resultado');

  if (amigos.length < 2) {
    alert('É necessário pelo menos 2 amigos para realizar o sorteio.');
    resultadoDiv.innerHTML = '';
    return;
  }

  // Faz uma cópia da lista para evitar modificá-la diretamente
  const sorteadores = [...amigos];
  const sorteados = [...amigos];
  const resultado = [];

  for (let i = 0; i < sorteadores.length; i++) {
    const sorteador = sorteadores[i];

    // Remove o próprio nome da lista de possíveis sorteados
    const possiveis = sorteados.filter((nome) => nome !== sorteador);

    // Verifica se ainda há possibilidades
    if (possiveis.length === 0) {
      alert('Não foi possível realizar o sorteio sem repetições. Tente novamente.');
      return;
    }

    // Sorteia um nome diferente do sorteador
    const indexSorteado = Math.floor(Math.random() * possiveis.length);
    const sorteado = possiveis[indexSorteado];

    // Adiciona o par ao resultado
    resultado.push(`${sorteador} tirou ${sorteado}`);

    // Remove o sorteado da lista para evitar repetições
    sorteados.splice(sorteados.indexOf(sorteado), 1);
  }

  // Exibe o resultado do sorteio
  resultadoDiv.innerHTML = '<h3>Resultado do Amigo Secreto:</h3>';
  resultado.forEach((par) => {
    const item = document.createElement('p');
    item.textContent = par;
    resultadoDiv.appendChild(item);
  });
}

// Função para limpar a lista de amigos
function limparLista() {
  amigos.length = 0;
  atualizarLista();

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';
}

// Adiciona evento para o botão Enter
const input = document.getElementById('amigo');
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    adicionarAmigo();
  }
});
