import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ShieldCheck, CheckCircle, AlertCircle, FileText, Eye, Lock } from 'lucide-react';

const DocumentVerifier = ({ onClose }) => {
  console.log('DocumentVerifier component rendered');

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [verificationStatus, setVerificationStatus] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState(null);
  const [ocrResults, setOcrResults] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState({});

  const documentTypes = [
    { id: 'id', name: 'Government ID', required: true, description: 'Driver\'s license, passport, or state ID' },
    { id: 'address', name: 'Proof of Address', required: true, description: 'Utility bill, lease, or bank statement' },
    { id: 'citizenship', name: 'Citizenship Proof', required: false, description: 'Birth certificate or naturalization papers' }
  ];

  const handleFileUpload = async (docType, file) => {
    if (!file) return;

    try {
      setUploadedFiles(prev => ({
        ...prev,
        [docType]: file
      }));
      setVerificationStatus(prev => ({
        ...prev,
        [docType]: 'uploaded'
      }));

      // Simulate OCR processing
      setOcrResults(prev => ({
        ...prev,
        [docType]: 'Processing...'
      }));

      // Simulate OCR delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock OCR results
      const mockOcrData = {
        id: {
          name: 'John Doe',
          idNumber: 'DL123456789',
          expiry: '2028-12-31',
          address: '123 Main St, Anytown, ST 12345'
        },
        address: {
          address: '123 Main St, Anytown, ST 12345',
          date: '2024-01-15',
          provider: 'Anytown Electric'
        },
        citizenship: {
          name: 'John Doe',
          birthDate: '1990-01-01',
          citizenship: 'United States'
        }
      };

      setOcrResults(prev => ({
        ...prev,
        [docType]: mockOcrData[docType] || 'OCR failed'
      }));

      // Simulate AI analysis
      setAiAnalysis(prev => ({
        ...prev,
        [docType]: 'Analyzing authenticity...'
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      setAiAnalysis(prev => ({
        ...prev,
        [docType]: 'Document appears authentic'
      }));
    } catch (error) {
      console.error('Error processing file:', error);
      setVerificationStatus(prev => ({
        ...prev,
        [docType]: 'error'
      }));
      setOcrResults(prev => ({
        ...prev,
        [docType]: 'Error processing file'
      }));
    }
  };

  const simulateVerification = async () => {
    setIsVerifying(true);
    setVerificationResults(null);

    // Simulate advanced verification steps
    const steps = [
      'Initializing secure connection...',
      'Running OCR validation...',
      'Cross-referencing with government databases...',
      'Performing AI authenticity analysis...',
      'Blockchain verification...',
      'Final security checks...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setVerificationResults({ step: steps[i], progress: (i + 1) / steps.length });
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const results = {};
    let allValid = true;

    Object.keys(uploadedFiles).forEach(docType => {
      const random = Math.random();
      if (random > 0.85) {
        results[docType] = {
          status: 'failed',
          message: 'Document tampering detected',
          details: 'Digital signature mismatch'
        };
        allValid = false;
      } else if (random > 0.7) {
        results[docType] = {
          status: 'warning',
          message: 'Document verified but requires manual review',
          details: 'Unusual formatting detected'
        };
      } else {
        results[docType] = {
          status: 'success',
          message: 'Document fully verified and authenticated',
          details: 'All security checks passed'
        };
      }
    });

    setVerificationResults({ results, allValid });
    setIsVerifying(false);

    Object.keys(results).forEach(docType => {
      setVerificationStatus(prev => ({
        ...prev,
        [docType]: results[docType].status
      }));
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'uploaded': return <FileText className="w-5 h-5 text-blue-400" />;
      default: return <Upload className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'border-green-400/50 bg-green-400/10';
      case 'warning': return 'border-yellow-400/50 bg-yellow-400/10';
      case 'failed': return 'border-red-400/50 bg-red-400/10';
      case 'uploaded': return 'border-blue-400/50 bg-blue-400/10';
      default: return 'border-white/20 bg-white/5';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl glass border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>

        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyber-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyber-purple/20">
            <ShieldCheck className="w-8 h-8 text-cyber-purple" />
          </div>
          <h2 className="text-3xl font-black mb-2 font-orbitron tracking-tight">Document Verification</h2>
          <p className="text-gray-400 text-sm">AI-powered OCR, authenticity analysis, and blockchain verification for secure document validation</p>
        </div>

        <div className="space-y-6 mb-8">
          {documentTypes.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border ${getStatusColor(verificationStatus[doc.id])} transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(verificationStatus[doc.id])}
                  <div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-gray-400">{doc.description}</p>
                  </div>
                </div>
                {doc.required && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Required</span>}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(doc.id, file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {uploadedFiles[doc.id] ? uploadedFiles[doc.id].name : 'Choose file...'}
                    </span>
                  </div>
                </label>
                {uploadedFiles[doc.id] && (
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {ocrResults[doc.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <h4 className="text-sm font-semibold mb-2 text-cyber-blue">OCR Extracted Data:</h4>
                  {typeof ocrResults[doc.id] === 'string' ? (
                    <p className="text-sm text-gray-400">{ocrResults[doc.id]}</p>
                  ) : (
                    <div className="text-sm text-gray-300 space-y-1">
                      {Object.entries(ocrResults[doc.id]).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-cyber-purple">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {aiAnalysis[doc.id] && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-green-400">🤖 {aiAnalysis[doc.id]}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {verificationResults && !verificationResults.results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl border border-cyber-blue/50 bg-cyber-blue/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-cyber-blue font-medium">{verificationResults.step}</p>
            </div>
            <div className="mt-2 w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${verificationResults.progress * 100}%` }}
              ></div>
            </div>
          </motion.div>
        )}

        {verificationResults && verificationResults.results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl border border-white/20 bg-white/5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyber-blue" />
              Advanced Verification Results
            </h3>
            <div className="space-y-3">
              {Object.entries(verificationResults.results).map(([docType, result]) => (
                <div key={docType} className="p-3 rounded-lg border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{documentTypes.find(d => d.id === docType)?.name}</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className={`text-sm font-medium ${result.status === 'success' ? 'text-green-400' : result.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{result.message}</p>
                  <p className="text-xs text-gray-400">{result.details}</p>
                </div>
              ))}
            </div>
            {verificationResults.allValid ? (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  ✓ All documents verified with advanced security checks! You are fully eligible to vote.
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  ⚠ Some documents failed verification. Please review and contact support if needed.
                </p>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={simulateVerification}
            disabled={Object.keys(uploadedFiles).length === 0 || isVerifying}
            className="flex-1 py-3 bg-cyber-blue text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Running Advanced Verification...' : 'Start Advanced Verification'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-3 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentVerifier;