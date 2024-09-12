// Função para criar e enviar uma requisição XMLHttpRequest
function fazerRequisicao(url, metodo = 'GET', callbackSucesso, callbackErro) {
    var xhr = new XMLHttpRequest();

    // Configuração da requisição: método HTTP e URL da API
    xhr.open(metodo, url, true); // 'true' indica requisição assíncrona

    // Monitoramento do estado da requisição
    xhr.onreadystatechange = function() {
        // Verifica se a requisição foi concluída (readyState === 4)
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Verifica se a resposta foi bem-sucedida (status === 200)
            if (xhr.status === 200) {
                try {
                    // Requisição bem-sucedida, processa a resposta
                    var dados = JSON.parse(xhr.responseText);
                    callbackSucesso(dados);
                } catch (erro) {
                    // Tratamento de erros na manipulação da resposta
                    callbackErro(`Erro no processamento da resposta: ${erro.message}`);
                }
            } else {
                // Tratamento de erros caso o status seja diferente de 200
                callbackErro(`Erro na requisição: ${xhr.statusText} (status: ${xhr.status})`);
            }
        }
    };

    // Tratamento de erros de rede
    xhr.onerror = function() {
        callbackErro('Erro de rede ou CORS. Não foi possível completar a requisição.');
    };

    // Envio da requisição
    xhr.send();
}

// Função para atualizar a interface do usuário com os dados recebidos
function atualizarInterface(dados, elementoId) {
    var elemento = document.getElementById(elementoId);
    elemento.innerHTML = ''; // Limpa o conteúdo atual

    // Itera pelos dados e cria os elementos para exibir
    dados.forEach(function(produto) {
        var item = document.createElement('p');
        item.textContent = `${produto.nome}: R$ ${produto.preco}`;
        elemento.appendChild(item);
    });
}

// Função chamada quando o usuário clica no botão para carregar produtos
function carregarProdutos() {
    var url = 'https://api.empresa.com/mercadorias';
    
    fazerRequisicao(
        url, 
        'GET', 
        function(dados) {
            atualizarInterface(dados, 'resultado'); // Atualiza a interface com os dados de sucesso
        }, 
        function(erro) {
            console.error(erro); // Exibe erros no console
            alert(erro); // Opcional: alerta o usuário sobre o erro
        }
    );
}

// Exemplo de uso: associar a função de carregar produtos ao clique de um botão
document.getElementById('botao-carregar').addEventListener('click', carregarProdutos);