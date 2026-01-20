import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../core/services/countries.service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule, FormsModule],
})

export class DetailComponent implements OnInit {
  country: any;

  constructor(
    private route: ActivatedRoute,
    private service: CountriesService,
    private router: Router
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.params['name'];
    this.service.getByName(name).subscribe(res => this.country = res[0]);
  }

  back() {
    this.router.navigate(['/']);
  }
}
