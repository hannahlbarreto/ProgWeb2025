import IntegerSet from "./IntegerSet.js";

const conjuntoA = new IntegerSet(10);
const conjuntoB = new IntegerSet(10);

function atualizarExibicaoConjuntos(conjunto, limiteId, elementosId) {
  const limiteElement = document.getElementById(limiteId);
  const elementosElement = document.getElementById(elementosId);

  limiteElement.innerHTML = `<strong>Valor máximo do conjunto:</strong> ${conjunto.valorMaximo}`;
  elementosElement.innerHTML = `<strong>Elementos do conjunto:</strong> ${conjunto.toString()}`;
}

function atualizarExibicaoOperacoes(resultadoId, textoResultado, resultado) {
    document.getElementById(resultadoId).innerHTML = `<strong>${textoResultado}</strong> ${resultado == null ? '{}': resultado.toString()}`;
}

function eventosConjuntos(conjunto, limiteId, elementosId, maxButtonId, insertButtonId, deleteButtonId) {
  document.getElementById(maxButtonId).addEventListener("click", () => {
    const valorMaximo = parseInt(prompt(`Defina o valor máximo para o conjunto`));
    if (!isNaN(valorMaximo)) {
      conjunto.setValorMaximo(valorMaximo);
      atualizarExibicaoConjuntos(conjunto, limiteId, elementosId);
    } else {
      alert("Entrada inválida. Por favor, insira um número.");
    }
  });

  document.getElementById(insertButtonId).addEventListener("click", () => {
    const elemento = parseInt(prompt(`Insira um valor que seja menor ou igual ao valor máximo definido no conjunto`));
    if (!isNaN(elemento)) {
      conjunto.inserir(elemento);
      atualizarExibicaoConjuntos(conjunto, limiteId, elementosId);
    } else {
      alert("Entrada inválida. Por favor, insira um número.");
    }
  });

  document.getElementById(deleteButtonId).addEventListener("click", () => {
    const elemento = parseInt(prompt(`Exclua um valor do conjunto`));
    if (!isNaN(elemento)) {
      conjunto.excluir(elemento);
      atualizarExibicaoConjuntos(conjunto, limiteId, elementosId);
    } else {
      alert("Entrada inválida. Por favor, insira um número.");
    }
  });
}

function eventosOperacoes(select1Id, select2Id, operationButtonId, resultadoId, textoResultado) {   
    const select1 = document.getElementById(select1Id);
    const select2 = document.getElementById(select2Id);

    document.getElementById(select2Id).value = "B";
    document.getElementById(select1Id).addEventListener("change", function () {
        select2.value = select1.value === "A" ? "B" : "A";
    });

    document.getElementById(operationButtonId).addEventListener("click", function () {
        const conjuntoBase = select1.value === "A" ? conjuntoA: conjuntoB;
        const conjuntoSelecionado = select2.value === "A" ? conjuntoA: conjuntoB;
        console.log(conjuntoBase)
        console.log(conjuntoSelecionado)


        let resultado;

        switch(operationButtonId) {
            case 'uniao':
                resultado = conjuntoBase.uniao(conjuntoSelecionado);
                break;
            case 'intersecao':
                resultado = conjuntoBase.intersecao(conjuntoSelecionado);
                break;
            case 'diferenca':
                resultado = conjuntoBase.diferenca(conjuntoSelecionado);
                break;
            default:
                return;
            
        }
        atualizarExibicaoOperacoes(resultadoId, textoResultado, resultado)
    });
}

function atualizarConteudo() {
  atualizarExibicaoConjuntos(conjuntoA, "limiteA", "conjuntoA");
  atualizarExibicaoConjuntos(conjuntoB, "limiteB", "conjuntoB");

  eventosConjuntos(conjuntoA, "limiteA", "conjuntoA", "valorMaximoA", "inserirA", "excluirA");
  eventosConjuntos(conjuntoB, "limiteB", "conjuntoB", "valorMaximoB", "inserirB", "excluirB");
  
  atualizarExibicaoOperacoes("resultUniao", "Resultado da união dos conjunto: ", null);
  atualizarExibicaoOperacoes("resultIntersecao", "Resultado da interseção dos conjunto: ", null);
  atualizarExibicaoOperacoes("resultDiferenca", "Resultado da diferença entre os conjunto: ", null);
  
  eventosOperacoes("seletorUniao1", "seletorUniao2", "uniao", "resultUniao", "Resultado da união dos conjunto: ");
  eventosOperacoes("seletorIntersecao1", "seletorIntersecao2", "intersecao", "resultIntersecao", "Resultado da interseção dos conjunto: ");
  eventosOperacoes("seletorDiferenca1", "seletorDiferenca2", "diferenca", "resultDiferenca", "Resultado da diferença entre os conjunto: ");
}

atualizarConteudo();