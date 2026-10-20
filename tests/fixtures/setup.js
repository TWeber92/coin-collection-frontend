import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost", // required for jsdom to enable localStorage
});

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.DOMParser = dom.window.DOMParser;
globalThis.matchMedia = () => ({ matches: false });
// Force override Node's built-in empty-shell localStorage
for (const key of ["localStorage", "sessionStorage"]) {
  Object.defineProperty(globalThis, key, {
    value: dom.window[key],
    configurable: true,
    writable: true,
  });
}
