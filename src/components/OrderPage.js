import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function OrderPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [soldPrices, setSoldPrices] = useState({});


  useEffect(() => {
    Axios.get("http://localhost:9094/mal/getall")
      .then(response => setProducts(response.data))
      .catch(error => console.error('Ürünler yüklenirken hata oluştu', error));
  }, []);

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    const soldPrice = soldPrices[product.id] || product.birim_fiyati_tl; // Eğer satılan fiyat belirtilmemişse, birim fiyatı kullan
    setCart([...cart, { id: product.id, adet: quantity, satilanFiyat: soldPrice }]);
    console.log(cart);
  };
  const handleSoldPriceChange = (productId, price) => {
    setSoldPrices({ ...soldPrices, [productId]: price });
  };
  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const saveOrder = () => {
    Axios.post("http://localhost:9094/siparis/savex", cart)
      .then(response => console.log('Sipariş kaydedildi:', response.data))
      .catch(error => console.error('Sipariş kaydedilirken hata oluştu', error));
  };

  return (
    <div>
        <div className="navigation-bar">
        <a href="/siparis-sayfasi">Sipariş Sayfası</a>
        <a href="/siparisListesi">Siparislistesi</a>
        <a href="/additem">Malları Düzenle</a>
      </div>
      <h2>Sipariş Sayfası</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mal Adı</th>
            <th>Birim Fiyatı (TL)</th>
            <th>Satilan Birim Fiyatı (TL)</th>
            <th>Miktar</th>
            <th>Sepete Ekle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.birim_fiyati_tl}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={soldPrices[product.id] || ''}
                  onChange={(e) => handleSoldPriceChange(product.id, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={quantities[product.id] || ''}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => addToCart(product)}>Sepete Ekle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Sepetteki Ürünler</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Mal Adı</th>
          <th>Miktar</th>
          <th>Satılan Birim Fiyatı (TL)</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{products.find(p => p.id === item.id)?.malnumarasi}</td>
            <td>{item.adet}</td>
            <td>{item.satilanFiyat}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={saveOrder}>Siparişi Kaydet</button>
    </div>
  );
}

export default OrderPage;
