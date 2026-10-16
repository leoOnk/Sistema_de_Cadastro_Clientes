import { validarCadastroCliente } from "../validation.js";

// URL DA API CORRIGIDA COM O ENDEREÇO E PORTA DO FLASK COMPLETOS
const API_URL = "http://localhost:5000/api/clientes";


export function inicializarClientes() {
    const form = document.querySelector("#form-cadastro-cliente");
    
    if (form) {
        form.onsubmit = async function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            const novoCliente = {
                nome: formData.get("nome"),
                email: formData.get("email"),
                documento: formData.get("documento")
            };

            const validacao = validarCadastroCliente(novoCliente);
            limparMensagensErros();

            if (!validacao.valido) {
                exibirMensagensErros(validacao.erros);
                return;
            }

            try {
                // Envia os dados para a API Flask do Python
                const resposta = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(novoCliente)
                });

                if (resposta.ok) {
                    form.reset();
                    carregarClientesDoServidor();
                }
            } catch (erro) {
                console.error("Erro ao cadastrar cliente no servidor Python:", erro);
            }
        };
    }
    
    carregarClientesDoServidor();
}

export async function acionarExclusaoCliente(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            carregarClientesDoServidor();
        }
    } catch (erro) {
        console.error("Erro de conexão ao tentar deletar cliente:", erro);
    }
}

async function carregarClientesDoServidor() {
    const tbody = document.querySelector("#tabela-clientes");
    if (!tbody) return; 

    try {
        const resposta = await fetch(API_URL);
        const cadastros = await resposta.json();

        tbody.replaceChildren();
        
        if (!cadastros || cadastros.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b; padding: 2rem;">Nenhum cliente cadastrado na base de dados Python.</td></tr>`;
            return;
        }

        cadastros.forEach(c => {
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid #e2e8f0";
            tr.innerHTML = `
                <td style="padding: 0.75rem;">${c.nome}</td>
                <td style="padding: 0.75rem;">${c.email}</td>
                <td style="padding: 0.75rem;">${c.documento}</td>
                <td style="padding: 0.75rem;">
                    <button class="btn-excluir-cliente" data-id="${c.id}" style="background: #dc2626; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll(".btn-excluir-cliente").forEach(btn => {
            btn.onclick = function() {
                acionarExclusaoCliente(btn.dataset.id);
            };
        });

    } catch (erro) {
        console.error("Erro ao buscar dados do Python:", erro);
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #dc2626; padding: 1.5rem; font-weight: 600;">⚠️ Falha de comunicação com o servidor Python. Certifique-se de que a API Flask está rodando.</td></tr>`;
    }
}

function exibirMensagensErros(erros) {
    const elNome = document.querySelector("#error-nome");
    const elEmail = document.querySelector("#error-email");
    const elDoc = document.querySelector("#error-documento");
    
    if (erros.nome && elNome) elNome.textContent = erros.nome;
    if (erros.email && elEmail) elEmail.textContent = erros.email;
    if (erros.documento && elDoc) elDoc.textContent = erros.documento;
}

function limparMensagensErros() {
    const elNome = document.querySelector("#error-nome");
    const elEmail = document.querySelector("#error-email");
    const elDoc = document.querySelector("#error-documento");
    
    if (elNome) elNome.textContent = "";
    if (elEmail) elEmail.textContent = "";
    if (elDoc) elDoc.textContent = "";
}
