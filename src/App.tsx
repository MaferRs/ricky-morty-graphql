import { useQuery } from '@apollo/client';
import INFO_PERSON from './querys';
import React, { useState } from 'react';
import MyAutocomplete from './component/MyAutocomplete';

function App() {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <>
      <div>
        <MyAutocomplete onFilterChange={handleFilterChange} />
        {filter && <p>Filter applied: {filter}</p>}
      </div>
    </>
  );
}

export default App;
