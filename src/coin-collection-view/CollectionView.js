export class CollectionView {
    #favorites;
    #archive;

    constructor(data){
        this.#html = data
    }

    // #entity = {}
    
    get entity() {
      return {}
    }
    set #html(_) {
    this.#favorites = `<div id="favorites-collection" class="collection-container" hidden>
                          <h3>Favorite Quarters</h3>
                          <div data-collection="favorites"></div>
                        </div>`;
    this.#archive = `<div id="archive-collection" class="collection-container" hidden>
                        <h3>Archived Quarters</h3>
                        <div data-collection="archive"></div>
                      </div>`;
  }

  #to(){
    return {
        favorites: this.#favorites,
        archive: this.#archive
    }
  }
  static from(data){
    return new CollectionView(data).#to()
  }
}