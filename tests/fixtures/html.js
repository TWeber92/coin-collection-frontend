import { CollectionView } from "../../src/coin-collection-view/CollectionView";
import { HtmlStore } from "../../src/HtmlStore";


export function makeCollectionEntity() {
  const { favorites, archive } = CollectionView.from({});
  const store = new HtmlStore(favorites + archive);
  const [fav, arc] = store.nodes;
  return { favorites: fav, archive: arc };
}
