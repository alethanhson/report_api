import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';

@Injectable()
export class IndeedScraperService {
  @Cron(CronExpression.EVERY_HOUR)
  async scrapeJobListings() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto('https://www.indeed.com');

      const jobTitles = await page.$$eval('.jobtitle', (elements) => {
        return elements.slice(0, 10).map((element) => {
          return element.textContent;
        });
      });

      console.log('Job Titles:', jobTitles);
    } catch (error) {
      console.error('Error while scraping job listings:', error);
    } finally {
      await browser.close();
    }
  }
}
