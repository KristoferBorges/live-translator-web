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
import pytz
import asyncio

app = FastAPI()

# Configure CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class TranslateRequestText(BaseModel):
    prefer: str
    response: str
    text: str
    id: int


class ModeTranslate:

    idiomas_map = {
        'en': 'Inglês',
        'es': 'Espanhol',
        'zh-CN': 'Chinês',
        'zh-TW': 'Taiwan',
        'hi': 'Hindi',
        'ar': 'Árabe',
        'fr': 'Francês',
        'de': 'Alemão',
        'ja': 'Japonês',
        'ru': 'Russo',
        'pt': 'Português',
        'it': 'Italiano',
        'ko': 'Coreano',
        'vi': 'Vietnamita',
        'fa': 'Persa',
        'ur': 'Urdu',
        'tr': 'Turco',
    }

    def __init__(self):
        self.audio_dir = 'audio'
        if not os.path.exists(self.audio_dir):
            os.makedirs(self.audio_dir)
        self.file_path = os.path.join(self.audio_dir,
                                      'audiotranslatedText.mp3')

    def coletarDados(self, language1, language2, text_enviado, text_traduzido,
                     user_agent_str):
        try:
            file_path = 'dados/coletaDeDados.xlsx'
            if not os.path.exists('dados'):
                os.makedirs('dados')

            if os.path.exists(file_path):
                df = pd.read_excel(file_path)
            else:
                df = pd.DataFrame(columns=[
                    'Idioma de fala',
                    'Idioma de Tradução',
                    'Texto enviado',
                    'Texto traduzido',
                    'Navegador',
                    'Dispositivo móvel',
                    'Sistema Operacional',
                    'Computador',
                    'Tablet',
                    'Horário acessado',
                ])

            user_agent = user_agents.parse(user_agent_str)
            navegador = user_agent.browser.family
            mobile = user_agent.is_mobile
            computador = user_agent.is_pc
            tablet = user_agent.is_tablet

            ua = user_agents.parse(user_agent_str)
            sistema_operacional = ua.os.family

            timezone = pytz.timezone('America/Sao_Paulo')
            horario_acessado = datetime.now(timezone).strftime(
                '%d-%m-%Y %H:%M:%S')

            text_enviado = text_enviado.capitalize()
            text_traduzido = text_traduzido.capitalize()

            new_data = pd.DataFrame([{
                "Idioma de fala": self.idiomas_map.get(language1, language1),
                "Idioma de Tradução": self.idiomas_map.get(language2, language2),
                "Texto enviado": text_enviado,
                "Texto traduzido": text_traduzido,
                "Navegador": navegador,
                "Dispositivo móvel": mobile,
                "Sistema Operacional": sistema_operacional,
                "Computador": computador,
                "Tablet": tablet,
                "Horário acessado": horario_acessado,
            }])

            df = pd.concat([df, new_data], ignore_index=True)
            df.to_excel(file_path, index=False)
        except Exception as error:
            print(f"Erro: {error}")

    def traduzirTexto(self, language1, language2, texto, id, user_agent_str):
        try:
            if language1 not in ['zh-CN', 'zh-TW']:
                language1 = language1[:2]
            if language2 not in ['zh-CN', 'zh-TW']:
                language2 = language2[:2]

            translator = Translator()
            translatedText = translator.translate(texto,
                                                  src=language1,
                                                  dest=language2)

            audio = gTTS(text=translatedText.text, lang=language2)
            self.coletarDados(language1, language2, texto, translatedText.text,
                              user_agent_str)

            self.file_path = os.path.join(self.audio_dir,
                                          f'audiotranslatedText{id}.mp3')
            audio.save(self.file_path)

            return translatedText.text
        except Exception as e:
            return f"Erro: {e}"

    async def limparAudios(self):
        """
        Função Responsavel por excluir arquivos mp3 temporarios
        """
        try:
            await asyncio.sleep(100)
            for file in os.listdir(self.audio_dir):
                if file.endswith(".mp3"):
                    os.remove(os.path.join(self.audio_dir, file))
        except Exception as e:
            print(f"Erro: {e}")

    def __del__(self):
        """
        Função Responsavel por excluir arquivos mp3 temporarios
        """
        try:
            for file in os.listdir(self.audio_dir):
                if file.endswith(".mp3"):
                    os.remove(os.path.join(self.audio_dir, file))
        except Exception as e:
            print(f"Erro: {e}")
        

mode_translate = ModeTranslate()

@app.post("/api/translate/texto")
async def post_translate_text(request: Request,
                              request_data: TranslateRequestText):
    try:
        user_agent_str = request.headers.get('user-agent')
        translated_text = mode_translate.traduzirTexto(request_data.prefer,
                                                    request_data.response,
                                                    request_data.text,
                                                    request_data.id,
                                                    user_agent_str)
        return {"translated_text": translated_text.capitalize()}
    
    except Exception as e:
            print(f"Erro: {e}")

@app.get("/api/translate/get-audio/{id}")
async def get_translate_audio(id: int):
    try:
        file_path = os.path.join('audio', f'audiotranslatedText{id}.mp3')
        if not os.path.exists(file_path):
            return {"error": "Audio file not found."}
        return FileResponse(file_path,
                            media_type='audio/mpeg',
                            filename='arquivo.mp3')
    except Exception as e:
            print(f"Erro: {e}")
    
    finally:
        asyncio.create_task(mode_translate.limparAudios())
    
if __name__ == '__main__':
    
    import uvicorn
    uvicorn.run(app, host="0.0.0.0")
    
