import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Hasil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(true);
  const navigate = useNavigate();
  const { tryoutId } = useParams();

  useEffect(() => {
    const fetchResult = async () => {
      setResultLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/API/student/tryout/${tryoutId}/result`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setResult(response.data);
      } catch (error) {
        setResult(null);
      } finally {
        setResultLoading(false);
      }
    };
    fetchResult();
  }, [tryoutId]);

  const handleFinalize = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/API/student/tryout/${tryoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Hasil tryout berhasil difinalisasi!');
        navigate('/siswa/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat memfinalisasi hasil';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#213555] mb-4">
                Finalisasi Hasil Tryout
              </h2>
              <p className="text-gray-600 mb-8">
                Pastikan Anda telah menjawab semua pertanyaan sebelum memfinalisasi hasil tryout.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#213555] p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[#213555]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#213555]">
                    Setelah memfinalisasi, Anda tidak dapat mengubah jawaban lagi.
                  </p>
                </div>
              </div>
            </div>

            {/* HASIL TRYOUT */}
            <div className="mb-8">
              {resultLoading ? (
                <div className="text-center text-gray-400 py-8">Memuat hasil...</div>
              ) : !result || (Array.isArray(result) && result.length === 0) ? (
                <div className="text-center text-gray-500 py-8">Belum ada jawaban yang dikumpulkan.</div>
              ) : (
                <div className="text-center text-[#213555] py-8">
                  {/* Tampilkan hasil sesuai struktur data dari API */}
                  <pre className="bg-gray-100 rounded p-4 text-left text-xs overflow-x-auto inline-block max-w-full">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleFinalize}
                disabled={isLoading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#213555] hover:bg-[#1a2a44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#213555] transition-colors duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Finalisasi Hasil'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hasil;
