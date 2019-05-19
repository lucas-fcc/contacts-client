import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts()
      .subscribe((res: Contact[]) => this.contacts = res);
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
