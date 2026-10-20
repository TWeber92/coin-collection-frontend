import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { BrowserRepository } from "../src/coin-collection-repository/BrowserRepository";
import { makeCollectionEntity } from "./fixtures/html";
import { CollectionService } from "../src/coin-collection-service/CollectionService";
import { MockClient } from "./fixtures/mocks";
import { CollectionRepository } from "../src/coin-collection-repository/CollectionRepository";
import { DocumentClient } from "../src/coin-collection-repository/DocumentClient";

test("runner is alive", () => {
  assert.equal(1 + 1, 2);
});

beforeEach((t) => {
  t.mock.method(DocumentClient.prototype, "POST", () => {});
  t.mock.method(DocumentClient.prototype, "DELETE", () => {});
});

test("happy PUT: writes to mock user, localStorage, and user.collection", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient();
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Nevada", dataset: { location: "modal" } };
  const service = new CollectionService(repo, browser);
  await service.putCoinInFavoritesCollection(coin, user);

  assert.equal(user.message, undefined);
  assert.ok(local.user.collection.favorites.includes("Nevada"));
  assert.ok(browser.getLocalStorageByKey("favorites").includes("Nevada"));
  assert.ok(user.collection.favorites.includes("Nevada"));
  assert.equal(coin.dataset.location, "favorites");
});

test("mad PUT (401): no writes, user.message set", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient({ fail: true });
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Nevada", dataset: { location: "modal" } };
  const service = new CollectionService(repo, browser);
  await service.putCoinInFavoritesCollection(coin, user);

  assert.ok(user.message);
  assert.deepEqual(local.user.collection.favorites, ["California", "Texas"]);
  assert.deepEqual(browser.getLocalStorageByKey("favorites"), [
    "California",
    "Texas",
  ]);
  assert.deepEqual(user.collection.favorites, ["California", "Texas"]);
  assert.equal(coin.dataset.location, "modal");
});
test("happy PUT: coin moves from favorites to archive (mock user, localStorage, user.collection)", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient();
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Texas", dataset: { location: "modal" } };
  const service = new CollectionService(repo, browser);
  await service.putFavoriteInArchiveCollection(coin, user);

  assert.equal(user.message, undefined);
  // added to archive
  assert.ok(local.user.collection.archive.includes("Texas"));
  assert.ok(browser.getLocalStorageByKey("archive").includes("Texas"));
  assert.ok(user.collection.archive.includes("Texas"));
  // removed from favorites
  assert.ok(!local.user.collection.favorites.includes("Texas"));
  assert.ok(!browser.getLocalStorageByKey("favorites").includes("Texas"));
  assert.ok(!user.collection.favorites.includes("Texas"));
  assert.equal(coin.dataset.location, "archive");
});

test("mad PUT (401): nothing moves, user.message set", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient({ fail: true });
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Texas", dataset: { location: "modal" } };
  const service = new CollectionService(repo, browser);
  await service.putFavoriteInArchiveCollection(coin, user);

  assert.ok(user.message);
  // archive untouched
  assert.deepEqual(local.user.collection.archive, ["Nevada"]);
  assert.deepEqual(browser.getLocalStorageByKey("archive"), ["Nevada"]);
  assert.deepEqual(user.collection.archive, ["Nevada"]);
  // favorites untouched
  assert.deepEqual(local.user.collection.favorites, ["California", "Texas"]);
  assert.deepEqual(browser.getLocalStorageByKey("favorites"), [
    "California",
    "Texas",
  ]);
  assert.deepEqual(user.collection.favorites, ["California", "Texas"]);
  assert.equal(coin.dataset.location, "modal");
});

test("happy DELETE: removes coin from mock user, localStorage, and user.collection", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient();
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Nevada", dataset: { location: "archive" } };
  const service = new CollectionService(repo, browser);
  await service.deleteArchivedFromCollection(coin, user);

  assert.equal(user.message, undefined);
  assert.ok(!local.user.collection.archive.includes("Nevada"));
  assert.ok(!browser.getLocalStorageByKey("archive").includes("Nevada"));
  assert.ok(!user.collection.archive.includes("Nevada"));
});

