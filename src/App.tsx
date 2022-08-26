import { useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';


function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () : void => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="min-h-screen flex-col justify-center overflow-hidden bg-gray-50 background mainContainer">
      <Header toggleSidebar={() => toggleSidebar()}/>
      <Main openSidebar={openSidebar}/>
      <div className='footer'></div>
    </div>
  );
}

export default App;
