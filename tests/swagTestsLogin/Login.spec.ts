import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";

// declaring a variable at the file level
let loginPage: LoginPage;

// create beforeEach hook that will navigate to the Login page after each test
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

// normal user login
test("LoginValidation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.usernameField("standard_user");
  await loginPage.passwordField("secret_sauce");
  await loginPage.clickLoginButton();

  const expectedURL = "https://www.saucedemo.com/inventory.html";
  const currentURL = await loginPage.newURL();

  expect(currentURL).toContain(expectedURL);
});

// locked user login
test("LockedUserLoginValidation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.usernameField("locked_out_user");
  await loginPage.passwordField("secret_sauce");
  await loginPage.clickLoginButton();

  const expectedURL = "https://www.saucedemo.com/";
  const currentURL = await loginPage.newURL();
  expect(currentURL).toContain(expectedURL);

  const errorMessageText = await loginPage.errorMessageText();
  expect(errorMessageText).toBe(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

// problem user login
test("ProblemUserLoginValidation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.usernameField("problem_user");
  await loginPage.passwordField("secret_sauce");
  await loginPage.clickLoginButton();

  const expectedURL = "https://www.saucedemo.com/inventory.html";
  const currentURL = await loginPage.newURL();
  expect(currentURL).toContain(expectedURL);

  const expectedImage =
    'img.inventory_item_img[data-test="inventory-item-sauce-labs-backpack-img"]';
  const { src, alt } = await loginPage.image(expectedImage);
  expect(src).toBe("/static/media/sl-404.168b1cce.jpg");
  expect(alt).toBe("Sauce Labs Backpack");
});

// perfomance glitch user login
test("PerfomanceGlitchUserValidation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.usernameField("performance_glitch_user");
  await loginPage.passwordField("secret_sauce");
  await loginPage.clickLoginButton();

  const expectedURL = "https://www.saucedemo.com/inventory.html";
  const currentURL = await loginPage.newURL();
  expect(currentURL).toContain(expectedURL);

  const headerLabel = await loginPage.logoText();
  await expect(headerLabel).toBeVisible();
});

// error user login
test("ErrorUserValidation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.usernameField("error_user");
  await loginPage.passwordField("secret_sauce");
  await loginPage.clickLoginButton();

  const expectedURL = "https://www.saucedemo.com/inventory.html";
  const currentURL = await loginPage.newURL();
  expect(currentURL).toContain(expectedURL);

  await loginPage.clickAddToCartButton();
  const removeButton = await loginPage.removeButton();
  await expect(removeButton).toBeVisible(); //check if the add to the cart button become remove button

  await loginPage.clickRemoveButton();
  await expect(removeButton).toBeVisible(); //click on the remove button again and check if it still visible
});

// visual user login
test("VisualUserValidation", async ({ page }) => {
  await loginPage.usernameField("visual_user");
  await loginPage.passwordField("secret_sauce");
  await loginPage.clickLoginButton();

  const expectedURL = "https://www.saucedemo.com/inventory.html";
  const currentURL = await loginPage.newURL();
  expect(currentURL).toContain(expectedURL);

  const expectedImage =
    'img.inventory_item_img[data-test="inventory-item-sauce-labs-backpack-img"]';
  const { src, alt } = await loginPage.image(expectedImage);
  expect(src).toBe("/static/media/sl-404.168b1cce.jpg");
  expect(alt).toBe("Sauce Labs Backpack");

  await loginPage.clickFilterButton();
  await loginPage.clickFromHighToLowButton();
});
