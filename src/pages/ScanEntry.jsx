import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CheckCircle, XCircle, Camera } from 'lucide-react';

const ScanEntry = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedId, setScannedId] = useState(null);
  const [error, setError] = useState(null);
  const [html5QrCode, setHtml5QrCode] = useState(null);

  const startScanning = async () => {
    try {
      const qrCode = new Html5Qrcode('reader');
      setHtml5QrCode(qrCode);
      
      await qrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // QR code detected
          handleScanSuccess(decodedText);
        },
        () => {
          // Ignore scanning errors - this is intentional to avoid spam
        }
      );
      setScanning(true);
      setError(null);
    } catch (err) {
      setError('Failed to start camera. Please check permissions.');
      console.error('Error starting QR scanner:', err);
    }
  };

  const stopScanning = () => {
    if (html5QrCode) {
      html5QrCode
        .stop()
        .then(() => {
          html5QrCode.clear();
          setHtml5QrCode(null);
          setScanning(false);
          setScannedId(null);
          setError(null);
        })
        .catch((err) => {
          console.error('Error stopping scanner:', err);
        });
    }
  };

  const handleScanSuccess = (decodedText) => {
    setScannedId(decodedText);
    stopScanning();
    
    // Auto-reset after 5 seconds
    setTimeout(() => {
      setScannedId(null);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, [html5QrCode]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text">Scan Entry</h1>
        <p className="text-text-secondary mt-2">Scan customer QR code to verify access</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-surface rounded-lg shadow-sm p-6 border border-border">
          {!scanning && !scannedId && (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-text mb-2">
                  Ready to Scan
                </h2>
                <p className="text-text-secondary mb-6">
                  Click the button below to start scanning QR codes
                </p>
                <button
                  onClick={startScanning}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
                >
                  Start Camera
                </button>
              </div>
            </div>
          )}

          {scanning && !scannedId && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text">Scanning...</h2>
                <button
                  onClick={stopScanning}
                  className="px-4 py-2 bg-background text-text-secondary rounded-lg hover:bg-border transition-colors text-sm font-medium"
                >
                  Stop
                </button>
              </div>
              <div
                id="reader"
                className="w-full rounded-lg overflow-hidden bg-gray-100"
                style={{ minHeight: '400px' }}
              />
            </div>
          )}

          {scannedId && (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
                <h2 className="text-xl font-semibold text-success mb-2">
                  Verified: Access Granted
                </h2>
                <p className="text-text-secondary mb-2">Customer ID:</p>
                <p className="text-lg font-mono font-semibold text-text mb-6">
                  {scannedId}
                </p>
                <button
                  onClick={() => {
                    setScannedId(null);
                    startScanning();
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
                >
                  Scan Another
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-error" />
              </div>
              <p className="text-error mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  startScanning();
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanEntry;
