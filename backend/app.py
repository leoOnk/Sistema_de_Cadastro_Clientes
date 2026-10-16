from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

# Banco de dados fictício em memória para inicialização
clientes_db = [
    {"id": "cli001", "nome": "ONK Soluções Digitais", "email": "contato@onk.com", "documento": "12345678000199"},
    {"id": "cli002", "nome": "Leonardo Takedi Onuki", "email": "leonardo@empresa.com", "documento": "35889984899"}
]

@app.route('/api/clientes', methods=['GET'])
def obter_clientes():
    return jsonify(clientes_db), 200

@app.route('/api/clientes', methods=['POST'])
def cadastrar_cliente():
    dados = request.get_json()
    dados['id'] = str(uuid.uuid4())[:8]
    clientes_db.append(dados)
    return jsonify({"mensagem": "Cliente cadastrado com sucesso no servidor Python!", "cliente": dados}), 201

@app.route('/api/clientes/<string:id>', methods=['DELETE'])
def excluir_cliente(id):
    """Rota que localiza um cliente pelo ID e o remove da base de dados"""
    global clientes_db
    
    # Verifica se o cliente existe na nossa base
    cliente_existe = any(c['id'] == id for c in clientes_db)
    
    if not cliente_existe:
        return jsonify({"erro": "Cliente não encontrado na base de dados Python."}), 404
        
    # Filtra a lista mantendo apenas os clientes que possuem ID diferente do recebido (Corrigido para !=)
    clientes_db = [c for c in clientes_db if c['id'] != id]
    
    return jsonify({"mensagem": "Cliente removido com sucesso do servidor Python!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
