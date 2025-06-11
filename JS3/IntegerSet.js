export default class IntegerSet {
  constructor(valorMaximo) {
    this.valorMaximo = valorMaximo;
    this.conjunto = new Array(valorMaximo + 1).fill(false);
  }

  setValorMaximo(novoValorMaximo) {
    this.valorMaximo = novoValorMaximo;
  }

  inserir(elemento) {
    if (elemento >= 0 && elemento <= this.valorMaximo) {
      this.conjunto[elemento] = true;
    }
  }

  excluir(elemento) {
    if (elemento >= 0 && elemento <= this.valorMaximo) {
      this.conjunto[elemento] = false;
    }
  }

  uniao(conjuntoB) {
    const valorMaximoU = Math.max(this.valorMaximo, conjuntoB.valorMaximo);
    const conjuntoUniao = new IntegerSet(valorMaximoU);

    for (let i = 0; i <= valorMaximoU; i++) {
      conjuntoUniao.conjunto[i] = this.conjunto[i] || conjuntoB.conjunto[i];
    }

    return conjuntoUniao;
  }

  intersecao(conjuntoB) {
    const conjuntoIntersecao = new IntegerSet(this.valorMaximo);

    for (let i = 0; i <= this.valorMaximo; i++) {
      conjuntoIntersecao.conjunto[i] =
        this.conjunto[i] && conjuntoB.conjunto[i];
    }

    return conjuntoIntersecao;
  }

  diferenca(conjuntoB) {
    const conjuntoDiferenca = new IntegerSet(this.valorMaximo);

    for (let i = 0; i <= this.valorMaximo; i++) {
      conjuntoDiferenca.conjunto[i] =
        this.conjunto[i] && !conjuntoB.conjunto[i];
    }

    return conjuntoDiferenca;
  }

  toString() {
    const elementos = [];
    for (let i = 0; i <= this.valorMaximo; i++) {
      if (this.conjunto[i]) {
        elementos.push(i);
      }
    }
    console.log(elementos);
    return `{${elementos.join(", ")}}`;
  }
}

//Testes
/*let integerconjuntoA = new IntegerSet(5);
console.log(integerconjuntoA.toString());
integerconjuntoA.inserir(2);
integerconjuntoA.inserir(4);
integerconjuntoA.inserir(5);

let integerconjuntoB = new Integerconjunto(5);
integerconjuntoB.inserir(1);
integerconjuntoB.inserir(3);
integerconjuntoB.inserir(4);

integerconjuntoA.uniao(integerconjuntoB);
integerconjuntoA.intersecao(integerconjuntoB);
integerconjuntoA.diferenca(integerconjuntoB);

console.log(integerconjuntoB.toString())*/
