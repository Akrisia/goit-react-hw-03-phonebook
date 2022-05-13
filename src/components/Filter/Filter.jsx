import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
    return (
        <label className={s.filter}>
            Find contacts by name
            <input className={s.input}
                type="text"
                name="filter"
                value={value}
                onChange={onChange}
            />
        </label>
    )
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Filter;