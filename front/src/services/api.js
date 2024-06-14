const API_URL =
  'https://0ab2eafd-a4f7-41ce-804f-87fd5c52d169-00-1e6ldckqhcdem.riker.replit.dev/api/translate/';

export const TEXT_POST = (body) => {
  return {
    url: API_URL + 'texto',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const AUDIO_GET = () => {
  return {
    url: API_URL + 'get-audio',
    options: {
      mode: 'no-cors',
    },
  };
};
