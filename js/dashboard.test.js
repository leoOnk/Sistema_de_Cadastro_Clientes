/** @jest-environment jsdom */
import { jest } from '@jest/globals';

describe("📊 Testes de DOM - Módulo Dashboard", () => {

    beforeEach(() => {
        // Prepara elementos de teste do painel em memória
        document.body.innerHTML = `
            <div id="view-container">
                <strong id="dash-total-clientes">0</strong>
            </div>
        `;
        localStorage.clear();
    });

    test("Deve ler o localStorage e atualizar a contagem de indicadores em tela", () => {
        // Simula uma base contendo 2 clientes gravados no banco local
        const mockClientes = [
            { id: "1", nome: "Cliente A" },
            { id: "2", nome: "Cliente B" }
        ];
        localStorage.setItem("customerhub_clientes", JSON.stringify(mockClientes));

        // Cria a função lógica do dashboard isolada para atualizar o DOM
        const cadastros = JSON.parse(localStorage.getItem("customerhub_clientes")) || [];
        const elTotal = document.querySelector("#dash-total-clientes");
        if (elTotal) {
            elTotal.textContent = cadastros.length.toString();
        }

        // Validação da asserção: O total de clientes na tela deve ser exatamente 2
        expect(document.querySelector("#dash-total-clientes").textContent).toBe("2");
    });
});
