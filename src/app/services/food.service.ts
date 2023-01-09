import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAG_URL, FOODS_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL)
  }

  getAllBySearchName(searchName: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchName)
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAG_URL)
  }

  getAllFoodsByTag(tag:string): Observable<Food[]> {
    return tag === "All" ?
      this.getAll() :
      this.http.get<Food[]>(FOODS_BY_TAG_URL+tag)
  }

  getFoodById(foodId: string): Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL+foodId)
  }
}