test("mad DELETE (401): archive untouched, user.message set", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient({ fail: true });
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Nevada", dataset: { location: "archive" } };
  const service = new CollectionService(repo, browser);
  await service.deleteArchivedFromCollection(coin, user);

  assert.ok(user.message);
  assert.deepEqual(local.user.collection.archive, ["Nevada"]);
  assert.deepEqual(browser.getLocalStorageByKey("archive"), ["Nevada"]);
  assert.deepEqual(user.collection.archive, ["Nevada"]);
  assert.deepEqual(user.collection.favorites, ["California", "Texas"]);
});
test("happy PUT: coin moves from archive to favorites (mock user, localStorage, user.collection)", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient();
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Nevada", dataset: { location: "archive" } };
  const service = new CollectionService(repo, browser);
  await service.putArchivedInFavoritesCollection(coin, user);

  assert.equal(user.message, undefined);
  // added to favorites
  assert.ok(local.user.collection.favorites.includes("Nevada"));
  assert.ok(browser.getLocalStorageByKey("favorites").includes("Nevada"));
  assert.ok(user.collection.favorites.includes("Nevada"));
  // removed from archive
  assert.ok(!local.user.collection.archive.includes("Nevada"));
  assert.ok(!browser.getLocalStorageByKey("archive").includes("Nevada"));
  assert.ok(!user.collection.archive.includes("Nevada"));
  assert.equal(coin.dataset.location, "favorites");
});

test("mad PUT (401): nothing moves, user.message set", async () => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const local = new MockClient({ fail: true });
  const repo = new CollectionRepository(
    { entity: makeCollectionEntity() },
    "api",
    local,
    null,
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const coin = { id: "Nevada", dataset: { location: "archive" } };
  const service = new CollectionService(repo, browser);
  await service.putArchivedInFavoritesCollection(coin, user);

  assert.ok(user.message);
  // favorites untouched
  assert.deepEqual(local.user.collection.favorites, ["California", "Texas"]);
  assert.deepEqual(browser.getLocalStorageByKey("favorites"), [
    "California",
    "Texas",
  ]);
  assert.deepEqual(user.collection.favorites, ["California", "Texas"]);
  // archive untouched
  assert.deepEqual(local.user.collection.archive, ["Nevada"]);
  assert.deepEqual(browser.getLocalStorageByKey("archive"), ["Nevada"]);
  assert.deepEqual(user.collection.archive, ["Nevada"]);
  assert.equal(coin.dataset.location, "archive");
});

test("favorites win: item in both favorites and archive resolves to favorites", async (t) => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California"]);
  browser.putLocalStorageByKey("archive", ["California"]);

  const repo = {
    entity: makeCollectionEntity(),
  };

  const user = {
    authenticated: true,
    collection: {
      favorites: browser.getLocalStorageByKey("favorites"),
      archive: browser.getLocalStorageByKey("archive"),
    },
  };

  const service = new CollectionService(repo, browser);
  t.mock.method(service, "putArchivedCollectionInEntity", () => {});

  await service.getUserSyncedCollection(user);

  assert.ok(user.collection.favorites.includes("California"));
  assert.ok(!user.collection.archive.includes("California"));
  assert.deepEqual(browser.getLocalStorageByKey("archive"), []);
  assert.equal(user.merged, true);
});
test("unauthenticated: local storage wins, user.collection overwritten", async (t) => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const repo = { entity: makeCollectionEntity() };

  const user = {
    authenticated: false,
    collection: {
      favorites: ["Texas"],
      archive: ["Maine"],
    },
  };

  const service = new CollectionService(repo, browser);
  t.mock.method(service, "putArchivedCollectionInEntity", () => {});

  await service.getUserSyncedCollection(user);

  assert.deepEqual(user.collection.favorites, ["California"]);
  assert.deepEqual(user.collection.archive, ["Nevada"]);
  assert.equal(user.merged, false);
});

