export type PropertyType = 'dat_nen' | 'nha_pho' | 'biet_thu' | 'can_ho';
export type PropertyStatus = 'cho_ban' | 'cho_thue';

export interface Property {
  id: number;
  title: string;
  soTo: string;       // Số tờ
  soThua: string;     // Số thửa
  price: number;      // tỷ VND
  pricePerM2: number; // triệu/m²
  area: number;       // m²
  frontWidth: number; // mét mặt tiền
  depth: number;      // mét chiều sâu
  address: string;
  ward: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
  type: PropertyType;
  direction: string;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  planning: string;   // loại quy hoạch
  status: PropertyStatus;
  contact: string;
  description: string;
  images: string[];
}

export const propertyTypeLabel: Record<PropertyType, string> = {
  dat_nen: 'Đất nền',
  nha_pho: 'Nhà phố',
  biet_thu: 'Biệt thự',
  can_ho:   'Căn hộ',
};

export const propertiesData: Property[] = [
  // ── QUẬN 1 ──────────────────────────────────────────────────
  {
    id: 1,
    title: 'Nhà phố mặt tiền Nguyễn Huệ – Quận 1',
    soTo: '23', soThua: '145',
    price: 185, pricePerM2: 925, area: 200,
    frontWidth: 8, depth: 25,
    address: '42 Nguyễn Huệ',
    ward: 'Phường Bến Nghé', district: 'Quận 1', city: 'TP Hồ Chí Minh',
    lat: 10.7740, lng: 106.7039,
    type: 'nha_pho', direction: 'Đông Nam', floors: 5, bedrooms: 6, bathrooms: 6,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0901 234 567',
    description: 'Nhà phố mặt tiền đường Nguyễn Huệ sầm uất, vị trí vàng trung tâm Quận 1. Thích hợp kinh doanh thương mại, văn phòng.',
    images: ['https://placehold.co/400x300/1c1c1e/a855f7?text=Nguyen+Hue'],
  },
  {
    id: 2,
    title: 'Biệt thự Nguyễn Đình Chiểu – Quận 1',
    soTo: '15', soThua: '67',
    price: 320, pricePerM2: 800, area: 400,
    frontWidth: 16, depth: 25,
    address: '18 Nguyễn Đình Chiểu',
    ward: 'Phường Đa Kao', district: 'Quận 1', city: 'TP Hồ Chí Minh',
    lat: 10.7880, lng: 106.6990,
    type: 'biet_thu', direction: 'Tây Bắc', floors: 3, bedrooms: 6, bathrooms: 7,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0902 345 678',
    description: 'Biệt thự cổ điển phong cách Đông Dương, khuôn viên rộng rãi, sân vườn xanh mát. Hiếm có tại trung tâm Q1.',
    images: ['https://placehold.co/400x300/1c1c1e/a855f7?text=Biet+Thu+Q1'],
  },
  {
    id: 3,
    title: 'Nhà Bến Thành – Quận 1',
    soTo: '09', soThua: '212',
    price: 55, pricePerM2: 687, area: 80,
    frontWidth: 5, depth: 16,
    address: '7 Phan Chu Trinh',
    ward: 'Phường Bến Thành', district: 'Quận 1', city: 'TP Hồ Chí Minh',
    lat: 10.7723, lng: 106.6983,
    type: 'nha_pho', direction: 'Nam', floors: 4, bedrooms: 4, bathrooms: 4,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0903 456 789',
    description: 'Nhà gần chợ Bến Thành, hẻm thông thoáng 5m. Thích hợp ở hoặc cho thuê.',
    images: ['https://placehold.co/400x300/1c1c1e/a855f7?text=Ben+Thanh'],
  },
  {
    id: 4,
    title: 'Đất nền phố đi bộ Bùi Viện',
    soTo: '11', soThua: '034',
    price: 72, pricePerM2: 400, area: 180,
    frontWidth: 9, depth: 20,
    address: '55 Bùi Viện',
    ward: 'Phường Phạm Ngũ Lão', district: 'Quận 1', city: 'TP Hồ Chí Minh',
    lat: 10.7674, lng: 106.6926,
    type: 'dat_nen', direction: 'Bắc', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị – cho thương mại dịch vụ',
    status: 'cho_ban', contact: '0904 567 890',
    description: 'Đất nền mặt tiền khu phố Tây Bùi Viện. Tiềm năng khai thác du lịch, nhà hàng, bar cực kỳ cao.',
    images: ['https://placehold.co/400x300/1c1c1e/a855f7?text=Bui+Vien'],
  },

  // ── QUẬN BÌNH THẠNH ─────────────────────────────────────────
  {
    id: 5,
    title: 'Nhà phố Xô Viết Nghệ Tĩnh – Bình Thạnh',
    soTo: '44', soThua: '089',
    price: 18.5, pricePerM2: 185, area: 100,
    frontWidth: 5, depth: 20,
    address: '120 Xô Viết Nghệ Tĩnh',
    ward: 'Phường 19', district: 'Quận Bình Thạnh', city: 'TP Hồ Chí Minh',
    lat: 10.8052, lng: 106.7139,
    type: 'nha_pho', direction: 'Đông', floors: 3, bedrooms: 4, bathrooms: 3,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0905 678 901',
    description: 'Nhà phố mặt tiền đường lớn, tiện di chuyển vào trung tâm. Gần chợ Bình Thạnh, trường học, bệnh viện.',
    images: ['https://placehold.co/400x300/1c1c1e/6366f1?text=Binh+Thanh'],
  },
  {
    id: 6,
    title: 'Nhà hẻm Đinh Bộ Lĩnh – Bình Thạnh',
    soTo: '38', soThua: '167',
    price: 7.8, pricePerM2: 97.5, area: 80,
    frontWidth: 4, depth: 20,
    address: '77/3 Đinh Bộ Lĩnh',
    ward: 'Phường 26', district: 'Quận Bình Thạnh', city: 'TP Hồ Chí Minh',
    lat: 10.8140, lng: 106.7098,
    type: 'nha_pho', direction: 'Tây', floors: 2, bedrooms: 3, bathrooms: 2,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0906 789 012',
    description: 'Nhà hẻm xe hơi vào được, khu dân cư yên tĩnh. Sổ hồng riêng, đất vuông vắn.',
    images: ['https://placehold.co/400x300/1c1c1e/6366f1?text=Dinh+Bo+Linh'],
  },
  {
    id: 7,
    title: 'Đất nền ven sông Sài Gòn – Bình Thạnh',
    soTo: '52', soThua: '201',
    price: 42, pricePerM2: 280, area: 150,
    frontWidth: 8, depth: 19,
    address: '33 Nguyễn Hữu Cảnh',
    ward: 'Phường 22', district: 'Quận Bình Thạnh', city: 'TP Hồ Chí Minh',
    lat: 10.7960, lng: 106.7280,
    type: 'dat_nen', direction: 'Nam', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị ven sông',
    status: 'cho_ban', contact: '0907 890 123',
    description: 'Đất nền view sông Sài Gòn panorama, biệt thự đẳng cấp có thể xây ngay. Hướng Nam đón gió. Sổ đỏ lâu dài.',
    images: ['https://placehold.co/400x300/1c1c1e/6366f1?text=Ven+Song'],
  },
  {
    id: 8,
    title: 'Biệt thự Thảo Điền – Quận Bình Thạnh',
    soTo: '61', soThua: '115',
    price: 95, pricePerM2: 380, area: 250,
    frontWidth: 12, depth: 21,
    address: '8A Đặng Hữu Phổ',
    ward: 'Phường Thảo Điền', district: 'Quận Bình Thạnh', city: 'TP Hồ Chí Minh',
    lat: 10.8036, lng: 106.7313,
    type: 'biet_thu', direction: 'Đông Nam', floors: 3, bedrooms: 5, bathrooms: 5,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0908 901 234',
    description: 'Biệt thự hiện đại trong khu compound Thảo Điền, an ninh 24/7, hồ bơi riêng, garage 2 xe.',
    images: ['https://placehold.co/400x300/1c1c1e/6366f1?text=Thao+Dien+BT'],
  },
  {
    id: 9,
    title: 'Cho thuê nhà phố Phan Xích Long',
    soTo: '29', soThua: '078',
    price: 0.04, pricePerM2: 0, area: 120, // 40tr/tháng hiểu là 0.04 tỷ/tháng
    frontWidth: 5, depth: 24,
    address: '215 Phan Xích Long',
    ward: 'Phường 2', district: 'Quận Bình Thạnh', city: 'TP Hồ Chí Minh',
    lat: 10.7990, lng: 106.7068,
    type: 'nha_pho', direction: 'Bắc', floors: 4, bedrooms: 5, bathrooms: 4,
    planning: 'Đất ở đô thị',
    status: 'cho_thue', contact: '0909 012 345',
    description: 'Cho thuê nhà mặt tiền Phan Xích Long – phố ẩm thực sầm uất. Tầng trệt kinh doanh, các tầng trên ở.',
    images: ['https://placehold.co/400x300/1c1c1e/6366f1?text=Phan+Xich+Long'],
  },

  // ── TP THỦ ĐỨC ──────────────────────────────────────────────
  {
    id: 10,
    title: 'Đất nền dự án Linh Xuân – Thủ Đức',
    soTo: '77', soThua: '312',
    price: 4.5, pricePerM2: 45, area: 100,
    frontWidth: 5, depth: 20,
    address: 'Đường Số 8, KDC Linh Xuân',
    ward: 'Phường Linh Xuân', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.8658, lng: 106.7742,
    type: 'dat_nen', direction: 'Đông', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị theo quy hoạch 1/500',
    status: 'cho_ban', contact: '0910 123 456',
    description: 'Đất nền sổ đỏ, khu dân cư hiện hữu đông đúc, đường nhựa thông thoáng. Gần ĐH Quốc Gia HCM.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=Linh+Xuan'],
  },
  {
    id: 11,
    title: 'Nhà phố Phạm Văn Đồng – Thủ Đức',
    soTo: '82', soThua: '044',
    price: 12.5, pricePerM2: 125, area: 100,
    frontWidth: 5, depth: 20,
    address: '890 Phạm Văn Đồng',
    ward: 'Phường Hiệp Bình Chánh', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.8447, lng: 106.7540,
    type: 'nha_pho', direction: 'Tây', floors: 3, bedrooms: 4, bathrooms: 3,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0911 234 567',
    description: 'Nhà mặt tiền Phạm Văn Đồng, trục đường lớn kết nối trung tâm. Thuận tiện kinh doanh.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=PVD+ThuDuc'],
  },
  {
    id: 12,
    title: 'Đất nền An Phú – Thủ Đức',
    soTo: '63', soThua: '188',
    price: 28, pricePerM2: 280, area: 100,
    frontWidth: 6, depth: 17,
    address: '12 Đường An Phú 18',
    ward: 'Phường An Phú', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.7985, lng: 106.7420,
    type: 'dat_nen', direction: 'Nam', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0912 345 678',
    description: 'Đất trong khu An Phú, kề Sala Đại Quang Minh. Pháp lý sạch, sổ hồng riêng.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=An+Phu'],
  },
  {
    id: 13,
    title: 'Biệt thự compound Thảo Điền – Thủ Đức',
    soTo: '91', soThua: '056',
    price: 135, pricePerM2: 450, area: 300,
    frontWidth: 15, depth: 20,
    address: '9 Quốc Hương',
    ward: 'Phường Thảo Điền', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.8040, lng: 106.7335,
    type: 'biet_thu', direction: 'Đông', floors: 4, bedrooms: 6, bathrooms: 6,
    planning: 'Đất ở đô thị cao cấp',
    status: 'cho_ban', contact: '0913 456 789',
    description: 'Biệt thự nội khu Thảo Điền, compound 5 sao, hồ bơi, gym, an ninh 24/7. Nội thất cao cấp nhập khẩu.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=Thao+Dien+TD'],
  },
  {
    id: 14,
    title: 'Căn hộ Landmark81 view sông – Thủ Đức',
    soTo: 'CH', soThua: '81-45A',
    price: 18, pricePerM2: 150, area: 120,
    frontWidth: 0, depth: 0,
    address: 'Vinhomes Central Park, 208 Nguyễn Hữu Cảnh',
    ward: 'Phường 22', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.7942, lng: 106.7219,
    type: 'can_ho', direction: 'Đông Nam', floors: 1, bedrooms: 3, bathrooms: 2,
    planning: 'Đất thương mại – nhà ở cao tầng',
    status: 'cho_ban', contact: '0914 567 890',
    description: 'Căn hộ 3PN tại tháp Landmark 81, tầng cao view sông Sài Gòn. Full nội thất, hồ bơi vô cực.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=Landmark81'],
  },
  {
    id: 15,
    title: 'Đất nền Trường Thọ – Thủ Đức',
    soTo: '55', soThua: '423',
    price: 3.8, pricePerM2: 38, area: 100,
    frontWidth: 5, depth: 20,
    address: 'Đường Số 5, P. Trường Thọ',
    ward: 'Phường Trường Thọ', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.8302, lng: 106.7456,
    type: 'dat_nen', direction: 'Bắc', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị – đang quy hoạch lại',
    status: 'cho_ban', contact: '0915 678 901',
    description: 'Đất nền sổ hồng, khu dân cư ổn định. Gần cảng Trường Thọ, tiện ích đầy đủ.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=Truong+Tho'],
  },
  {
    id: 16,
    title: 'Nhà phố Linh Đông – Thủ Đức',
    soTo: '48', soThua: '291',
    price: 6.2, pricePerM2: 62, area: 100,
    frontWidth: 4, depth: 25,
    address: '45 Kha Vạn Cân',
    ward: 'Phường Linh Đông', district: 'TP Thủ Đức', city: 'TP Hồ Chí Minh',
    lat: 10.8530, lng: 106.7621,
    type: 'nha_pho', direction: 'Đông Bắc', floors: 2, bedrooms: 3, bathrooms: 2,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0916 789 012',
    description: 'Nhà phố mới xây, hẻm 6m ô tô vào được, gần ĐH Giao Thông Vận Tải.',
    images: ['https://placehold.co/400x300/1c1c1e/4ade80?text=Linh+Dong'],
  },

  // ── QUẬN PHÚ NHUẬN ──────────────────────────────────────────
  {
    id: 17,
    title: 'Nhà mặt tiền Phan Đình Phùng – Phú Nhuận',
    soTo: '31', soThua: '099',
    price: 28, pricePerM2: 280, area: 100,
    frontWidth: 5, depth: 20,
    address: '144 Phan Đình Phùng',
    ward: 'Phường 2', district: 'Quận Phú Nhuận', city: 'TP Hồ Chí Minh',
    lat: 10.7963, lng: 106.6854,
    type: 'nha_pho', direction: 'Tây', floors: 4, bedrooms: 5, bathrooms: 4,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0917 890 123',
    description: 'Nhà mặt tiền Phan Đình Phùng, con đường đẹp nhất Phú Nhuận. Thích hợp cafe, văn phòng.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Phan+Dinh+Phung'],
  },
  {
    id: 18,
    title: 'Đất nền hẻm Nguyễn Kiệm – Phú Nhuận',
    soTo: '22', soThua: '177',
    price: 9.5, pricePerM2: 118.75, area: 80,
    frontWidth: 4, depth: 20,
    address: '35/7 Nguyễn Kiệm',
    ward: 'Phường 3', district: 'Quận Phú Nhuận', city: 'TP Hồ Chí Minh',
    lat: 10.8006, lng: 106.6812,
    type: 'dat_nen', direction: 'Nam', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0918 901 234',
    description: 'Đất hẻm xe hơi, vuông vắn, gần Lotte Mart Gò Vấp, tiện ích xung quanh đầy đủ.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Nguyen+Kiem'],
  },

  // ── QUẬN GÒ VẤP ─────────────────────────────────────────────
  {
    id: 19,
    title: 'Nhà phố Quang Trung – Gò Vấp',
    soTo: '67', soThua: '334',
    price: 11.2, pricePerM2: 112, area: 100,
    frontWidth: 5, depth: 20,
    address: '678 Quang Trung',
    ward: 'Phường 8', district: 'Quận Gò Vấp', city: 'TP Hồ Chí Minh',
    lat: 10.8257, lng: 106.6752,
    type: 'nha_pho', direction: 'Đông', floors: 3, bedrooms: 4, bathrooms: 3,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0919 012 345',
    description: 'Nhà mặt tiền đường lớn, kinh doanh tốt, gần Vincom Gò Vấp. Sổ hồng chính chủ.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Quang+Trung'],
  },
  {
    id: 20,
    title: 'Đất nền Lê Đức Thọ – Gò Vấp',
    soTo: '74', soThua: '156',
    price: 7.8, pricePerM2: 78, area: 100,
    frontWidth: 5, depth: 20,
    address: '233 Lê Đức Thọ',
    ward: 'Phường 6', district: 'Quận Gò Vấp', city: 'TP Hồ Chí Minh',
    lat: 10.8387, lng: 106.6673,
    type: 'dat_nen', direction: 'Tây Bắc', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0920 123 456',
    description: 'Đất nền khu dân cư hiện hữu, vuông vắn, sổ hồng riêng. Gần trường học, chợ.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Le+Duc+Tho'],
  },

  // ── QUẬN 3 ──────────────────────────────────────────────────
  {
    id: 21,
    title: 'Nhà phố Võ Văn Tần – Quận 3',
    soTo: '18', soThua: '091',
    price: 48, pricePerM2: 480, area: 100,
    frontWidth: 5, depth: 20,
    address: '92 Võ Văn Tần',
    ward: 'Phường 6', district: 'Quận 3', city: 'TP Hồ Chí Minh',
    lat: 10.7750, lng: 106.6880,
    type: 'nha_pho', direction: 'Bắc', floors: 5, bedrooms: 6, bathrooms: 5,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0921 234 567',
    description: 'Nhà phố mặt tiền Võ Văn Tần, khu vực sầm uất Q3. Thích hợp văn phòng, showroom.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Vo+Van+Tan'],
  },

  // ── QUẬN TÂN BÌNH ────────────────────────────────────────────
  {
    id: 22,
    title: 'Nhà phố Hoàng Văn Thụ – Tân Bình',
    soTo: '35', soThua: '228',
    price: 22, pricePerM2: 183, area: 120,
    frontWidth: 6, depth: 20,
    address: '156 Hoàng Văn Thụ',
    ward: 'Phường 8', district: 'Quận Tân Bình', city: 'TP Hồ Chí Minh',
    lat: 10.7920, lng: 106.6580,
    type: 'nha_pho', direction: 'Đông', floors: 4, bedrooms: 5, bathrooms: 4,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0922 345 678',
    description: 'Nhà mặt tiền gần sân bay Tân Sơn Nhất. Thích hợp khách sạn mini, nhà nghỉ.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Hoang+Van+Thu'],
  },
  {
    id: 23,
    title: 'Biệt thự đường nội khu Tân Bình',
    soTo: '41', soThua: '307',
    price: 65, pricePerM2: 325, area: 200,
    frontWidth: 10, depth: 20,
    address: '5 Phổ Quang',
    ward: 'Phường 2', district: 'Quận Tân Bình', city: 'TP Hồ Chí Minh',
    lat: 10.7999, lng: 106.6633,
    type: 'biet_thu', direction: 'Nam', floors: 3, bedrooms: 5, bathrooms: 5,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0923 456 789',
    description: 'Biệt thự tân cổ điển khu Phổ Quang, hẻm biệt thự rộng 10m, khuôn viên xanh.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Pho+Quang'],
  },
  {
    id: 24,
    title: 'Căn hộ Sunrise City – Quận 7',
    soTo: 'CH', soThua: 'SR-12B',
    price: 9.5, pricePerM2: 95, area: 100,
    frontWidth: 0, depth: 0,
    address: '25-27A Nguyễn Hữu Thọ',
    ward: 'Phường Tân Hưng', district: 'Quận 7', city: 'TP Hồ Chí Minh',
    lat: 10.7389, lng: 106.7018,
    type: 'can_ho', direction: 'Đông Nam', floors: 1, bedrooms: 3, bathrooms: 2,
    planning: 'Đất thương mại dịch vụ – nhà ở',
    status: 'cho_ban', contact: '0924 567 890',
    description: 'Căn hộ cao cấp Sunrise City, 3PN đã có nội thất. Tiện ích đầy đủ, gần Crescent Mall.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Sunrise+City'],
  },
  {
    id: 25,
    title: 'Đất nền Nhà Bè sổ hồng riêng',
    soTo: '112', soThua: '567',
    price: 2.8, pricePerM2: 28, area: 100,
    frontWidth: 5, depth: 20,
    address: 'Đường Huỳnh Tấn Phát, Nhà Bè',
    ward: 'Thị trấn Nhà Bè', district: 'Huyện Nhà Bè', city: 'TP Hồ Chí Minh',
    lat: 10.6990, lng: 106.7250,
    type: 'dat_nen', direction: 'Bắc', floors: 0, bedrooms: 0, bathrooms: 0,
    planning: 'Đất ở đô thị',
    status: 'cho_ban', contact: '0925 678 901',
    description: 'Đất nền pháp lý rõ ràng, giá tốt, tiềm năng tăng trưởng cao theo quy hoạch huyện Nhà Bè.',
    images: ['https://placehold.co/400x300/1c1c1e/f87171?text=Nha+Be'],
  },
];

// Unique values for filter dropdowns
export const allDistricts = [...new Set(propertiesData.map(p => p.district))].sort();
export const allWards = (district: string) =>
  [...new Set(propertiesData.filter(p => p.district === district).map(p => p.ward))].sort();

export function filterProperties(
  data: Property[],
  {
    district,
    ward,
    minPrice,
    maxPrice,
    type,
    status,
  }: {
    district?: string;
    ward?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: PropertyType | '';
    status?: PropertyStatus | '';
  }
): Property[] {
  return data.filter(p => {
    if (district && p.district !== district) return false;
    if (ward && p.ward !== ward) return false;
    if (minPrice != null && !isNaN(minPrice) && p.price < minPrice) return false;
    if (maxPrice != null && !isNaN(maxPrice) && maxPrice > 0 && p.price > maxPrice) return false;
    if (type && p.type !== type) return false;
    if (status && p.status !== status) return false;
    return true;
  });
}

export function formatPrice(price: number): string {
  if (price >= 1000) return `${(price / 1000).toFixed(1)} nghìn tỷ`;
  if (price >= 1) return `${price % 1 === 0 ? price : price.toFixed(1)} tỷ`;
  return `${(price * 1000).toFixed(0)} triệu`;
}
