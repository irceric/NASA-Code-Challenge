import React, { useState, useEffect, useCallback, useRef } from 'react';

import DateInput from 'components/DateInput';
import { headerStyle } from 'styles';
import { randomDate } from 'helpers/date';
import { getAPOD } from 'services';

const App = () => {
  const [date, setDate] = useState(new Date());
  const startDate = useRef(new Date(1995, 6, 16));

  const handleSetRandomDate = () => {
    setDate(randomDate(startDate.current, new Date()));
  };

  const fetchData = useCallback(async (date) => {
    const response = await getAPOD(date);
    console.log(response);
  }, []);

  useEffect(() => {
    fetchData(date);
  }, [fetchData, date]);

  return (
    <div className='container'>
      <div className='card card-body'>
        <h2 style={headerStyle}>NASA's Picture of the Day</h2>
      </div>
      <div className='card card-body'>
        <DateInput
          date={date}
          onChange={(date) => setDate(date)}
          onRandomDate={handleSetRandomDate}
        />
      </div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Card title</h5>
          <p className='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
