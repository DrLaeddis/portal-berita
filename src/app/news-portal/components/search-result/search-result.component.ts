import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, NewsCardComponent, RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
  articles: any[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = history.state
    console.log(state);
    
    if (state && state.articles) {
      // Process the articles to extract only the necessary data
      this.articles = state.articles.map((article: any) => {
        return {
          title: article.headline.main || 'No title available',
          abstract: article.abstract || 'No abstract available',
          url: article.web_url || '#',
          imageUrl: article.multimedia && article.multimedia.length > 0
            ? `https://static01.nyt.com/${article.multimedia[0].url}`
            : 'default-image.jpg', // Fallback to default image
          formattedDate: article.pub_date ? new Date(article.pub_date).toLocaleDateString() : 'Unknown Date'
        };
      });
    }
  }

}
