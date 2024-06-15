from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gtts import gTTS
from googletrans import Translator
import speech_recognition as sr
from flask import Flask, send_file, Response
import os

app = FastAPI()

# Configure CORS
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslateRequestText(BaseModel):
    """
    Base modelo para requisição de texto para tradução
    """
    prefer: str
    response: str
    text: str


def coletarDadosDeTexto(language1, language2, texto):
    """
    Função responsável por coletar os dados do usuário por via de Texto e gravar um audio em uma pasta para uso do front-end.
    """
    try:
        translator = Translator()
        translatedText = translator.translate(texto,
                                              src=language1[:2],
                                              dest=language2[:2])

        audio = gTTS(
            text=translatedText.text,
            lang=language2,
        )

        audio.save("audiotranslatedText.mp3")
        return translatedText.text

    except Exception as e:
        return f"Erro: {e}"


def coletarDadosDeAudio(language1, language2, Audio):
    """
    Função resposável por coletar o audio do front-end e transformar em texto e traduzir para a linguagem desejada por via de audio.
    """
    try:
        r = sr.Recognizer()

        textoColetado = r.recognize_google(audio_data=Audio,
                                           language=language1)

        translator = Translator()
        translatedText = translator.translate(textoColetado,
                                              src=language1[:2],
                                              dest=language2[:2])

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
    """
    API responsável por realizar a tradução do texto, além de criar um audio com base na tradução.
    """
    translated_text = coletarDadosDeTexto(request_data.prefer,
                                          request_data.response,
                                          request_data.text)

    return {"translated_text": translated_text}


@app.get("/api/translate/get-audio")
async def get_translate_audio():
    """
    API resposável por coletar o audio gerado e encaminhar para o front-end.
    """
    file_path = "audiotranslatedText.mp3"

    return FileResponse(file_path,
                        media_type='audio/mpeg',
                        filename='arquivo.mp3')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0")
