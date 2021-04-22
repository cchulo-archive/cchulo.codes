import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AboutModel } from 'src/models/about-model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private aboutUrl = '/strapi-about'

  about: AboutModel;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.about = await this.httpClient.get<AboutModel>(this.aboutUrl).toPromise();

    console.log(this.about);
  }

}
