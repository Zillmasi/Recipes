import { Component, inject } from '@angular/core';
import { ApiDataService } from '../../Services/api-data.service';
import { ICategories } from '../icategories';
import { IMeal } from '../imeal';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-meals',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss',
})
export class MealsComponent {
  private readonly apiDataService = inject(ApiDataService);
  private readonly activatedRoute = inject(ActivatedRoute);

  Categories: ICategories[] = [];
  Meals: IMeal[] = [];
  getcat() {
    this.apiDataService.getAllCategories().subscribe({
      next: (res) => (this.Categories = res.meals),
    });
  }

  Active() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const catName = param.get('CategoryName');

      if (catName) {
        this.apiDataService.getAllMeals(catName).subscribe({
          next: (res) => (this.Meals = res.meals),
        });
      }
    });
  }

  ngOnInit(): void {
    this.getcat();
    this.Active();
  }
}
