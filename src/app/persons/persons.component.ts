import { Component, OnInit } from '@angular/core';
import {Person} from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {


  /*person: Person = {
    firstName: 'dada',
    lastName: 'Windstorm',
    income: 55.55,
    avatarURL: 'https://media.licdn.com/dms/image/C4D03AQGTq1GOJVvu8g/profile-displayphoto-shrink_200_200/0?e=1562803200&v=beta&t=4td8YgKk2r6hVbjgP7FzADt9DVcUwCQ3ji1zxD-kVNk'
  };*/
  selectedPerson: Person;
  persons: Person[];
  leftCol: Person[] = [];
  middleCol: Person[] = [];
  rightCol: Person[] = [];
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.selectedPerson = new Person();
    this.getHeroes();
  }

  sort(event): void {
    const name = event.target.value;
    if (name === 'default') {
      return;
    }
    if (name === 'income') {
      this.persons.sort((a, b) => a[name] - b[name]);
    } else {
      this.persons.sort((a, b) => (a[name] < b[name]) ? -1 : (a[name] > b[name]) ? 1 : 0);
    }

  }

  onSelect(person: Person): void {
    const newPerson = {...person};
    this.selectedPerson = newPerson;
  }

  getHeroes(): void {
    this.persons = this.personService.personsList;
    this.leftCol = this.personService.leftCol;
    this.middleCol = this.personService.middleCol;
    this.rightCol = this.personService.rightCol;
  }

  viewPerson(person: Person): void {

  }

  deletePerson(person: Person): void {
    this.personService.deletePerson(person);
  }

}
