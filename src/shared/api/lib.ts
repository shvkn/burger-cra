const processResponse = async <T>(response: Response): Promise<T> => {
  try {
    return response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const request = <T>(input: RequestInfo | URL, init: RequestInit): Promise<T> => {
  return fetch(input, init).then(processResponse<T>);
};
