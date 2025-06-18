const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];
const listaServicos = document.getElementById("listaServicos");

function renderServicos(filtro = "") {
  listaServicos.innerHTML = "";
  servicos
    .filter((s) => {
      const dataOriginal = s.data;
      const dataFormatada = dataOriginal.includes("-")
        ? dataOriginal
        : dataOriginal.split("/").reverse().join("-");
      return dataFormatada.includes(filtro);
    })
    .forEach((s) => {
      const veiculo = veiculos[s.veiculoIndex];
      const cliente = clientes[veiculo?.clienteIndex]?.nome || "Desconhecido";
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Data:</strong> ${s.data}<br>
        <strong>Veículo:</strong> ${veiculo?.modelo || "?"} (${veiculo?.placa || "?"})<br>
        <strong>Cliente:</strong> ${cliente}<br>
        <strong>Descrição:</strong> ${s.descricao}<br>
        <strong>Valor:</strong> R$ ${s.valor.toFixed(2)}
      `;
      listaServicos.appendChild(li);
    });
}

document.getElementById("filtroServico").addEventListener("input", (e) => renderServicos(e.target.value));
renderServicos();