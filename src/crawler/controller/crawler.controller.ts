import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from '../service/crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get()
  async crawler(): Promise<void> {
    await this.crawlerService.scrape();
  }
}
