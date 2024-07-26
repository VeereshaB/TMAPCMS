const { By, Key, until } = require('selenium-webdriver');
const { Actions, WebDriverWait, WebElement } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

class actschool {
    static async type(driver, xpath, text) {
        const ele = await driver.findElement(By.xpath(xpath));
        let flag = false;
        try {
            flag = await ele.isDisplayed();
            await ele.clear();
            await ele.sendKeys(text);
            flag = true;
        } catch (e) {
            console.log('Location not found');
            flag = false;
        }
        return flag;
    }
    static async Day(driver, xpath, text1) {
        let flag = false;

        try {
            // Find the element using the given XPath
            const ele = await driver.findElement(By.xpath(xpath));

            // Check if the element is displayed
            flag = await ele.isDisplayed();

            // Clear the field
            await ele.clear();

            // Get the current date and format it as "dd"
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0'); // Format day as "dd"

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Type the provided text along with the current day and a static string
            await ele.sendKeys(`${text1}azk44${day}`);

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 4000));

            // If everything went well, set flag to true
            flag = true;
        } catch (e) {
            console.error('Location not found:', e);
            flag = false;
        }

        return flag;
    }

    static async click(driver, xpath) {
        const ele = await driver.findElement(By.xpath(xpath));
        await ele.click();
        await driver.sleep(4000);
    }

    static async doubleclick(driver, xpath) {
        const actions = driver.actions({ async: true });
        const ele = await driver.findElement(By.xpath(xpath));
        await actions.doubleClick(ele).perform();
        await driver.sleep(2000);
    }

    static async slider(driver, xpath) {
        const ele = await driver.findElement(By.xpath(xpath));
        const actions = driver.actions({ async: true });
        await actions.scroll({ x: 0, y: 1000 }).perform();
        await driver.sleep(2000);
    }
    static async dateFirst(driver, xpath, text2) {
        try {
          // Find the element using the specified XPath
          const ele = await driver.findElement(By.xpath(xpath));
    
          // Check if the element is displayed
          const flag = await ele.isDisplayed();
          if (!flag) {
            console.log("Element is not displayed");
            return false;
          }
    
          // Clear any existing content in the input field
          await ele.clear();
    
          // Get the current date and format it as "dd"
          const currentDate = new Date();
          const formattedDate = String(currentDate.getDate()).padStart(2, '0'); // Format day as "dd"
    
          // Simulate delay (optional)
          await driver.sleep(2000);
    
          // Enter the formatted date, static string, and additional text into the input field
          await ele.sendKeys(`${formattedDate}azk44${text2}`);
    
          // Optional: Add a delay to simulate real user behavior
          await driver.sleep(3000);
    
          return true;
        } catch (error) {
          console.error("Location not found or error during input:", error.message);
          return false;
        }
      }
    static async addNumber(driver, xpath, text3) {
        try {
            // Find the element using the specified XPath
            const ele = await driver.findElement(By.xpath(xpath));

            // Check if the element is displayed
            const flag = await ele.isDisplayed();
            if (!flag) {
                console.log("Element is not displayed");
                return false;
            }

            // Clear any existing content in the input field
            await ele.clear();

            // Generate a unique phone number
            const phoneNumber = ActSchool.generateUniquePhoneNumber();

            // Enter the prefix and generated phone number into the input field
            await ele.sendKeys(`${text3}${phoneNumber}`);

            // Optional: Add a delay to simulate real user behavior
            await driver.sleep(3000);

            return true;
        } catch (error) {
            console.error("Location not found or error during input:", error.message);
            return false;
        }
    }

    static generateUniquePhoneNumber() {
        // Generate a random 10-digit phone number
        const randomPhoneNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        return randomPhoneNumber;
    }
    static async scrollToElement(driver, xpath) {
        const ele = await driver.findElement(By.xpath(xpath));
        await driver.executeScript('arguments[0].scrollIntoView();', ele);
        await driver.sleep(2000);
    }

    static async right(driver, xpath) {
        const actions = driver.actions({ async: true });
        const ele = await driver.findElement(By.xpath(xpath));
        await actions.contextClick(ele).perform();
        await driver.sleep(2000);
    }

    static async tab(driver) {
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
    }

    static async next(driver) {
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[0]);
    }

    static async textEnter(driver, xpath, text) {
        const ele = await driver.findElement(By.xpath(xpath));
        await ele.sendKeys(text);
        await driver.sleep(1000);
        await ele.sendKeys(Key.ENTER);
        await driver.sleep(5000);
    }

    static async eleclickable(driver, xpath) {
        const wait = new WebDriverWait(driver, 30000);
        await wait.until(until.elementLocated(By.xpath(xpath))).click();
        await driver.sleep(1000);
    }

    static async visclickable(driver, xpath) {
        const wait = new WebDriverWait(driver, 30000);
        await wait.until(until.elementIsVisible(By.xpath(xpath))).click();
    }

    static async file(driver, xpath, text) {
        let flag = false;
        try {
            // Wait for 4 seconds to let the element load (consider using WebDriverWait for efficiency)
            await driver.sleep(4000);

            // Locate the element using the given XPath
            const ele = await driver.findElement(By.xpath(xpath));

            // Check if the element is a file input
            if ((await ele.getAttribute('type')).toLowerCase() === 'file') {
                // If it's a file input, send the file path
                await ele.sendKeys(text);
            } else {
                // Otherwise, treat it as a regular input and use sendKeys with the text
                await ele.clear();
                await ele.sendKeys(text);
            }

            // Wait to ensure the operation is complete
            await driver.sleep(1000);

            // Set the flag to true if the operation succeeds
            flag = true;
        } catch (e) {
            // Handle any exceptions and print an error message
            console.error('Location not found or error during input:', e);
            flag = false;
        }
        return flag;
    }

    static async scroll(driver, direction, xpath, pixels) {
        // Create a JavaScript Executor instance
        const js = driver.executeScript.bind(driver);

        try {
            // Convert the direction to lowercase for consistency
            switch (direction.toLowerCase()) {
                case 'element':
                    // Wait for the element to be located and visible
                    const element = await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
                    await driver.wait(until.elementIsVisible(element), 10000);

                    // Scroll the element into view
                    await js('arguments[0].scrollIntoView();', element);
                    break;

                case 'top':
                    // Scroll to the top of the page
                    await js('window.scrollTo(0, 0);');
                    break;

                case 'bottom':
                    // Scroll to the bottom of the page
                    await js('window.scrollTo(0, document.body.scrollHeight);');
                    break;

                case 'right':
                    // Scroll to the right by the specified number of pixels
                    await js('window.scrollBy(arguments[0], 0);', pixels);
                    break;

                case 'left':
                    // Scroll to the left by the specified number of pixels
                    await js('window.scrollBy(arguments[0], 0);', -pixels);
                    break;

                default:
                    // Throw an error if the direction is invalid
                    throw new Error(`Invalid scroll direction: ${direction}`);
            }

            // Optional: Sleep for a short duration to let the scroll action complete
            await driver.sleep(2000);
        } catch (error) {
            console.error(`Error during scroll: ${error.message}`);
        }
    }
    static async clickpoint(driver, xpath) {
        const ele = await driver.findElement(By.xpath(xpath));
        await ele.click();
        await driver.sleep(10000);
    }
    static async zoomLevel(driver) {
        const zoomLevel = 70;
        await driver.executeScript(`document.body.style.zoom = '${zoomLevel}%'`);
        await driver.sleep(1000);
    }
    static async hover(driver, xpath) {
        const actions = driver.actions({ async: true });
        const ele = await driver.findElement(By.xpath(xpath));
        await actions.move({ origin: ele }).perform();
        await driver.sleep(2000);
    }

    static async dragAndDrop(driver, sourceXPath, targetXPath) {
        const actions = driver.actions({ async: true });
        const source = await driver.findElement(By.xpath(sourceXPath));
        const target = await driver.findElement(By.xpath(targetXPath));
        await actions.dragAndDrop(source, target).perform();
        await driver.sleep(2000);
    }

    static async selectDropdown(driver, xpath, optionText) {
        const select = await driver.findElement(By.xpath(xpath));
        await select.click();
        const option = await select.findElement(By.xpath(`//option[text()="${optionText}"]`));
        await option.click();
        await driver.sleep(2000);
    }

    static async getText(driver, xpath) {
        const ele = await driver.findElement(By.xpath(xpath));
        const text = await ele.getText();
        return text;
    }

    static async executeScript(driver, script) {
        await driver.executeScript(script);
        await driver.sleep(2000);
    }

    static async clearTextField(driver, xpath) {
        const ele = await driver.findElement(By.xpath(xpath));
        await ele.clear();
        await driver.sleep(1000);
    }

    static async switchToFrame(driver, xpath) {
        const frame = await driver.findElement(By.xpath(xpath));
        await driver.switchTo().frame(frame);
        await driver.sleep(2000);
    }

    static async switchBackFromFrame(driver) {
        await driver.switchTo().defaultContent();
        await driver.sleep(2000);
    }

    static async waitForElementToBeClickable(driver, xpath) {
        const wait = new WebDriverWait(driver, 30000);
        await wait.until(until.elementIsClickable(By.xpath(xpath)));
        await driver.sleep(1000);
    }

    static async getAttribute(driver, xpath, attribute) {
        const ele = await driver.findElement(By.xpath(xpath));
        const attr = await ele.getAttribute(attribute);
        return attr;
    }
    static async refresh(driver) {
        try {
            await driver.navigate().refresh();
            console.log('Page refreshed successfully.');
        } catch (error) {
            console.error('Error in refreshing page:', error);
        }
    }
    static async uploadFile(driver, xpath, filePath) {
        let flag = false;
        try {
            const fileInput = await driver.findElement(By.xpath(xpath));
            if (await fileInput.getAttribute('type') !== 'file') {
                throw new Error('The element is not a file input type.');
            }
            await fileInput.sendKeys(filePath);
            await driver.sleep(2000);
            flag = true;
        } catch (error) {
            console.error('Error during file upload:', error);
        }
        return flag;
    }
    static async waitForPageLoad(driver) {
        try {
            await driver.wait(async function() {
                return await driver.executeScript('return document.readyState === "complete"');
            }, 30000);
        } catch (error) {
            console.error('Error waiting for page load:', error);
        }
    }
    static async screenShot(driver, stepName) {
        await driver.takeScreenshot().then((image) => {
            const screenshotPath = path.join(__dirname, '..', 'screen_shots', stepName + `-${Date.now()}.png`);
            fs.writeFileSync(screenshotPath, image, 'base64');
        });
    }
    // Implementing the file function in Node.js

}

module.exports = actschool;
