document.addEventListener("DOMContentLoaded", function () {

    // SALVAR O PRODUTO ANTES DE NAVEGAR PARA A COMPRA
    const botoesComprar = document.querySelectorAll(".btn-comprar");

    botoesComprar.forEach(function (botao) {
        botao.addEventListener("click", function (event) {
            event.preventDefault();

            const card = botao.closest(".card-item");

            if (!card) {
                alert("Não foi possível identificar este produto.");
                return;
            }

            const nomeEl = card.querySelector(".title");
            const precoEl = card.querySelector(".card-text");
            const imagemEl = card.querySelector(".card-img img");

            if (!nomeEl || !precoEl || !imagemEl) {
                alert("As informações deste produto estão incompletas.");
                return;
            }

            const caminho = window.location.pathname.toLowerCase();
            let categoria = "Produto";

            if (caminho.includes("teclados")) categoria = "Teclado";
            else if (caminho.includes("mouses")) categoria = "Mouse";
            else if (caminho.includes("fones")) categoria = "Fone";

            const produto = {
                nome: nomeEl.textContent.trim(),
                preco: precoEl.textContent.trim(),
                imagem: imagemEl.src,
                categoria: categoria
            };

            sessionStorage.setItem("produtoSelecionado", JSON.stringify(produto));

            // Só navega depois de salvar os dados.
            window.location.href = botao.href;
        });
    });

    // EXIBIR O PRODUTO NA PÁGINA DE COMPRA
    const areaProduto = document.getElementById("produto-compra");

    if (areaProduto) {
        const btnFinalizar = document.getElementById("btn-finalizar");
        const dados = sessionStorage.getItem("produtoSelecionado");

        if (!dados) {
            areaProduto.innerHTML = `
                <p>Nenhum produto foi selecionado.</p>
                <a href="teclados.html">Ver teclados</a>
            `;
            if (btnFinalizar) btnFinalizar.hidden = true;
            return;
        }

        let produto;

        try {
            produto = JSON.parse(dados);
        } catch (erro) {
            sessionStorage.removeItem("produtoSelecionado");
            areaProduto.innerHTML = "<p>Não foi possível carregar o produto. Escolha-o novamente.</p>";
            if (btnFinalizar) btnFinalizar.hidden = true;
            return;
        }

        areaProduto.innerHTML = `
            <div class="produto-selecionado">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="produto-informacoes">
                    <p class="categoria-produto">${produto.categoria}</p>
                    <h2>${produto.nome}</h2>
                    <p class="preco-produto">${produto.preco}</p>
                </div>
            </div>
        `;

        if (btnFinalizar) {
            btnFinalizar.addEventListener("click", function () {
                window.location.href = "pagamento.html";
            });
        }
    }
});
