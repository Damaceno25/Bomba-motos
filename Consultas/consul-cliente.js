const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const listaClientes = document.getElementById("listaClientes");

function renderClientes(filtro = "") {
  listaClientes.innerHTML = "";
  clientes
    .filter((c) => c.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((c) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>Nome:</strong> ${c.nome}<br><strong>Telefone:</strong> ${c.telefone}`;
      listaClientes.appendChild(li);
    });
}

document.getElementById("filtroCliente").addEventListener("input", (e) => renderClientes(e.target.value));
renderClientes();