import  { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { GoStopwatch } from 'react-icons/go';
import { IoCartOutline } from 'react-icons/io5';
import { SlFire } from 'react-icons/sl';

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
  const flashSaleProducts = products.filter(
  (product) => product.flashSale?.enabled === true
);

  return (
    <div className="p-4">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">Flash Deals <SlFire color='red' /></h2>
        <div className="flex items-center gap-2 text-sm text-black rounded-2xl bg-white shadow-lg p-2  ">
          <span className='flex items-center '><GoStopwatch color='red' size={20} /> Deal Closes in:</span>
          <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-medium">{time.h}</span>
          <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-medium">{time.m}</span>
          <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm font-medium">{time.s}</span>
        </div>
      </div>

            {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashSaleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [wished, setWished] = useState(false);

  // discount calculate করো
  const currentPrice =
  product.flashSale?.enabled && product.flashSale?.salePrice != null
    ? product.flashSale.salePrice
    : product.price;

const discount =
  product.oldPrice != null && product.oldPrice > 0
    ? Math.round(
        ((product.oldPrice - currentPrice) / product.oldPrice) * 100
      )
    : 0;
  // stock কম হলে lowStock
  const lowStock = product.stock <= 10;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden relative">
      
      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded z-10">
        -{discount}% OFF
      </span>

      {/* Wishlist Button */}
      <button
        onClick={() => setWished(!wished)}
        className="absolute top-2 right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center z-10 cursor-pointer"
      >
        <span className={wished ? 'text-red-500' : 'text-gray-400'}><CiHeart /></span>
      </button>

      {/* Image */}
      <img src={product.image} alt={product.name} className="w-full h-30 object-contain p-2 bg-white " />

      <div className="p-3">
        
        {/* Brand + Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-blue-500 text-xs">{product.brand}</span>  {/* ← seller এর বদলে brand */}
          <span className="text-xs text-amber-600 flex items-center gap-0.5">
            ⭐ {product.rating}
          </span>
        </div>

        {/* Product Name */}
        <p className="text-sm font-medium text-gray-800 leading-snug mb-2 min-h-[40px]">
          {product.name}
        </p>

        
   {/* Price */}
<div className="flex items-center gap-2 mb-2">
  <span className="text-base font-semibold text-gray-900">
    {(product.flashSale?.enabled &&
      product.flashSale?.salePrice != null
        ? product.flashSale.salePrice
        : product.price ?? 0
    ).toLocaleString()} {product.currency}
  </span>

  <span className="text-xs text-gray-400 line-through">
    {product.oldPrice != null
      ? product.oldPrice.toLocaleString()
      : ""}
  </span>
</div>

        {/* Stock Info */}
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Stock: {product.stock}</span>
          <span className={lowStock ? 'text-red-500' : 'text-gray-500'}>
            {lowStock ? 'Low stock!' : 'Available'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
          />
        </div>

        {/* Add to Cart */}
        <button className="w-full py-2 bg-component text-white text-sm rounded-lg  flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex-shrink-0 cursor-pointer">
          <IoCartOutline size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
};


export default FlashDeals;