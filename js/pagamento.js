document.addEventListener("DOMContentLoaded", function () {
    const resumo = document.getElementById("resumo-pagamento");
    const seletorForma = document.getElementById("forma-pagamento");
    const botaoConfirmar = document.getElementById("confirmar-pagamento");

    const dados = sessionStorage.getItem("produtoSelecionado");

    if (!dados) {
        resumo.innerHTML = `
            <p>Nenhum produto foi selecionado.</p>
            <a href="teclados.html">Voltar aos produtos</a>
        `;
        if (seletorForma) seletorForma.disabled = true;
        if (botaoConfirmar) botaoConfirmar.disabled = true;
        return;
    }

    let produto;

    try {
        produto = JSON.parse(dados);
    } catch (erro) {
        sessionStorage.removeItem("produtoSelecionado");
        resumo.textContent = "Não foi possível carregar o produto. Selecione-o novamente.";
        if (botaoConfirmar) botaoConfirmar.disabled = true;
        return;
    }

    resumo.innerHTML = `
        <div class="produto-selecionado">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="produto-informacoes">
                <p class="categoria-produto">${produto.categoria}</p>
                <h2>${produto.nome}</h2>
                <p class="preco-produto">${produto.preco}</p>
            </div>
        </div>
    `;

    botaoConfirmar.addEventListener("click", function () {
        const forma = seletorForma.value;

        if (!forma) {
            alert("Selecione uma forma de pagamento!");
            return;
        }

        alert(
            "Pedido confirmado (simulação)!\n\n" +
            "Produto: " + produto.nome + "\n" +
            "Valor: " + produto.preco + "\n" +
            "Pagamento: " + forma
        );
    });
});
