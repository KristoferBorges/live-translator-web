const API_URL = 'http://127.0.0.1:8000/api/translate/';

export const TEXT_POST = (body) => {
  return {
    url: API_URL + '/texto',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const AUDIO_POST = (body) => {
  return {
    url: API_URL + '/audio',
    options: {
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};
