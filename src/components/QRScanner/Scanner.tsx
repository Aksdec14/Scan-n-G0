import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { toast } from 'react-toastify';
import { QrCode, Camera } from 'lucide-react';

const Scanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup function to stop scanning when component unmounts
    return () => {
      if (html5QrCode) {
        stopScanning();
      }
    };
  }, []);

  useEffect(() => {
    if (html5QrCode && scanning) {
      const qrCodeSuccessCallback = (decodedText: string) => {
        handleQRCodeResult(decodedText);
      };

      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };
      
      html5QrCode
        .start(
          { facingMode: "environment" },
          config,
          qrCodeSuccessCallback,
          undefined
        )
        .catch(err => {
          toast.error('Failed to start scanner: ' + err);
          setScanning(false);
        });
    }
  }, [html5QrCode, scanning]);

  const handleQRCodeResult = (decodedText: string) => {
    stopScanning();
    
    try {
      // Handle both full URLs and relative paths
      const path = decodedText.startsWith('http') 
        ? new URL(decodedText).pathname 
        : decodedText;
      
      const segments = path.split('/').filter(Boolean);
      const isValidMenuPath = segments.includes('menu') && 
                             segments.includes('item') && 
                             segments[segments.length - 1];

      if (isValidMenuPath) {
        const itemId = segments[segments.length - 1];
        navigate(`/menu/item/${itemId}`);
        return;
      }
      
      toast.error('Invalid QR code format. Please scan a valid menu QR code.');
    } catch (error) {
      toast.error('Invalid QR code. Please try again.');
    }
  };

  const startScanning = () => {
    try {
      const newHtml5QrCode = new Html5Qrcode("reader");
      setHtml5QrCode(newHtml5QrCode);
      setScanning(true);
    } catch (error) {
      toast.error('Failed to initialize scanner');
    }
  };

  const stopScanning = () => {
    if (html5QrCode && html5QrCode.isScanning) {
      html5QrCode
        .stop()
        .catch(err => console.error('Error stopping scanner:', err));
    }
    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        id="reader" 
        className={`w-full max-w-sm h-64 rounded-lg overflow-hidden relative ${
          scanning ? 'border-4 border-green-400' : 'bg-gray-100'
        }`}
      >
        {!scanning && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <QrCode size={64} className="mb-4 text-gray-400" />
            <p className="text-center px-4">
              Tap the button below to scan a QR code
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        {!scanning ? (
          <button 
            onClick={startScanning}
            className="btn btn-primary flex items-center"
            aria-label="Start scanning"
          >
            <Camera size={20} className="mr-2" />
            Start Scanning
          </button>
        ) : (
          <button 
            onClick={stopScanning}
            className="btn btn-outline"
            aria-label="Stop scanning"
          >
            Cancel
          </button>
        )}
      </div>
      
      <div className="mt-8 px-4 py-3 bg-amber-100 rounded-lg text-amber-800 max-w-sm">
        <p className="text-sm">
          <strong>Tip:</strong> Align the QR code within the scanner frame. Make sure there's good lighting and hold your device steady.
        </p>
      </div>
    </div>
  );
};

export default Scanner;