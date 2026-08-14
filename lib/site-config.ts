// NOTE: several of these are unverified per the brief's Part 12 checklist.
// Confirm with Veronica / HomeSmart compliance before launch.
export const siteConfig = {
  name: "Veronica Medellin",
  brokerage: "HomeSmart",
  phone: "+1-713-922-8340",
  phoneDisplay: "(713) 922-8340",
  email: "veronica@veronicasellshouston.com",
  whatsappUrl: "https://wa.me/17139228340",
  bookingUrl:
    "https://outlook.office365.com/owa/calendar/Bookacall@NETORGFT20924878.onmicrosoft.com/bookings/",
  trecLicense: "0614869",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://veronicasellshouston.com",
  serviceAreas: ["Houston", "Clear Lake", "League City", "Friendswood", "Pearland", "Webster"],
  social: {
    facebook: "https://www.facebook.com/veronica.medellin.333940/",
    instagram: "https://www.instagram.com/vmrealtor2023/",
    pinterest: "https://www.pinterest.com/varonicamedellin/",
    youtube: "https://www.youtube.com/@VMrealtor2023",
  },
} as const;
