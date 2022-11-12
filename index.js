const puppeteer = require('puppeteer')
const smsTools = require('./smsTools.js')

const generateMessage = (amounts) => {
  const { overnightAmount, twentyFourHourAmount } = amounts

  return `Bachelor snowfall:\n${overnightAmount} Overnight\n${twentyFourHourAmount} in 24 Hours`
}

const deliverMessage = (message) => {
  smsTools.sendSms({
    body: message,
    to: process.env.TWILIO_TO_NUMBER,
    onSuccess: () => console.log('snowfall report successful'),
    onError: (err) => console.error(err),
  })
}

const snowfallReport = (async () => {
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

  const message = generateMessage(amounts)
  deliverMessage(message)

  await browser.close();
});

snowfallReport()