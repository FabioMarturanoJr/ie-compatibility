function login() {
    var urlParams = getUrlParams(window.location.search);
    var token = urlParams.token; // Pega o token da URL

    if (token) {
        // Simula uma requisição de login para verificar o token usando XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.exemplo.com/login', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // Verifica se a requisição foi concluída
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        // Salva o token no sessionStorage
                        sessionStorage.setItem('auth_token', token);
                        window.location.href = 'search.html'; // Redireciona para a tela 2
                    } else {
                        document.getElementById('error-message').innerText = 'Erro no login. Tente novamente.';
                    }
                } else {
                    console.error("Erro de requisição", xhr.statusText);
                    document.getElementById('error-message').innerText = 'Erro no login. Tente novamente.';
                }
            }
        };

        xhr.onerror = function() {
            console.error("Erro de rede");
            document.getElementById('error-message').innerText = 'Erro no login. Tente novamente.';
        };

        xhr.send();
    } else {
        document.getElementById('error-message').innerText = 'Token não fornecido.';
    }
}

function goToSearch() {
    window.location.href = 'search.html'; // Redireciona diretamente para a tela 2
}

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

window.onload = login;

document.getElementById('go-to-search-btn').addEventListener('click', goToSearch);
