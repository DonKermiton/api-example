import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "./types";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public get(): Observable<ApiResponse[]> {
    return this.httpClient.get<ApiResponse[]>('https://gorest.co.in/public/v2/todos');
  }
}
