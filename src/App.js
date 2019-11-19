import React from 'react';
import RequestList from './RequestList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pending requests</h1>
      <RequestList />
    </div>
  );
}

export default App;
