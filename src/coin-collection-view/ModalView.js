import { DocumentStore } from "../DocumentStore.js";

export class ModalView {
  #modal;
  #stateModal;
  #loginModal;
  #signupModal;
  #form;
  #valid;
  #newEmail;
  #button;
  constructor(data) {
    this.#html = data;
  }

  // #entity = this.#getModalElement();

  get entity() {
    return this.#getModalElement();
  }

  #getModalElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "overlay",
        className: "modal",
        hidden: true,
      }).node,
    );
  }

  set #html(data) {
    this.#modal = `
        <div class="modal-header">
          <h2></h2><button id="close" type="button">✕</button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer"></div>`;
    this.#stateModal = {
      title: `<h2>${data.name}</h2>`,
      body: `<div class="collected" ${data.favorites?.includes(data.name) ? "" : "hidden"}> You Already Collected ${data.name}! ⭐️</div>`,
      footer: `<div>Year Minted: ${data.year}</div>
              <a href="https://www.usa.gov/states/${data.name}">Find Out More About ${data.name}</a>`,
    };
    this.#loginModal = {
      title: `<h2>${data.name?.toUpperCase()}</h2>`,
      body: `<div class="input-group">
              <label for="email">Email</label>
              <input required type="email" 
                     id="email" 
                     placeholder="Email" 
                     autocomplete="email" 
                     aria-label="Email" />
              <span class="validation-feedback" hidden ></span>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
                <input required type="password" 
                      id="password" 
                      placeholder="Password" 
                      autocomplete="password" 
                      aria-label="Password" 
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"/>
              <span class="validation-feedback" hidden ></span>
            </div>
            <button disabled 
                    id="login" 
                    name="authenticate" 
                    type="submit" 
                    data-action="login">Sign In
            </button>`,
      footer: `<span>Don't have an account? <button id="signup" data-name="signup" type="button">Sign Up</button></span>`,
    };

    this.#signupModal = {
      title: `<h2>${data.name?.toUpperCase()}</h2>`,
      body: `<div class="input-group">
                 <label for="password">Password</label>
                   <input required type="password" 
                     id="password" 
                     placeholder="Password" 
                     autocomplete="new-password" 
                     aria-label="Password" 
                     pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"/>
                 <span class="validation-feedback" hidden ></span>
               </div>
               <div class="input-group">
                 <label for="confirm">Confirm Password</label>
                  <input required type="password" 
                    id="confirm" 
                    placeholder="Confirm Password" 
                    autocomplete="new-password" 
                    aria-label="Confirm Password" 
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"/>
                 <span class="validation-feedback" hidden ></span>
               </div>
               <button disabled id="signup" 
                       name="authenticate" 
                       type="submit" 
                       data-action="signup">Create Account
               </button>`,
      footer: `<span>Already have an account? <button id="login" data-name="login" type="button">Login</button></span>`,
    };
    this.#form = `<form id="${data.name}" data-action="submit"></form>`;
    this.#newEmail = `<div class="input-group">
                       <label for="email">Email</label>
                        <input required type="email" 
                          id="email" 
                          placeholder="Email" 
                          autocomplete="new-email" 
                          aria-label="Email"/>
                        <span class="validation-feedback" hidden ></span>
                      </div>`;
    this.#button = `<button disabled id="${data.name}" 
                       name="authenticate" 
                       type="submit" 
                       data-action="${data.name}">${data.name}
                    </button>`;
    this.#valid = "<span>Nailed it! 🔨</span>";
  }//password, pin, reset = name
  #to() {
    return {
      modal: this.#modal,
      stateModal: this.#stateModal,
      loginModal: this.#loginModal,
      signupModal: this.#signupModal,
      form: this.#form,
      newEmail: this.#newEmail,
      buttons: this.#button,
      valid: this.#valid,
    };
  }
  static from(data) {
    return new ModalView(data).#to();
  }
}
