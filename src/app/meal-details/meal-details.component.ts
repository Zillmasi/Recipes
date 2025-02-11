import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ApiDataService } from '../../Services/api-data.service';
import { ImealsDet } from '../imeals-det';

@Component({
  selector: 'app-meal-details',
  imports: [],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.scss',
})
export class MealDetailsComponent {
  private readonly apidataservice = inject(ApiDataService);
  private readonly activatedRoute = inject(ActivatedRoute);
  mealsDet: ImealsDet[] = [];
  getDet() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const MealId = params.get('MealId');

      if (MealId) {
        this.apidataservice.getDetailsMeal(MealId).subscribe({
          next: (res) => {
            this.mealsDet = res.meals;
          },
        });
      }
    });
  }

  ngOnInit(): void {
    this.getDet();
  }
}
