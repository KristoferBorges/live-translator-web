from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Adicione outras origens permitidas aqui
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def coletarDadosDeTexto(language1, language2, texto):
    """
    Função responsável por coletar os dados do usuário por via de Texto.
    """
    try: 
        translator = Translator()
        translatedText = translator.translate(texto, src=language1[:2], dest=language2[:2])
        return translatedText.text
    except Exception as e:
        return f"Erro: {e}"

@app.post("/api/translate")
async def get_translate(prefer='pt-br', response='ja', text='Bom dia!'):
    translated_text = coletarDadosDeTexto(prefer, response, text)
    return {"translated_text": translated_text}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)