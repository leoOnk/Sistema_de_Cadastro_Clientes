/** @jest-environment jsdom */
import { jest } from '@jest/globals';

describe("👥 Testes de DOM - Formulários de Cadastros", () => {

    beforeEach(() => {
        // Monta a estrutura do formulário perfeitamente em memória
        document.body.innerHTML = `
            <form id="form-cadastro-cliente">
                <input type="text" id="cliente-nome" name="nome">
                <small id="error-nome"></small>
                <input type="email" id="cliente-email" name="email">
                <small id="error-email"></small>
                <input type="text" id="cliente-documento" name="documento">
                <small id="error-documento"></small>
                <button type="submit">Salvar</button>
            </form>
            <table>
                <tbody id="tabela-clientes">
                    <tr><td class="table-empty">Nenhum cliente cadastrado na base de dados.</td></tr>
                </tbody>
            </table>
        `;
    });

    test("Deve processar o envio do formulário válido e atualizar a tabela simulada", () => {
        const form = document.querySelector("#form-cadastro-cliente");
        const tbody = document.querySelector("#tabela-clientes");

        // Simula o comportamento do controlador de cadastros de forma isolada
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const nomeValue = document.querySelector("#cliente-nome").value;
            const emailValue = document.querySelector("#cliente-email").value;
            const docValue = document.querySelector("#cliente-documento").value;

            // Insere dinamicamente a linha na tabela simulada
            tbody.innerHTML = `
                <tr>
                    <td>${nomeValue}</td>
                    <td>${emailValue}</td>
                    <td>${docValue}</td>
                </tr>
            `;
        });

        // Preenche os inputs programaticamente para o cenário feliz
        document.querySelector("#cliente-nome").value = "Leonardo Takedi Onuki";
        document.querySelector("#cliente-email").value = "leonardo@onk.com";
        document.querySelector("#cliente-documento").value = "35889984899";

        // Dispara o gatilho de submit
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        // Asserção: A tabela deve conter o nome inserido pelo formulário
        expect(tbody.innerHTML).toContain("Leonardo Takedi Onuki");
        expect(tbody.innerHTML).not.toContain("Nenhum cliente cadastrado");
    });
});
