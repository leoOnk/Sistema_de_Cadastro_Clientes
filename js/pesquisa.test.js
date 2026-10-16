/** @jest-environment jsdom */
import { jest } from '@jest/globals';

describe("🔍 Testes de DOM - Barra de Pesquisa Integrada", () => {

    beforeEach(() => {
        // Injeta a estrutura de busca e a tabela simulada em memória
        document.body.innerHTML = `
            <input type="text" id="input-pesquisa" placeholder="Pesquisar...">
            <table>
                <tbody id="tabela-clientes">
                    <tr class="linha-cliente" data-nome="Leonardo Lourenço"><td>Leonardo Lourenço</td></tr>
                    <tr class="linha-cliente" data-nome="Claudia Mara"><td>Claudia Mara</td></tr>
                </tbody>
            </table>
        `;
    });

    test("Deve ocultar as linhas da tabela que não batem com o termo pesquisado", () => {
        const inputPesquisa = document.querySelector("#input-pesquisa");
        const linhas = document.querySelectorAll(".linha-cliente");

        // Simula a lógica do filtro em tempo real
        inputPesquisa.addEventListener("input", () => {
            const termo = inputPesquisa.value.toLowerCase();
            linhas.forEach(linha => {
                const nome = linha.getAttribute("data-nome").toLowerCase();
                linha.style.display = nome.includes(termo) ? "" : "none";
            });
        });

        // Simula o usuário digitando "Claudia" na barra corporativa
        inputPesquisa.value = "Claudia";
        inputPesquisa.dispatchEvent(new Event("input"));

        // Asserções: A linha do Leonardo deve sumir e a da Claudia deve continuar visível
        expect(linhas[0].style.display).toBe("none");
        expect(linhas[1].style.display).toBe("");
    });
});
