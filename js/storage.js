export function loadMovimentacoes() {
    return JSON.parse(localStorage.getItem("customerhub_clientes")) || [];
}
