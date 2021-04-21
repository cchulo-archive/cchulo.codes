import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface IAbout {
  id: number;
  content: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private aboutUrl = '/strapi-about'

  about: IAbout;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.about = await this.httpClient.get<IAbout>(this.aboutUrl).toPromise();

    console.log(this.about);
  }

}
