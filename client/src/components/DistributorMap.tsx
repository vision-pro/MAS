/** نسخة GitHub Pages: بطاقات الفروع وروابط المسارات تعمل دون أي خدمة خلفية. */
import { Building2, Clock3, ExternalLink, Filter, MapPin, Navigation, Phone, Store } from "lucide-react";
import { useMemo, useState } from "react";

type OutletType = "وكيل" | "نقطة بيع";
type Branch = { name: string; address: string; province: string; type: OutletType; phone: string; mapQuery: string };

const branches: Branch[] = [
  { name: "مركز السلامي — الفرع الأول", address: "النجف، شارع أبو صخير، قرب مجسرات ثورة العشرين", province: "النجف", type: "وكيل", phone: "07807074707", mapQuery: "شارع أبو صخير قرب مجسرات ثورة العشرين، النجف، العراق" },
  { name: "مركز السلامي — الفرع الثاني", address: "النجف، المدينة القديمة، ساحة الميدان مقابل شارع الصادق", province: "النجف", type: "وكيل", phone: "07717089673", mapQuery: "ساحة الميدان مقابل شارع الصادق، النجف، العراق" },
  { name: "مركز السلامي — الفرع الثالث", address: "الكوفة، شارع الجمهورية، مجمع الكفيل سابقاً", province: "النجف", type: "وكيل", phone: "07809490359", mapQuery: "شارع الجمهورية، مجمع الكفيل، الكوفة، العراق" },
  { name: "مركز السلامي — الفرع الرابع", address: "النجف، مكتب الرشيد، قرب تقاطع الهندية", province: "النجف", type: "وكيل", phone: "07808854063", mapQuery: "مكتب الرشيد قرب تقاطع الهندية، النجف، العراق" },
  { name: "مركز السلامي — الفرع الخامس", address: "النجف، شارع المجمعات، ثاني استدارة وبعدها مباشرة", province: "النجف", type: "وكيل", phone: "07832275385", mapQuery: "شارع المجمعات، النجف، العراق" },
  { name: "مركز السلامي — الفرع السادس", address: "النجف، شارع سلام جامعة، مجاور السلسلة الذهبية", province: "النجف", type: "وكيل", phone: "07766221620 · 07833224477", mapQuery: "شارع سلام جامعة، النجف، العراق" },
];

export function DistributorMap() {
  const [province, setProvince] = useState("كل المحافظات");
  const [type, setType] = useState<"كل الأنواع" | OutletType>("كل الأنواع");
  const filtered = useMemo(() => branches.filter((branch) => (province === "كل المحافظات" || branch.province === province) && (type === "كل الأنواع" || branch.type === type)), [province, type]);
  const openRoute = (branch: Branch) => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.mapQuery)}`, "_blank", "noopener,noreferrer");
  const openSearch = () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`مركز السلامي ${province === "كل المحافظات" ? "النجف العراق" : province}`)}`, "_blank", "noopener,noreferrer");

  return <div className="distributor-experience enhanced">
    <div className="distributor-control">
      <div className="map-panel-head"><span className="map-icon"><Store size={18} /></span><div><p>وكلاء ونقاط البيع</p><h3>مراكز السلامي</h3></div></div>
      <p className="map-panel-copy">الفروع الستة المعلنة لمركز السلامي تظهر كوكلاء ونقاط بيع لماس. اختر المحافظة أو النوع ثم افتح المسار.</p>
      <div className="distributor-filters"><label><Filter size={14} /><select value={province} onChange={(event) => setProvince(event.target.value)} aria-label="فلترة حسب المحافظة"><option>كل المحافظات</option><option>النجف</option></select></label><label><Store size={14} /><select value={type} onChange={(event) => setType(event.target.value as "كل الأنواع" | OutletType)} aria-label="فلترة حسب نوع النقطة"><option>كل الأنواع</option><option>وكيل</option><option>نقطة بيع</option></select></label></div>
      <p className="map-status">{filtered.length} فروع ظاهرة. أوقات العمل غير معلنة في المصادر العامة.</p>
      <div className="store-results cards">{filtered.map((branch) => <article className="distributor-card approved" key={branch.name}><div className="distributor-card-top"><span className="outlet-type"><Building2 size={13} />{branch.type}</span><span className="approved-mark">نقطة بيع ماس</span></div><h4>{branch.name}</h4><p className="branch-address"><MapPin size={14} />{branch.address}</p><div className="branch-details"><span><Clock3 size={13} /><b>أوقات العمل</b><em>غير معلنة.</em></span><span><Phone size={13} /><b>التواصل</b><em>{branch.phone}</em></span></div><button onClick={() => openRoute(branch)}>فتح المسار <Navigation size={14} /></button></article>)}{!filtered.length && <div className="map-empty"><MapPin size={17} /><span>لا توجد نتائج مطابقة للفلاتر الحالية.</span></div>}</div>
    </div>
    <div className="map-surface"><div className="map-fallback"><span><MapPin size={23} /></span><h4>خريطة مراكز السلامي</h4><p>نسخة GitHub Pages تعرض روابط المسارات مباشرةً، وتفتح خرائط Google عند اختيار الفرع.</p><button onClick={openSearch}>فتح مراكز السلامي في خرائط Google <ExternalLink size={14} /></button></div><div className="map-watermark"><span>MAS</span> Distributor Map</div></div>
  </div>;
}
