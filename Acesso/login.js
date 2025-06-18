document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;

  // Aqui, você pode validar a senha se quiser.
  localStorage.setItem("usuarioLogado", username); // salva o nome
  window.location.href = "../index.html";
 // redireciona para a tela principal
});
