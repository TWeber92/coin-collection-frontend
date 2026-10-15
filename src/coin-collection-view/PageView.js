import { DocumentStore } from "../DocumentStore.js";

export class PageView {
  #page;
  #collectionPage;
  #aboutPage;
  constructor(data) {
    this.#html = data;
  }

  // #entity = this.#getPageElement();

  get entity() {
    return this.#getPageElement();
  }

  #getPageElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "overlay",
        className: "page",
        hidden: true,
      }).node,
    );
  }

  set #html(data) {
    this.#page = `
        <div id="header" class="page-header"></div>
        <div id="body" class="page-body"></div>
        <div id="footer" class="page-footer"></div>`;
    this.#collectionPage = {
      header: `<h2>📚 My Collection</h2>
               <button id="close" data-action="close" type="button">✕</button>`,
      body: `<div id="favorites">
                <div class="row">
                  <h3>⭐ FAVORITES</h3>
                  <button id="favorites">︿</button>
                </div>
              </div>
              <div id="archive">
                <div class="row">
                  <h3>📦 ARCHIVE</h3>
                  <button id="archive">︿</button>
                </div>
              </div>`,
      footer: `<button id="scrollable" 
                  name="archive" 
                  data-dir="75" 
                  class="archive-scroll" hidden>〈</button>
                <button id="scrollable" 
                  name="archive" 
                  data-dir="-75" 
                  class="archive-scroll" hidden>〉</button>`,
    };
    this.#aboutPage = {
      header: `<h2>About</h2>
           <button id="close" data-action="close" type="button">✕</button>`,
      body: `<div id="user-info">
                 <h3>Account</h3>
                 <p class="user-email"><strong>Email:</strong> ${data.user?.email}</p>
                 <p class="user-since"><strong>Member since:</strong> ${data.user?.createdAt || "—"}</p>
                 <button id="password" type="button">🔒 Reset Password</button>
               </div>
               <div id="user-actions">
                 <h3>Collection</h3>
                 <button id="favorites" type="button">⭐ View Favorites</button>
                 <button id="archive" type="button">📦 View Archive</button>
               </div>`,
      footer: `<button id="email" value="${data.user?.email}" type="button">✉️ Copy Email</button>
           <button id="logout" type="button">Logout</button>`,
    };
  }
  #to() {
    return {
      page: this.#page,
      collectionPage: this.#collectionPage,
      aboutPage: this.#aboutPage,
    };
  }
  static from(data) {
    return new PageView(data).#to();
  }
}
