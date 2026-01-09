import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CheckCircle, XCircle, Camera, QrCode, RefreshCw, X } from 'lucide-react';

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
          handleScanSuccess(decodedText);
        },
        () => {}
      );
      setScanning(true);
      setError(null);
    } catch (err) {
      setError('Camera access required to scan QR codes.');
      console.error(err);
    }
  };

  const stopScanning = async () => {
    if (html5QrCode && scanning) {
      try {
        await html5QrCode.stop();
        html5QrCode.clear();
        setHtml5QrCode(null);
        setScanning(false);
        setScannedId(null);
        setError(null);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  // Safe cleanup
  const handleStopClick = async () => {
      if (html5QrCode) {
          try {
              await html5QrCode.stop();
              html5QrCode.clear();
          } catch(e) {}
          setHtml5QrCode(null);
          setScanning(false);
      }
  }

  const handleScanSuccess = (decodedText) => {
    setScannedId(decodedText);
    
    // We pause scanning logic visually, but the library might need explicit stop
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            setHtml5QrCode(null);
            setScanning(false);
        }).catch(err => console.error(err));
    }

    // Auto-reset handled by UI button now for better UX
  };

  useEffect(() => {
    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, [html5QrCode]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Access Verification</h1>
        <p className="text-gray-500">Scan customer QR codes to verify membership status</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col">
        
        {/* Header inside card */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 pointer-events-auto">
                {scanning ? (
                    <span className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live Camera
                    </span>
                ) : (
                    <span className="flex items-center gap-2 text-gray-500">
                        <Camera className="w-4 h-4" />
                        Camera Idle
                    </span>
                )}
            </div>
            
            {scanning && (
                <button 
                    onClick={handleStopClick}
                    className="pointer-events-auto p-2 bg-white rounded-full hover:bg-gray-100 border border-gray-200 shadow-sm transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>
            )}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 relative">
            
            {/* 1. Idle State */}
            {!scanning && !scannedId && !error && (
                <div className="text-center space-y-6 max-w-sm">
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center mx-auto rotate-3 hover:rotate-6 transition-transform duration-500">
                        <QrCode className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Ready to Scan</h2>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                            Ensure the customer's QR code is clearly visible and well-lit.
                        </p>
                    </div>
                    <button
                        onClick={startScanning}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                    >
                        Activate Camera
                    </button>
                </div>
            )}

            {/* 2. Scanning State - The div#reader is populated by html5-qrcode */}
            {scanning && (
                <div className="w-full max-w-md aspect-square relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
                    <div id="reader" className="w-full h-full object-cover"></div>
                    {/* Overlay Frame */}
                    <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none">
                        <div className="absolute inset-0 border-2 border-white/50"></div>
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1"></div>
                    </div>
                    <p className="absolute bottom-8 left-0 right-0 text-center text-white/90 text-sm font-medium z-10 drop-shadow-md">
                        Align QR code within the frame
                    </p>
                </div>
            )}

            {/* 3. Success State */}
            {scannedId && (
                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-green-100">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Verified Access</h2>
                        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 font-mono text-sm text-gray-600 max-w-xs mx-auto break-all shadow-sm">
                            {scannedId}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setScannedId(null);
                            startScanning();
                        }}
                        className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors"
                    >
                        Scan Next Customer
                    </button>
                </div>
            )}

            {/* 4. Error State */}
            {error && (
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Scanning Failed</h3>
                        <p className="text-red-500 mt-1">{error}</p>
                    </div>
                    <button
                        onClick={() => {
                            setError(null);
                            startScanning();
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors mx-auto"
                    >
                        <RefreshCw className="w-4 h-4" />
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
