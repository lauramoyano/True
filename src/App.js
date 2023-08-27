import React, { useState } from 'react';
import FileUploader from './FileUploader';


function App() {
  // Define contacts en el componente principal y pasa una función para actualizarlo
  const [contacts, setContacts] = useState([]);

  return (
    <div>
      {/* Pasa contacts como una prop al componente FileUploader */}
      <FileUploader setContacts={setContacts} />
     
    </div>
  );
}

export default App;
