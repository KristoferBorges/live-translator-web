const API_URL = 'https://chat-translate.up.railway.app/api/translate/';

export const TEXT_POST = (body) => {
  return {
    optionsText: {
      url: API_URL + 'texto',
      method: 'POST',
      data: body,
    },
  };
};

export const AUDIO_GET = (id) => {
  return {
    url: API_URL + 'get-audio/' + id,
    options: {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    },
  };
};
