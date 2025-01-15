function login() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Pega o token da URL

    if (token) {
        // Simula uma requisição de login para verificar o token
        fetch('https://api.exemplo.com/login', {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`
                'Authorization': "Bearer ${token}"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Salva o token no sessionStorage
                sessionStorage.setItem('auth_token', token);
                window.location.href = 'search.html'; // Redireciona para a tela 2
            } else {
                document.getElementById('error-message').innerText = 'Erro no login. Tente novamente.';
            }
        })
        .catch(err => {
            console.error(err);
            console.log("Erro login");
            document.getElementById('error-message').innerText = 'Erro no login. Tente novamente.';
        });
    } else {
        document.getElementById('error-message').innerText = 'Token não fornecido.';
    }
}

function goToSearch() {
    window.location.href = 'search.html'; // Redireciona diretamente para a tela 2
}

window.onload = login;

document.getElementById('go-to-search-btn').addEventListener('click', goToSearch);