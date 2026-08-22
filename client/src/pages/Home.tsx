/**
 * اتجاه التصميم: مسار النكهة الحي — تجربة عربية غامرة؛ عبوات ماس تتخذ دور البطولة في منصة ثلاثية الأبعاد متحركة.
 * السؤال الحاكم: هل يعزز هذا الاختيار حضور ماس الواثق والمنعش؟
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ChevronDown, Menu, MoveLeft, Sparkles, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { DistributorMap } from "@/components/DistributorMap";

type Flavor = {
  index: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  note: string;
  accent: string;
  glow: string;
  source: "عبوة معزولة" | "مكتبة ماس" | "تصميم علبة";
  shape?: "tub" | "box";
};

const flavors: Flavor[] = [
  { index: "01", name: "ليمون ونعناع", subtitle: "Green Lemon Mint", description: "انتعاش الليمون الأخضر مع النعناع في تركيبة واضحة وحيوية.", image: "/manus-storage/mas-lemon-mint-isolated-clean_2effaf59.png", note: "انتعاش أخضر · حضور واضح", accent: "#b8e840", glow: "rgba(184,232,64,.44)", source: "عبوة معزولة" },
  { index: "02", name: "لاڤ", subtitle: "Love Molasses", description: "نكهة بطابع مختلف، مصممة لتبقى في الذاكرة من أول جلسة.", image: "/manus-storage/mas-love-isolated-clean_b0feab2b.png", note: "طابع مختلف · أثر طويل", accent: "#cf5368", glow: "rgba(207,83,104,.38)", source: "عبوة معزولة" },
  { index: "03", name: "رمان", subtitle: "Pomegranate Molasses", description: "طبقات رمان غنية في تجربة فاكهية متوازنة وحاضرة.", image: "/manus-storage/mas-pomegranate-isolated-clean_56d86549.png", note: "عمق فاكهي · توازن", accent: "#b62035", glow: "rgba(182,32,53,.40)", source: "عبوة معزولة" },
  { index: "04", name: "هافانا", subtitle: "Havana Molasses", description: "نكهة بهوية دافئة مستوحاة من تفاصيل هافانا وحضورها الكلاسيكي.", image: "/manus-storage/mas-havana-isolated-clean_bf77702a.png", note: "هوية دافئة · مزاج مختلف", accent: "#d89145", glow: "rgba(216,145,69,.38)", source: "عبوة معزولة" },
  { index: "05", name: "إنجليزي", subtitle: "English Molasses", description: "طابع متزن وواضح ضمن عبوة ماس ذات البصمة البصرية المميزة.", image: "/manus-storage/mas-english-isolated-clean_894f1b06.png", note: "طابع متزن · ثابت", accent: "#246bb2", glow: "rgba(36,107,178,.36)", source: "عبوة معزولة" },
  { index: "06", name: "ليدي كيلر", subtitle: "Lady Killer Molasses", description: "تكوين جريء بصرياً، يوسّع عالم ماس بنكهات لها شخصية مستقلة.", image: "/manus-storage/mas-lady-killer-isolated-clean_94e41dbc.png", note: "شخصية جريئة · حضور", accent: "#426ee7", glow: "rgba(66,110,231,.35)", source: "عبوة معزولة" },
  { index: "07", name: "حليب", subtitle: "Milk", description: "علبة ضمن تشكيلة ماس، بهوية بصرية مستقلة وحضور هادئ.", image: "/manus-storage/milk_573a1393.webp", note: "إصدار علبة · ماس", accent: "#77bdd5", glow: "rgba(119,189,213,.38)", source: "تصميم علبة", shape: "box" },
  { index: "08", name: "حلبي", subtitle: "Halabi", description: "تصميم علبة من تشكيلة ماس، مع معالجة ثلاثية الأبعاد داخل الموقع.", image: "/manus-storage/halabi_9b5701b5.webp", note: "إصدار علبة · ماس", accent: "#bc7650", glow: "rgba(188,118,80,.35)", source: "تصميم علبة", shape: "box" },
  { index: "09", name: "ليالي اسطنبول", subtitle: "Istanbul Nights", description: "تصميم علبة من تشكيلة ماس، مع حضور بصري مستوحى من اسم الإصدار.", image: "/manus-storage/istanbul-nights_1515e6ed.webp", note: "إصدار علبة · ماس", accent: "#5a64ad", glow: "rgba(90,100,173,.36)", source: "تصميم علبة", shape: "box" },
  { index: "10", name: "كراميل", subtitle: "Caramel", description: "علبة ماس بتصميم مستقل، معروضة كمنتج ثلاثي الأبعاد داخل المكتبة.", image: "/manus-storage/caramel_4bde02da.webp", note: "إصدار علبة · ماس", accent: "#bd8145", glow: "rgba(189,129,69,.36)", source: "تصميم علبة", shape: "box" },
  { index: "11", name: "ليالي باكو", subtitle: "Baku Nights", description: "إصدار بصري جديد ضمن مكتبة علب ماس التفاعلية.", image: "/manus-storage/baku-nights_4f4ce2bc.webp", note: "إصدار علبة · ماس", accent: "#cb5872", glow: "rgba(203,88,114,.35)", source: "تصميم علبة", shape: "box" },
  { index: "12", name: "بسكت", subtitle: "Biscuit", description: "علبة ماس بتصميم معتمد، محوّلة إلى عنصر تفاعلي ثلاثي الأبعاد.", image: "/manus-storage/biscuit_006442b5.webp", note: "إصدار علبة · ماس", accent: "#d3a94e", glow: "rgba(211,169,78,.37)", source: "تصميم علبة", shape: "box" },
  { index: "13", name: "تفاحتين", subtitle: "Two Apples", description: "علبة تفاحتين ضمن تشكيلة ماس، الآن في مكتبة المنتجات التفاعلية.", image: "/manus-storage/two-apples_a6fceef7.webp", note: "إصدار علبة · ماس", accent: "#d56a52", glow: "rgba(213,106,82,.35)", source: "تصميم علبة", shape: "box" },
  { index: "14", name: "إنكليزي بلس", subtitle: "English Plus", description: "تصميم علبة إنكليزي بلس ضمن عالم ماس، بنموذج ثلاثي الأبعاد.", image: "/manus-storage/english-plus_5bd159b3.webp", note: "إصدار علبة · ماس", accent: "#1f477f", glow: "rgba(31,71,127,.37)", source: "تصميم علبة", shape: "box" },
  { index: "15", name: "ثلاث تفاحات", subtitle: "Three Apples", description: "علبة ثلاث تفاحات مضافة إلى مكتبة ماس بنفس نظام العرض الموحد.", image: "/manus-storage/three-apples_1b7213b9.webp", note: "إصدار علبة · ماس", accent: "#a8393e", glow: "rgba(168,57,62,.37)", source: "تصميم علبة", shape: "box" },
  { index: "16", name: "علك قرفة", subtitle: "Cinnamon Gum", description: "إصدار علبة من ماس ضمن واجهة المنتجات التفاعلية.", image: "/manus-storage/cinnamon-gum_c0c01e5a.webp", note: "إصدار علبة · ماس", accent: "#a44736", glow: "rgba(164,71,54,.36)", source: "تصميم علبة", shape: "box" },
  { index: "17", name: "كيك", subtitle: "Cake", description: "علبة كيك من ماس، تُعرض بإحساس منتج مادي ثلاثي الأبعاد.", image: "/manus-storage/cake_0c7d6274.webp", note: "إصدار علبة · ماس", accent: "#d17b5c", glow: "rgba(209,123,92,.35)", source: "تصميم علبة", shape: "box" },
  { index: "18", name: "نعناع", subtitle: "Mint", description: "علبة نعناع مضافة إلى مكتبة ماس في تجربة عرض موحدة.", image: "/manus-storage/mint_40aa7aa0.webp", note: "إصدار علبة · ماس", accent: "#49a582", glow: "rgba(73,165,130,.36)", source: "تصميم علبة", shape: "box" },
];

const assetNames: Record<string, string> = {
  "mas-lemon-mint-isolated-clean_2effaf59.png": "mas-lemon-mint-isolated-clean.png",
  "mas-love-isolated-clean_b0feab2b.png": "mas-love-isolated-clean.png",
  "mas-pomegranate-isolated-clean_56d86549.png": "mas-pomegranate-isolated-clean.png",
  "mas-havana-isolated-clean_bf77702a.png": "mas-havana-isolated-clean.png",
  "mas-english-isolated-clean_894f1b06.png": "mas-english-isolated-clean.png",
  "mas-lady-killer-isolated-clean_94e41dbc.png": "mas-lady-killer-isolated-clean.png",
  "milk_573a1393.webp": "milk.webp", "halabi_9b5701b5.webp": "halabi.webp", "istanbul-nights_1515e6ed.webp": "istanbul-nights.webp", "caramel_4bde02da.webp": "caramel.webp", "baku-nights_4f4ce2bc.webp": "baku-nights.webp", "biscuit_006442b5.webp": "biscuit.webp", "two-apples_a6fceef7.webp": "two-apples.webp", "english-plus_5bd159b3.webp": "english-plus.webp", "three-apples_1b7213b9.webp": "three-apples.webp", "cinnamon-gum_c0c01e5a.webp": "cinnamon-gum.webp", "cake_0c7d6274.webp": "cake.webp", "mint_40aa7aa0.webp": "mint.webp",
};

function assetPath(path: string) {
  const original = path.split("/").pop() || path;
  return `${import.meta.env.BASE_URL}assets/${assetNames[original] || original}`;
}

const campaignItems = [
  ["إدارة المعارض", "تنظيم الحضور وإعداد تقارير موجزة تقيس أثر كل معرض."],
  ["شراكات مؤثرة", "التنسيق مع وجوه مناسبة للحملة وإرسال عينات إلى جمهور له صلة بالمنتج."],
  ["حضور رياضي", "دعم برامج رياضية مختارة لتوسيع حضور ماس في لحظات المتابعة."],
  ["امتداد ميداني", "تنسيق واجهات المحال والتسويق الميداني والاستهداف الإعلامي للمحافظات."],
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProductPack({ flavor, className = "" }: { flavor: Flavor; className?: string }) {
  if (flavor.shape !== "box") return <img className={className} src={assetPath(flavor.image)} alt={`معسل ماس ${flavor.name}`} />;
  return <div className={`mas-box ${className}`} style={{ "--box-accent": flavor.accent } as CSSProperties} aria-label={`علبة ماس ${flavor.name}`}>
    <span className="box-lid" /><span className="box-side" /><span className="box-bottom" />
    <span className="box-front"><img src={assetPath(flavor.image)} alt={`علبة ماس ${flavor.name}`} /></span>
  </div>;
}

export default function Home() {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [introIndex, setIntroIndex] = useState(0);
  const flavor = flavors[activeFlavor];
  const introFlavors = flavors.slice(0, 6);
  const introFlavor = introFlavors[introIndex];
  const introPrevious = introFlavors[(introIndex + introFlavors.length - 1) % introFlavors.length];
  const introNext = introFlavors[(introIndex + 1) % introFlavors.length];
  const flavorVars = { "--flavor-accent": flavor.accent, "--flavor-glow": flavor.glow } as CSSProperties;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cycle = window.setInterval(() => setIntroIndex((current) => (current + 1) % introFlavors.length), 4200);
    return () => window.clearInterval(cycle);
  }, [introFlavors.length]);

  const navigate = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToSection(id), 0);
  };

  const chooseFlavor = (index: number) => {
    setActiveFlavor(index);
  };

  return (
    <div className="site-shell">
      <div className="top-progress" style={{ transform: `scaleX(${progress})` }} />
      <header className={`site-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "mobile-open" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); navigate("top"); }}>
            <img src={assetPath("mas-logo.png")} alt="شعار ماس" />
            <span className="brand-copy"><b>مــاس</b><span>نكهات لها حضور</span></span>
          </a>
          <nav className="main-nav" aria-label="التنقل الرئيسي">
            <a href="#flavors" onClick={(event) => { event.preventDefault(); navigate("flavors"); }}>النكهات</a>
            <a href="#story" onClick={(event) => { event.preventDefault(); navigate("story"); }}>قصة ماس</a>
            <a href="#range" onClick={(event) => { event.preventDefault(); navigate("range"); }}>المكتبة</a>
            <a href="#distributors" onClick={(event) => { event.preventDefault(); navigate("distributors"); }}>الموزعون</a>
            <a href="#campaign" onClick={(event) => { event.preventDefault(); navigate("campaign"); }}>الحضور</a>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}>
            {menuOpen ? <X size={19} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-content">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.23, 1, 0.32, 1] }}>
              <div className="hero-kicker">تجربة المعسّل كما يجب أن تكون</div>
              <h1 className="hero-title">نكهة <em>تعيش</em><br />معك.</h1>
              <p className="hero-text">ماس تجمع نقاء الطعم، ثبات الأداء، وتفاصيل نكهات تُحس قبل أن تُوصف.</p>
              <div className="hero-actions">
                <button className="button-primary" onClick={() => scrollToSection("flavors")}>اكتشف النكهات <ArrowLeft size={16} /></button>
                <button className="button-ghost" onClick={() => scrollToSection("story")}>قصة العلامة <ChevronDown size={16} /></button>
              </div>
            </motion.div>
            <motion.div className="hero-aside" initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .82, delay: .15, ease: [0.23, 1, 0.32, 1] }}>
              <div className="opening-loop intro-cinematic" style={{ "--intro-accent": introFlavor.accent, "--intro-glow": introFlavor.glow } as CSSProperties} aria-label="افتتاحية حركة لعرض نكهات ماس">
                <div className="intro-topline"><span>MAS / FLAVOR MOTION</span><b>{String(introIndex + 1).padStart(2, "0")} / 06</b></div>
                <span className="opening-halo halo-one" /><span className="opening-halo halo-two" />
                <span className="intro-scan intro-scan-one" /><span className="intro-scan intro-scan-two" />
                <div className="opening-stage"><span /><span /><span /></div>
                <motion.div className="intro-ghost intro-ghost-back" key={`back-${introPrevious.index}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: .32, x: 0 }} transition={{ duration: .55 }}><ProductPack flavor={introPrevious} className={introPrevious.shape === "box" ? "mas-box-intro-ghost" : "intro-ghost-pack"} /></motion.div>
                <AnimatePresence mode="wait">
                  <motion.div key={introFlavor.index} className="intro-feature-pack" initial={{ opacity: 0, y: 36, rotateY: -35, scale: .88 }} animate={{ opacity: 1, y: 0, rotateY: -15, scale: 1 }} exit={{ opacity: 0, y: -22, rotateY: 28, scale: .91 }} transition={{ duration: .72, ease: [0.23, 1, 0.32, 1] }}>
                    <ProductPack flavor={introFlavor} className={introFlavor.shape === "box" ? "mas-box-intro" : "intro-feature-asset"} />
                  </motion.div>
                </AnimatePresence>
                <motion.div className="intro-ghost intro-ghost-front" key={`front-${introNext.index}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: .34, x: 0 }} transition={{ duration: .55 }}><ProductPack flavor={introNext} className={introNext.shape === "box" ? "mas-box-intro-ghost" : "intro-ghost-pack"} /></motion.div>
                <div className="intro-flavor-title"><span>النكهة الآن</span><strong>{introFlavor.name}</strong><em>{introFlavor.subtitle}</em></div>
                <div className="intro-dots" role="tablist" aria-label="التحكم بافتتاحية النكهات">{introFlavors.map((item, index) => <button key={item.name} onClick={() => setIntroIndex(index)} className={index === introIndex ? "active" : ""} style={index === introIndex ? { backgroundColor: item.accent } : undefined} aria-label={`عرض نكهة ${item.name}`} />)}</div>
                <div className="opening-light" />
              </div>
            </motion.div>
          </div>
          <button className="hero-scroll" onClick={() => scrollToSection("flavors")}>اسحب للتجربة <span className="scroll-line" /><ArrowDown size={14} /></button>
        </section>

        <section className="section flavor-stage" id="flavors">
          <div className="section-inner flavor-layout">
            <div>
              <div className="section-label">مكتبة النكهات</div>
              <h2 className="section-heading">كل نكهة<br /><span>لها مشهدها.</span></h2>
              <p className="section-intro">تم توحيد عرض المنتجات في منصة واحدة: اختر نكهة، ودع العبوة تتقدم إلى مقدمة المشهد بتفاصيلها ولونها الخاص.</p>
              <div className="flavor-numbers" role="tablist" aria-label="اختيار النكهة">
                {flavors.map((item, index) => <button key={item.name} className={`flavor-trigger ${activeFlavor === index ? "active" : ""}`} style={activeFlavor === index ? { backgroundColor: item.accent, borderColor: item.accent } : undefined} onClick={() => chooseFlavor(index)} aria-selected={activeFlavor === index} role="tab">{item.index}</button>)}
              </div>
              <div className="flavor-copy">
                <AnimatePresence mode="wait">
                  <motion.div key={flavor.index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -9 }} transition={{ duration: .25 }}>
                    <div className="flavor-meta"><span>{flavor.source}</span><i />{flavor.subtitle}</div>
                    <h3 className="flavor-name">{flavor.name}</h3>
                    <p className="flavor-description">{flavor.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flavor-visual" style={flavorVars}>
              <AnimatePresence mode="wait">
                <motion.div key={flavor.image} className="flavor-image-card flavor-3d" initial={{ opacity: 0, rotateY: -17, rotateZ: -6, y: 25 }} animate={{ opacity: 1, rotateY: -7, rotateZ: 3, y: 0 }} exit={{ opacity: 0, rotateY: 18, rotateZ: 8, y: -12 }} transition={{ duration: .48, ease: [0.23, 1, 0.32, 1] }}>
                  <ProductPack flavor={flavor} className={flavor.shape === "box" ? "mas-box-stage" : ""} />
                  <span className="card-shine" />
                </motion.div>
              </AnimatePresence>
              <div className="flavor-orbit"><div><b>{flavor.index}</b>{flavor.note}</div></div>
              <div className="product-plinth"><span /><span /><span /></div>
            </div>
          </div>
        </section>

        <section className="section manifesto" id="story">
          <div className="section-inner">
            <div>
              <div className="section-label">معيار ماس</div>
              <h2 className="section-heading">التجربة لا تبدأ من الاسم.<br /><span>تبدأ من أول نفس.</span></h2>
              <p className="section-intro">نحن نؤمن أن المعسّل ليس مجرد نكهة؛ إنه توازن مدروس بين الطعم، الدخان، والإحساس الذي يبقى.</p>
            </div>
            <div className="principles">
              <div className="principle"><span className="principle-num">01</span><div><h3>نقاء الطعم</h3><p>نكهات واضحة من أول جلسة إلى آخرها.</p></div></div>
              <div className="principle"><span className="principle-num">02</span><div><h3>ثبات الأداء</h3><p>تجربة متوازنة تمنحك حضوراً ثابتاً.</p></div></div>
              <div className="principle"><span className="principle-num">03</span><div><h3>تنوع محسوب</h3><p>مكتبة نكهات تتسع للمزاج، وتبقى فيها بصمة ماس ثابتة.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section range" id="range">
          <div className="section-inner">
            <div className="range-top">
              <div><div className="section-label">عالم ماس</div><h2 className="section-heading">مكتبة واحدة.<br /><span>وجوه متعددة.</span></h2></div>
              <p className="range-note">لم نستخدم تصاميم المنشورات داخل الموقع. كل بطاقة تعرض عبوة مستقلة فقط، ضمن نظام موحد قابل للتصفح.</p>
            </div>
            <div className="product-rail product-deck">
              {flavors.map((item, index) => <button key={item.name} className={`product-card ${index === 0 ? "feature" : ""} ${item.shape === "box" ? "box-card" : ""}`} style={{ "--item-accent": item.accent } as CSSProperties} onClick={() => { chooseFlavor(index); scrollToSection("flavors"); }}>
                <span className="tag">{item.subtitle}</span><ProductPack flavor={item} className={item.shape === "box" ? "mas-box-card" : "product-card-pack"} /><h3>{item.name}</h3><p>{item.note}</p><span className="product-arrow">عرض ثلاثي الأبعاد <MoveLeft size={15} /></span>
              </button>)}
            </div>
          </div>
        </section>

        <section className="section campaign" id="campaign">
          <div className="section-inner">
            <div className="section-label">حضور العلامة</div>
            <h2 className="section-heading">ماس أقرب من<br /><span>مجرد منتج.</span></h2>
            <div className="campaign-grid">
              <div className="campaign-visual"><img src={assetPath("mas-lemon-mint-isolated-clean.png")} alt="عبوة معسل ماس ليمون ونعناع" /><div className="big-type">مــاس</div></div>
              <div className="campaign-list">{campaignItems.map(([title, text], index) => <article className="campaign-item" key={title}><span className="item-number">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><Sparkles size={16} /></article>)}</div>
            </div>
          </div>
        </section>

        <section className="section distributors" id="distributors">
          <div className="section-inner">
            <div className="distributors-heading"><div><div className="section-label">أين تجد ماس</div><h2 className="section-heading">النكهة الأقرب.<br /><span>على الخريطة.</span></h2></div><p className="range-note">ابحث باسم مدينتك لعرض نقاط البيع المنشورة في خرائط Google، ثم افتح المسار للوصول إليها مباشرة.</p></div>
            <DistributorMap />
          </div>
        </section>

        <section className="endcap">
          <div className="endcap-content">
            <img className="end-symbol" src={assetPath("mas-symbol.png")} alt="رمز ماس" />
            <h2>اختَر لحظتك.<br />اختَر ماس.</h2>
            <p>نكهات حاضرة، تجربة متوازنة، وهوية تترك أثراً في كل مكان تصل إليه.</p>
            <button className="button-primary" onClick={() => scrollToSection("top")}>العودة إلى البداية <ArrowLeft size={16} /></button>
          </div>
        </section>
      </main>

      <footer className="footer"><span><strong>ماس</strong> — نكهات لها حضور</span><span>© 2026 · جميع الحقوق محفوظة</span></footer>
    </div>
  );
}
