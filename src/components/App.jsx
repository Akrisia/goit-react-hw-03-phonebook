import s from './App.module.css';
import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm";
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  formSubmitHandler = ({name, number}) => {
    const { contacts } = this.state;
   
    if (contacts.map(contact => contact.name.toLowerCase()).includes(name.toLowerCase())) {
      return alert(`${name} is already in contacts`)
    };

    const contact = {
      id: nanoid(),
      name,
      number
    };

    this.setState(prevState => ({ contacts: [...prevState.contacts, contact] }));
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

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    
    if (contacts) {
      this.setState({ contacts });
    }
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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