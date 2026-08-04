import { handler as updateModalTemplate } from "./updateModalView.js";
import { handler as updatePageVIew } from "./updatePageView.js";
import { handler as updateTooltip } from "./updateTooltip.js";
import { handler as updateUserCollection } from "./updateUserCollection.js";
import { handler as deleteOverlay } from "./deleteOverlay.js";
import { handler as updateMenuViewState } from "./updateMenu.js";
import { handler as deleteBackdrop } from "./deleteBackDrop.js";
import { handler as updatePathLocation } from "./updatePathLocation.js";
import { handler as updateFoLocation } from "./updateFoLocation.js";
import { handler as deleteTooltip } from "./deleteTooltip.js";
import { handler as updateAuthInput } from "./updateAuthInput.js";
import { handler as postAuthForm } from "./postAuthForm.js";
import { handler as updateUiMode } from "./updateUi.js";

export const event = async (e) => {
  const type = e.type;
  const [tag] = e.composedPath();
  const tagName = tag.tagName.toLowerCase() || "document";
  const id = tag.id || "app";
  const route = `${type}:/${tagName}/${id}`;

  const reduce = (m) =>
    Object.entries(map).reduce(
      (acc, [key, value]) =>
        key.includes(route) ? { ...acc, [route]: value } : acc,
      {},
    );

  const collectionRouter = {
    "click:/button/tooltip": async () => await updateUserCollection(e),
    "click:/div/coin": async () => await updateTooltip(e),
    "mouseout:/div/coin": async () => await deleteTooltip(e),
  };
  const carouselRouter = {
    "click:/*/carousel": async () => await updateCarousel(e),
  };
  const uiRouter = {
    "click:/button/hamburger": async () => await updateMenuViewState(e),
    "click:/body/body": async () => await deleteBackdrop(e),
    "click:/button/close": async () => await deleteOverlay(e),
    "resize:/document/app": async () => await updateUiMode(e),
  };
  const authRouter = {
    "input:/input/auth": async () => await updateAuthInput(e),
    "submit:/button/auth": async () => await postAuthForm(e),
  };
  const pageRouter = () => {
    const map = {
      [["click:/div/favorites", "click:/div/archived"]]: async () =>
        await updatePageView(e),
    };
    return reduce(map);
  };
  const modalRouter = () => {
    const map = {
      [["click:/*/state", "click:/a/login", "click:/a/signup"]]: async () =>
        await updateModalView(e),
    };
    return reduce(map);
  };

  const mapRouter = () => {
    const map = {
      [["mouseover:/path/state", "mouseout:/path/state"]]: async () =>
        await updatePathLocation(e),
      [["mouseover:/foreignObject/fo", "mouseout:/foreignObject/fo"]]:
        async () => await updateFoLocation(e),
    };
    return reduce(map);
  };

  const router = {
    ...collectionRouter,
    ...uiRouter,
    ...authRouter,
    ...carouselRouter,
    ...pageRouter(),
    ...modalRouter(),
    ...mapRouter(),
  };

  if (router[route]) await router[route]();
};
