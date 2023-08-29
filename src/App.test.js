import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploader from './FileUploader';
import App from "./App"

describe("<App />", () => {
  it("renders the component upload button", () => {
    const { getByText } = render(<App />);
    expect(getByText("Upload Contacts")).toBeTruthy();

  });
  it('renders the component table ', () => {
    const { getByText } = render(<FileUploader />);

    expect(getByText("Name")).toBeTruthy();
  });
  it('renders the component table', () => {
    const { getByText } = render(<FileUploader />);
    
    expect(getByText("Phone")).toBeTruthy();
  });
  it('renders the component table', () => {
    const { getByText } = render(<FileUploader />);
    
    
    expect(getByText("Email")).toBeTruthy();
  });
  it('renders the component label', () => {
    const { getByText } = render(<FileUploader />);
    expect(getByText("List of Contacts")).toBeTruthy();
  });
  it("renders the component input button", async () => {
    
    const { getByLabelText } = render(<FileUploader />);
    expect(getByLabelText("Seleccionar archivos")).toBeTruthy();
    
  });
  
});

