export class LocalClient {
  LOCAL = {
    GET: (key) => localStorage.getItem(key),
    POST: (key, value) => localStorage.setItem(key, value),
    PUT: (key, updated) => localStorage.setItem(key, updated),
    DELETE: (key) => localStorage.removeItem(key),
  };
  SESSION = {
    GET: (key) => sessionStorage.getItem(key),
    POST: (key, value) => sessionStorage.setItem(key, value),
    PUT: (key, updated) => sessionStorage.setItem(key, updated),
    DELETE: (key) => sessionStorage.removeItem(key),
  };
}
