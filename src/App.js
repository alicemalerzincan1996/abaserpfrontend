import React from 'react';
import OrderPage from './components/OrderPage';
import AddItemPage from './components/AddItemPage';
import SiparisListesi from './components/SiparisListesi';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Burada sabit içerik veya navigasyon bar olabilir */}
        <Routes>
          <Route path="/" element={<Navigate to="/additem" />} />
          <Route path="/additem" element={<AddItemPage />} />
          <Route path="/siparis-sayfasi" element={<OrderPage />} />
          <Route path="/siparisListesi" element={<SiparisListesi />} />

          {/* Diğer route'lar buraya eklenebilir */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
