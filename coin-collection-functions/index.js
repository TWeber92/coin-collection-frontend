import { handler as updateModalTemplate } from "./updateModalTemplate.js";
import { handler as updateTooltip } from "./updateTooltip.js";
import { handler as updateUserCollection } from "./updateUserCollection.js";
import { handler as deleteOverlay } from "./deleteOverlay.js";
import { handler as updateMenuViewState } from "./updateMenu.js";
import { handler as deleteBackdrop } from "./deleteBackDrop.js";
import { handler as updatePathLoc } from "./updatePath.js";
import { handler as updateFoLoc } from "./updateFO.js";
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

  const modalRouter = {
    "click:/*/state": async () => await updateModalTemplate(e),
    "click:/a/login": () => updateModalTemplate(e),
    "click:/a/signup": () => updateModalTemplate(e),
  };
  const collectionRouter = {
    "click:/button/tooltip": () => updateUserCollection(e),
    "click:/div/coin": () => updateTooltip(e),
    "mouseout:/div/coin": () => deleteTooltip(e),
  };
  const carouselRouter = {
    "click:/*/carousel": () => updateCarousel(e),
  };
  const uiRouter = {
    "click:/div/menu": () => updateMenuViewState(e),
    "click:/body/body": () => deleteBackdrop(e),
    "click:/div/overlay": () => deleteOverlay(e),
    "resize:/document/app": () => updateUiMode(e),
  };
  const authRouter = {
    "input:/input/auth": () => updateAuthInput(e),
    "submit:/button/auth": async () => await postAuthForm(e),
  };

  const mapRouter = () => {
    const map = {
      [["mouseover:/path/state", "mouseout:/path/state"]]: () =>
        updatePathLoc(e),
      [[
        "mouseover:/foreignObject/coin",
        "mouseout:/foreignObject/coin",
        "transitionend:/div/coin",
      ]]: () => updateFoLoc(e),
    };
    return Object.entries(map).reduce(
      (acc, [key, value]) =>
        key.includes(route) ? { ...acc, [route]: value } : acc,
      {},
    );
  };

  const router = {
    ...modalRouter,
    ...collectionRouter,
    ...uiRouter,
    ...authRouter,
    ...carouselRouter,
    ...mapRouter(),
  };

  if (router[route]) await router[route]();
};
