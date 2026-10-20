import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   page.on("console", (msg) => console.log("PAGE:", msg.text()));
// });

async function openCoinTooltip(page, coinId) {
  await page.locator(`#${coinId}`).click();
  await page.locator(`#coined`).click();
  await expect(page.locator("#tooltip")).toBeVisible();
}

test("page loads with a title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Coin/i);
});

test("map renders on load", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("svg")).toBeVisible();
});

test("clicking a state path creates a coin", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-name="California"]').click();
  await expect(page.locator("#California")).toBeVisible();
});

test("clicking a modal coin adds a tooltip and renames the coin", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('path[data-name="California"]').click();

  const coin = page.locator("#California[data-location='modal']");
  await expect(coin).toBeVisible();
  await coin.click();

  await expect(page.locator("#coined")).toBeVisible();

  await page.locator("#coined").click();

  await expect(page.locator("#tooltip[data-action='add']")).toBeVisible();
});

// Mobile: fresh coin → add → favorites
test("mobile: adding a fresh coin places it in favorites", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  const slidePath = page.locator("#state-carousel path[data-name]").first();
  const stateName = await slidePath.getAttribute("data-name");

  await slidePath.click();

  await page.locator("#coin").click();
  await page.locator("#coined").click(); //confirms #coined exists
  await page.locator("#tooltip[data-action='add']").click();
  await page.locator("#hamburger").click();
  await page.locator("#favorites").click();

  await expect(
    page.locator(`[data-collection="favorites"] [id="${stateName}"]`),
  ).toBeVisible();
});

// Desktop: fresh coin → add → map
test("desktop: adding a fresh coin places it on the map", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.locator('path[data-name="California"]').click();
  await page.locator("#coin").click();
  await page.locator("#coined").click();
  await page.locator("#tooltip[data-action='add']").click();
  await expect(page.locator("#usmap foreignObject #coin")).toBeVisible();
});

//Mobile: Archive coin -> add -> remove from archive place into Favorites-colleciton
test("mobile: adding an archived coin moves it to favorites", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  // wait for restore() to finish populating the map
  await page.waitForFunction(() => {
    return document.querySelectorAll("#usmap path[data-name]").length > 0;
  });
  // now the map is ready
  const index = await page.evaluate(() => {
    const paths = [...document.querySelectorAll("#usmap path[data-name]")];
    return paths.findIndex((p) => p.dataset.name === "California");
  });
  // 2. Seed localStorage: California in archive, favorites empty
  await page.evaluate(() => {
    localStorage.setItem("favorites", "[]");
    localStorage.setItem("archive", '["California"]');
  });
  // 3. Reload — app boots with California in archive
  await page.reload();
  // 4. Force California into the carousel using stored index
  await page.evaluate(async (idx) => {
    const { usMapController, carouselController } = window.Controllers;
    const req = { body: { carousel: { index: idx } } };
    let responseBody;
    const res = {
      obj: (data) => {
        responseBody = data;
      },
    };
    await usMapController.getCarouselPathsByIndex(req, res);
    req.body.usmap = responseBody.to();
    await carouselController.putSlidesInPosition(req, res);
  }, index);
  // 5. Click California's slide path
  await page.locator('#state-carousel path[data-name="California"]').click();
  await page.locator("#coin").click();
  await page.locator("#coined").click();
  // 6. Tooltip should show "add" (not "restore") because the coin is coming from the map view
  await page.locator("#tooltip[data-action='add']").click();
  // 7. Open collection panel, assert coin moved to favorites, gone from archive
  await page.locator("#hamburger").click();
  await page.locator("#favorites").click();
  await expect(
    page.locator('[data-collection="favorites"] [id="California"]'),
  ).toBeVisible();
  await expect(
    page.locator('[data-collection="archive"] [id="California"]'),
  ).toHaveCount(0);
});

test("desktop: adding an archived coin moves it to the map", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.setItem("favorites", "[]");
    localStorage.setItem("archive", '["California"]');
  });

  await page.reload();

  await page.locator("path[data-name='California']").click();
  await page.locator("#coin").click();
  await page.locator("#coined").click();
  await page.locator("#tooltip[data-action='add']").click();

  await expect(page.locator("#usmap foreignObject #California")).toBeVisible();
  await expect(
    page.locator('[data-collection="archive"] #California'),
  ).toHaveCount(0);
});

test("mobile: deleting an archived coin removes it from the DOM", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.setItem("favorites", "[]");
    localStorage.setItem("archive", '["California"]');
  });

  await page.reload();

  await page.locator("#hamburger").click();
  await page.locator("#archive").click();

  await page.locator('[data-collection="archive"] #California > #coin').click();
  await page.locator("#coined").click();
  await page.locator("#tooltip[data-action='delete']").click();

  await expect(
    page.locator('[data-collection="archive"] #California'),
  ).toHaveCount(0);
});

test("mobile: restoring an archived coin add back to favorites collection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.setItem("favorites", "[]");
    localStorage.setItem("archive", '["California"]');
  });

  await page.reload();

  await page.locator("#hamburger").click();
  await page.locator("#archive").click();

  await page.locator('[data-collection="archive"] #California > #coin').click();
  await page.locator("#coined").click();
  await page.locator("#tooltip[data-action='restore']").click();

  await expect(
    page.locator('[data-collection="favorites"] #California'),
  ).toHaveCount(1);
});

test("desktop: restoring an archived coin add back into the map", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.setItem("favorites", "[]");
    localStorage.setItem("archive", '["California"]');
  });

  await page.reload();

  await page.locator("#archive").click();

  await page.locator('[data-collection="archive"] #California > #coin').click();
  await page.locator("#coined").click();
  await page.locator("#tooltip[data-action='restore']").click();

  await expect(page.locator("#usmap foreignObject > #California")).toHaveCount(
    1,
  );
});
