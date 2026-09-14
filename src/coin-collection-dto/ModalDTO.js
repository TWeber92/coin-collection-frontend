export class ModalDTO {
  static #json = {};
  #modal;
  #stateModal;
  #loginModal;
  #signupModal;
  #modalId;
  #name;
  #year;
  #coin;
  constructor(entity) {
    entity = { ...ModalDTO.#json, ...entity };
    this.#html = entity;
    this.#modalId = entity.id;
    this.#name = entity.name;
    this.#year = entity.year;
    this.#coin = entity.coin;
    ModalDTO.#json = this.#toJSON();
  }

  set #html(entity) {
    this.#modal = `
        <div class="modal-header">
          <h2></h2>
          <button id="close" type="button">✕</button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer"></div>`;
    this.#stateModal = {
      title: `<h2>${entity.name}</h2>`,
      body: `<div class="collected" ${entity.favorites?.includes(entity.name) ? "" : "hidden"}> You Already Collected ${entity.name}! ⭐️</div>`,
      footer: `<div>Year Minted: ${entity.year}</div>
              <a href="https://www.usa.gov/states/${entity.name}">Find Out More About ${entity.name}</a>`,
    };
    this.#loginModal = {
      title: `<h2>${entity.id?.toUpperCase()}</h2>`,
      body: `<form id="login" data-action="submit">
            <div class="input-group">
              <label for="email">Email</label>
              <input required type="email" id="email" placeholder="Email" autocomplete="email" aria-label="Email" />
              <span class="validation-feedback" hidden ></span>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input required type="password" id="password" placeholder="Password" autocomplete="password" aria-label="Password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"/>
              <span class="validation-feedback" hidden ></span>
            </div>
            <button disabled id="login" name="authenticate" type="submit" data-action="login">Sign In</button>
          </form>`,
      footer: `<span>Don't have an account? <button id="signup" data-name="signup" type="button">Sign Up</button></span>`,
    };

    this.#signupModal = {
      title: `<h2>${entity.id?.toUpperCase()}</h2>`,
      body: `<form id="signup" data-action="submit">
               <div class="input-group">
                 <label for="email">Email</label>
                 <input required type="email" id="email" placeholder="Email" autocomplete="new-email" aria-label="Email"/>
                 <span class="validation-feedback" hidden ></span>
               </div>
               <div class="input-group">
                 <label for="password">Password</label>
                 <input required type="password" id="password" placeholder="Password" autocomplete="new-password" aria-label="Password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"/>
                 <span class="validation-feedback" hidden ></span>
               </div>
               <div class="input-group">
                 <label for="confirm">Confirm Password</label>
                 <input required type="password" id="confirm" placeholder="Confirm Password" autocomplete="new-password" aria-label="Confirm Password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"/>
                 <span class="validation-feedback" hidden ></span>
               </div>
               <button disabled id="signup" name="authenticate" type="submit" data-action="signup">Create Account</button>
             </form>`,
      footer: `<span>Already have an account? <button id="login" data-name="login" type="button">Login</button></span>`,
    };
  }

  #toJSON() {
    return {
      template: this.#modal,
      state: this.#stateModal,
      login: this.#loginModal,
      signup: this.#signupModal,
      coin: this.#coin,
      id: this.#modalId,
      name: this.#name,
      year: this.#year,
    };
  }
  static fromEntity(entity) {
    return new ModalDTO(entity).#toJSON();
  }
}
