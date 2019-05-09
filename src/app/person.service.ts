import { Injectable } from '@angular/core';
import { Person } from './person';
import { PERSONS } from './mock-persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPersons(): Person[] {
    return PERSONS;
  }
}
