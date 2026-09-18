import { Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import logo from "../assets/Logo.png"
const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">

      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="mb-5 flex items-center ">
             <img
                         className="h-[70px] w-[120px]"
                         src={logo}
                         alt="MarketNest"
                       />

              <span className="text-xl font-bold -ml-7">
               <span className="text-brand">Market</span><span className="text-orange-500">Nest</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Your one-stop shop for quality products, great prices and a
              better shopping experience.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 transition hover:bg-violet-600"
              >
                <FaFacebookF></FaFacebookF>
              </a>

          

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 transition hover:bg-violet-600"
              >
                <FaXTwitter></FaXTwitter>
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 transition hover:bg-violet-600"
              >
                <FaYoutube></FaYoutube>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-violet-400"
                >
                  All Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/treandingcollections"
                  className="transition hover:text-violet-400"
                >
                  Treanding Collections
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="transition hover:text-violet-400"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="transition hover:text-violet-400"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="transition hover:text-violet-400">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-violet-400">
                  Shipping Info
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-violet-400">
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-violet-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            {/* <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
             <span className="text-[#008C99]"></span> 
            </h3> */}

            <p className="mb-4 text-sm leading-6 text-slate-400">
              Get the latest updates, offers and exclusive deals.
            </p>

            <div className="flex overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-500"
              />

              <button className="bg-component px-4 text-sm font-semibold text-white cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p className="flex gap-1">
            <FaRegCopyright />2026 MarketNest. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;