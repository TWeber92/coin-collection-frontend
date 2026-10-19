import { Application } from "../src/Application.js";
// import { EventRegister } from "../src/EventRegister.js";

export const handler = async (e) => {
  let responseBody;
  const action = e.target.dataset.action;
  const value = e.target.value;
  const mq = window.matchMedia("(max-width: 768px)").matches;
  const {
    authController,
    modalController,
    collectionController,
    coinController,
    pageController,
    usMapController,
    headerController,
    tooltipController,
  } = Application.controllers;
  const route = `${action}:${value}`;
  const res = { obj: (data) => (responseBody = data) };
  const req = {
    body: {
      relative: e.relatedTarget,
      tooltip: e.target,
      clone: action === "add",
    },
  };
  const getCollection = async () => {
    req.body.collection = responseBody.to(); //collectionDTO obj
    req.body.header = req.body.collection.header; // headerDTO obj
  };
  const getCoin = async () => {
    await coinController.getSelectedCoinEntity(req, res); //args - clone
    req.body.coin = responseBody.to();
  };

  const updateBadges = async () => {
    await headerController.putNewCountInBadge(req, res); //args - header.collection
    req.body.header = responseBody.to(); //HeaderDTO obj
    req.body.favoritesId = req.body.header.buttons.favorites.id;
    req.body.archiveId = req.body.header.buttons.archive?.id;
  };
  const updateArchiveFooter = async (id) => {
    req.body.button = { id };
    await pageController.putFooterContentsOnOffPage(req, res); //args - button.id, header.collection.archive (count), collection.archive
  };
  const deleteId = async () => {
    if (req.body.coin.entity.children["coined"])
      await coinController.deletePartOfCoinId(req, res); //args - none
  };

  await authController.getMe(req, res);
  req.body.user = responseBody.to();
  if (req.body.user.message) req.body.user.message.toToast();

  const updateMap = {
    "add:coin": async () => {
      req.body.name = req.body.tooltip.parentNode.id;
      await collectionController.getCoinFromArchiveCollection(req, res); //args - name
      const coin = responseBody; //raw coin node
      if (coin) req.body.coin = { entity: coin };
      else {
        await getCoin();
        await deleteId();
        req.body.tooltip = req.body.coin.entity.firstChild; //this is a clone containing a the tooltip that needs removal
      }
      await tooltipController.deleteTooltip(req, res); //args - relative, tooltip, clone
      await collectionController.postToFavoritesCollection(req, res); //args - coin.entity, user
      await getCollection();
      if (!mq) await usMapController.putCoinInForeignObj(req, res); // args - coin.entity

      req.body.name = req.body.coin.entity.id;
      await coinController.putNewCoinInEntity(req, res); // args - name
      req.body.coin = responseBody.to(); //Full CoinDTO obj
      req.body.user = req.body.collection.user; //UserDTO obj
      await modalController.postStateModalContext(req, res); // args - coin, user.collection.favorites
      await updateBadges();
    },
    "archive:coin": async () => {
      await getCoin();
      await deleteId();
      await tooltipController.deleteTooltip(req, res); //args - relative, tooltip, clone
      if (!mq) {
        req.body.fo = req.body.coin.entity.parentNode;
        usMapController.putFOBack(req, res);
        req.body.fo.dataset.mouse = "inactive";
      }
      await collectionController.putFavoriteInArchiveCollection(req, res); //args - coin.entity, user
      await getCollection();
      await updateBadges();
      if (mq) {
        await pageController.putArchiveOnPage(req, res); //args - collection.favorites, collection.archive, favoritesId, archiveId
        req.body.page = responseBody.to()
        req.body.selectedId = action
        await collectionController.putCollectionOnOrOffPage(req, res) //args - collection, selectedId, page
      }
      else updateArchiveFooter(action);
    },

    "restore:coin": async () => {
      await getCoin();
      await deleteId();
      await tooltipController.deleteTooltip(req, res); //args - relative, tooltip, clone
      await collectionController.putArchivedInFavoritesCollection(req, res); //args - coin.entity, user
      await getCollection();
      if (!mq) {
        await updateArchiveFooter("archive");
        await usMapController.putCoinInForeignObj(req, res); // args - coin.entity
      }
      await updateBadges();
    },
    "delete:coin": async () => {
      await getCoin();
      await deleteId();
      await tooltipController.deleteTooltip(req, res); //args - relative, tooltip, clone
      await collectionController.deleteArchivedFromCollection(req, res); //args - coin.entity, user
      await getCollection();
      if (!mq) await updateArchiveFooter("archive");
      await updateBadges();
    },
  };
  await updateMap[route]();
};
