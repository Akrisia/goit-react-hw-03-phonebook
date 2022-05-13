import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filteredContacts, deleteContact }) => {
        return (
              <ul className={s.list}>
                    {filteredContacts.map(({ name, number, id }) => {
                        return (
                            <li key={id} className={s.item}>
                                {name}: {number}
                                <button type='button' className={s.button} id={id} onClick={() => deleteContact(id)}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
            )
    };

ContactList.propTypes = {
    filteredContacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired
};

export default ContactList;