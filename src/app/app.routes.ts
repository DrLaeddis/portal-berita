import { RouterModule, Routes } from '@angular/router';
import { NewsPortalComponent } from './news-portal/news-portal.component';
import { RealTimeNewsComponent } from './news-portal/components/real-time-news/real-time-news.component';
import { NgModule } from '@angular/core';
import { TopStoriesComponent } from './news-portal/components/top-stories/top-stories.component';
import { MostPopularComponent } from './news-portal/components/most-popular/most-popular.component';
import { SearchResultComponent } from './news-portal/components/search-result/search-result.component';

export const routes: Routes = [
    {path: "", component: NewsPortalComponent},
    {path: "real-time-news", component: RealTimeNewsComponent},
    {path: "top-stories", component: TopStoriesComponent},
    {path: "most-popular", component: MostPopularComponent},
    {path: "search-result", component: SearchResultComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
