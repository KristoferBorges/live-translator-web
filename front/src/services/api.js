const API_URL = 'https://web-production-b963.up.railway.app/api/translate/';

export const TEXT_POST = (body) => {
  return {
    url: API_URL + 'texto',
    content: body,
  };
};

export const AUDIO_GET = (id) => {
  return {
    url: API_URL + 'get-audio/' + id,
    options: {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
      responseType: 'blob',
    },
  };
};
