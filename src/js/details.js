// details.js - Funções para a tela de detalhes

document.addEventListener('DOMContentLoaded', function () {
    // Substituindo URLSearchParams por uma função personalizada para extrair parâmetros da URL
    var urlParams = getUrlParams(window.location.search);
    var id = urlParams.id;  // Pega o ID da URL

    // Exemplo de requisição para obter os detalhes do item usando XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.exemplo.com/details/' + id, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // Preenche os campos com os dados
            document.getElementById('detail-id').textContent = data.id;
            document.getElementById('detail-name').textContent = data.name;
            document.getElementById('detail-email').textContent = data.email;

            // Preenche o modal de reimpressão com os mesmos dados
            document.getElementById('modal-id').textContent = data.id;
            document.getElementById('modal-name').textContent = data.name;
            document.getElementById('modal-email').textContent = data.email;
        } else if (xhr.readyState === 4) {
            console.error('Erro ao carregar detalhes:', xhr.statusText);
        }
    };

    xhr.send();
});

// Função personalizada para pegar parâmetros da URL (substitui URLSearchParams)
function getUrlParams(url) {
    var params = {};
    var queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
    var queryParts = queryString.split('&');

    for (var i = 0; i < queryParts.length; i++) {
        var pair = queryParts[i].split('=');
        if (pair.length === 2) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }
    return params;
}

// Função para exibir o modal de reimpressão
function mostrarModalReimpressao() {
    var modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'block';
}

// Função para reimprimir o conteúdo do modal
document.getElementById('reimprimir-confirm-btn').addEventListener('click', function () {
    var modalDetails = document.getElementById('modal-details');
    var printWindow = window.open('', '', 'height=800,width=600');

    // Imprimir o conteúdo do modal
    printWindow.document.write('<html><head><title>Reimprimir Detalhes</title></head><body>');
    printWindow.document.write(modalDetails.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Fechar o modal
document.getElementById('close-reimpressao').addEventListener('click', function () {
    var modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'none';
});
