import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private API = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API}/all?fields=name,flags,population,region,capital`
    );
  }

  getByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API}/region/${region}?fields=name,flags,population,region,capital`
    );
  }

  getByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API}/name/${name}?fullText=true`
    );
  }
}
