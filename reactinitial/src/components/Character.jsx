import React, { useState } from 'react';
import Button from '@mui/material/Button'

const Character = ({ character }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <h2>{character.name}</h2>
      {showDetails && <p>{character.details}</p>}
      <Button color='secondary' variant="outlined"  onClick={toggleDetails}>
        {showDetails ? 'Show less' : 'Show more'}
      </Button>
    </div>
  );
};

export default Character;
