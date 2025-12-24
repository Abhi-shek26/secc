export const REGISTRATION_URL = "TBD";

export const TOURNAMENT_DATA = {
  name: "2026 Southeastern Regional Women's and Girls' Chess Championship",
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
        { name: "Open", earlyFee: "$65", onsiteFee: "$85" },
        { name: "U1800", earlyFee: "$65", onsiteFee: "$85" }
      ],
      girls: [
        { name: "K-3", earlyFee: "$40", onsiteFee: "$50" },
        { name: "K-5", earlyFee: "$40", onsiteFee: "$50" },
        { name: "K-8", earlyFee: "$40", onsiteFee: "$50" },
        { name: "K-12", earlyFee: "$40", onsiteFee: "$50" }
      ],
      familyFriends: { earlyFee: "$35", onsiteFee: "$35" }
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
      rounds: ["10:00", "11:30", "1:30", "2:45", "4:15"],
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
    "Head-to-head (Black draw odds)",
    "If still tied: two games G/10 d5",
    "If still tied: Armageddon (White 6 min, Black 4 min, both d5, Black draw odds)"
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
    senior: { label: "Senior (50+)", amount: "$300" },
    unrated: "5-place trophies",
    familyFriends: "40% EF – 20% EF – 10% EF",
    medals: "Top women and girls from 10 states (AL, AR, FL, GA, MS, NC, SC, TN, TX, VA)",
    plaques: "Top adult woman & top scholastic girl",
    freeRegistration: [
      { winner: "Adult champion", prize: "U.S. Women's Open" },
      { winner: "Senior champion", prize: "National Senior Open" },
      { winner: "Top scholastic girl", prize: "National Scholastic Girls' Championship" }
    ]
  },
  
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
  { label: "Venue", href: "/venue" },
  { label: "Hotel", href: "/hotel" },
  { label: "Policies", href: "/policies" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Players", href: "/players" },
  { label: "Pairings", href: "/pairings" },
  { label: "Contact", href: "/contact" }
];

export const PREREGISTERED_PLAYERS = {
  womensOpen: [
    { name: "Jane Smith", rating: "1950/15" },
    { name: "Maria Garcia", rating: "1820/12" },
    { name: "Emily Chen", rating: "1785/20" },
  ],
  womensU1800: [
    { name: "Sarah Johnson", rating: "1650/18" },
    { name: "Lisa Wang", rating: "1580/10" },
  ],
  girlsK12: [
    { name: "Sophia Miller", rating: "1420/8" },
    { name: "Olivia Brown", rating: "1350/12" },
  ],
  girlsK8: [
    { name: "Emma Davis", rating: "1180/6" },
    { name: "Ava Wilson", rating: "1050/10" },
  ],
  girlsK5: [
    { name: "Mia Taylor", rating: "850/5" },
    { name: "Charlotte Anderson", rating: "780/8" },
  ],
  girlsK3: [
    { name: "Amelia Thomas", rating: "550/4" },
    { name: "Harper Jackson", rating: "420/3" },
  ],
  familyFriends: [
    { name: "Robert Martinez", rating: "1200/15" },
    { name: "David Lee", rating: "Unrated" },
  ],
  unrated: [
    { name: "Jessica White", rating: "Unrated" },
    { name: "Nicole Harris", rating: "Unrated" },
  ],
};

export function isRegistrationAvailable(): boolean {
  return REGISTRATION_URL !== "TBD" && REGISTRATION_URL !== "";
}
