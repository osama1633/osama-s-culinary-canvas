import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUp, ChefHat, Clock, Flame, Instagram, Leaf, Mail, MapPin,
  Menu as MenuIcon, MessageCircle, Phone, Plus, Send, Sparkles, Star, Truck,
  Twitter, Utensils, X, Quote, Award,
} from "lucide-react";
import heroBurger from "@/assets/hero-burger.jpg";
import dishPizza from "@/assets/dish-pizza.jpg";
import dishChicken from "@/assets/dish-chicken.jpg";
import dishSandwich from "@/assets/dish-sandwich.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import dishDrink from "@/assets/dish-drink.jpg";
import dishBurger2 from "@/assets/dish-burger2.jpg";
import chefImg from "@/assets/chef.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Osama's Kitchen — Where Every Bite Tells A Story" },
      { name: "description", content: "Luxury burgers, wood-fired pizza, fried chicken, sandwiches & desserts — handcrafted by Osama's Kitchen and delivered fresh." },
      { property: "og:title", content: "Osama's Kitchen — Where Every Bite Tells A Story" },
      { property: "og:description", content: "Luxury burgers, wood-fired pizza, fried chicken, sandwiches & desserts — handcrafted and delivered fresh." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Osama's Kitchen",
          servesCuisine: ["Burgers", "Pizza", "Fried Chicken", "Sandwiches", "Desserts"],
          priceRange: "$$",
          telephone: "+201221996350",
          email: "osamafares8070@gmail.com",
          url: "/",
        }),
      },
    ],
  }),
  component: Home,
});

