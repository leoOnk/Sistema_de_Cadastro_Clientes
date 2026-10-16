import json
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_deve_retornar_lista_de_clientes_com_status_200(client):
    resposta = client.get('/api/clientes')
    dados = json.loads(resposta.data.decode('utf-8'))
    
    assert resposta.status_code == 200
    assert isinstance(dados, list)
    assert len(dados) >= 2
    assert dados[0]['nome'] == "ONK Soluções Digitais"

def test_deve_cadastrar_novo_cliente_via_post_com_status_201(client):
    payload_teste = {
        "nome": "Claudia Mara Corp",
        "email": "claudia@corp.com",
        "documento": "98765432100"
    }
    
    resposta = client.post(
        '/api/clientes',
        data=json.dumps(payload_teste),
        content_type='application/json'
    )
    dados = json.loads(resposta.data.decode('utf-8'))
    
    assert resposta.status_code == 201
    assert "mensagem" in dados
    assert dados['cliente']['nome'] == "Claudia Mara Corp"
    assert 'id' in dados['cliente']

def test_deve_excluir_cliente_existente_via_delete_com_status_200(client):
    """Valida se o servidor aceita o comando DELETE para um ID válido e limpa o registro"""
    # 1. Faz uma requisição GET para capturar um ID real cadastrado na base inicial
    resposta_get = client.get('/api/clientes')
    dados_iniciais = json.loads(resposta_get.data.decode('utf-8'))
    id_alvo = dados_iniciais[0]['id'] # Captura o ID do primeiro cliente ("cli001")
    
    # 2. Dispara o comando DELETE apontando para a URL com o ID capturado
    resposta_delete = client.delete(f'/api/clientes/{id_alvo}')
    dados_deletados = json.loads(resposta_delete.data.decode('utf-8'))
    
    # 3. Asserções de conformidade do Back-end
    assert resposta_delete.status_code == 200
    assert "mensagem" in dados_deletados
    assert dados_deletados['mensagem'] == "Cliente removido com sucesso do servidor Python!"
    
    # 4. Faz um novo GET para confirmar se a contagem de registros diminuiu no servidor
    resposta_validacao = client.get('/api/clientes')
    dados_finais = json.loads(resposta_validacao.data.decode('utf-8'))
    assert len(dados_finais) < len(dados_iniciais)
