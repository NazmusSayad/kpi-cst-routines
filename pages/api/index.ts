import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import getHTML from '@/src/utils/getHTML'

const args = [
  // '--allow-pre-commit-input',
  // '--disable-background-networking',
  // '--disable-background-timer-throttling',
  // '--disable-backgrounding-occluded-windows',
  // '--disable-breakpad',
  // '--disable-client-side-phishing-detection',
  // '--disable-component-extensions-with-background-pages',
  // '--disable-component-update',
  // '--disable-default-apps',
  // '--disable-dev-shm-usage',
  // '--disable-extensions',
  // '--disable-hang-monitor',
  // '--disable-ipc-flooding-protection',
  // '--disable-popup-blocking',
  // '--disable-prompt-on-repost',
  // '--disable-renderer-backgrounding',
  // '--disable-sync',
  // '--enable-automation',
  // '--enable-blink-features=IdleDetection',
  // '--export-tagged-pdf',
  // '--force-color-profile=srgb',
  // '--metrics-recording-only',
  // '--no-first-run',
  // '--password-store=basic',
  // '--use-mock-keychain',
  // '--disable-domain-reliability',
  // '--disable-print-preview',
  // '--disable-speech-api',
  // '--disk-cache-size=33554432',
  // '--mute-audio',
  // '--no-default-browser-check',
  // '--no-pings',
  // '--single-process',
  // '--disable-features=Translate,BackForwardCache,AcceptCHFrame,MediaRouter,OptimizationHints,AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
  // '--enable-features=NetworkServiceInProcess2,SharedArrayBuffer',
  // '--hide-scrollbars',
  // '--ignore-gpu-blocklist',
  // '--in-process-gpu',
  '--window-size=1920,1080',
  // '--use-gl=angle',
  // '--use-angle=swiftshader',
  // '--allow-running-insecure-content',
  '--disable-setuid-sandbox',
  // '--disable-site-isolation-trials',
  // '--disable-web-security',
  '--no-sandbox',
  // '--no-zygote',
  // "--headless='new'",
]

export default async (req: any, res: any) => {
  const browser = await puppeteer.launch({
    args: args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setContent(getHTML(req.body || {}))

  const element = await page.$('main')
  const output =
    element && (await element.screenshot({ encoding: 'base64', type: 'png' }))

  res.send('data:image/png;base64,' + output)
  await browser.close()
}
