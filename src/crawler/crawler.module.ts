import { Module } from '@nestjs/common';
import { CrawlerController } from './controller/crawler.controller';
import { CrawlerService } from './service/crawler.service';

@Module({
  imports: [],
  providers: [CrawlerController],
  controllers: [CrawlerService],
})
export class CrawlerModule {}
