import { useState } from 'react';
import logo from '../assets/Logo.png';
import { ImSearch } from 'react-icons/im';
import { GoGift } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa';
import { RiShoppingBag4Line } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const activeClass = "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold whitespace-nowrap";
const normalClass = "text-gray-600 hover:text-blue-600 whitespace-nowrap";

  return (
    <div className="bg-white w-full shadow-sm">

      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-2 gap-2">

        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img className="h-[50px] w-[90px]" src={logo} alt="MarketNest" />
          <h4 className="text-xl font-bold -ml-5">
            <span className='text-brand'>Market</span>
            <span className="text-orange-500">Nest</span>
          </h4>
        </div>

        {/* Search Bar — hidden on small */}
        <div className="hidden md:flex join flex-1 max-w-[550px] ">
          <label className="input join-item w-full">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Search millions of products"
            />
          </label>
          <button className="btn bg-orange-500 join-item text-white">
            <ImSearch />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">

          {/* Become a Seller — hidden on small */}
          <button className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-300 px-4 py-2 text-amber-800 cursor-pointer text-sm flex-shrink-0">
            <GoGift />
            <span>Become a Seller</span>
          </button>

          {/* Wishlist */}
          <button className="cursor-pointer">
            <FaRegHeart size={22} />
          </button>

          {/* Cart */}
          <button className="cursor-pointer">
            <RiShoppingBag4Line size={22} />
          </button>

          {/* Login — hidden on small */}
          <NavLink
            to="login"
            className="hidden sm:block font-medium text-white bg-brand rounded-full px-4 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-sm flex-shrink-0"
          >
            Login
          </NavLink>

          {/* Profile — hidden on small */}
          <button
            type="button"
            aria-label="Profile"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex-shrink-0"
          >
            <User size={17} strokeWidth={2} />
          </button>

          {/* Mobile Menu Icon */}
          <button
            className="sm:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Search — small screen only */}
      <div className="md:hidden px-4 pb-2">
        <div className="join w-full">
          <label className="input validator join-item w-full">
            <input
              className="w-full"
              type="text"
              placeholder="Search millions of products"
            />
          </label>
          <button className="btn bg-orange-500 join-item text-white">
            <ImSearch />
          </button>
        </div>
      </div>

      {/* Bottom Nav — Desktop */}
<div className="hidden sm:flex px-6 gap-4 pb-2 pt-2">  {/* ✅ border-t সরানো হয়েছে */}
  <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass + ' whitespace-nowrap'}>All Categories</NavLink>
  <NavLink to="/electronic" className={({ isActive }) => isActive ? activeClass : normalClass + ' whitespace-nowrap'}>Electronics</NavLink>
  <NavLink to="/fashion" className={({ isActive }) => isActive ? activeClass : normalClass + ' whitespace-nowrap'}>Fashion</NavLink>
  <NavLink to="/home&living" className={({ isActive }) => isActive ? activeClass + ' whitespace-nowrap' : normalClass + ' whitespace-nowrap'}>Home & Living</NavLink>
  <NavLink to="/beauty&health" className={({ isActive }) => isActive ? activeClass + ' whitespace-nowrap' : normalClass + ' whitespace-nowrap'}>Beauty & Health</NavLink>
  <NavLink to="/sports" className={({ isActive }) => isActive ? activeClass : normalClass + ' whitespace-nowrap'}>Sports</NavLink>
  <NavLink to="/book" className={({ isActive }) => isActive ? activeClass : normalClass + ' whitespace-nowrap'}>Book</NavLink>
</div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col px-6 py-4 gap-4 border-t bg-white">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>All Categories</NavLink>
          <NavLink to="/electronic" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Electronics</NavLink>
          <NavLink to="/fashion" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Fashion</NavLink>
          <NavLink to="/home&living" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home & Living</NavLink>
          <NavLink to="/beauty&health" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Beauty & Health</NavLink>
          <NavLink to="/sports" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Sports</NavLink>
          <NavLink to="/book" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Book</NavLink>

          {/* Mobile only items */}
          <div className="flex flex-row flex-warp gap-3 border-t pt-3">
            <button className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-4 py-2 text-amber-800 cursor-pointer w-fit">
              <GoGift />
              <span>Become a Seller</span>
            </button>
            <NavLink
              to="login"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-white bg-brand rounded-full px-4 py-2 shadow-sm w-fit"
            >
              Login
            </NavLink>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white"
            >
              <User size={17} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;