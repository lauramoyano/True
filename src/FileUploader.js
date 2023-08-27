import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [contacts, setContacts] = useState([]);
  

  const formatPhoneNumber = (phoneNumber) => {
    // Eliminar cualquier carácter que no sea un dígito
    const digitsOnly = phoneNumber.replace(/\D/g, '');
  
    // Verificar si hay suficientes dígitos para formatear (10 dígitos)
    if (digitsOnly.length >= 10) {
      // Aplicar el formato "555-555-5555"
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    } else {
      // Si el número no tiene 10 dígitos, devuelve el número original
      return phoneNumber;
    }
  };
  

  const handleOnDrop = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        const allLines = fileContent.split('\n');
  
        const objList = [];
  
        for (let i = 0; i < allLines.length-1; i++) {
          const data = allLines[i].split(',');

          const formattedPhone = formatPhoneNumber(data[1]); 
          const obj = {
            name: data[0],     // Campo "name"
            email: data[2],   // Campo "email"
            phone: formattedPhone,   // Campo "phone"
           
          };
  
          objList.push(obj);
        }
  
        setContacts(objList);
   
        console.log(objList);
      };
  
      reader.readAsText(file);
    }
  };
  


  const handleUpload = async () => {
    try {
      for (const contact of contacts) {
        console.log(contact)
        await axios.post('https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items', contact);
        console.log(contact)
      }
      alert('Carga exitosa');
    } catch (error) {
      console.error('Error al cargar los contactos:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input type="file" accept=".csv" onChange={handleOnDrop} />
      <button
        onClick={handleUpload}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        Upload Contacts
      </button>
      <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>List of Contacts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tableCellStyle}>{contact.name}</td>
              <td style={tableCellStyle}>{contact.email}</td>
              <td style={tableCellStyle}>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f0f0f0',
  padding: '10px',
  textAlign: 'center',
};

const tableRowStyle = {
  backgroundColor: '#ffffff',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #e0e0e0',
};

export default FileUploader;
