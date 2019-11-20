import React from 'react';
import RequestList from './RequestList';
import Search from './Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pending requests</h1>
      <RequestList />
      <h2>Request a friggin movie</h2>
      <Search />
    </div>
  );
}

export default App;
