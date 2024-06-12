const API_URL = 'http://127.0.0.1:8000/api/translate';

export const TEXT_POST = (body) => {
  return {
    url: API_URL,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    },
  };
};
