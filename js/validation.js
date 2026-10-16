/**
 * Valida as regras de negócio de um cadastro de cliente corporativo.
 */
export function validarCadastroCliente(dados) {
    const erros = {};

    // 1. Validação de Nome
    if (!dados.nome || dados.nome.trim() === "") {
        erros.nome = "O nome ou razão social é obrigatório.";
    }

    // 2. Validação de E-mail
    if (!dados.email || !dados.email.includes("@") || !dados.email.includes(".")) {
        erros.email = "Insira um endereço de e-mail corporativo válido.";
    }

    // 3. Validação de Documento (CPF: 11 ou CNPJ: 14 dígitos)
    const docLimpo = dados.documento ? dados.documento.replace(/\D/g, "") : "";
    if (docLimpo.length !== 11 && docLimpo.length !== 14) {
        erros.documento = "O documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ).";
    }

    return {
        valido: Object.keys(erros).length === 0,
        erros
    };
}
