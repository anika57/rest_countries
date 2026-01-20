import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../../core/services/countries.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  countries: any[] = [];
  filteredCountries: any[] = [];
  search: string = '';

  // ✅ DEFINE service & router PROPERLY
  constructor(
    private service: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((res: any[]) => {
      this.countries = res;
      this.filteredCountries = res;
    });
  }

  onSearch(): void {
    const value = this.search.toLowerCase();

    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(value)
    );
  }

  onRegionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const region = select.value;

    this.filterRegion(region);
  }

  filterRegion(region: string): void {
    if (!region) {
      this.filteredCountries = this.countries;
      return;
    }

    this.service.getByRegion(region).subscribe((res: any[]) => {
      this.filteredCountries = res;
    });
  }

  openCountry(name: string): void {
    this.router.navigate(['/country', name]);
  }

  trackByName(index: number, country: any): string {
    return country.name.common;
  }
}
