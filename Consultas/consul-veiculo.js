const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
const listaVeiculos = document.getElementById("listaVeiculos");

function renderVeiculos(filtro = "") {
  listaVeiculos.innerHTML = "";
  veiculos
    .filter((v) =>
      v.placa.toLowerCase().includes(filtro.toLowerCase()) ||
      v.modelo.toLowerCase().includes(filtro.toLowerCase())
    )
    .forEach((v) => {
      const cliente = clientes[v.clienteIndex]?.nome || "Desconhecido";
      const li = document.createElement("li");
      li.innerHTML = `<strong>Modelo:</strong> ${v.modelo} <br><strong>Placa:</strong> ${v.placa} <br><strong>Dono:</strong> ${cliente}`;
      listaVeiculos.appendChild(li);
    });
}

document.getElementById("filtroVeiculo").addEventListener("input", (e) => renderVeiculos(e.target.value));
renderVeiculos();