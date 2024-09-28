import { Component, Input } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-real-time-news',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './real-time-news.component.html',
  styleUrl: './real-time-news.component.css'
})
export class RealTimeNewsComponent {
  @Input() realTimeNews: any[] = [];
  displayRealTimes: any[] = [];

  constructor(
    private newsService: NewsService,
  ) {}

  async loadRealTimeNews() {
    try {
      this.realTimeNews = await this.newsService.getRealTimeNews();

      this.realTimeNews.sort((a, b) => {
        const dateA = new Date(a.published_date).getTime();
        const dateB = new Date(b.published_date).getTime();
        return dateB - dateA;
      });

       // custom data dari api
       this.realTimeNews.forEach(realTimeNews => {
        const largeThumbnail = realTimeNews.multimedia.find((media: any) => media.format === "mediumThreeByTwo440");
        realTimeNews.imageUrl = largeThumbnail ? largeThumbnail.url : 'default-image.jpg';

        realTimeNews.formattedDate = this.formatDate(realTimeNews.created_date);
      });

      this.displayRealTimes = this.realTimeNews
    } catch (error) {
      
    }
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  ngOnInit(): void {
    this.loadRealTimeNews();
  }
}
