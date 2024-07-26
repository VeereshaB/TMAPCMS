const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const actschool = require('./actschool');
const AutomationReport = require('../Automation-ReportModel');

const getRowCount = async (req, res) =>{
    const options = new chrome.Options();
    options.addArguments('--remote-allow-origins=*');

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    const testScenarioCounts = {};
    const totalResponse = {
        data: [],
        totalPassCount: 0,
        totalFailCount: 0,
        totalBreakedCount: 0,
        notExecuteCount: 0,
        totalTestCaseCount: 0,
        executedTestCount: 0
    };

    let totalPassCount = 0;
    let totalFailCount = 0;
    let totalBreakedCount = 0;
    let notExecuteCount = 0;
    let totalTestCaseCount = 0;
    let executedTestCount = 0;

    try {
        await driver.get('https://school.mapmyclasses.com/login');
        await driver.manage().window().maximize();
        await driver.manage().deleteAllCookies();

        const file = path.join(__dirname, '..', 'data', 'Automation_Key_Xpath.xlsx');
        console.log(`Using Excel file: ${file}`);

        if (!fs.existsSync(file)) {
            throw new Error(`File does not exist: ${file}`);
        }

        const workbook = xlsx.readFile(file);
        const sheet = workbook.Sheets['Sheet1'];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        console.log("@@@DATA " + JSON.stringify(data));

        let currentTestScenario = null;

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row[0] !== null && row[0] !== undefined) {
                currentTestScenario = row[0];
            }

            const testScenario = currentTestScenario;
            const executeTestCase = row[8];
            const errorDetails = row[9] || null; // Fetch error details if present

            totalTestCaseCount++; // Increment total test case count

            if (!executeTestCase) {
                notExecuteCount++;
                continue;
            }

            executedTestCount++; // Increment executed test case count

            if (!testScenarioCounts[testScenario]) {
                testScenarioCounts[testScenario] = {
                    passCount: 0,
                    failCount: 0,
                    breakedCount: 0,
                };
            }

            const stepName = row[2];
            const xpath = row[3];
            const action = row[4];
            const inputValue = row[5];

            let result = null;

            try {
                switch (action) {
                    case 'type':
                        if (await actschool.type(driver, xpath, inputValue)) {
                            result = 'PASS';
                            testScenarioCounts[testScenario].passCount++;
                            totalPassCount++;
                        } else {
                            result = 'FAIL';
                            testScenarioCounts[testScenario].failCount++;
                            totalFailCount++;
                        }
                        break;

                    case 'DayField':
                        if (await actschool.Day(driver, xpath, inputValue)) {
                            result = 'PASS';
                            testScenarioCounts[testScenario].passCount++;
                            totalPassCount++;
                        } else {
                            result = 'FAIL';
                            testScenarioCounts[testScenario].failCount++;
                            totalFailCount++;
                        }
                        break;

                    case 'click':
                        await actschool.click(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;
                    case 'Field':
                        if (await actschool.type(driver, xpath, inputValue)) {
                            result = 'PASS';
                            testScenarioCounts[testScenario].passCount++;
                            totalPassCount++;
                        } else {
                            result = 'FAIL';
                            testScenarioCounts[testScenario].failCount++;
                            totalFailCount++;
                        }
                        break;
                    case 'doubleclick':
                        await actschool.doubleclick(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'slider':
                        await actschool.slider(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'DateField':
                        if (await actschool.dateFirst(driver, xpath, inputValue)) {
                            result = 'PASS';
                            testScenarioCounts[testScenario].passCount++;
                            totalPassCount++;
                        } else {
                            result = 'FAIL';
                            testScenarioCounts[testScenario].failCount++;
                            totalFailCount++;
                        }
                        break;

                    case 'NumberField':
                        if (await actschool.addNumber(driver, xpath, inputValue)) {
                            result = 'PASS';
                            testScenarioCounts[testScenario].passCount++;
                            totalPassCount++;
                        } else {
                            result = 'FAIL';
                            testScenarioCounts[testScenario].failCount++;
                            totalFailCount++;
                        }
                        break;

                    case 'scroll':
                        await actschool.scrollToElement(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'rightclick':
                        await actschool.right(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'multipul':
                        await actschool.tab(driver);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'back':
                        await actschool.next(driver);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'Enter':
                        await actschool.textEnter(driver, xpath, inputValue);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'element':
                        await actschool.eleclickable(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'visibility':
                        await actschool.visclickable(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'File':
                        if (await actschool.file(driver, xpath, inputValue)) {
                            result = 'PASS';
                            testScenarioCounts[testScenario].passCount++;
                            totalPassCount++;
                        } else {
                            result = 'FAIL';
                            testScenarioCounts[testScenario].failCount++;
                            totalFailCount++;
                        }
                        break;

                    case 'scroll':
                        await actschool.scroll(driver, direction, xpath, pixels);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'pointclick':
                        await actschool.clickpoint(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'zoomLevel':
                        await actschool.zoomLevel(driver);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    // New actions
                    case 'hover':
                        await actschool.hover(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'dragAndDrop':
                        const targetXPath = row[6];
                        await actschool.dragAndDrop(driver, xpath, targetXPath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'selectDropdown':
                        const optionText = row[6];
                        await actschool.selectDropdown(driver, xpath, optionText);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'getText':
                        const text = await actschool.getText(driver, xpath);
                        console.log('Extracted text:', text);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'executeScript':
                        const script = row[6];
                        await actschool.executeScript(driver, script);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'clearTextField':
                        await actschool.clearTextField(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'switchToFrame':
                        await actschool.switchToFrame(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'switchBackFromFrame':
                        await actschool.switchBackFromFrame(driver);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'waitForElementToBeClickable':
                        await actschool.waitForElementToBeClickable(driver, xpath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'getAttribute':
                        const attribute = row[6];
                        const attr = await actschool.getAttribute(driver, xpath, attribute);
                        console.log('Extracted attribute:', attr);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'refresh':
                        await actschool.refresh(driver);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'uploadFile':
                        const filePath = row[6];
                        await actschool.uploadFile(driver, xpath, filePath);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    case 'waitForPageLoad':
                        await actschool.waitForPageLoad(driver);
                        result = 'PASS';
                        testScenarioCounts[testScenario].passCount++;
                        totalPassCount++;
                        break;

                    default:
                        console.log('Unsupported action:', action);
                        break;
                }
            } catch (error) {
                await actschool.screenShot(driver, `${stepName}_failed`)
                if (result === null) {
                    result = 'FAIL';
                }
                if (result === 'FAIL') {
                    testScenarioCounts[testScenario].breakedCount++;
                    totalBreakedCount++;
                }
                console.error(`Error occurred during action '${action}' on step '${stepName}': ${error.message}`);
            } finally {
                const cell = `I${i + 1}`;
                sheet[cell] = { v: errorDetails ? errorDetails : (result === 'FAIL' ? 'Failed due to an error' : '') }; // Write error details in column I
                sheet[`H${i + 1}`] = { v: result }; // Write result in column H
            }
        }

        // Prepare the results
        totalResponse.data = testScenarioCounts;
        totalResponse.totalPassCount = totalPassCount;
        totalResponse.totalFailCount = totalFailCount;
        totalResponse.totalBreakedCount = totalBreakedCount;
        totalResponse.notExecuteCount = notExecuteCount;
        totalResponse.totalTestCaseCount = totalTestCaseCount;
        totalResponse.executedTestCount = executedTestCount;

        console.log('Scenario-wise Results:', testScenarioCounts);
        console.log('Overall totalResponse:', totalResponse);
        const newReport = await AutomationReport.create({
            name: 'Test1',
            totalPassedCount: totalPassCount,
            totalFailedCount: totalFailCount,
            totalBreakedCount: totalBreakedCount,
            totalTestCases: totalTestCaseCount,
            notExecuteTestCases: notExecuteCount,
            executedTestCases: executedTestCount,
            projectId: 1,
            models: totalResponse.data,
            status: 1,
            createdBy: 'Admin',
            createdDate: new Date()
        });
        return res.status(201).json(newReport);
    } finally {
        await driver.quit();
    }
    
}

module.exports = {getRowCount} ;




