function fazerRequisicao(url, metodo = 'GET', callbackSucesso, callbackErro) {
    var xhr = new XMLHttpRequest();

    xhr.open(metodo, url, true);


    xhr.onload = function() {
        try {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Requisição bem-sucedida, parse da resposta
                var dados = JSON.parse(xhr.responseText);
                callbackSucesso(dados); // Chama o callback com os dados
            } else {
                // Trata erros de status HTTP não-sucedidos
                callbackErro(`Erro na requisição: ${xhr.statusText} (status: ${xhr.status})`);
            }
        } catch (erro) {
            // Trata erros na manipulação da resposta
            callbackErro(`Erro no processamento da resposta: ${erro.message}`);
        }
    };

    // Define a função para tratar erros de rede
    xhr.onerror = function() {
        callbackErro('Erro de rede ou CORS. Não foi possível completar a requisição.');
    };

    // Envia a requisição
    xhr.send();
}

// Função para atualizar a interface do usuário com os dados recebidos
function atualizarInterface(dados, elementoId) {
    var lista = document.getElementById(elementoId);
    lista.innerHTML = ''; // Limpa a lista atual

    // Itera pelos dados e cria os elementos para exibir
    dados.forEach(function(item) {
        var listItem = document.createElement('li');
        listItem.textContent = item.nome + ' - R$ ' + item.preco;
        lista.appendChild(listItem);
    });
}

// Função chamada quando o usuário clica no botão para carregar produtos
function carregarProdutos() {
    var url = 'https://api.empresa.com/mercadorias';
    
    fazerRequisicao(
        url, 
        'GET', 
        function(dados) {
            atualizarInterface(dados, 'lista-produtos'); // Atualiza a interface com os dados de sucesso
        }, 
        function(erro) {
            console.error(erro); // Exibe erros no console
            alert(erro); // Opcional: alerta o usuário sobre o erro
        }
    );
}

// Exemplo de uso: associar a função de carregar produtos ao clique de um botão
document.getElementById('botao-carregar').addEventListener('click', carregarProdutos);