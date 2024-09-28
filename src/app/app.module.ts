import { FormsModule, NgModel } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NewsService } from "./news-portal/services/news.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppComponent,
        BrowserModule,
        HttpClientModule,
        AppComponent,
        FormsModule,
    ],
    providers: [
        provideHttpClient(),
        NewsService,
    ],
})

export class AppModule {}