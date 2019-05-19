import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = 'http://192.168.1.19:4200/api/contacts';

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  postContact(contact) {
		return this.http.post(this.apiUrl, contact);
	}

	updateContact(id , contact) {
		return this.http.put(`${this.apiUrl}/${id}`, contact);
	}

	deleteContact(id) {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}

}
