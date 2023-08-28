import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploader from './FileUploader';

// Mock de la función formatPhoneNumber
FileUploader.formatPhoneNumber = jest.fn((phoneNumber) => phoneNumber);

describe('FileUploader Component UI', () => {
  it('renders file input and upload button', () => {
    render(<FileUploader />);
    
    // Verifica que se muestren el input de tipo archivo y el botón de carga
    const fileInput = screen.getByLabelText('Upload Contacts');
    const uploadButton = screen.getByText('Upload Contacts');
    
    expect(fileInput).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  it('renders list of contacts table header', () => {
    render(<FileUploader />);
    
    // Verifica que se muestren los encabezados de la tabla
    const nameHeader = screen.getByText('Name');
    const emailHeader = screen.getByText('Email');
    const phoneHeader = screen.getByText('Phone');
    
    expect(nameHeader).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();
    expect(phoneHeader).toBeInTheDocument();
  });

  it('renders list of contacts table', () => {
    const contacts = [
      { name: 'John', email: 'john@example.com', phone: '123-456-7890' },
      { name: 'Jane', email: 'jane@example.com', phone: '987-654-3210' },
    ];

    render(<FileUploader />);
    
    // Simula la existencia de contactos
    FileUploader.formatPhoneNumber.mockImplementation((phoneNumber) => phoneNumber);
    FileUploader.contacts = contacts;
    
    // Verifica que se muestren los datos de contacto en la tabla
    const nameCell = screen.getByText('John');
    const emailCell = screen.getByText('john@example.com');
    const phoneCell = screen.getByText('123-456-7890');
    
    expect(nameCell).toBeInTheDocument();
    expect(emailCell).toBeInTheDocument();
    expect(phoneCell).toBeInTheDocument();
  });

  // Puedes agregar más pruebas según sea necesario para tu componente
});
