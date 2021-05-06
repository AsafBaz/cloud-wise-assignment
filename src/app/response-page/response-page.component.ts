import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css']
})
export class ResponsePageComponent implements OnInit {

  data: any;
  emailLabel: string = '';
  fullNameLabel: string = '';
  phoneLabel: string = '';
  vehicleNumberLabel: string = '';
  fuelConsumptionLabel: string = '';

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    let userData = JSON.parse(this.router.snapshot.params['data']);
    this.emailLabel = 'Email: ' + userData.email;
    this.fullNameLabel = 'Full name: ' + userData.fullName;
    this.phoneLabel = 'Phone number: ' + userData.phone;
    this.vehicleNumberLabel = 'Vehicle number: ' + userData.vehicleNumber;
    this.fuelConsumptionLabel = 'Fuel Consumption in KM/L: ' + userData.fuelConsumtion;
  }
}
