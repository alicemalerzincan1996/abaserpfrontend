import React from 'react';
import LoginPage from './components/LoginPage';
import OrderPage from './components/OrderPage';
import AddItemPage from './components/AddItemPage';
import SiparisListesi from './components/SiparisListesi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Burada sabit içerik veya navigasyon bar olabilir */}
        <Routes>
          <Route path="/additem" element={<AddItemPage />} />
          <Route path="/siparis-sayfasi" element={<OrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/siparisListesi" element={<SiparisListesi />} />

          {/* Diğer route'lar buraya eklenebilir */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
