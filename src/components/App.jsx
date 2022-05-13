import s from './App.module.css';
import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm";
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

  formSubmitHandler = ({name, number}) => {
    const { contacts } = this.state;
   
    if (contacts.map(contact => contact.name.toLowerCase()).includes(name.toLowerCase())) {
      return alert(`${name} is already in contacts`)
    };

    const contact = {
      name,
      number,
      id: nanoid()
    };

    this.setState(prevState => ({ contacts: [...prevState.contacts, contact],}));
  };

  handleFilter = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  render() {
    const { filter } = this.state;

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList filteredContacts={this.filteredContacts()} deleteContact={this.deleteContact} />
      </div>
    );
  }
}