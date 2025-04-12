document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Pegando os valores do formulário
    let modelo = document.getElementById("modelo").value;
    let servico = document.getElementById("servico").value;
    let dataEntrada = document.getElementById("dataEntrada").value;
    let dataSaida = document.getElementById("dataSaida").value;
    let valor = document.getElementById("valor").value;

    // Criando um objeto com os dados
    let servicoCadastrado = {
        modelo,
        servico,
        dataEntrada,
        dataSaida,
        valor
    };

    // Salvando no localStorage
    let listaServicos = JSON.parse(localStorage.getItem("servicos")) || [];
    listaServicos.push(servicoCadastrado);
    localStorage.setItem("servicos", JSON.stringify(listaServicos));

    // Limpando o formulário
    document.getElementById("formCadastro").reset();

    alert("Serviço cadastrado com sucesso!");
});

function carregarServicos() {
    let listaServicos = JSON.parse(localStorage.getItem("servicos")) || [];
    let tabela = document.getElementById("tabelaServicos");

    tabela.innerHTML = ""; // Limpa a tabela antes de recarregar

    listaServicos.forEach((servico, index) => {
        let linha = `
            <tr>
                <td>${servico.modelo}</td>
                <td>${servico.servico}</td>
                <td>${servico.dataEntrada}</td>
                <td>${servico.dataSaida ? servico.dataSaida : "N/A"}</td>
                <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                <td><button class="excluir" onclick="excluirServico(${index})">🗑 Excluir</button></td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

// Chamar a função quando a página carregar
document.addEventListener("DOMContentLoaded", carregarServicos);

function filtrarServicos() {
    let modeloFiltro = document.getElementById("filtroModelo").value.toLowerCase();
    let servicoFiltro = document.getElementById("filtroServico").value.toLowerCase();
    let dataFiltro = document.getElementById("filtroData").value;

    let listaServicos = JSON.parse(localStorage.getItem("servicos")) || [];
    let tabela = document.getElementById("tabelaServicos");

    tabela.innerHTML = ""; // Limpa a tabela

    listaServicos.forEach((servico, index) => {
        let modeloMatch = modeloFiltro === "" || servico.modelo.toLowerCase().includes(modeloFiltro);
        let servicoMatch = servicoFiltro === "" || servico.servico.toLowerCase().includes(servicoFiltro);
        let dataMatch = dataFiltro === "" || servico.dataEntrada === dataFiltro;

        if (modeloMatch && servicoMatch && dataMatch) {
            let linha = `
                <tr>
                    <td>${servico.modelo}</td>
                    <td>${servico.servico}</td>
                    <td>${servico.dataEntrada}</td>
                    <td>${servico.dataSaida ? servico.dataSaida : "N/A"}</td>
                    <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                    <td><button class="excluir" onclick="excluirServico(${index})">🗑 Excluir</button></td>
                </tr>
            `;
            tabela.innerHTML += linha;
        }
    });
}

function limparFiltros() {
    document.getElementById("filtroModelo").value = "";
    document.getElementById("filtroServico").value = "";
    document.getElementById("filtroData").value = "";
    carregarServicos(); // Recarrega a tabela sem filtros
}


function calcularResumo() {
    let listaServicos = JSON.parse(localStorage.getItem("servicos")) || [];

    let totalArrecadado = 0;
    let totalMotos = new Set(); // Para contar motos únicas
    let totalServicos = listaServicos.length;

    let hoje = new Date().toISOString().split("T")[0]; // Data de hoje no formato YYYY-MM-DD
    let dataAtual = new Date();
    let inicioSemana = new Date(dataAtual.setDate(dataAtual.getDate() - dataAtual.getDay())); // Primeiro dia da semana
    let inicioMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1); // Primeiro dia do mês

    let arrecadacaoDiaria = 0;
    let arrecadacaoSemanal = 0;
    let arrecadacaoMensal = 0;

    listaServicos.forEach(servico => {
        let valor = parseFloat(servico.valor) || 0;
        totalArrecadado += valor;
        totalMotos.add(servico.modelo);

        let dataServico = new Date(servico.dataEntrada);

        // Verifica arrecadação diária
        if (servico.dataEntrada === hoje) {
            arrecadacaoDiaria += valor;
        }

        // Verifica arrecadação semanal
        if (dataServico >= inicioSemana) {
            arrecadacaoSemanal += valor;
        }

        // Verifica arrecadação mensal
        if (dataServico >= inicioMes) {
            arrecadacaoMensal += valor;
        }
    });

    // Exibir valores na página
    document.getElementById("totalArrecadado").innerText = `R$ ${totalArrecadado.toFixed(2)}`;
    document.getElementById("totalMotos").innerText = totalMotos.size;
    document.getElementById("totalServicos").innerText = totalServicos;
    document.getElementById("arrecadacaoDiaria").innerText = `R$ ${arrecadacaoDiaria.toFixed(2)}`;
    document.getElementById("arrecadacaoSemanal").innerText = `R$ ${arrecadacaoSemanal.toFixed(2)}`;
    document.getElementById("arrecadacaoMensal").innerText = `R$ ${arrecadacaoMensal.toFixed(2)}`;
}

carregarServicos();
calcularResumo();

