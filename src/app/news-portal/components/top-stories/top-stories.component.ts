import { Component, Input } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-top-stories',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './top-stories.component.html',
  styleUrl: './top-stories.component.css'
})
export class TopStoriesComponent {
  @Input() article: any[] = [];
  displayArticle: any[] = [];

  constructor(
    private newsService: NewsService,
  ) {}

  async loadTopStories() {
    try {
        // get article service dari news.service
        this.article = await this.newsService.getTopStories();
        console.log(this.article);
        
         // Mengurutkan artikel berdasarkan published_date
        this.article.sort((a, b) => {
            const dateA = new Date(a.published_date).getTime();
            const dateB = new Date(b.published_date).getTime();
            return dateB - dateA; // Mengurutkan dari terbaru ke terlama
        });

        this.article.forEach(article => {
          // Periksa apakah multimedia ada dan merupakan array
          const largeThumbnail = article.multimedia && Array.isArray(article.multimedia)
              ? article.multimedia.find((media: any) => media.format === "threeByTwoSmallAt2X")
              : null;
      
          // Set imageUrl dan formattedDate
          article.imageUrl = largeThumbnail ? largeThumbnail.url : 'default-image.jpg';
          article.formattedDate = this.formatDate(article.published_date);
      });

        // menampilkan artikel yang sudah difilter jumlahnya
        this.displayArticle = this.article;
    } catch (error) {
        console.log("return", error);
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
    this.loadTopStories();
  }

}
