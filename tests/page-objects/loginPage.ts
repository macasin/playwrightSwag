import { Page } from "@playwright/test"; //Page in the Plywright represent a single tab or window in the browser

export class LoginPage {
  constructor(private page: Page) {}

  //navigate to the webpage
  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  //indetified the username field and enter the VALID data
  async usernameField(username: string) {
    await this.page.fill('input[placeholder="Username"]', username);
  }

  //indtified the password field and enter the VALID data
  async passwordField(password: string) {
    await this.page.fill('input[placeholder="Password"]', password);
  }

  //find the Login button and click on it, increase timeout to 10sec
  async clickLoginButton() {
    await this.page.click("#login-button", { timeout: 10000 });
  }

  //get the newURL
  async newURL() {
    return this.page.url();
  }

  //appear window message
  async errorMessageText() {
    const errorMessage = await this.page.textContent(
      "#login_button_container > div > form > div.error-message-container.error"
    );
    return errorMessage;
  }

  //get the image
  async image(selector: string) {
    const imageAlt = await this.page.getAttribute(selector, "alt");
    const imageSrc = await this.page.getAttribute(selector, "src");
    return { alt: imageAlt, src: imageSrc };
  }

  //get the logo text
  async logoText() {
    const headerText = await this.page.locator(
      "#header_container > div.primary_header > div.header_label > div"
    );
    return headerText;
  }

  //find and click on the 'Add to cart button'
  async clickAddToCartButton() {
    await this.page.click("#add-to-cart-sauce-labs-backpack");
  }

  //remove button click
  async clickRemoveButton() {
    return this.page.click("#remove-sauce-labs-backpack");
  }

  //remove button find
  async removeButton() {
    return this.page.locator("#remove-sauce-labs-backpack");
  }

  //find and click on filter
  async clickFilterButton() {
    await this.page.click("select.product_sort_container");
  }

  //find and click on button from Low to High price
  async clickFromHighToLowButton() {
    // Select the option for "Price (low to high)"
    await this.page.selectOption("select.product_sort_container", "lohi");
  }
}
