import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Footer />
    </div>
  );
}

export default App;