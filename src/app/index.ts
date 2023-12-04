import puppeteer, { Browser, Page } from 'puppeteer'
import { http } from '@google-cloud/functions-framework'
import { Request, Response } from 'firebase-functions'

http('start', async (req: Request, res: Response) => {
  const result = await browse()
  console.log(result)
  return res.status(200)
})

const browse = async () => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.goto('https://doodles.google/')

  await page.setViewport({ width: 1080, height: 1024 })

  const selector = `[class="hero-tag-carousel__main-text"]`
  const textSelector = await page.waitForSelector(selector)

  const fullTitle = await textSelector?.evaluate(el => el.textContent)
  await browser.close()

  return `The title of this blog post is "${fullTitle}"`
}
