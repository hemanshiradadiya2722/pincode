import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [pincode, setPincode] = useState('');
  const [postalInfo, setPostalInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPostalInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data && data[0]?.Status === 'Success') {
        setPostalInfo(data[0]?.PostOffice);
        setError(null);
      } else {
        setError('Invalid PIN code');
        setPostalInfo(null);
      }
    } catch (error) {
      setError('Failed to fetch data');
      setPostalInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPostalInfo();
  };

  return (
    <div className="postal-info container">
      <h1>Postal Information Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter PIN code :  
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required className="pincode-input"/>
        </label>
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Fetching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {postalInfo && (
        <div>
          <h2>Postal Information</h2>
          <ul className="postal-info-list">
            {postalInfo.map((office, index) => (
              <li key={index} className="postal-info-item">
                <strong>Office Name:</strong> {office.Name}<br />
                <strong>PIN Code:</strong> {office.Pincode}<br />
                <strong>State:</strong> {office.State}<br />
                <strong>District:</strong> {office.District}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
