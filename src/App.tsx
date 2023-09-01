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
