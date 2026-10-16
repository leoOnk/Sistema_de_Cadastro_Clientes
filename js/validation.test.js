import { validarCadastroCliente } from "./validation.js";

describe("🛡️ Testes Lógicos - Validador de Clientes (validation.js)", () => {

    test("Deve aprovar um payload corporativo totalmente válido", () => {
        const payloadValido = {
            nome: "ONK Soluções Digitais",
            email: "contato@onk.com",
            documento: "12345678000199" // CNPJ com 14 dígitos
        };

        const resultado = validarCadastroCliente(payloadValido);
        expect(resultado.valido).toBe(true);
        expect(Object.keys(resultado.erros)).toHaveLength(0);
    });

    test("Deve rejeitar e apontar erro se o e-mail não possuir formato corporativo", () => {
        const payloadEmailInvalido = {
            nome: "Leonardo Lourenço",
            email: "leonardo_email",
            documento: "12345678901"
        };

        const resultado = validarCadastroCliente(payloadEmailInvalido);
        expect(resultado.valido).toBe(false);
        expect(resultado.erros.email).toBe("Insira um endereço de e-mail corporativo válido.");
    });

    test("Deve reter o cadastro se o comprimento do CPF/CNPJ for inválido", () => {
        const payloadDocInvalido = {
            nome: "Claudia Mara",
            email: "claudia@empresa.com",
            documento: "123" // Menor que o comprimento mínimo obrigatório
        };

        const resultado = validarCadastroCliente(payloadDocInvalido);
        expect(resultado.valido).toBe(false);
        expect(resultado.erros.documento).toBe("O documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ).");
    });
});
