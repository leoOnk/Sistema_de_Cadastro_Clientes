import { inicializarClientes } from "./views/cadastros.js";
import { atualizarIndicadoresDashboard } from "./views/dashboard.js";

const viewContainer = document.querySelector("#view-container");
const viewTitle = document.querySelector("#current-view-title");
const navLinks = document.querySelectorAll(".nav-link");

const HTML_TEMPLATES = {
    dashboard: `
        <div class="crud-panel" style="background: white; border: 1px solid #e2e8f0; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Indicadores do Sistema</h3>
            <p style="color: #64748b; margin-bottom: 1.5rem;">Volume de registros sincronizados com o servidor Back-end em Python.</p>
            
            <div style="background: #f8fafc; border: 4px solid #2563eb; padding: 1.5rem; border-radius: 8px; width: fit-content; min-width: 200px;">
                <span style="font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase;">Total de Clientes</span>
                <strong id="dash-total-clientes" style="font-size: 2.5rem; display: block; color: #0f172a; margin-top: 0.25rem;">0</strong>
            </div>
        </div>
    `,
    clientes: `
        <div class="crud-panel" style="background: white; border: 1px solid #e2e8f0; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">Novo Registro de Cliente</h2>
            <form id="form-cadastro-cliente" class="financial-form" style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 600px;">
                <div class="form-group">
                    <label for="cliente-nome">Nome Completo / Razão Social</label>
                    <input type="text" id="cliente-nome" name="nome" placeholder="Digite o nome" required>
                    <small id="error-nome" style="color: #dc2626; display: block; margin-top: 0.25rem; font-size: 0.8rem;"></small>
                </div>
                <div class="form-group" style="margin-top: 1rem;">
                    <label for="cliente-email">E-mail de Contato</label>
                    <input type="email" id="cliente-email" name="email" placeholder="nome@empresa.com" required>
                    <small id="error-email" style="color: #dc2626; display: block; margin-top: 0.25rem; font-size: 0.8rem;"></small>
                </div>
                <div class="form-group" style="margin-top: 1rem;">
                    <label for="cliente-documento">CPF ou CNPJ (Apenas números)</label>
                    <input type="text" id="cliente-documento" name="documento" placeholder="Ex: 12345678901" required>
                    <small id="error-documento" style="color: #dc2626; display: block; margin-top: 0.25rem; font-size: 0.8rem;"></small>
                </div>
                <button type="submit" style="background-color: #2563eb; color: white; font-weight: 600; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; width: fit-content; margin-top: 1rem;">Salvar Registro</button>
            </form>
        </div>
        
        <div class="crud-panel" style="background: white; border: 1px solid #e2e8f0; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-top: 2rem;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #1e293b;">Clientes Cadastrados na Base Python</h3>
            <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 1rem;">
                <thead>
                    <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                        <th style="padding: 0.75rem; font-weight: 600; font-size: 0.9rem;">Nome</th>
                        <th style="padding: 0.75rem; font-weight: 600; font-size: 0.9rem;">E-mail</th>
                        <th style="padding: 0.75rem; font-weight: 600; font-size: 0.9rem;">Documento</th>
                        <th style="padding: 0.75rem; font-weight: 600; font-size: 0.9rem; text-align: center;">Ações</th>
                    </tr>
                </thead>
                <tbody id="tabela-clientes"></tbody>
            </table>
        </div>
    `
};

const TITLES = {
    dashboard: "📊 Dashboard de Clientes",
    clientes: "👥 Cadastro de Clientes Corporativos"
};

function switchView(viewName) {
    if (!viewContainer || !viewTitle || !HTML_TEMPLATES[viewName]) return;

    viewTitle.textContent = TITLES[viewName];
    viewContainer.innerHTML = HTML_TEMPLATES[viewName];

    navLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.view === viewName);
    });

    if (viewName === "dashboard") atualizarIndicadoresDashboard();
    if (viewName === "clientes") inicializarClientes();
}

navLinks.forEach(link => {
    link.addEventListener("click", () => switchView(link.dataset.view));
});

// Inicialização padrão imediata no Dashboard
switchView("dashboard");
