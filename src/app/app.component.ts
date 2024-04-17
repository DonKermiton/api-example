import {Component, DestroyRef, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {catchError, first, map, mergeMap, NEVER} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ApiResponse} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  firstApiResponse: ApiResponse | null = null;

  constructor(private apiService: ApiService, private destroyRef: DestroyRef) {
  }

  public ngOnInit() {
    this.apiService.get()
      .pipe(
        mergeMap((item) => item),
        first(item => item.status === "pending"),
        catchError(() => NEVER),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((item: ApiResponse) => {
        this.firstApiResponse = item;
      })
  }

  public secondApproach() {
    this.apiService.get()
      .pipe(
        map((items) => items.find(item => item.status === "pending")),
        catchError(() => NEVER),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((item: ApiResponse | undefined) => {
        if (item) {
          this.firstApiResponse = item;
        }
      })
  }
}

