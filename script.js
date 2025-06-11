function atualizarConteudo() {
  document.getElementById("btn").addEventListener("click", () => {
    const inputsAltura = document.querySelectorAll('input[name="alt"]');
    const alturaBarras = Array.from(inputsAltura).map((input) =>
      parseFloat(input.value)
    );
    const larguraBarras = document.getElementById("l").value;
    const grafico = document.getElementById("grafico");

    grafico.innerHTML = "";
    alturaBarras.forEach((altura) => {
      const barra = document.createElement("div");
      barra.style.setProperty("min-width", `${larguraBarras}px`);
      barra.style.setProperty("height", `${altura}px`);
      barra.style.setProperty("background-color", "red");
      grafico.appendChild(barra);
    });

    console.log(larguraBarras);
  });
}

atualizarConteudo();
