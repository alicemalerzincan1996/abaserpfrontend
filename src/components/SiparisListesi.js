import React, { useState, useEffect } from 'react';
import './SiparisListesi.css'; // Stiller için CSS dosyası
import Axios from 'axios';
function TektekMalBazliBilgilerTablosu({ veriListesi }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Mal Numarası</th>
            <th>Sipariş Numarası</th>
            <th>Miktar</th>
          </tr>
        </thead>
        <tbody>
          {veriListesi.map((item, index) => (
            <tr key={index}>
              <td>{item.malnumarasi}</td>
              <td>{item.siparisnumarasi}</td>
              <td>{item.miktar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
function VeriTablosu({ veriNesnesi }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Anahtar</th>
            <th>Değer</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(veriNesnesi).map(([anahtar, deger], index) => (
            <tr key={index}>
              <td>{anahtar}</td>
              <td>{deger}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
function SiparisListesi() {
  const [siparisler, setSiparisler] = useState([]);
  const [sepetx, setSepet] = useState([]);
  const [toplamTutar, setToplamTutar] = useState(null);
  const [bilgi, setbilgi] = useState(null);
  const [bilgi2, setbilgi2] = useState(null);


  const [selectedSiparisId, setSelectedSiparisId] = useState('');
  const sepeteIdIleEkle = () => {
    const siparis = siparisler.find(s => s.id.toString() === selectedSiparisId);
  
    if (!siparis) {
      console.error("Sipariş bulunamadı");
      return;
    }
  
    // Sepette zaten bu sipariş var mı kontrol et
    const sepetteVarMi = sepetx.some(item => item.siparisId === siparis.id);
    if (sepetteVarMi) {
      alert("Bu sipariş zaten sepette!");
      return;
    }
  
    // Siparişi sepete ekle
    setSepet(prevSepet => [...prevSepet, { siparisId: siparis.id }]);
  };
  

  useEffect(() => {
    Axios.get("http://localhost:9094/siparis/getall")
      .then(response => {
        console.log(response);
        setSiparisler(response.data);
      })
      .catch(error => console.error('Siparişler yüklenirken hata oluştu', error));
  }, []);
  const sepeteEkle = (siparisId) => {
    setSepet([...sepetx, { siparisId}]);
  };

  const siparisToplaminiHesapla = () => {
    Axios.post("http://localhost:9094/siparis/siparistoplama", sepetx)
      .then(response => {
        setToplamTutar(response.data);
      })
      .catch(error => console.error('Toplam tutar hesaplanırken hata oluştu', error));
  };
  const siparisOrtalamainiHesapla = () => {
    Axios.post("http://localhost:9094/siparis/siparisortalama", sepetx)
      .then(response => {
        setToplamTutar(response.data);
      })
      .catch(error => console.error('Toplam tutar hesaplanırken hata oluştu', error));
  };
  const siparisMalbazliOrtalamainiHesapla = () => {
    Axios.post("http://localhost:9094/siparis/malsiparisortalama", sepetx)
      .then(response => {
        setbilgi(response.data);
        
        console.log(response.data)
      })
      .catch(error => console.error('Toplam tutar hesaplanırken hata oluştu', error));
  };
  const tektekmalbazlıbilgilerHesapla = () => {
    Axios.post("http://localhost:9094/siparis/malbazlisiparisadet", sepetx)
      .then(response => {
        setbilgi2(response.data);
        
        console.log(response.data)
      })
      .catch(error => console.error('Toplam tutar hesaplanırken hata oluştu', error));
  };

  return (
    <div className="table-container">
        <div className="navigation-bar">
        <a href="/siparis-sayfasi">Sipariş Sayfası</a>
        <a href="/siparisListesi">Siparislistesi</a>
        <a href="/additem">Malları Düzenle</a>
      </div>
      <h2>Sipariş Listesi</h2>
      <table>
        <thead>
          <tr>
            <th>Sipariş ID</th>
            <th>Mal Numarası</th>
            <th>Miktar</th>
            <th>Satılan Fiyat (TL)</th>
          </tr>
        </thead>
        <tbody>
          {siparisler.map((siparis, siparisIndex) => (
            siparis.satilanurunList.map((urun, urunIndex) => (
              <React.Fragment key={urunIndex}>
                {urunIndex === 0 && siparisIndex > 0 && (
                  <tr className="seperator-row">
                    <td colSpan="4"></td>
                  </tr>
                )}
                <tr>
                  <td>{siparis.id}</td>
                  <td>{urun.mal.malnumarasi}</td>
                  <td>{urun.miktar}</td>
                  <td>{urun.satilanfiyat}</td>
                </tr>
              </React.Fragment>
            ))
          ))}
        </tbody>
        <div>
        <input
          type="text"
          value={selectedSiparisId}
          onChange={(e) => setSelectedSiparisId(e.target.value)}
          placeholder="Sipariş ID girin"
        />
        <button onClick={sepeteIdIleEkle}>Sepete ID ile Ekle</button>
      </div>
      </table>
      <h3>Sepetteki Ürünler</h3>
      <ul>
        {sepetx.map((item, index) => (
          <li key={index}>Sipariş ID: {item.siparisId}</li>
        ))}
      </ul>

      <button onClick={siparisToplaminiHesapla}>Sepeti Topla</button>
      <button onClick={siparisOrtalamainiHesapla}>OrtalamainiHesapla</button>
      <button onClick={siparisMalbazliOrtalamainiHesapla}>Siparismalbazliortalamahesapla</button>
      <button onClick={tektekmalbazlıbilgilerHesapla}>Tektekmalbazlibilgilerihesapla</button>



      {toplamTutar !== null && <div>Toplam Tutar: {toplamTutar}</div>}
      {/* Bilgi tablosunu render et */}
      {bilgi !== null && <VeriTablosu veriNesnesi={bilgi} />}

       {/* TektekMalBazliBilgilerTablosu bileşenini render et */}
       {bilgi2 !== null && <TektekMalBazliBilgilerTablosu veriListesi={bilgi2} />}
      
      

      
      
      ;
    
    </div>
  );
}

export default SiparisListesi;
