import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import Scanner from '../components/QRScanner/Scanner';

const ScanPage: React.FC = () => {
  return (
    <PageContainer title="Scan QR Code">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Scan a QR code at any food counter to view details and add items to your tray.
          </p>
          
          <Scanner />
        </div>
      </div>
    </PageContainer>
  );
};

export default ScanPage;