
import logo from '../assets/Logo.png';
import { ImSearch } from 'react-icons/im';
import { GoGift } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa';
import { RiShoppingBag4Line } from 'react-icons/ri';
import { NavLink } from 'react-router';

const Navbar = () => {

 const activeClass = "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold";
  const normalClass = "text-gray-600 hover:text-blue-600";

  return (
    <div className="bg-white w-full h-[115px]">
      <div className="flex items-center h-[70px] px-4">

        {/* Logo */}
        <div className="flex items-center pl-5">
          <img
            className="h-[40px] w-[105px]"
            src={logo}
            alt="MarketNest"
          />

          <h4 className="text-xl font-bold ml-8">
            <span className='text-[#008C99]'>Market</span><span className="text-orange-500">Nest</span>
          </h4>
        </div>

        {/* Search + Seller + Icons */}
        <div className="flex items-center ml-[120px]">

          {/* Search Bar */}
          <div className="join w-[550px]">

  <label className="input validator join-item w-full">

    <input
      className="w-full"
      type="text"
      placeholder="Search millions of products"
      required
    />

  </label>

  <button className="btn bg-orange-500 join-item text-white">
    <ImSearch />
  </button>

</div>

           
          </div>

          {/* Become a Seller */}
          <button className="ml-5 inline-flex items-center gap-1 rounded-full bg-amber-300 px-4 py-2 text-amber-800 cursor-pointer">
            <GoGift />
            <h5>Become a Seller</h5>
          </button>

          {/* Wishlist */}
          <button className="ml-5 cursor-pointer">
            <FaRegHeart size={24} />
          </button>

          {/* Cart */}
          <button className="ml-5 cursor-pointer">
            <RiShoppingBag4Line size={24} />
          </button>

        </div>
        {/* Menu */}
        <div className=" flex ml-10 gap-4 pt-3  ">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>All Categories</NavLink>
          <NavLink to="/electronic" className={({ isActive }) => isActive ? activeClass : normalClass}>Electronics</NavLink>
          <NavLink to="/fashion" className={({ isActive }) => isActive ? activeClass : normalClass}>Fashion</NavLink>
          <NavLink to="/home&living" className={({ isActive }) => isActive ? activeClass : normalClass}>Home & Living</NavLink>
          <NavLink to="/beauty&health" className={({ isActive }) => isActive ? activeClass : normalClass}>Beauty & Health</NavLink>
          <NavLink to="/sports" className={({ isActive }) => isActive ? activeClass : normalClass}>Sports</NavLink>
          <NavLink to="/book" className={({ isActive }) => isActive ? activeClass : normalClass}>Book</NavLink>
</div>

      </div>
    
  );
};

export default Navbar;
