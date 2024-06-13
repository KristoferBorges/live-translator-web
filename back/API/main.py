from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pygame import mixer
from gtts import gTTS
from googletrans import Translator

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Adicione outras origens permitidas aqui.
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
    Função responsável por coletar os dados do usuário por via de Texto e gravar um audio em uma pasta para uso do front-end.
    """
    try: 
        translator = Translator()
        translatedText = translator.translate(texto, src=language1[:2], dest=language2[:2])

        mixer.init()

        audio = gTTS(
            text=translatedText.text,
            lang=language2,
        )

        audio.save("..\\..\\front\\src\\assets\\audio\\audiotranslatedText.mp3")
        return translatedText.text
    
    except Exception as e:
        return f"Erro: {e}"
    
class TranslateRequest(BaseModel):
    prefer: str
    response: str
    text: str

@app.post("/api/translate")
async def post_translate(request_data: TranslateRequest):
    translated_text = coletarDadosDeTexto(request_data.prefer, request_data.response, request_data.text)
    return {"translated_text": translated_text}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
