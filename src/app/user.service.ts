import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;
 
  getEmployees() {
    this.employeeList = this.firebase.list('database');
    return this.employeeList.snapshotChanges();
  }

  
}
