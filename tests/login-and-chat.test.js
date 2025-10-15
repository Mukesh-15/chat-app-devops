const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async () => {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
    )
    .build();

  try {
    // --- Step 1: Login ---
    const loginUrl = "http://localhost:3000/login"; 
    console.log("Opening login page...");
    await driver.get(loginUrl);

    const usernameInput = await driver.wait(until.elementLocated(By.name("username")), 10000);
    const passwordInput = await driver.findElement(By.name("password"));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    console.log("Filling login form...");
    await usernameInput.sendKeys("mukie-15"); // valid user
    await passwordInput.sendKeys("qwerty");   // valid password

    console.log("Submitting login form...");
    await submitButton.click();

    // Wait for home page / chat page to load
    await driver.sleep(3000);

    const currentUrl = await driver.getCurrentUrl();
    console.log("Current URL after login:", currentUrl);

    // --- Step 2: Go to Chat Page ---
    const chatUrl = "http://localhost:3000"; // adjust if needed
    console.log("Opening chat page...");
    await driver.get(chatUrl);

    // Wait for message input box
    const inputBox = await driver.wait(
      until.elementLocated(By.name("msgbox")),
      10000
    );

    // Send a test message
    const testMessage = "Hello from Selenium!";
    console.log("Typing message...");
    await inputBox.sendKeys(testMessage, Key.RETURN);

    // Wait a moment for message to appear
    await driver.sleep(3000);

    const messages = await driver.findElements(By.css(".msg"));
    const texts = await Promise.all(messages.map(async (el) => el.getText()));

    if (texts.some((t) => t.includes(testMessage))) {
      console.log("✅ Message test passed: Message appeared in chat!");
    } else {
      console.log("❌ Message test failed: Message not found in chat.");
    }

  } catch (err) {
    console.error("❌ Test failed:", err);
  } finally {
    // Keep browser open for inspection or uncomment to close automatically
    // await driver.quit();
    console.log("Test finished. Browser remains open.");
  }
})();
