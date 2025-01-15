// details.js - Funções para a tela de detalhes

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  // Pega o ID da URL

    // Exemplo de requisição para obter os detalhes do item
    fetch(`https://api.exemplo.com/details/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Preenche os campos com os dados
        document.getElementById('detail-id').textContent = data.id;
        document.getElementById('detail-name').textContent = data.name;
        document.getElementById('detail-email').textContent = data.email;

        // Preenche o modal de reimpressão com os mesmos dados
        document.getElementById('modal-id').textContent = data.id;
        document.getElementById('modal-name').textContent = data.name;
        document.getElementById('modal-email').textContent = data.email;
    })
    .catch(err => {
        console.error('Erro ao carregar detalhes:', err);
    });
});

// Função para exibir o modal de reimpressão
function mostrarModalReimpressao() {
    const modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'block';
}

// Função para reimprimir o conteúdo do modal
document.getElementById('reimprimir-confirm-btn').addEventListener('click', function() {
    const modalDetails = document.getElementById('modal-details');
    const printWindow = window.open('', '', 'height=800,width=600');
    
    // Imprimir o conteúdo do modal
    printWindow.document.write('<html><head><title>Reimprimir Detalhes</title></head><body>');
    printWindow.document.write(modalDetails.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Fechar o modal
document.getElementById('close-reimpressao').addEventListener('click', function() {
    const modal = document.getElementById('modal-reimpressao');
    modal.style.display = 'none';
});
