from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gtts import gTTS
from googletrans import Translator
import pandas as pd
import openpyxl
import os
from datetime import datetime
import user_agents

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


def coletarDados(language1, language2, text_enviado, text_traduzido,
                 user_agent_str):
    """
    Função responsável por coletar os dados significativos.
    """
    try:
        # Define o caminho do arquivo
        file_path = 'dados/coletaDeDados.xlsx'

        # Verifica se o arquivo e diretório existem, caso contrário, cria-os
        if not os.path.exists('dados'):
            os.makedirs('dados')

        if os.path.exists(file_path):
            df = pd.read_excel(file_path)
        else:
            df = pd.DataFrame(columns=[
                'Idioma de fala', 'Idioma de Tradução', 'Texto enviado',
                'Texto traduzido', 'Navegador', 'Dispositivo móvel', 
                'Computador', 'Tablet', 'Horário acessado',

            ])

        # Obtém informações do agente do usuário
        user_agent = user_agents.parse(user_agent_str)
        navegador = user_agent.browser.family
        mobile = user_agent.is_mobile
        computador = user_agent.is_pc
        tablet = user_agent.is_tablet

        # Obtém o horário atual
        horario_acessado = datetime.now().strftime('%d-%m-%Y %H:%M:%S')

        # Formatação simples
        text_enviado = text_enviado.capitalize()
        text_traduzido = text_traduzido.capitalize()

        # Novo dado
        new_data = pd.DataFrame([{
            "Idioma de fala": language1,
            "Idioma de Tradução": language2,
            "Texto enviado": text_enviado,
            "Texto traduzido": text_traduzido,
            "Navegador": navegador,
            "Dispositivo móvel": mobile,
            "Computador": computador,
            "Tablet": tablet,
            "Horário acessado": horario_acessado,
        }])

        # Adiciona a nova linha ao DataFrame usando pd.concat
        df = pd.concat([df, new_data], ignore_index=True)

        # Salva o DataFrame atualizado de volta no arquivo Excel
        df.to_excel(file_path, index=False)

    except Exception as error:
        print(f"Erro: {error}")


def traduzirTexto(language1, language2, texto, user_agent_str):
    """
    Função responsável por coletar os dados do usuário por via de Texto e gravar um audio em uma pasta para uso do front-end.
    """
    try:
        translator = Translator()
        translatedText = translator.translate(texto,
                                              src=language1[:2],
                                              dest=language2[:2])

        audio = gTTS(text=translatedText.text, lang=language2[:2])

        # Processo de coleta de dados
        coletarDados(language1, language2, texto, translatedText.text,
                     user_agent_str)

        audio_path = "audio/audiotranslatedText.mp3"
        if not os.path.exists('audio'):
            os.makedirs('audio')
        audio.save(audio_path)
        
        return translatedText.text

    except Exception as e:
        return f"Erro: {e}"


@app.post("/api/translate/texto")
async def post_translate_text(request: Request,
                              request_data: TranslateRequestText):
    """
    API responsável por realizar a tradução do texto, além de criar um audio com base na tradução.
    """
    user_agent_str = request.headers.get('user-agent')
    translated_text = traduzirTexto(request_data.prefer, request_data.response,
                                    request_data.text, user_agent_str)
    return {"translated_text": translated_text.capitalize()}


@app.get("/api/translate/get-audio")
async def get_translate_audio():
    """
    API resposável por coletar o audio gerado e encaminhar para o front-end.
    """
    file_path = "audio/audiotranslatedText.mp3"
    return FileResponse(file_path,
                        media_type='audio/mpeg',
                        filename='arquivo.mp3')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0")
