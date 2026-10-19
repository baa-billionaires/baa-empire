// WhatsApp Contacts & Lead Scraper

export interface WhatsAppContact {
  id: string;
  name: string;
  phone: string;
  source: string;
  tags: string[]; // 'hot' | 'student' | 'investor' | 'bounty' | 'bought' | 'cold'
  last_message_at: string;
  unread_count: number;
  intent: 'Ready to Buy' | 'Price Inquiry' | 'Course Info' | 'Bounty Claim' | 'Cold Lead';
}

export function generateSeedWhatsAppContacts(): WhatsAppContact[] {
  const names = [
    "Babajide Vance", "Folake Adebisi", "Chinedu Okeke", "Amina Diallo",
    "Emeka Sterling", "Tariq Danquah", "Zainab Sanusi", "Oluwaseun Bello",
    "Kofi Boateng", "Fatima Al-Hassan", "David Mensah", "Ngozi Eze",
    "Babatunde Cole", "Ibrahim Toure", "Blessing Adeleke"
  ];

  const tagsList = [
    ['hot', 'student'],
    ['hot', 'investor'],
    ['student', 'bounty'],
    ['bought'],
    ['student', 'cold'],
    ['hot', 'ready_to_buy']
  ];

  const intents: WhatsAppContact['intent'][] = [
    'Ready to Buy', 'Price Inquiry', 'Course Info', 'Bounty Claim', 'Cold Lead'
  ];

  return Array.from({ length: 30 }, (_, i) => {
    const name = names[i % names.length] + (i > 14 ? ` (Lead #${i + 1})` : '');
    const num = 8030000000 + (i * 24321) % 99999999;
    return {
      id: `wac-${i + 1}`,
      name,
      phone: `+234${num}`,
      source: i % 2 === 0 ? "Scout Lead Scraping" : "Landing Page Capture",
      tags: tagsList[i % tagsList.length],
      last_message_at: new Date(Date.now() - (i * 12) * 60000).toLocaleTimeString(),
      unread_count: i < 5 ? (i % 3) + 1 : 0,
      intent: intents[i % intents.length]
    };
  });
}
