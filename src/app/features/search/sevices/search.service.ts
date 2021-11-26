import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public menuItem: any = '';
  public draftRecord: any;
  public searchInput = new BehaviorSubject('');
  public searchView = new BehaviorSubject(null);
  private searchListUrl: any = 'findByDesc/';

  constructor(private http: HttpClient) { }
  public searchData(data: any) {
    this.searchInput.next(data);
  }
  public showSearchView(data: any) {
    this.searchView.next(data);
  }
  getSearchList(data): Observable<any> {
    return this.http.get(this.searchListUrl + data);
  }
  getRecentlyViewed() {
    return this.http.get('recentlyviewed');
  }
}
