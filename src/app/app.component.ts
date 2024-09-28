import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NewsPortalComponent } from './news-portal/news-portal.component';
import { CommonModule } from '@angular/common';
import { NewsService } from './news-portal/services/news.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsPortalComponent, CommonModule, RouterLink, RouterLinkActive, FormsModule, RouterModule, HttpClientModule],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'portal-berita-nyc';
  currentDate: string = '';
  query: string = ''; // The search query
  articles: any[] = []; // Array to hold the search results

  constructor(
    private newsService: NewsService, 
    private router: Router
  ) {}

  search() {
    if (this.query) {
      this.newsService.searchArticles(this.query).subscribe(
        (response) => {
          if (response.response.docs.length === 0) {
            alert('No articles found for your search.');
          } else {
            console.log(response.response.docs);
            this.articles = response.response.docs; // Get the articles from the response
            this.router.navigate(['/search-result'], { state: { articles: this.articles } });
          }
        },
        (error) => {
          console.error('Error fetching articles:', error); // Handle errors here
        }
      );
    }
  }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toLocaleDateString('en-US', {
        weekday: 'long', year: "numeric", month: 'long', day: 'numeric'
    });
  }

}
