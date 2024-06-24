# Chat Translate Web

Este projeto é a parte back-end de um tradutor em formato de chat, desenvolvido usando Python (FastAPI).

# Tecnologias Utilizadas
- Python (FastAPI)

# Endpoints Principais
1. Tradução de textos:
   - Endpoint: '/api/translate/texto'
   - Método: 'POST'
   - Descrição: Encaminha um requisição para ser traduzida, também é gerado um áudio único usando o ID.
   - Corpo da Requisição Esperada:
     ```
     {
        prefer: str = Linguagem de fala EX: pt-br.
        response: str = Linguagem de tradução EX: en-us.
        text: str = Texto: Bom dia.
        id: int = Identificador único.
     }
     ```
   - Resposta:
     ```
     {
        "translated_text": "Tradução"
     }
     ```

2. Envio de Audios:
   - Endpoint: 'api/translate/get-audio/{id}'
   - Método: 'GET'
   - Descrição: Devolve o audio gerado na requisição de texto, o ID é usado para procurar o áudio único gerado.
   - Corpo da Requisição Esperada:
     ```
     {
        id: int = Número gerado na (API: Tradução de Textos)
     }
     ```
   - Resposta:
     ```
       FileResponse(file_path, media_type='audio/mpeg', filename='arquivo.mp3')
     ```

# Como Rodar o Projeto
## Requisitos
- Python 3.12
- Pip 24.0

## Passo a Passo
  1. Clone o repositório;
  2. Na raiz do projeto crie o ambiente virtual (opicional, mas recomendado):
     ```
       1. virtualenv venv
       2. 'venv\Scripts\activate'
     ```
  3. Instale as dependências:
     ```
       pip install -r requirements.txt
     ```
  4. Certifique que o código da linha 199-201 esteja em uso (Caso queira rodar localmente):
     ```bash
      if __name__ == "__main__":
        import uvicorn
        uvicorn.run(app)
     ```
  6. Execute a main.py:
     ```
       py .\back\API\main.py
     ```

# Documentação da API
- Para acessar a documentação completa da API, visite: (http://seu-endereco/docs)


