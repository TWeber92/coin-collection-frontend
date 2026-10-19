import { Application } from "../src/Application.js";

export const handler = async (e) => {
  let responseBody;
  const form = e.target;
  const mq = window.matchMedia("(max-width: 768px)").matches;
  const { email, pin, password } = Object.fromEntries(new FormData(e.target));
  const {
    authController,
    modalController,
    usMapController,
    headerController,
    collectionController,
    coinController,
  } = Application.controllers;
  const req = {
    body: { name: form.id, email, password, pin, foTag: "foreignObject" },
  };
  const res = { obj: (data) => (responseBody = data) };

  await headerController.getHeaderContext(req, res); //args - none
  req.body.header = responseBody.to(); //HeaderDTO obj
  const [favoritesKey, archiveKey] = Object.keys(req.body.header.collection);
  req.body.favoritesId = favoritesKey;
  req.body.archiveId = archiveKey;

  const router = {
    pin: async () => await modalController.postResetStageContext(req, res), //args - name
    reset: async () => {
      await authController.getPin(req, res); //args- email
      req.body.message = responseBody.message;
      await modalController.postPinStageContext(req, res); //args = message
    },
    login: async () => {
      await authController.postLoginForm(req, res); //args email, password
      req.body.user = responseBody.to(); //UserDTO obj
      if (req.body.user.message) return req.body.user.message.toToast();
      const userFavorites = req.body.user.collection.favorites;
      const userArchive = req.body.user.collection.archive;
      const userEmpty = !userFavorites.length && !userArchive.length; //both have to be empty
      await collectionController.getCollectionsById(req, res); //args - favoritesId, archiveId      
      req.body.collection = responseBody.to();
      // req.body.user.collection = req.body.collection.user.collection
      const localFavorites = req.body.collection.user.collection.favorites;
      const localArchive = req.body.collection.user.collection.archive;
      const localEmpty = !localFavorites.length && !localArchive.length;
      if (!userEmpty || !localEmpty) {
        if (!mq) {
          await usMapController.getAllCoinsFromForeignObjects(req, res); //args - foTag
          req.body.usmap = responseBody.to(); // UsMapDTO obj
        }
        await collectionController.getUserSyncedCollection(req, res); //args - user
        req.body.collection = responseBody.to(); // merged CollectionDTO
        req.body.user = req.body.collection.user; //UserDTO obj w/ merged collections
        const mergedFavorites = req.body.user.collection.favorites;
        const mergedArchive = req.body.user.collection.archive;
        await collectionController.putCoinsInRespectiveDisplays(req, res); //args - user, usmap, favoritesId, archiveId
        req.body.collection = responseBody.to(); //CollectionDTO obj
        req.body.user = req.body.collection.user; //UserDTO obj        
        for (const [k, v] of Object.entries(req.body.user.collection)) {
          const collection = req.body.collection[k]?.lastChild;
          if (collection) {
            for (const n of v) {
              req.body.name = n;
              await coinController.putNewCoinInEntity(req, res); //args - name
              const coinObj = responseBody.to(); //CoinDTO obj
              const coinEntity = coinObj.entity.cloneNode(true);
              coinEntity.hidden = false;
              coinEntity.dataset.location = k;              
              collection.append(coinEntity);
            }
          }
        }
        req.body.user.collection = {
          //rollback user collection to merged state
          favorites: mergedFavorites,
          archive: mergedArchive,
        };
        req.body.header.collection = {
          //rollback user header counts to merged state
          favorites: mergedFavorites.length,
          archive: mergedArchive.length,
        };
        await headerController.putNewCountInBadge(req, res); //args -  header.collection
        await authController.putNewCollectionInUser(req, res); //args -  user
        if (!mq) await usMapController.putCoinsBackInMap(req, res); //args collection.favorites
      }
      await headerController.deleteAboutHeaderButton(req, res); //args - user
      await modalController.deleteModalFromDisplay(req, res); //args - none
    },
    signup: async () => {
      await collectionController.getCollectionsById(req, res); //args - favoritesId, archiveId
      req.body.collection = responseBody.to(); //CollectionDTO obj
      await authController.postSignUpForm(req, res); //args - collection.user.collection
      await modalController.deleteModalFromDisplay(req, res); //args - none
    },
    password: async () => {
      await authController.postPasswordResetForm(req, res);
      responseBody.message.toToast();
      await modalController.deleteModalFromDisplay(req, res); //args - none
    },
  };
  await router[form.id]();
};
