import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';

@Injectable()
export class CrawlerService {
  constructor(private readonly crawler: NestCrawlerService) {}

  // scraping the specific page
  public async scrape(): Promise<void> {
    interface ExampleCom {
      title: string;
      info: string;
      content: string;
    }

    const data: ExampleCom = await this.crawler.fetch({
      target:
        'https://viblo.asia/p/javascript-repository-design-pattern-5OXLAPrBJGr',
      fetch: {
        title: '.article-content__title',
        info: {
          selector: 'p > a',
          attr: 'href',
        },
        content: {
          selector: '.content',
          how: 'html',
        },
      },
    });

    console.log(data);
  }

  //   // crawling multi pages is also supported
  //   public async crawl(): Promise<void> {
  //     interface HackerNewsPage {
  //       title: string;
  //     }

  //     const pages: HackerNewsPage[] = await this.crawler.fetch({
  //       target: {
  //         url: 'https://viblo.asia/p/javascript-repository-design-pattern-5OXLAPrBJGr',
  //         iterator: {
  //           selector: 'span.age > a',
  //           convert: (x: string) => `https://news.ycombinator.com/${x}`,
  //         },
  //       },
  //       fetch: (data: any, index: number, url: string) => ({
  //         title: '.title > a',
  //       }),
  //     });

  //     console.log(pages);
  //   }
}
