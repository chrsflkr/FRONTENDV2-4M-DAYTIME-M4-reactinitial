import React, { useState } from 'react';
import Loading from './LoadingMask'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';


const Subscription = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setValidEmail(inputEmail.includes('@') && inputEmail.includes('.'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validEmail) { 
      setLoading(true);
      try {
        const response = await fetch('https://demoapi.com/api/series/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setSubscriptionStatus(data.success ? 'Subscribed' : '');
      } catch (error) {
        console.error('Error subscribing:', error);
        setSubscriptionStatus('Subscription failed');
      } finally {
        setLoading(false);
        setTimeout(() => {
          setSubscriptionStatus('');
          setEmail('');
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h2>Subscribe to our newsletter</h2>
      {subscriptionStatus ? (
        <p>{subscriptionStatus}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <TextField  id="outlined-basic" label="Enter your email" variant="outlined"
                
                placeholder=""
                value={email}
                onChange={handleEmailChange}
              />
              <Button type="submit" disabled={!validEmail}>
                Subscribe
                
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Subscription;
