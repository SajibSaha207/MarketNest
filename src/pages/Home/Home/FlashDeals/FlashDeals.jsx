import  { useEffect, useState } from 'react';
import { GoStopwatch } from 'react-icons/go';

const FlashDeals = ({ products = [] }) => {
  const [timeLeft, setTimeLeft] = useState(6 * 3600 + 32 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="p-4">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Flash Deals Super Charged</h2>
        <div className="flex items-center gap-2 text-sm text-black rounded-2xl bg-white shadow-lg p-2  ">
          <span className='flex items-center '><GoStopwatch color='red' size={20} /> Deal Closes in:</span>
          <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-medium">{time.h}</span>
          <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-medium">{time.m}</span>
          <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm font-medium">{time.s}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;