test("nothing changed: merged is false, no localStorage writes", async (t) => {
  const browser = new BrowserRepository();
  browser.putLocalStorageByKey("favorites", ["California", "Texas"]);
  browser.putLocalStorageByKey("archive", ["Nevada"]);

  const repo = { entity: makeCollectionEntity() };

  const user = {
    authenticated: true,
    collection: {
      favorites: ["California", "Texas"],
      archive: ["Nevada"],
    },
  };

  const service = new CollectionService(repo, browser);
  t.mock.method(service, "putArchivedCollectionInEntity", () => {});

  await service.getUserSyncedCollection(user);

  assert.deepEqual(user.collection.favorites, ["California", "Texas"]);
  assert.deepEqual(user.collection.archive, ["Nevada"]);
  assert.equal(user.merged, false);
});

test("scenario 1: coin in favorites DOM resolves favorite name, archive orphan kept", async (t) => {
  const browser = new BrowserRepository();
  const repo = {
    entity: makeCollectionEntity(),
    deleteCoinsFromCollection: t.mock.fn(),
    archive: true,
  };
  const { favorites } = repo.entity;

  const makeCoin = (id) => {
    const el = document.createElement("div");
    el.id = id;
    return el;
  };

  favorites.lastChild.append(
    makeCoin("Oregon"),
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: ["California", "Washington", "Oregon"],
      archive: ["Montana"],
    },
  };

  const service = new CollectionService(repo, browser);
  service.putCoinsInRespectiveDisplays(user, false, "favorites", "archive");

  assert.deepEqual(user.collection.favorites, ["California", "Washington"]);
  assert.deepEqual(user.collection.archive, ["Montana"]);
  assert.ok([...favorites.lastChild.children].some((c) => c.id === "Oregon"));
});

test("scenario 2: coin in archive DOM resolves favorite name, archive orphan kept", async (t) => {
  const browser = new BrowserRepository();
  const repo = {
    entity: makeCollectionEntity(),
    deleteCoinsFromCollection: t.mock.fn(),
    archive: true,
  };
  const { favorites, archive } = repo.entity;

  const makeCoin = (id) => {
    const el = document.createElement("div");
    el.id = id;
    return el;
  };

  archive.lastChild.append(
    makeCoin("California"),
  );

  const user = {
    authenticated: true,
    collection: {
      favorites: ["California", "Washington", "Oregon"],
      archive: ["Montana"],
    },
  };

  const service = new CollectionService(repo, browser);
  service.putCoinsInRespectiveDisplays(user, false, "favorites", "archive");

  assert.deepEqual(user.collection.favorites, ["Washington", "Oregon"]);
  assert.deepEqual(user.collection.archive, ["Montana"]);
  assert.ok([...favorites.lastChild.children].some((c) => c.id === "California"));
  assert.ok(![...archive.lastChild.children].some((c) => c.id === "California"));
});
test("all coins present: every name resolves, both arrays emptied", async (t) => {
  const browser = new BrowserRepository();
  const repo = {
    entity: makeCollectionEntity(),
    deleteCoinsFromCollection: t.mock.fn(),
    archive: true,
  };
  const { favorites, archive } = repo.entity;

  const makeCoin = (id) => {
    const el = document.createElement("div");
    el.id = id;
    return el;
  };

  favorites.lastChild.append(
    makeCoin("California"),
    makeCoin("Washington"),
  );
  archive.lastChild.append(makeCoin("Montana"));

  const user = {
    authenticated: true,
    collection: {
      favorites: ["California", "Washington"],
      archive: ["Montana"],
    },
  };

  const service = new CollectionService(repo, browser);
  service.putCoinsInRespectiveDisplays(user, false, "favorites", "archive");

  assert.deepEqual(user.collection.favorites, []);
  assert.deepEqual(user.collection.archive, []);
});
