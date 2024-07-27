import React from 'react';
import ReactDOM from 'react-dom/client';

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element)
//component di tulis
const App = () => {
  const name = "Arnold Supriyadi";
  const age = 29;
  return <div>Perkenalkan saya {name} {age}</div>
}


root.render(<App/>);
