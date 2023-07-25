// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Quiz } from './components';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster position="bottom-center" />
      <Quiz />
    </div>
  );
}

export default App
