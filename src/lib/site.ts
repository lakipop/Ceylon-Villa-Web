/** Verified facts about the business. Source: SLTDA licence photo, logo sign, supplied footage, listing URLs. */

export const SITE = {
  name: "Ceylon Villa",
  region: "Matara",
  country: "Sri Lanka",
  address: {
    line: "34/33, Yowun Mawatha, Maddawatta",
    city: "Matara",
    country: "Sri Lanka",
  },
  rooms: 6,
  whatsapp: "+1 (646) 294-5176",
  contacts: [
    {
      role: "Owner",
      name: "Neil Weerasingha",
      phone: "+1 (646) 294-5176",
      email: "neil.weerasingha@gmail.com",
    },
    {
      role: "Co-Owner",
      name: "Vishva Weerasingha",
      phone: "+1 (347) 740-6374",
      email: "Vishvaweera@gmail.com",
    },
  ],
  licence: {
    authority: "Sri Lanka Tourism Development Authority",
    category: "Rented Apartment / Home, Deluxe",
    licenceNo: "REH/2026/0005",
    registrationNo: "SLTDA/SQA/REH/00026",
    validFrom: "01 Jan 2026",
    validTo: "31 Dec 2026",
  },
  listings: {
    agoda:
      "https://www.agoda.com/ceylon-villa-h82588305/hotel/matara-lk.html?cid=1844104&ds=gqaixrlR6Kx0ExOU",
    booking: "https://www.booking.com/hotel/lk/ceylon-villa-matara.html",
  },
} as const;

export const MEDIA = {
  logo: "/media/logo.png",
  heroImage: "/media/hero-villa.jpg",
  heroVideo: "/media/hero.mp4",
  heroPoster: "/media/hero-poster.jpg",
  film: "/media/film.mp4",
  filmPoster: "/media/film-poster.jpg",
} as const;

export interface GalleryImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly labelKey: string;
}

export const HERO_SIDE_IMAGES: readonly GalleryImage[] = [
  { src: "/media/gallery/matara-hill.jpg", width: 1280, height: 960, labelKey: "coast.hill" },
  { src: "/media/gallery/matara-lighthouse.jpg", width: 1280, height: 960, labelKey: "coast.lighthouse" },
  { src: "/media/gallery/matara-beach.jpg", width: 1280, height: 720, labelKey: "coast.beach" },
  { src: "/media/gallery/matara-bay.jpg", width: 1280, height: 852, labelKey: "coast.bay" },
];

export const COAST_IMAGES: readonly GalleryImage[] = [
  { src: "/media/gallery/coast-1.jpg", width: 1280, height: 720, labelKey: "coast.a1" },
  { src: "/media/gallery/coast-3.jpg", width: 1280, height: 720, labelKey: "coast.a3" },
  { src: "/media/gallery/coast-5.jpg", width: 1280, height: 720, labelKey: "coast.a5" },
  { src: "/media/gallery/coast-7.jpg", width: 1280, height: 720, labelKey: "coast.a7" },
  { src: "/media/gallery/coast-8.jpg", width: 1280, height: 720, labelKey: "coast.a8" },
  { src: "/media/gallery/coast-9.jpg", width: 1280, height: 720, labelKey: "coast.a9" },
];

export const SPACE_IMAGES = {
  exterior: { src: "/media/gallery/exterior.jpg", width: 680, height: 720, labelKey: "spaces.exterior" },
  living: { src: "/media/gallery/living.jpg", width: 960, height: 720, labelKey: "spaces.living" },
  lounge: { src: "/media/gallery/lounge.jpg", width: 900, height: 720, labelKey: "spaces.lounge" },
  kitchen: { src: "/media/gallery/kitchen.jpg", width: 900, height: 720, labelKey: "spaces.kitchen" },
  upstairs: { src: "/media/gallery/upstairs.jpg", width: 900, height: 720, labelKey: "spaces.upstairs" },
  bedroomOne: { src: "/media/gallery/bedroom-one.jpg", width: 513, height: 720, labelKey: "spaces.bedroom" },
  bedroomCurtains: { src: "/media/gallery/bedroom-curtains.jpg", width: 513, height: 720, labelKey: "spaces.bedroom" },
  bedroomTwin: { src: "/media/gallery/bedroom-twin.jpg", width: 513, height: 720, labelKey: "spaces.twin" },
  bathroom: { src: "/media/gallery/bathroom.jpg", width: 513, height: 720, labelKey: "spaces.bathroom" },
  balcony: { src: "/media/gallery/balcony.jpg", width: 513, height: 720, labelKey: "spaces.balcony" },
} as const satisfies Record<string, GalleryImage>;
