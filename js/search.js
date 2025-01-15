// search.js - Funções para a tela de pesquisa

// Função para pesquisar
function pesquisar() {
    const query = document.getElementById('search-query').value;
    
    // Exemplo de requisição para pesquisa
    fetch(`https://api.exemplo.com/search?q=${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const resultBody = document.getElementById('result-body');
        resultBody.innerHTML = '';  // Limpar a tabela antes de preencher

        data.results.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td><button id="detalhes-btn" onclick="mostrarModal(${item.id})">Ver Detalhes</button></td>
            `;
            resultBody.appendChild(row);
        });

    })
    .catch(err => {
        const row = document.createElement('tr');
        const resultBody = document.getElementById('result-body');
        resultBody.innerHTML = '';
        row.innerHTML = `
            <td>${123}</td>
            <td>${123}</td>
            <td>${123}</td>
            <td><button id="detalhes-btn" onclick="mostrarModal(${123})">Ver Detalhes</button></td>
        `;
        resultBody.appendChild(row);
        console.error('Erro na pesquisa:', err);
    });
}

// Função para selecionar todos os itens
function selecionarTodos() {
    const selectAllCheckbox = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.select-item');
    checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}

// Função para exibir o modal de confirmação antes de seguir para a tela de detalhes
function mostrarModal(id) {
    const modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'block';

    // Ao confirmar, redireciona para a página de detalhes
    document.getElementById('modal-btn-confirm').onclick = function() {
        window.location.href = `details.html?id=${id}`;
    };

    // Ao cancelar, fecha o modal
    document.getElementById('modal-btn-cancel').onclick = function() {
        modal.style.display = 'none';
    };
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'none';
}
