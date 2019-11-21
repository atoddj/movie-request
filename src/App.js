import React from 'react';
import RequestList from './RequestList';
import Search from './Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <Search />
      <h1>Pending requests</h1>
      <RequestList />
    </div>
  );
}

export default App;
