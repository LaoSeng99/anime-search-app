import './App.css';
import { Outlet } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-col justify-between min-h-screen w-full">
        <div className="w-full h-full">
          <Outlet />
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
