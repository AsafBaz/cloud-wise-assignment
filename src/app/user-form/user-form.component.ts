import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})



export class UserFormComponent {
  mpgLabel: string = '';
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = fb.group({
      email: [localStorage.getItem('email'), [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: [localStorage.getItem('password'), [Validators.required, Validators.minLength(6)]],
      fullName: [localStorage.getItem('fullName'), [Validators.required, Validators.pattern("^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,2}$")]],
      phone: [localStorage.getItem('phone'), [Validators.required, Validators.pattern("^[0-9]{9,10}$")]],
      vehicleNumber: [localStorage.getItem('vehicleNumber'), [Validators.required, Validators.pattern("^[0-9]{7,8}$")]],
      fuelConsumption: [localStorage.getItem('fuelConsumption'), [Validators.required]]
    })
  }

  get f() {
    return this.form.controls;
  }


  convertKMLtoMPG(kml: number) {
    return (2.35214583 * kml);
  }

  // on Current input change event
  onChange(currValue: string, currInput: string): void {
    localStorage.setItem(currInput, currValue);
  }

  // on form submit
  submit() {
    const params =  {
      email: this.form.value.email,
      password: this.form.value.password,
      fullName: this.form.value.fullName,
      phone: this.form.value.phone,
      vehicleNumber: this.form.value.vehicleNumber,
      fuelConsumtion: this.form.value.fuelConsumption
     }

    this.http.post('https://www.cloud-wise.net/CloudApps/Server/api/log', params).toPromise().then(data => {
      this.router.navigate(['response-page/', JSON.stringify(data)]);
    })
    

  }

  onClick() {
    let mpg = this.convertKMLtoMPG(this.form.value.fuelConsumption);
    this.mpgLabel = "Fuel consumption converted to Miles/Gallons: " + mpg;
  }

  clearFields() {
    localStorage.clear();
    this.form.controls['email'].setValue('');
    this.form.controls['password'].setValue('');
    this.form.controls['fullName'].setValue('');
    this.form.controls['phone'].setValue('');
    this.form.controls['vehicleNumber'].setValue('');
    this.form.controls['fuelConsumption'].setValue('');
  }
}
