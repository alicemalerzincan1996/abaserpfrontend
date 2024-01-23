import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Burada giriş doğrulama işlemlerini gerçekleştirebilirsiniz
    console.log('Giriş yapıldı', { username, password });
  };

  return (
    <div>
      <h2>Giriş Sayfası</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Giriş Yap</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
