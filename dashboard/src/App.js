import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScanList from './screens/ScanList';
import ScanDetails from './screens/ScanDetails';
import ScanSubmit from './screens/ScanSubmit';
import EditUser from './screens/EditUser';
import NavBar from './components/NavBar';

function App() {
  return (
    
      
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path ="/" element={<ScanList />} />
          <Route path="/scan-detail/:id" element={<ScanDetails/>} />
          <Route path="/add" element={<ScanSubmit />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>

  );

}

export default App;