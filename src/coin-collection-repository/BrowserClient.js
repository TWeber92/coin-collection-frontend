export class BrowserClient {
  LOCAL = {
    GET: (key) => JSON.parse(localStorage.getItem(key)),
    POST: (key) => localStorage.setItem(key, JSON.stringify([])),
    PUT: (key, updated) => localStorage.setItem(key, JSON.stringify(updated)),
    DELETE: (key) => localStorage.removeItem(key),
  };
  SESSION = {
    GET: (key) => JSON.parse(sessionStorage.getItem(key)),
    POST: (key) => sessionStorage.setItem(key, JSON.stringify({})),
    PUT: (key, updated) => sessionStorage.setItem(key, JSON.stringify(updated)),
    DELETE: (key) => sessionStorage.removeItem(key),
  };
}
