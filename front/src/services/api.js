const API_URL = 'http://127.0.0.1:8000/api/translate/';

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
