// All invitation content lives here. Replace the placeholder values with real details.
export const wedding = {
  bride: 'Poonam',
  groom: 'Anurag',
  brideFamily: 'Daughter of Mr. & Mrs. Rajesh Mehta',
  groomFamily: 'Son of Mr. & Mrs. Vikram Shah',
  // ISO date-time of the main ceremony (used by the countdown)
  weddingDate: '2027-02-14T18:30:00+05:30',
  displayDate: 'Sunday, 14th February 2027',
  city: 'Udaipur, Rajasthan',
  hashtag: '#AnuragWedsPoonam',
  quote: 'Two souls, one heart — and a lifetime of stories yet to be written.',

  story: [
    { year: '2019', title: 'First Hello', text: 'We met at a friend’s rooftop party, both reaching for the last slice of cake.' },
    { year: '2021', title: 'First Trip', text: 'A rainy weekend in Goa that turned into our favourite memory.' },
    { year: '2024', title: 'The Proposal', text: 'Under a sky full of lanterns, he asked — and she said yes before he finished.' },
    { year: '2027', title: 'Forever Begins', text: 'And now, we’d love for you to be there as we say “I do”.' },
  ],

  events: [
    { name: 'Haldi', icon: '🌼', date: '12 Feb 2027', time: '10:00 AM', venue: 'Lakeside Lawns', dress: 'Shades of yellow', color: '#f4c430' },
    { name: 'Mehendi', icon: '🌿', date: '12 Feb 2027', time: '4:00 PM', venue: 'Garden Courtyard', dress: 'Green & floral', color: '#5c9a4a' },
    { name: 'Sangeet', icon: '🎶', date: '13 Feb 2027', time: '7:30 PM', venue: 'The Grand Ballroom', dress: 'Indo-western glam', color: '#b05cc4' },
    { name: 'Wedding', icon: '💍', date: '14 Feb 2027', time: '6:30 PM', venue: 'Palace Mandap', dress: 'Traditional', color: '#b3263a' },
    { name: 'Reception', icon: '🥂', date: '15 Feb 2027', time: '8:00 PM', venue: 'Royal Terrace', dress: 'Black tie', color: '#c9a24d' },
  ],

  venue: {
    name: 'The Lake Palace Resort',
    address: 'Lake Pichola, Udaipur, Rajasthan 313001',
    mapEmbed: 'https://www.google.com/maps?q=Lake+Pichola+Udaipur&output=embed',
    mapLink: 'https://maps.google.com/?q=Lake+Pichola+Udaipur',
  },

  // Placeholder photos — swap for your own files in /public/images
  gallery: Array.from({ length: 8 }, (_, i) => `https://picsum.photos/seed/wedding${i + 1}/600/${i % 3 === 0 ? 800 : 600}`),

  rsvp: {
    // No backend: RSVP opens WhatsApp with a pre-filled message. Use full number with country code, no "+".
    whatsappNumber: '919999999999',
    deadline: '31st January 2027',
  },
}
