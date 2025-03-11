import { useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Page404 from './pages/404/404';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';

function PageHome() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className="button" onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

function App() {
  return (
    <>
      <main className="main">
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="details/:id" element={<h2>Page details</h2>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
