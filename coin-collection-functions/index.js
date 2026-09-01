import { handler as updateModalView } from "./updateModalView.js";
import { handler as updateCarousel } from "./updateCarousel.js";
import { handler as updatePageView } from "./updatePageView.js";
import { handler as updateTooltip } from "./updateToolltip.js";
import { handler as updateUserCollection } from "./updateUserCollection.js";
import { handler as deleteOverlay } from "./deleteOverlay.js";
import { handler as updateMenuView } from "./updateMenuView.js";
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

  // const reduce = (m) =>
  //   Object.entries(m).reduce(
  //     (acc, [key, value]) =>
  //       key.includes(route) ? { ...acc, [route]: value } : acc,
  //     {},
  //   );

  // const collectionRouter = {
  //   "click:/button/tooltip": async () => await updateUserCollection(e),
  //   "click:/div/coin": async () => await updateTooltip(e),
  //   "mouseout:/div/coin": async () => await deleteTooltip(e),
  // };
  // const carouselRouter = {
  //   "click:/*/carousel": async () => await updateCarousel(e),
  // };
  // const uiRouter = {
  //   "click:/button/hamburger": async () => await updateMenuView(e),
  //   "click:/body/body": async () => await deleteBackdrop(e),
  //   "click:/button/close": async () => await deleteOverlay(e),
  //   "*:/ui/update": async () => await updateUiMode(e),
  // };
  // const authRouter = {
  //   "input:/input/auth": async () => await updateAuthInput(e),
  //   "submit:/button/auth": async () => await postAuthForm(e),
  // };
  // const pageRouter = () => {
  //   const map = {
  //     [["click:/div/favorites", "click:/div/archived"]]: async () =>
  //       await updatePageView(e),
  //   };
  //   return reduce(map);
  // };
  // const modalRouter = () => {
  //   const map = {
  //     [["click:/*/state", "click:/a/login", "click:/a/signup"]]: async () =>
  //       await updateModalView(e),
  //   };
  //   return reduce(map);
  // };

  // const mapRouter = () => {
  //   const map = {
  //     [["mouseover:/path/state", "mouseout:/path/state"]]: async () =>
  //       await updatePathLocation(e),
  //     [["mouseover:/foreignObject/fo", "mouseout:/foreignObject/fo"]]:
  //       async () => await updateFoLocation(e),
  //   };
  //   return reduce(map);
  // };
  const router = {
    "load:/ui/update": async () => await updateUiMode(e),
    "change:/ui/update": async () => await updateUiMode(e),
    "click:/svg/state": async () => await updateModalView(e),
    "click:/path/state": async () => await updateModalView(e),
    "click:/div/state": async () => await updateModalView(e),
    "click:/button/login": async () => await updateModalView(e),
    "click:/button/signup": async () => await updateModalView(e),
    "click:/button/close": async () => await deleteOverlay(e),
    "click:/button/hamburger": async () => await updateMenuView(e),
    "click:/button/next": async () => await updateCarousel(e),
    "click:/span/next": async () => await updateCarousel(e),
    "click:/button/prev": async () => await updateCarousel(e),
    "click:/span/prev": async () => await updateCarousel(e),
    "input:/input/email": async () => await updateAuthInput(e),
    "input:/input/password": async () => await updateAuthInput(e),
    "input:/input/confirm": async () => await updateAuthInput(e),
    "click:/div/coin": async () => await updateTooltip(e),
    "mouseout:/div/coin": async () => await deleteTooltip(e),
    "click:/button/favorites": async () => await updatePageView(e),
    "click:/button/tooltip": async () => await updateUserCollection(e),
    // ...collectionRouter,
    // ...uiRouter,
    // ...authRouter,
    // ...carouselRouter,
    // ...pageRouter(),
    // ...modalRouter(),
    // ...mapRouter(),
  };
  try {
    if (type !== "mouseout") console.log(route);
    if (router[route]) await router[route]();
  } catch (err) {
    const error = err.toJSON();
    const map = {
      ValidationError: () => err.toSpan(),
      AuthenticationError: () => err.toToast(),
      AuthorizationError: () => err.toToast(),
    };
    map[error.name]();
  }
};
