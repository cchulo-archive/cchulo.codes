import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSavingService {

  constructor(private _httpClient: HttpClient) {}

  canSave(): boolean {
    try {
      return !!new Blob();
    } catch (err) {
      return false;
    }
  }

  async download(url: string) {

    try {
      const blob = await this._httpClient.get(url, { responseType: 'blob' }).toPromise();
      return blob;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
