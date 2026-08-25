export type OutletType = "وكيل" | "نقطة بيع";

export type Branch = {
  id: string;
  name: string;
  address: string;
  province: string;
  type: OutletType;
  phone: string;
  mapQuery: string;
};

export const branches: Branch[] = [
  { id: "alsalami-1", name: "مركز السلامي — الفرع الأول", address: "النجف، شارع أبو صخير، قرب مجسرات ثورة العشرين", province: "النجف", type: "وكيل", phone: "07807074707", mapQuery: "شارع أبو صخير قرب مجسرات ثورة العشرين، النجف، العراق" },
  { id: "alsalami-2", name: "مركز السلامي — الفرع الثاني", address: "النجف، المدينة القديمة، ساحة الميدان مقابل شارع الصادق", province: "النجف", type: "وكيل", phone: "07717089673", mapQuery: "ساحة الميدان مقابل شارع الصادق، النجف، العراق" },
  { id: "alsalami-3", name: "مركز السلامي — الفرع الثالث", address: "الكوفة، شارع الجمهورية، مجمع الكفيل سابقاً", province: "النجف", type: "وكيل", phone: "07809490359", mapQuery: "شارع الجمهورية، مجمع الكفيل، الكوفة، العراق" },
  { id: "alsalami-4", name: "مركز السلامي — الفرع الرابع", address: "النجف، مكتب الرشيد، قرب تقاطع الهندية", province: "النجف", type: "وكيل", phone: "07808854063", mapQuery: "مكتب الرشيد قرب تقاطع الهندية، النجف، العراق" },
  { id: "alsalami-5", name: "مركز السلامي — الفرع الخامس", address: "النجف، شارع المجمعات، ثاني استدارة وبعدها مباشرة", province: "النجف", type: "وكيل", phone: "07832275385", mapQuery: "شارع المجمعات، النجف، العراق" },
  { id: "alsalami-6", name: "مركز السلامي — الفرع السادس", address: "النجف، شارع سلام جامعة، مجاور السلسلة الذهبية", province: "النجف", type: "وكيل", phone: "07766221620 · 07833224477", mapQuery: "شارع سلام جامعة، النجف، العراق" },
];
