class Companheiro {
    constructor(nome, temporada, idade) {
        this.id = Date.now(); // Gera um ID único baseado no timestamp
        this.nome = nome;
        this.temporada = temporada;
        this.idade = idade;
    }
}

class ListaCompanheiros {
    constructor() {
        this.companheiros = []; // Array para armazenar os companheiros
    }

    addCompanheiro(nome, temporada, idade) {
        const novoCompanheiro = new Companheiro(nome, temporada, idade);
        this.companheiros.push(novoCompanheiro);
        this.renderCompanheiros(); // Atualiza a lista
    }

    editCompanheiro(id, novoNome, novaTemporada, novaIdade) {
        const companheiro = this.companheiros.find(c => c.id === id);
        if (companheiro) {
            if (novoNome) companheiro.nome = novoNome;
            if (novaTemporada) companheiro.temporada = novaTemporada;
            if (novaIdade) companheiro.idade = novaIdade;
            this.renderCompanheiros(); // Atualiza a lista
        }
    }

    deleteCompanheiro(id) {
        this.companheiros = this.companheiros.filter(c => c.id !== id);
        this.renderCompanheiros(); // Atualiza a lista
    }

    renderCompanheiros() {
        const companheiroList = document.getElementById('companheiroList');
        companheiroList.innerHTML = ''; // Limpa a lista atual

        this.companheiros.forEach(companheiro => {
            const li = document.createElement('li');
            li.className = 'item-companheiro';
            li.textContent = `${companheiro.nome} - Temporada: ${companheiro.temporada}, Idade: ${companheiro.idade}`;

            // Botão de editar
            const editButton = document.createElement('button');
            editButton.className = 'btn-editar';
            editButton.textContent = 'Editar';
            editButton.onclick = () => this.handleEdit(companheiro.id);
            
            // Botão de excluir
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn-excluir';
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => this.deleteCompanheiro(companheiro.id);

            // Container para os botões
            const btnContainer = document.createElement('span');
            btnContainer.className = 'btn-companheiro';
            btnContainer.appendChild(editButton);
            btnContainer.appendChild(deleteButton);
            
            li.appendChild(btnContainer);
            companheiroList.appendChild(li);
        });
    }

    handleEdit(id) {
        const companheiro = this.companheiros.find(c => c.id === id);
        const novoNome = prompt('Edite o nome:', companheiro.nome);
        const novaTemporada = prompt('Edite a temporada:', companheiro.temporada);
        const novaIdade = prompt('Edite a idade:', companheiro.idade);

        this.editCompanheiro(id, novoNome, novaTemporada, novaIdade);
    }
}

// Instanciando a lista de companheiros
const listaCompanheiros = new ListaCompanheiros();

// Função para adicionar um companheiro ao clicar no botão de cadastrar
function addCompanheiro(event) {
    event.preventDefault(); // Impede o envio do formulário
    const nome = document.getElementById('nome').value.trim();
    const temporada = document.getElementById('temporada').value.trim();
    const idade = document.getElementById('idade').value;

    if (nome && temporada && idade) {
        listaCompanheiros.addCompanheiro(nome, temporada, idade); // Adiciona o novo companheiro
        document.getElementById('companheiro-form').reset(); // Reseta o formulário
    }
}
