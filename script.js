let nomeConvidado = "";

// Funções do modal
function abrirModal() {
 document.getElementById("modal").style.display = "flex";
 document.getElementById("nomeInput").focus();
}

function fecharModal() {
 document.getElementById("modal").style.display = "none";
 document.getElementById("nomeInput").value = "";
}

// Função para criar efeito de confete
function createConfetti() {
 const confetti = document.createElement("div");
 confetti.className = "confetti";
 confetti.style.left = Math.random() * 100 + "vw";
 confetti.style.top = -10 + "px";
 confetti.style.backgroundColor = `hsl(${Math.random() * 60 + 270}, 100%, 70%)`; // Tons de roxo
 confetti.style.width = Math.random() * 10 + 5 + "px";
 confetti.style.height = confetti.style.width;
 document.body.appendChild(confetti);

 const animationDuration = Math.random() * 3 + 2;

 confetti.animate(
  [
   { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
   {
    transform: `translate(${Math.random() * 200 - 100}px, ${
     window.innerHeight
    }px) rotate(${Math.random() * 360}deg)`,
    opacity: 0,
   },
  ],
  {
   duration: animationDuration * 1000,
   easing: "cubic-bezier(0.1, 0.8, 0.9, 1)",
  }
 );

 setTimeout(() => {
  confetti.remove();
 }, animationDuration * 1000);
}

// Função principal para confirmar presença
async function confirmarPresenca() {
 const nomeInput = document.getElementById("nomeInput");
 const resposta = document.getElementById("resposta");
 const nomeConvidadoElement = document.getElementById("nome-convidado");

 // Validar nome
 if (!nomeInput.value.trim()) {
  nomeInput.style.borderColor = "#ef4444";
  nomeInput.placeholder = "Por favor, insira seu nome";
  return;
 }

 nomeConvidado = nomeInput.value.trim();

 try {
  const ip = await fetch("https://api.ipify.org?format=json")
   .then((response) => response.json())
   .then((data) => data.ip)
   .catch(() => "Não detectado");

  // Salva dados no Realtime Database
  await firebase.database().ref("confirmacoes").push({
   nome: nomeConvidado,
   data: new Date().toISOString(),
   ip: ip,
  });

  // Fecha o modal e mostra confirmação
  fecharModal();

  // Atualiza mensagem com o nome
  nomeConvidadoElement.textContent = `Obrigado, ${nomeConvidado}! Te esperamos na festa!`;
  resposta.classList.remove("hidden");

  // Efeitos de confete
  for (let i = 0; i < 50; i++) {
   createConfetti();
  }

  // Rolagem suave
  resposta.scrollIntoView({ behavior: "smooth" });
 } catch (error) {
  console.error("Erro ao confirmar presença:", error);
  resposta.textContent =
   "Ocorreu um erro ao confirmar. Por favor, tente novamente mais tarde.";
  resposta.classList.remove("hidden");
  resposta.classList.add("text-red-400");
 }
}
