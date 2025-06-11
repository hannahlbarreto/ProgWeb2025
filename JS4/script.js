function atualizarConteudo() {
  document.getElementById("btn").addEventListener("click", () => {
    const raio = document.getElementById("raio").value;

    if (raio <= 0) {
      alert("Por favor, insira um valor positivo para o raio.");
      return;
    }

    const area = Math.PI * raio * raio;
    const circunferencia = 2 * Math.PI * raio;

    document.getElementById("area").value = area.toFixed(2);
    document.getElementById("circunferencia").value = circunferencia.toFixed(2);
  });
}

atualizarConteudo();
