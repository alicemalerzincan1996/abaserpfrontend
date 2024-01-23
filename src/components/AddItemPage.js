import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // Axios'u içe aktar
import './AddItemPage.css'; // Stiller için CSS dosyası

function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]); // Mal listesi için state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:9094/mal/getall");
        setItems(response.data);
      } catch (error) {
        console.error('Veri yüklenirken hata oluştu!', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = "http://localhost:9094/mal/save";
    

    try {
      const response = await Axios.post(apiUrl, {
        name: itemName,
        birim_fiyati_tl: price
      });
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Something went wrong!', error);
    }
  };

  return ( <><div className="add-item-container">
    <div className="navigation-bar">
        <a href="/siparis-sayfasi">Sipariş Sayfası</a>
        <a href="/siparisListesi">Siparislistesi</a>
        <a href="/additem">Malları Düzenle</a>
      </div>
      <h2>Ekli Olan Mallar</h2>
      <table>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Mal Adı</th>
                  <th>Birim Fiyatı (TL)</th>
              </tr>
          </thead>
          <tbody>
              {items.map((item) => (
                  <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.birim_fiyati_tl}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div><div className="add-item-container">
          <h2>Mal Ekleme Sayfası</h2>
          <form onSubmit={handleSubmit} className="add-item-form">
              <div className="form-group">
                  <label>Mal Adı:</label>
                  <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Fiyat:</label>
                  <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)} />
              </div>
              <button type="submit" className="submit-button">Ekle</button>
          </form>
      </div></>
  );
}

export default AddItemPage;