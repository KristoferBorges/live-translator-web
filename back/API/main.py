from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gtts import gTTS
from googletrans import Translator
import speech_recognition as sr
import os

# Ao iniciar o servidor, o arquivo de audio é criado na pasta assets do front-end.
mp3_path = "front\\src\\assets\\audio\\audiotranslatedText.mp3"
with open(mp3_path, "wb") as f:
    f.write(b'\x00')

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslateRequestText(BaseModel):
    prefer: str
    response: str
    text: str

class TranslateRequestAudio(BaseModel):
    prefer: str
    response: str
    # Implementar o recebimento do audio ou deixar esplícito o caminho do arquivo de audio.

def coletarDadosDeTexto(language1, language2, texto):
    """
    Função responsável por coletar os dados do usuário por via de Texto e gravar um audio em uma pasta para uso do front-end.
    """
    try: 
        translator = Translator()
        translatedText = translator.translate(texto, src=language1[:2], dest=language2[:2])

        audio = gTTS(
            text=translatedText.text,
            lang=language2,
        )

        audio.save("front\\src\\assets\\audio\\audiotranslatedText.mp3")
        return translatedText.text
    
    except Exception as e:
        return f"Erro: {e}"

def coletarDadosDeAudio(language1, language2, Audio):
    """
    Função resposável por coletar o audio do front-end e transformar em texto e traduzir para a linguagem desejada por via de audio.
    """
    try:
        r = sr.Recognizer()

        textoColetado = r.recognize_google(audio_data=Audio, language=language1)

        translator = Translator()
        translatedText = translator.translate(textoColetado, src=language1[:2], dest=language2[:2])

        audio = gTTS(
            text=translatedText.text,
            lang=language2,
        )

        audio.save("front\\src\\assets\\audio\\audiotranslatedText.mp3")
        return translatedText.text

    except Exception as e:
        return f"Erro: {e}"
    

@app.post("/api/translate/texto")
async def post_translate_text(request_data: TranslateRequestText):
    translated_text = coletarDadosDeTexto(request_data.prefer, request_data.response, request_data.text)
    return {"translated_text": translated_text}

@app.post("/api/translate/audio")
async def post_translate_audio(request_data: TranslateRequestAudio):
    translated_text = coletarDadosDeAudio(request_data.prefer, request_data.response)
    return {"translated_text": translated_text}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
