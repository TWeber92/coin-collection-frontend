export class ModalDTO {
  #stateModal;
  #loginModal;
  #signupModal;
  #collectedId;
  constructor({ name, year, favorites }) {
    this.#stateModal = `
      <div id="modal" class="modal-state">
        <div class="modal-header">
          <h2>${name}</h2>
          <button id="close" type="button">✕</button>
        </div>
        <div class="modal-body">
          <div id="collected" hidden=${favorites.includes(name) ? false : true}> You Already Collected ${name}! ⭐️</div>
        </div>
        <div class="modal-footer">          
          <div>Year Minted: ${year}</div>
          <a href="https://www.usa.gov/states/${name}>Find Out More About ${name}</a>
        </div>
      </div>
    `;

    this.#loginModal = `
      <div id="modal" class="modal-login">
        <div class="modal-header">
          <h2>${name}</h2>
          <button id="close" type="button">✕</button>
        </div>
        <div class="modal-body">
          <form id="auth" data-action="submit">
            <div class="input-group">
              <input type="email" id="modal" placeholder="Email" data-validate="email" />
              <span class="validation-feedback hidden" data-for="email"></span>
            </div>
            <div class="input-group">
              <input type="password" id="auth" placeholder="Password" data-validate="password" />
              <span class="validation-feedback hidden" data-for="password"></span>
            </div>
            <button id="auth" type="submit" data-action="login">Sign In</button>
          </form>
        </div>
        <div class="modal-footer">
          <span>Don't have an account? <button id="signup" data-action="signup" type="button">Sign Up</button></span>
        </div>
      </div>
    `;

    this.#signupModal = `
      <div id="modal" class="modal-signup">
        <div class="modal-header">
          <h2>${name}</h2>
          <button id="close" type="button">✕</button>
        </div>
        <div class="modal-body">
          <form id="auth" data-action="submit">
            <div class="input-group">
              <input type="email" id="modal" placeholder="Email" data-validate="email" />
              <span class="validation-feedback hidden" data-for="email"></span>
            </div>
            <div class="input-group">
              <input type="password" id="auth" placeholder="Password" data-validate="password" />
              <span class="validation-feedback hidden" data-for="password"></span>
            </div>
            <div class="input-group">
              <input type="password" id="auth" placeholder="Confirm Password" data-validate="confirm" />
              <span class="validation-feedback hidden" data-for="confirm"></span>
            </div>
            <button id="auth" type="submit" data-action="signup">Create Account</button>
          </form>
        </div>
        <div class="modal-footer">
          <span>Already have an account? <button id="login" data-action="login" type="button">Login</button></span>
        </div>
      </div>
    `;
    this.#collectedId = this.#stateModal.match(/collected/)[0];
  }

  #toJSON() {
    return {
      state: this.#stateModal,
      login: this.#loginModal,
      signup: this.#signupModal,
      id: this.#collectedId,
    };
  }
  static fromEntity(entity) {
    return new ModalDTO(entity).#toJSON();
  }
}
