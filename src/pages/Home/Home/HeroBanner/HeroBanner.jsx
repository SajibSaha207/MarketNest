import {
  FiClock,
  FiArrowRight,
  FiGrid,
  FiShield,
  FiPackage,
  FiMonitor,
  FiUser,
  FiHome,
  FiCpu,
  FiFeather,
  FiDroplet,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import bannerImg from "../../../../assets/Homebanner.png";

const stats = [
  { value: "1,840+", label: "Verified Sellers" },
  { value: "48 Hrs", label: "Fast Escrow Payout" },
  { value: "4.9/5", label: "Merchant Score" },
];

const categories = [
  { name: "Electronics", icon: <FiMonitor className="h-3.5 w-3.5" />, active: true, badge: "NEW" },
  { name: "Apparel & Style", icon: <FiUser className="h-3.5 w-3.5" /> },
  { name: "Home Goods", icon: <FiHome className="h-3.5 w-3.5" /> },
  { name: "Gadgets & Drones", icon: <FiCpu className="h-3.5 w-3.5" /> },
  { name: "Artisan Made", icon: <FiFeather className="h-3.5 w-3.5" /> },
  { name: "Beauty & Wellness", icon: <FiDroplet className="h-3.5 w-3.5" /> },
];

const HeroBanner = () => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative">
        {/* ===== Dark Hero ===== */}
        <div
          className="relative overflow-hidden rounded-3xl bg-slate-950 bg-cover bg-center px-6 pb-16 pt-8 sm:px-10 sm:pt-10"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          {/* Dark overlay so text stays readable on top of the photo */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-indigo-950/70" />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* ----- Left: Text content ----- */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                <FiClock className="h-3 w-3" />
                Seasonal Event · Verified Merchants
              </span>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Mega Autumn Tech &amp; Lifestyle Super Sale
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Direct-from-maker innovations and premium fashion drops.
                Explore certified stores, multi-item unified shipping, and up
                to 60% instant savings today.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-500">
                  Explore Flash Deals
                  <FiArrowRight className="h-4 w-4" />
                </button>

                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  <FiGrid className="h-4 w-4" />
                  Browse Certified Stores
                </button>
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-lg font-extrabold text-white">
                      {stat.value}
                    </p>
                    <p className="text-[11px] leading-4 text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ----- Right: Product Card ----- */}
            <div>
              <div className="rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-amber-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                    Featured Curation
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                    Dropping Now
                  </span>
                </div>

                <div className="mt-3 flex gap-3">
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-slate-100" />

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-indigo-600">
                      TechZone Official
                    </p>
                    <p className="truncate text-sm font-bold text-slate-900">
                      AeroSound Quantum Pro ANC
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-base font-extrabold text-indigo-700">
                        $189.00
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        $329.00
                      </span>
                      <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-600">
                        -43%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                    <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    4.8{" "}
                    <span className="font-normal text-slate-400">
                      (2,340 orders)
                    </span>
                  </span>

                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <FiTruck className="h-3.5 w-3.5" />
                    Express Free Delivery
                  </span>
                </div>
              </div>

              {/* Two small feature boxes */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                  <FiShield className="h-4 w-4 text-white" />
                  <p className="mt-2 text-xs font-bold text-white">
                    Buyer Protection
                  </p>
                  <p className="mt-0.5 text-[10px] leading-4 text-slate-300">
                    Full refund guarantee on all multi-merchant orders.
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                  <FiPackage className="h-4 w-4 text-white" />
                  <p className="mt-2 text-xs font-bold text-white">
                    Consolidated Box
                  </p>
                  <p className="mt-0.5 text-[10px] leading-4 text-slate-300">
                    Merge pieces from separate stores into a single shipment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom white category bar (overlaps hero) ===== */}
        <div className="relative z-10 -mt-8 mx-3 rounded-2xl bg-white p-5 shadow-lg sm:mx-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Market Hubs
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  cat.active
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.icon}
                {cat.name}
                {cat.badge && (
                  <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <a
            href="#"
            className="mt-3 inline-block text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View Directory →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;