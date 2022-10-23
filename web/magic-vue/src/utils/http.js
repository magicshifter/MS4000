
export const fetch =
  ({ url, method = 'GET', json = false }) =>
    new Promise((resolve, reject) => {
      //const requestStart = new Date().getTime();

      const req = new window.XMLHttpRequest();

      req.open(method, url);

      req.onload =
        () => {
          if (req.status === 200) {
            if (!json) {
              return resolve(req);
            }

            const parsed = JSON.parse(req.response || req.responseText);

            return resolve(parsed);
          }
          reject(req.statusText || 'Unkown Error');
        };

      req.onerror =
        () => {
          reject('Network Error');
        };

      req.ontimeout =
        () => {
          reject('Request timed out');
        };

      req.send();
    });
