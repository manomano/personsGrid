import { Component, OnInit } from '@angular/core';
import {Person} from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {


  person: Person = {
    firstName: 'dada',
    lastName: 'Windstorm',
    income: 55.55,
    avatarURL: 'https://media.licdn.com/dms/image/C4D03AQGTq1GOJVvu8g/profile-displayphoto-shrink_200_200/0?e=1562803200&v=beta&t=4td8YgKk2r6hVbjgP7FzADt9DVcUwCQ3ji1zxD-kVNk'
  };
  selectedPerson: Person;
  persons: Person[];
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.selectedPerson = new Person();
    this.getHeroes();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  getHeroes(): void {
    this.persons = this.personService.getPersons();
  }

}
