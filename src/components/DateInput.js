import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ date, onChange, onRandomDate }) => (
  <div className='text-center'>
    <p>
      <em>Pick a Date</em>
    </p>
    <DatePicker className='form-control' selected={date} onChange={onChange} />
    <div>
      <button
        onClick={onRandomDate}
        className='btn btn-default btn-primary mt-2'
      >
        Random Date
      </button>
    </div>
  </div>
);

DateInput.propTypes = {
  date: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onRandomDate: PropTypes.func.isRequired,
};

export default DateInput;
