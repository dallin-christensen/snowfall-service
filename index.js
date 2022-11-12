import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.mtbachelor.com/the-mountain/weather-operations/conditions-report');

  const amountResultsSelector = '.amount';
  await page.waitForSelector(amountResultsSelector);

  const amounts = await page.evaluate(amountResultsSelector => {
    const overnightAmount = document.querySelectorAll(amountResultsSelector)[3].innerText
    const twentyFourHourAmount = document.querySelectorAll(amountResultsSelector)[4].innerText
    return { overnightAmount, twentyFourHourAmount }
  }, amountResultsSelector);

  console.log(amounts)

  await browser.close();
})();