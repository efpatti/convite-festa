document.addEventListener("DOMContentLoaded", function () {
 const confirmadosList = document.getElementById("confirmados-list");
 const loadingElement = document.getElementById("loading");
 const totalElement = document.getElementById("total");
 const totalCount = document.getElementById("total-count");

 // Referência para os dados no Firebase
 const confirmacoesRef = firebase.database().ref("confirmacoes");

 // Ouvinte para quando os dados mudarem
 confirmacoesRef.on("value", (snapshot) => {
  const data = snapshot.val();
  loadingElement.classList.add("hidden");
  confirmadosList.classList.remove("hidden");
  totalElement.classList.remove("hidden");

  // Limpa a lista
  confirmadosList.innerHTML = "";

  if (data) {
   let count = 0;
   const confirmadosArray = [];

   // Converte o objeto em array
   for (let key in data) {
    confirmadosArray.push({
     id: key,
     ...data[key],
    });
   }

   // Ordena por data (mais recente primeiro)
   confirmadosArray.sort((a, b) => new Date(b.data) - new Date(a.data));

   // Adiciona cada confirmado à lista
   confirmadosArray.forEach((confirmado) => {
    count++;
    const date = new Date(confirmado.data);
    const formattedDate = date.toLocaleDateString("pt-BR", {
     day: "2-digit",
     month: "2-digit",
     year: "numeric",
     hour: "2-digit",
     minute: "2-digit",
    });

    const guestElement = document.createElement("div");
    guestElement.className = "guest-item bg-gray-800/50 p-4 rounded-lg";
    guestElement.innerHTML = `
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-semibold text-white">${confirmado.nome}</h3>
                  <p class="text-sm text-gray-400">Confirmado em: ${formattedDate}</p>
                </div>
                <span class="text-xs text-purple-300">#${count}</span>
              </div>
            `;

    confirmadosList.appendChild(guestElement);
   });

   totalCount.textContent = count;
  } else {
   confirmadosList.innerHTML = `
            <div class="text-center text-gray-400 py-8">
              <p>Nenhuma confirmação encontrada ainda.</p>
            </div>
          `;
   totalCount.textContent = "0";
  }
 });
});
