import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey: string = 'QS8dDt3dHvDTPzKQ4ptN8fuCkBRg82YF';
  private apiTopStories: string = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${this.apiKey}`;
  private apiRealTime: string = `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=${this.apiKey}`;
  private apiMostPopular: string = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${this.apiKey}`
  private baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

  constructor(private http: HttpClient) {}

  searchArticles(query: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('api-key', this.apiKey); // Adds the query and API key to the request parameters
    return this.http.get<any>(this.baseUrl, { params }); // Makes the HTTP GET request
  }

  async getTopStories() {
    try {
      const response = await axios.get(this.apiTopStories);
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async getRealTimeNews() {
    try {
      const response = await axios.get(this.apiRealTime);
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async getMostPopular() {
    try {
      const response = await axios.get(this.apiMostPopular);
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
}
