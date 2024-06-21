const API_URL = 'https://chat-translate.up.railway.app/api/translate/';

export const TEXT_POST = (body) => {
  return {
    optionsJSON: {
      url: API_URL + 'texto',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    },
  };
};

export const AUDIO_GET = (id) => {
  return {
    optionsAudio: {
      url: API_URL + 'get-audio/' + id,
      method: 'GET',
      headers: {
        'Content-Type': 'audio/mpeg',
      },
      responseType: 'blob',
    },
  };
};