const WA = "201221996350";
const waLink = (meal: string, price: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    `Hello Osama,\nI would like to order:\n\nMeal: ${meal}\nPrice: ${price}\n\nPlease confirm my order.`,
  )}`;

type Dish = {
  name: string;
  desc: string;
  price: string;
  rating: number;
  img: string;
  category: "Burgers" | "Pizza" | "Fried Chicken" | "Sandwiches" | "Desserts" | "Drinks";
  featured?: boolean;
};

const DISHES: Dish[] = [
  { name: "The Osama Signature", desc: "Double wagyu patty, aged cheddar, smoked aioli, brioche.", price: "$18", rating: 5.0, img: heroBurger, category: "Burgers", featured: true },
  { name: "Truffle Stack", desc: "Black truffle butter, gruyère, caramelized shallots.", price: "$22", rating: 4.9, img: dishBurger2, category: "Burgers", featured: true },
  { name: "Napoli D.O.P.", desc: "San Marzano, fior di latte, wood-fired 90 seconds.", price: "$16", rating: 4.9, img: dishPizza, category: "Pizza", featured: true },
  { name: "Crispy Gold Tenders", desc: "Buttermilk-brined, double-dredged, honey gold drizzle.", price: "$14", rating: 4.8, img: dishChicken, category: "Fried Chicken" },
  { name: "Smoked Club Tower", desc: "Bacon, heirloom tomato, aged cheddar, garlic aioli.", price: "$13", rating: 4.7, img: dishSandwich, category: "Sandwiches" },
  { name: "Molten Gold Cake", desc: "Dark chocolate lava, vanilla bean, 24k gold leaf.", price: "$11", rating: 5.0, img: dishDessert, category: "Desserts", featured: true },
  { name: "Velvet Cold Brew", desc: "48-hour cold extraction with vanilla cream swirl.", price: "$7", rating: 4.8, img: dishDrink, category: "Drinks" },
  { name: "Bourbon BBQ Burger", desc: "Bourbon glaze, crispy onions, smoked bacon.", price: "$17", rating: 4.8, img: heroBurger, category: "Burgers" },
  { name: "Quattro Formaggi", desc: "Four artisan cheeses, hot honey, fresh thyme.", price: "$18", rating: 4.8, img: dishPizza, category: "Pizza" },
  { name: "Nashville Hot", desc: "Cayenne-glazed, pickled cucumber, soft milk bun.", price: "$15", rating: 4.9, img: dishChicken, category: "Fried Chicken" },
  { name: "Steak & Onion Melt", desc: "Slow-braised short rib, provolone, jus dip.", price: "$16", rating: 4.7, img: dishSandwich, category: "Sandwiches" },
  { name: "Saffron Iced Latte", desc: "Persian saffron syrup, milk foam art.", price: "$8", rating: 4.7, img: dishDrink, category: "Drinks" },
];

const CATEGORIES = ["All", "Burgers", "Pizza", "Fried Chicken", "Sandwiches", "Desserts", "Drinks"] as const;

function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 900); return () => clearTimeout(t); }, []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatePresence>{!loaded && <LoadingScreen key="loader" />}</AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-gold"
      />

      <Nav />
      <main>
        <Hero />
        <Stats />
        <Featured />
        <MenuSection />
        <WhyUs />
        <ChefSpotlight />
        <Reviews />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}

/* ===================== LOADER ===================== */
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Logo size="lg" />
          <motion.div
            className="absolute -inset-6 rounded-full border border-gold/30"
            animate={{ rotate: 360 }} transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
        </motion.div>
        <div className="h-px w-40 overflow-hidden bg-border">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }}
            transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
            className="h-full w-full bg-gradient-gold" />
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Plating your experience</p>
      </div>
    </motion.div>
  );
}

/* ===================== LOGO ===================== */
function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";
  return (
    <div className="flex items-center gap-2.5 select-none">
      <motion.div
        whileHover={{ rotate: 12 }} transition={{ type: "spring", stiffness: 300 }}
        className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-gold shadow-gold"
      >
        <Flame className="h-5 w-5 text-ink" strokeWidth={2.4} />
        <span className="absolute inset-0 rounded-full ring-1 ring-gold/40" />
      </motion.div>
      <div className={`font-display ${s} leading-none`}>
        <span className="block tracking-wider">OSAMA<span className="text-gradient-gold">'S</span></span>
        <span className="block text-[0.55em] tracking-[0.45em] text-muted-foreground mt-1">KITCHEN</span>
      </div>
    </div>
  );
}

/* ===================== NAV ===================== */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong border-b border-border/60 py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#home"><Logo /></a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="relative px-4 py-2 text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors group">
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={waLink("General Order", "—")} target="_blank" rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-medium text-ink shadow-gold transition-transform hover:scale-[1.03]">
              Order Now <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={() => setOpen(true)} className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass" aria-label="Open menu">
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm glass-strong border-l border-border p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="group flex items-center justify-between border-b border-border/60 py-4 font-display text-2xl">
                    {l.label}
                    <ArrowRight className="h-5 w-5 text-gold opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </motion.a>
                ))}
              </nav>
              <a href={waLink("General Order", "—")} target="_blank" rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold py-4 font-medium text-ink shadow-gold">
                Order via WhatsApp <MessageCircle className="h-5 w-5" />
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={heroBurger} alt="" width={1920} height={1280}
          className="h-full w-full object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-glow)" }} />
      </motion.div>

      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-[8%] h-24 w-24 rounded-full border border-gold/20 animate-float" />
        <div className="absolute bottom-1/3 right-[10%] h-16 w-16 rounded-full bg-ember/10 blur-xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[20%] right-[15%] h-2 w-2 rounded-full bg-gold animate-pulse-glow" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold">
          <Sparkles className="h-3.5 w-3.5" /> Est. 2014 · Crafted with passion
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-5xl font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-medium">
          Where Every Bite <br />
          <span className="italic font-normal text-gradient-gold">Tells A Story</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.8 }}
          className="mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Experience unforgettable flavors crafted with passion and delivered fresh to your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={waLink("General Order", "—")} target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 font-medium text-ink shadow-gold transition-all hover:scale-[1.04]">
            Order Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#menu"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-secondary">
            Explore Menu <Utensils className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
          <div className="relative h-10 w-5 rounded-full border border-border">
            <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-1 rounded-full bg-gold" style={{ animation: "scroll-hint 1.8s ease-in-out infinite" }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===================== STATS ===================== */
function useCounter(target: number, inView: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return val;
}
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const v = useCounter(value, inView);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay }}
      className="relative rounded-2xl glass p-8 text-center">
      <div className="font-display text-5xl md:text-6xl font-medium text-gradient-gold">
        {v.toLocaleString()}{suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </motion.div>
  );
}
function Stats() {
  const items = [
    { value: 25000, suffix: "+", label: "Happy Customers" },
    { value: 80000, suffix: "+", label: "Orders Delivered" },
    { value: 12, suffix: "", label: "Years Of Experience" },
    { value: 60, suffix: "+", label: "Menu Items" },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.1} />)}
      </div>
    </section>
  );
}

/* ===================== SECTION HEADING ===================== */
function SectionHead({ kicker, title, accent, sub }: { kicker: string; title: string; accent?: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-gold">
        <span className="h-1 w-1 rounded-full bg-gold" /> {kicker}
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05]">
        {title} {accent && <span className="italic text-gradient-gold">{accent}</span>}
      </motion.h2>
      {sub && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-5 text-muted-foreground leading-relaxed">{sub}</motion.p>
      )}
    </div>
  );
}

/* ===================== DISH CARD ===================== */
function DishCard({ d, idx }: { d: Dish; idx: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.5, delay: (idx % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl glass shadow-deep"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={d.img} alt={d.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full glass-strong px-3 py-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {d.rating.toFixed(1)}
        </div>
        <div className="absolute top-4 right-4 rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-ink shadow-gold">
          {d.price}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{d.desc}</p>
        <div className="mt-5 flex items-center gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-secondary/60 px-4 py-2.5 text-sm transition-colors hover:bg-secondary">
            <Plus className="h-4 w-4" /> Add to Cart
          </button>
          <a href={waLink(d.name, d.price)} target="_blank" rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-medium text-ink shadow-gold transition-transform hover:scale-[1.03]">
            Order Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition group-hover:ring-gold/30" />
    </motion.article>
  );
}

/* ===================== FEATURED ===================== */
function Featured() {
  const featured = DISHES.filter(d => d.featured);
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="Signature Plates" title="Featured" accent="Dishes"
          sub="Three plates that defined a decade — picked by Osama himself." />
        <div className="mt-16 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => <DishCard key={d.name} d={d} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ===================== MENU SECTION ===================== */
function MenuSection() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = useMemo(() => cat === "All" ? DISHES : DISHES.filter(d => d.category === cat), [cat]);
  return (
    <section id="menu" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="The Menu" title="A Taste Of" accent="Everything"
          sub="From wood-fired pizza to molten desserts — every plate is handcrafted in-house." />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm transition-colors ${
                cat === c ? "text-ink" : "text-foreground/80 hover:text-foreground"
              }`}>
              {cat === c && (
                <motion.span layoutId="menu-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-gold shadow-gold"
                  transition={{ type: "spring", damping: 26, stiffness: 280 }} />
              )}
              {c}
            </button>
          ))}
        </div>
        <motion.div layout className="mt-12 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => <DishCard key={d.name + cat} d={d} idx={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== WHY US ===================== */
