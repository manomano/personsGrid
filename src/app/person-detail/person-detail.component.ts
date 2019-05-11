import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  submitted = false;
  @Input() person: Person;
  constructor(private personService: PersonService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.submitted = true;
    if (typeof(this.person.id) === 'undefined') {
      this.createNew();
    } else {
      this.savePerson();
    }
  }

  savePerson(): void {
    this.personService.savePerson(this.person);
    this.reset();
  }

  createNew(): void {
    this.personService.addPerson(this.person);
    this.reset();
  }

  reset(): void {
    this.person = new Person();
  }

}
