import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contacts: Contact[];
  newContact: Contact = <Contact>{};

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts()
      .subscribe((res: Contact[]) => this.contacts = res);
  }

  submitNewContact() {

    this.contactService.postContact(this.newContact)
      .subscribe((res: Contact) => {
        this.newContact._id = res._id;

        this.contacts.unshift(this.newContact);
        this.newContact = <Contact>{};
      });
  }

  delete(contact: Contact) {
    this.contactService.deleteContact(contact._id)
      .subscribe((res: Contact) => {
        let index = this.contacts.indexOf(contact);
        this.contacts.splice(index, 1);
      });
  }

  update(contact: Contact) {
    contact.name = `Updated ${contact.name}`;

    this.contactService.updateContact(contact._id, contact)
      .subscribe((res: Contact) => {
        contact = res;
      });
  }

}
