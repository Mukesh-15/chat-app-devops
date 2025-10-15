const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async () => {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        // remove headless so browser opens in front
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
    )
    .build();

  try {
    const appUrl = "http://localhost:3000/register";
    console.log("Opening registration page...");
    await driver.get(appUrl);

    const usernameInput = await driver.wait(until.elementLocated(By.name("username")), 10000);
    const emailInput = await driver.findElement(By.name("email"));
    const passwordInput = await driver.findElement(By.name("password"));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    console.log("Filling registration form...");
    await usernameInput.sendKeys("seleniumTestUser10");
    await emailInput.sendKeys("doodapakamukesh@gmail.com");
    await passwordInput.sendKeys("Test@1234");

    console.log("Submitting registration form...");
    await submitButton.click();

    // Wait for OTP email text to appear (replace with actual DOM text if different)
    console.log("Waiting for OTP popup...");
    await driver.wait(
      until.elementLocated(By.xpath(`//p[contains(text(), 'doodapakamukesh@gmail.com')]`)),
      15000
    );

    console.log("✅ Registration test passed: OTP popup appeared.");

  } catch (err) {
    console.error("❌ Registration test failed:", err);
  } finally {
    // Keep browser open for inspection by commenting this line:
    // await driver.quit();
    console.log("Test finished. Browser remains open.");
  }
})();
