import { Component, OnInit, Input } from "@angular/core";
import { NewsService } from "./services/news.service";
import { CommonModule } from "@angular/common";
import { NewsCardComponent } from "./components/news-card/news-card.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-news-portal',
    standalone: true,
    imports: [CommonModule, NewsCardComponent, RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './news-portal.component.html',
    styleUrls: ['./news-portal.component.css'],
})
export class NewsPortalComponent implements OnInit {
    @Input() article: any[] = [];
    @Input() realTimeNews: any[] = [];
    @Input() mostPopular: any[] = [];
    displayArticle: any[] = [];
    displayRealTime: any[] = [];
    displayMostPopular: any[] = [];
    itemsShow: number = 3;
    showMore: boolean = true;

    constructor(
        private newsService: NewsService,
    ) {}

    async loadTopStories() {
        try {
            // get article service dari news.service
            this.article = await this.newsService.getTopStories();

             // Mengurutkan artikel berdasarkan published_date
            this.article.sort((a, b) => {
                const dateA = new Date(a.published_date).getTime();
                const dateB = new Date(b.published_date).getTime();
                return dateB - dateA; // Mengurutkan dari terbaru ke terlama
            });

            // memperbarui status show more
            this.showMore = this.article.length > this.itemsShow;

            // custom data dari api
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
            this.displayArticle = this.article.slice(0, this.itemsShow);
        } catch (error) {
            console.log("return", error);
        }
    }

    async loadRealTimeNews() {
        try {
            this.realTimeNews = await this.newsService.getRealTimeNews();

            // Mengurutkan artikel berdasarkan published_date
            this.realTimeNews.sort((a, b) => {
                const dateA = new Date(a.published_date).getTime();
                const dateB = new Date(b.published_date).getTime();
                return dateB - dateA; // Mengurutkan dari terbaru ke terlama
            });

            // custom data dari api
            this.realTimeNews.forEach(realTimeNews => {
                const largeThumbnail = realTimeNews.multimedia.find((media: any) => media.format === "mediumThreeByTwo440");
                realTimeNews.imageUrl = largeThumbnail ? largeThumbnail.url : 'default-image.jpg';

                realTimeNews.formattedDate = this.formatDate(realTimeNews.created_date);
            });

            this.displayRealTime = this.realTimeNews.slice(0, this.itemsShow);
        } catch (error) {
            console.log("return", error);
        }
    }

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

            this.displayMostPopular = this.mostPopular.slice(0, this.itemsShow);
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

    loadMore() {
        // untuk menambahkan 3 artikel lagi
        this.itemsShow += 3;

        // update artikel yang ditampilkan
        this.displayArticle = this.article.slice(0, this.itemsShow);

        // perbarui status showmore
        this.showMore = this.article.length > this.itemsShow;
    }

    ngOnInit(): void {
        this.loadTopStories();
        this.loadRealTimeNews();
        this.loadMostPopular();
    }

    
}