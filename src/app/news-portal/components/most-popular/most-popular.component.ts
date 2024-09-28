import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-most-popular',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent {
  @Input() mostPopular: any[] = [];
  displayMostpopular: any[] = [];

  constructor(
    private newsService: NewsService,
  ) {}

  async loadMostPopular() {
    try {
        this.mostPopular = await this.newsService.getMostPopular();

        this.mostPopular.sort((a, b) => {
            const dateA = new Date(a.updated).getTime();
            const dateB = new Date(b.updated).getTime();
            return dateB - dateA; // Mengurutkan dari terbaru ke terlama
        });

        this.mostPopular.forEach(mostPopular => {
            // Periksa apakah media ada dan ada metadata
            if (mostPopular.media && mostPopular.media.length > 0 && mostPopular.media[0]['media-metadata']) {
              const mediaMetadata = mostPopular.media[0]['media-metadata'];
      
              // Temukan media dengan format yang diinginkan (misal: mediumThreeByTwo440)
              const selectedMedia = mediaMetadata.find((media: any) => media.format === "mediumThreeByTwo440");
      
              // Tetapkan URL gambar berdasarkan media yang ditemukan atau gunakan default
              mostPopular.imageUrl = selectedMedia ? selectedMedia.url : 'default-image.jpg';
            } else {
              mostPopular.imageUrl = 'default-image.jpg';
            }
        });

        this.displayMostpopular = this.mostPopular;
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
    this.loadMostPopular();
  }
}
