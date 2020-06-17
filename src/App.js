import React, { useState, useEffect, useCallback, useRef } from 'react';

import DateInput from 'components/DateInput';
import { headerStyle, imageStyle, videoPlayerStyle } from 'styles';
import { randomDate } from 'helpers/date';
import { getAPOD } from 'services';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const startDate = useRef(new Date(1995, 6, 16));

  const handleSetRandomDate = () => {
    setDate(randomDate(startDate.current, new Date()));
  };

  const fetchData = useCallback(async (date) => {
    setLoading(true);
    try {
      const response = await getAPOD(date);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(date);
  }, [fetchData, date]);

  return (
    <div className='container'>
      <div className='card'>
        <h2 style={headerStyle}>NASA's Picture of the Day</h2>
        <div className='card-body'>
          <DateInput
            date={date}
            onChange={(date) => setDate(date)}
            onRandomDate={handleSetRandomDate}
          />
        </div>
        {loading && <h3>Loading...</h3>}
        {error && (
          <div class='alert alert-danger' role='alert'>
            {error}
          </div>
        )}
        {data && (
          <div className='card-body'>
            <h5 className='card-title text-center'>{data.title}</h5>
            {data.media_type === 'image' ? (
              <img
                className='card-img-top'
                style={imageStyle}
                src={data.url}
                alt='alt'
              />
            ) : (
              <div className='video' style={videoPlayerStyle}>
                <iframe
                  style={videoPlayerStyle}
                  title='video'
                  src={data.url}
                  frameBorder='0'
                />
              </div>
            )}
            <p className='card-text mt-2'>{data.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
