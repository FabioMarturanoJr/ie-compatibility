// search.js - Funções para a tela de pesquisa

// Função para pesquisar
function pesquisar() {
    var query = document.getElementById('search-query').value;

    // Exemplo de requisição para pesquisa usando XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.exemplo.com/search?q=' + encodeURIComponent(query), true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Verifica se a requisição foi concluída
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var resultBody = document.getElementById('result-body');
                resultBody.innerHTML = '';  // Limpar a tabela antes de preencher

                for (var i = 0; i < data.results.length; i++) {
                    var item = data.results[i];
                    var row = document.createElement('tr');
                    row.innerHTML = '<td>' + item.id + '</td>' +
                                    '<td>' + item.name + '</td>' +
                                    '<td>' + item.email + '</td>' +
                                    '<td><button id="detalhes-btn" onclick="mostrarModal(' + item.id + ')">Ver Detalhes</button></td>';
                    resultBody.appendChild(row);
                }
            } else {
                console.error('Erro na pesquisa onreadystatechange:', xhr.statusText);
                montarResponseFake(query);
            }
        }
    };

    xhr.onerror = function() {
        console.error('Erro na pesquisa onerror:', xhr.statusText);
        montarResponseFake(query);
    };

    xhr.send();
}

// Função para mostrar o erro
function montarResponseFake(value) {
    var row = document.createElement('tr');
    var resultBody = document.getElementById('result-body');
    resultBody.innerHTML = ''; // Limpar a tabela antes de mostrar o erro
    row.innerHTML = '<td>' + value + '</td>' +
                    '<td>' + value + '</td>' +
                    '<td>' + value + '</td>' +
                    '<td><button id="detalhes-btn" onclick="mostrarModal(\'' + value + '\')">Ver Detalhes</button></td>';
    resultBody.appendChild(row);
}

// Função para selecionar todos os itens
function selecionarTodos() {
    var selectAllCheckbox = document.getElementById('select-all');
    var checkboxes = document.querySelectorAll('.select-item');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAllCheckbox.checked;
    }
}

// Função para exibir o modal de confirmação antes de seguir para a tela de detalhes
function mostrarModal(id) {
    var modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'block';

    // Ao confirmar, redireciona para a página de detalhes
    document.getElementById('modal-btn-confirm').onclick = function() {
        window.location.href = 'details.html?id=' + id;
    };

    // Ao cancelar, fecha o modal
    document.getElementById('modal-btn-cancel').onclick = function() {
        modal.style.display = 'none';
    };
}

// Função para fechar o modal
function fecharModal() {
    var modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'none';
}
