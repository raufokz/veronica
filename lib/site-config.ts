// NOTE: several of these are unverified per the brief's Part 12 checklist.
// Confirm with Veronica / HomeSmart compliance before launch.
export const siteConfig = {
  name: "Veronica Medellin",
  brokerage: "HomeSmart",
  phone: "+1-713-992-3845",
  phoneDisplay: "(713) 992-3845",
  email: "veronica@veronicasellshouston.com",
  whatsappUrl: "https://wa.me/17139923845",
  bookingUrl:
    "https://outlook.office365.com/owa/calendar/Bookacall@NETORGFT20924878.onmicrosoft.com/bookings/",
  trecLicense: "0614869",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://veronicasellshouston.com",
  serviceAreas: [
    "Houston",
    "Sugar Land",
    "Galleria / Uptown",
    "University",
  ],
  // ZIPs Veronica actively covers.
  serviceZips: [
    "77056",
    "77057",
    "77478",
    "77479",
    "77096",
    "77098",
    "77030",
    "77005",
    "77025",
    "77401",
  ],
  social: {
    facebook: "https://www.facebook.com/veronica.medellin.333940/",
    instagram: "https://www.instagram.com/vmrealtor2023/",
    pinterest: "https://www.pinterest.com/varonicamedellin/",
    youtube: "https://www.youtube.com/@VMrealtor2023",
  },
} as const;