function WhyUs() {
  const items = [
    { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced daily from local farms and trusted producers." },
    { icon: Truck, title: "Fast Delivery", desc: "Hot and pristine at your door in under 30 minutes." },
    { icon: ChefHat, title: "Expert Chefs", desc: "Trained in Michelin-star kitchens across three continents." },
    { icon: Award, title: "Best Quality", desc: "Every plate inspected — nothing leaves unless it's perfect." },
    { icon: Sparkles, title: "Affordable Luxury", desc: "Fine-dining craft without the white-tablecloth price tag." },
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="Why Us" title="Crafted With" accent="Obsession" />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl glass p-8 ${i === 0 ? "lg:row-span-2 lg:col-span-1" : ""}`}>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold shadow-gold">
                <f.icon className="h-6 w-6 text-ink" />
              </div>
              <h3 className="mt-6 font-display text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:bg-gold/15" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CHEF SPOTLIGHT ===================== */
function ChefSpotlight() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/5] lg:aspect-auto">
              <img src={chefImg} alt="Chef Osama plating in the kitchen" loading="lazy"
                className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink via-transparent to-transparent" />
              <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-transparent lg:to-card" />
            </div>
            <div className="relative p-8 md:p-14 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Chef's Recommendation</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                A signature only Osama <span className="italic text-gradient-gold">can plate.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">
                Twelve years of fire, smoke and obsession reduced into a single plate. Tonight's spotlight: the Truffle Stack — aged gruyère, black truffle butter, brioche kissed by the flat-top.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <a href={waLink("Truffle Stack", "$22")} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-medium text-ink shadow-gold transition-transform hover:scale-[1.03]">
                  Order Tonight <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-gold text-gold" /> 4.9 · 2,400+ orders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== REVIEWS ===================== */
const REVIEWS = [
  { name: "Layla Ahmed", role: "Verified Customer", text: "Truly the best burger in the city. The Truffle Stack ruined every other burger for me — I mean that as a compliment.", rating: 5 },
  { name: "Marcus Reyes", role: "Verified Customer", text: "Delivery was 22 minutes and the pizza was still crackling. Whatever Osama is doing, he should never stop.", rating: 5 },
  { name: "Sara Mansour", role: "Verified Customer", text: "The molten gold cake is the most photographed dessert on my Instagram. Worth every bite, every dollar.", rating: 5 },
  { name: "Omar Khalil", role: "Verified Customer", text: "Five years of ordering from Osama's. Quality has never dipped once. That is rare and it should be celebrated.", rating: 5 },
];
function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % REVIEWS.length), 5500);
    return () => clearInterval(t);
  }, []);
  const r = REVIEWS[i];
  return (
    <section id="reviews" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="Reviews" title="Loved By" accent="Thousands" />
        <div className="mt-16 mx-auto max-w-3xl">
          <div className="relative rounded-3xl glass p-8 md:p-14 text-center min-h-[320px]">
            <Quote className="absolute top-6 left-6 h-10 w-10 text-gold/30" />
            <AnimatePresence mode="wait">
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-5 w-5 fill-gold text-gold" />)}
                </div>
                <p className="mt-6 font-display text-2xl md:text-3xl leading-snug">"{r.text}"</p>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-gold font-display text-ink">{r.name[0]}</div>
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-1.5">
                      {r.name}
                      <span className="inline-grid h-4 w-4 place-items-center rounded-full bg-gold/20" title="Verified">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === k ? "w-8 bg-gradient-gold" : "w-2 bg-border"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== GALLERY ===================== */
function Gallery() {
  const imgs = [
    { src: heroBurger, h: "row-span-2" },
    { src: dishPizza, h: "" },
    { src: dishDessert, h: "" },
    { src: dishChicken, h: "row-span-2" },
    { src: dishSandwich, h: "" },
    { src: dishBurger2, h: "" },
    { src: dishDrink, h: "" },
    { src: chefImg, h: "row-span-2" },
  ];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="Gallery" title="Plated To" accent="Perfection" />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {imgs.map((im, i) => (
            <motion.button key={i} onClick={() => setOpen(im.src)}
              initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl ${im.h}`}>
              <img src={im.src} alt="Gallery dish" loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 text-xs text-foreground/0 group-hover:text-foreground transition-colors">View</div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/90 backdrop-blur-xl p-6">
            <motion.img src={open} alt="" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-deep" />
            <button onClick={() => setOpen(null)} className="absolute top-6 right-6 grid h-12 w-12 place-items-center rounded-full glass-strong">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===================== RESERVATION ===================== */
function Reservation() {
  const [sent, setSent] = useState(false);
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-8 md:p-14">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="grid lg:grid-cols-2 gap-10 items-center relative">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Reserve a Table</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">
                Book your <span className="italic text-gradient-gold">experience.</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Private dining, anniversaries, quiet evenings — leave the details to us. We confirm every reservation within the hour.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-gold" /> Open 12:00 — 02:00, every day
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <Field label="Full Name"><input required className="field" placeholder="Your name" /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date"><input required type="date" className="field" /></Field>
                <Field label="Guests"><input required type="number" min={1} max={20} defaultValue={2} className="field" /></Field>
              </div>
              <Field label="Phone"><input required type="tel" className="field" placeholder="+20 ..." /></Field>
              <Field label="Note"><textarea rows={3} className="field resize-none" placeholder="Anything we should know?" /></Field>
              <button type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold py-3.5 font-medium text-ink shadow-gold transition-transform hover:scale-[1.02]">
                {sent ? "Request Received ✓" : <>Reserve Now <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

/* ===================== CONTACT ===================== */
function Contact() {
  const items = [
    { icon: Phone, label: "Call Us", value: "01221996350", href: "tel:01221996350" },
    { icon: MessageCircle, label: "WhatsApp", value: "01221996350", href: `https://wa.me/${WA}` },
    { icon: Mail, label: "Email", value: "osamafares8070@gmail.com", href: "mailto:osamafares8070@gmail.com" },
    { icon: MapPin, label: "Owner", value: "Osama Fares" },
  ];
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="Contact" title="Say" accent="Hello" sub="Hungry, curious, or just want to chat — we're a message away." />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Tag: any = it.href ? "a" : "div";
            return (
              <motion.div key={it.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}>
                <Tag href={it.href} target={it.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="group block rounded-3xl glass p-7 transition-transform hover:-translate-y-1">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold shadow-gold">
                    <it.icon className="h-5 w-5 text-ink" />
                  </div>
                  <div className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">{it.label}</div>
                  <div className="mt-2 font-display text-xl break-all">{it.value}</div>
                </Tag>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer className="relative pt-24 pb-10 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
              A luxury kitchen for everyday occasions. Crafted in small batches, plated with intention, delivered with care.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Twitter, MessageCircle].map((Ic, i) => (
                <a key={i} href={i === 2 ? `https://wa.me/${WA}` : "#"} target="_blank" rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full glass transition-colors hover:bg-secondary">
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Explore" links={[["Home", "#home"], ["Menu", "#menu"], ["About", "#about"], ["Gallery", "#gallery"]]} />
          <FooterCol title="Visit" links={[["Reviews", "#reviews"], ["Contact", "#contact"], ["Reserve", "#"], ["Careers", "#"]]} />
          <div>
            <h4 className="font-display text-lg">Newsletter</h4>
            <p className="mt-2 text-sm text-muted-foreground">New drops, secret menus, chef's picks — once a month.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex items-center gap-2 rounded-full glass p-1.5">
              <input type="email" placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground" />
              <button className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Osama's Kitchen. Crafted with fire & passion.</p>
          <p>Where every bite tells a story.</p>
        </div>
      </div>
      <style>{`.field{width:100%;background:oklch(0.18 0.012 60 / 60%);border:1px solid var(--border);border-radius:14px;padding:12px 16px;font-size:14px;color:var(--foreground);outline:none;transition:border-color .2s, background .2s}.field:focus{border-color:var(--gold);background:oklch(0.2 0.014 60 / 80%)}`}</style>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-lg">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([l, h]) => (
          <li key={l}><a href={h} className="text-muted-foreground transition-colors hover:text-gold">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ===================== FLOATING WHATSAPP & BACK TO TOP ===================== */
function FloatingWhatsApp() {
  return (
    <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold animate-pulse-glow">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full glass-strong hover:bg-secondary transition-colors">
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
