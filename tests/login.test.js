const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async () => {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        // Remove headless so you can see the browser
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
    )
    .build();

  try {
    const appUrl = "http://localhost:3000/login"; // adjust if your login route differs
    console.log("Opening login page...");
    await driver.get(appUrl);

    // Wait for username and password inputs
    const usernameInput = await driver.wait(until.elementLocated(By.name("username")), 10000);
    const passwordInput = await driver.findElement(By.name("password"));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    // Fill in credentials
    console.log("Filling login form...");
    await usernameInput.sendKeys("mukie-15"); // replace with a valid test user
    await passwordInput.sendKeys("qwerty");        // replace with the password

    // Submit form
    console.log("Submitting login form...");
    await submitButton.click();

    // Wait for navigation or confirmation alert
    await driver.sleep(3000); // small wait for alert or redirect

    // Option 1: Check for a successful login by URL change
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl === "http://localhost:3000/") {
      console.log("✅ Login test passed: Redirected to home page");
    } else if (currentUrl === "http://localhost:3000") {
      console.log("✅ Login test passed: Redirected to home page");
    } else {
      console.log("❌ Login test may have failed. Current URL:", currentUrl);
    }

  } catch (err) {
    console.error("❌ Login test failed:", err);
  } finally {
    // Keep browser open for inspection or uncomment to close automatically
    // await driver.quit();
    console.log("Test finished. Browser remains open.");
  }
})();
