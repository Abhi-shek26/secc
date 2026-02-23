export const REGISTRATION_URL: string = "https://chessregister.com";
export const PAIRINGS_SHEET_URL = "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview";
export const STANDINGS_SHEET_URL = "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview";

export const GRAND_PRIX_POINTS = 100;

export const TOURNAMENT_DATA = {
  name: "2026 Southeastern Regional Women's and Girls' Chess Championship",
  // Use site favicon by default; replace with custom path if needed
  logoUrl: "/favicon.png",
  date: "May 9, 2026",
  prizeFund: "$5,000+ Guaranteed Prize Fund",
  grantNote: "US Chess Grant",
  registrationCap: 200,
  
  venue: {
    name: "Atlanta Chinese Christian Church",
    address: "4434 Britt Rd, Tucker, GA 30084",
    rooms: "(Cafeteria and Chapel)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.8989!2d-84.2165!3d33.8453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a8c5c5c5c5c5%3A0x0!2s4434%20Britt%20Rd%2C%20Tucker%2C%20GA%2030084!5e0!3m2!1sen!2sus!4v1234567890"
  },
  
  hotel: {
    name: "DoubleTree by Hilton Atlanta Northeast / Northlake",
    address: "4156 Lavista Road, Atlanta, GA 30084",
    phone: "(770) 938-1026",
    rateNote: 'Ask for "Chess Rate"'
  },
  
  sections: {
    rated: {
      women: [
          { name: "Open", earlyFee: "$65", afterFee: "$85", onsiteFee: "$100" },
          { name: "U1800", earlyFee: "$65", afterFee: "$85", onsiteFee: "$100" }
        ],
      girls: [
          { name: "K-3", earlyFee: "$40", afterFee: "$50", onsiteFee: "$60" },
          { name: "K-5", earlyFee: "$40", afterFee: "$50", onsiteFee: "$60" },
          { name: "K-8", earlyFee: "$40", afterFee: "$50", onsiteFee: "$60" },
          { name: "K-12", earlyFee: "$40", afterFee: "$50", onsiteFee: "$60" }
      ],
        familyFriends: { earlyFee: "$35", afterFee: "$35", onsiteFee: "$35" }
    },
    unrated: {
        fee: "$25",
      note: "Women & Girls (one section)"
    },
    free: [
      "Titled players",
      "ACCC members",
      "Designated children (per organizer policy)"
    ]
  },
  
  timeControls: {
    scholastic: {
      format: "5SS, G/25 d5",
      rounds: ["9:00", "11:30", "1:15", "2:30", "4:15"],
      sections: "Scholastic / Family-Friends / Unrated"
    },
    openWomen: {
      format: "4SS, G/60 d5",
      rounds: ["9:00", "12:30", "3:30", "6:30"],
      sections: "Open Women"
    }
  },
  
  schedule: [
    { time: "8:00–8:55", event: "Registration & Check-in", location: "Cafeteria" },
    { time: "9:00", event: "Inspirational Keynote", location: "Chapel" },
    { time: "9:20", event: "Girls' Club Session 1", location: "Chapel" },
    { time: "9:45", event: "Sponsor & Staff Introduction", location: "" },
    { time: "10:00", event: "Round 1", location: "" },
    { time: "11:30", event: "Round 2", location: "" },
    { time: "12:00–1:30", event: "Lunch & Mentorship Sessions", location: "" },
    { time: "1:30", event: "Round 3", location: "" },
    { time: "2:45", event: "Round 4", location: "" },
    { time: "4:15", event: "Round 5", location: "" },
    { time: "5:15", event: "Girls' Club Networking & Big Sister Sign-Ups", location: "" },
    { time: "5:30", event: "Awards Ceremony", location: "" },
    { time: "6:00–8:00", event: "Bonus: Intro to Bughouse (Free)", location: "" }
  ],
  
  tiebreaks: [
    "Head to Head",
    "Standard US Chess tie break protocol will then apply"
  ],
  
  prizes: {
    womensOpen: [
      { place: "1st", amount: "$2,000" },
      { place: "2nd", amount: "$1,000" },
      { place: "3rd", amount: "$500" },
      { place: "4th", amount: "$200" }
    ],
    u1600: [
      { place: "1st", amount: "$500" },
      { place: "2nd", amount: "$300" },
      { place: "3rd", amount: "$200" }
    ],
    senior: { label: "Senior (50+)", amount: "$200" },
    unrated: "5-place trophies",
    familyFriends: "40% EF – 20% EF – 10% EF",
    medals: "Olympic-sized medals for top women and girls from each of thirteen states",
    plaques: "Top adult woman & top scholastic girl",
    freeRegistration: [
      { winner: "Adult champion", prize: "U.S. Women's Open" },
      { winner: "Senior champion", prize: "National Senior Open" },
      { winner: "Top scholastic girl", prize: "National Scholastic Girls' Championship" }
    ]
  },

  // States eligible for state medals (per TLA)
  stateMedals: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "WV", "VA"],

  teams: {
    description: "Teams represent schools, chess clubs, or homeschool groups. Team score is total of top four players. Max two teams per organization. Rosters must be declared at check-in or pre-submitted by May 7.",
    trophiesTop: 5
  },

  // Active FIDE-titled US women and girls (from TLA)
  titledPlayers: [
    { rank: 1, name: "Carissa Yip", age: 22, titles: "IM, WGM", fide: 2459, uscf: 2550 },
    { rank: 2, name: "Alice Lee", age: 16, titles: "IM, WGM", fide: 2408, uscf: 2500 },
    { rank: 3, name: "Irina Krush", age: 42, titles: "GM", fide: 2402, uscf: 2510 },
    { rank: 4, name: "Tatev Abrahamyan", age: 37, titles: "IM, WGM", fide: 2390, uscf: 2480 },
    { rank: 5, name: "Anna Zatonskih", age: 47, titles: "IM, WGM", fide: 2380, uscf: 2470 },
    { rank: 6, name: "Anna M. Sargsyan", age: 28, titles: "WGM", fide: 2379, uscf: 2465 },
    { rank: 7, name: "Gulrukhbegim Tokhirjonova", age: 26, titles: "IM, WGM", fide: 2370, uscf: 2460 },
    { rank: 8, name: "Nazi Paikidze", age: 32, titles: "IM, WGM", fide: 2358, uscf: 2450 },
    { rank: 9, name: "Zoey Tang", age: 17, titles: "WIM", fide: 2356, uscf: 2445 },
    { rank: 10, name: "Jennifer Yu", age: 23, titles: "IM, WGM", fide: 2350, uscf: 2440 },
    { rank: 11, name: "Anna Sharevich", age: 40, titles: "IM, WGM", fide: 2325, uscf: 2415 },
    { rank: 12, name: "Sabina Foisor", age: 36, titles: "IM, WGM", fide: 2300, uscf: 2390 },
    { rank: 13, name: "Rochelle Wu", age: 24, titles: "WGM", fide: 2295, uscf: 2385 },
    { rank: 14, name: "Thalia Cervantes", age: 19, titles: "WIM", fide: 2285, uscf: 2375 },
    { rank: 15, name: "Beatriz Marinello", age: 50, titles: "WIM", fide: 2270, uscf: 2360 },
    { rank: 16, name: "Olga Sagalchik", age: 62, titles: "WFM", fide: 2250, uscf: 2340 },
    { rank: 17, name: "Abby Marshall", age: 18, titles: "WFM", fide: 2245, uscf: 2335 },
    { rank: 18, name: "Megan Paragua", age: 15, titles: "WFM", fide: 2230, uscf: 2320 },
    { rank: 19, name: "Becca Lampman", age: 17, titles: "WCM", fide: 2220, uscf: 2310 },
    { rank: 20, name: "Camille DeSerpa", age: 35, titles: "WIM", fide: 2215, uscf: 2305 },
    { rank: 21, name: "Alisa Wang", age: 16, titles: "WFM", fide: 2205, uscf: 2295 },
    { rank: 22, name: "Agata Janaszewska", age: 28, titles: "WIM", fide: 2200, uscf: 2290 },
    { rank: 23, name: "Eleanor Hoang", age: 14, titles: "WCM", fide: 2195, uscf: 2285 },
    { rank: 24, name: "Sofia Mumcuoglu", age: 15, titles: "WFM", fide: 2190, uscf: 2280 },
    { rank: 25, name: "Yuliya Bogdanova", age: 38, titles: "WFM", fide: 2185, uscf: 2275 },
    { rank: 26, name: "Varvara Tataeva", age: 29, titles: "WIM", fide: 2180, uscf: 2270 },
    { rank: 27, name: "Laura Smith", age: 22, titles: "WCM", fide: 2175, uscf: 2265 },
    { rank: 28, name: "Isabella Zhou", age: 13, titles: "WCM", fide: 2160, uscf: 2250 }
  ],
  
  equipment: {
    provided: "Boards & sets provided",
    bring: "bring clocks",
    broadcast: "Top boards broadcast via DGT boards online"
  },
  
  partners: [
    "Chess Nation",
    "North Atlanta Chess Club",
    "Atlanta Chinese Christian Church (Tucker)",
    "Chess Zone (Possible)",
    "Georgia Chess Association (Possible)"
  ],
  
  coordinators: [
    { name: "Dr. Fun Fong", phone: "(770) 316-8483", role: "Organizer"},
    { name: "Kathy Lee", phone: "(678) 613-7777" , role: "Organizer" },
    { name: "Amrita Kumar", phone: "(404) 345-0854", role: "Organizer" },
    { name: "Dr. Antony Joseph", phone: "+1 (770) 858-5756", role: "Technical SME" }
  ],
  
  policies: [
    "All participants must have a valid US Chess membership",
    "No refunds after registration closes",
    "Parents/guardians must remain on-site for scholastic players",
    "Cell phones must be silenced during play",
    "No photography without permission",
    "Disputes will be resolved by the Chief TD",
    "All players must follow US Chess rules of conduct"
  ],
  
  footer: {
    preparedBy: "Prepared by Dr. Antony Joseph – ChessNation",
    grantAck: "Prize fund made possible through a grant from US Chess."
  }
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Info", href: "/info" },
  { label: "Schedule", href: "/schedule" },
  { label: "Prizes", href: "/prizes" },
  { label: "Articles", href: "/articles" },
  { label: "Venue", href: "/venue" },
  { label: "Hotel", href: "/hotel" },
  { label: "Policies", href: "/policies" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Players", href: "/players" },
  { label: "Pairings", href: "/pairings" },
  { label: "Flyer", href: "/flyer" },
  { label: "Contact", href: "/contact" }
];

export const PREREGISTERED_PLAYERS = {
  womensOpen: [],
  womensU1800: [],
  girlsK12: [],
  girlsK8: [],
  girlsK5: [],
  girlsK3: [],
  familyFriends: [],
  unrated: [],
  message: "Players to be announced"
};

export function isRegistrationAvailable(): boolean {
  return REGISTRATION_URL !== "TBD" && REGISTRATION_URL !== "";
}
