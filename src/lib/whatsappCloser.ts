// High-Converting Nigerian AI WhatsApp Closer Engine

export interface CloserRule {
  id: string;
  trigger_keyword: string;
  response_template: string;
  action: 'send_paystack' | 'send_course' | 'send_bounty';
}

export const CLOSER_RULES: CloserRule[] = [
  {
    id: "rule-1",
    trigger_keyword: "price",
    response_template: "My brother/sister, tuition is only $99 (or ₦125,000)! But listen: you immediately receive 990 BaaCoin ($990 value) in your student networth. The scholarship price increases at midnight. Pay here now: https://billionairesai.academy/paystack",
    action: "send_paystack"
  },
  {
    id: "rule-2",
    trigger_keyword: "interested",
    response_template: "Oya sharp sharp! Chinedu in Lagos joined yesterday and just claimed a ₦150,000 bounty! Lock in your 10x BaaCoin spot right now before cohort fills: https://billionairesai.academy/academy",
    action: "send_paystack"
  },
  {
    id: "rule-3",
    trigger_keyword: "no money",
    response_template: "No shaking! You can start by claiming one of our active ₦150,000 paid bounties in the Bounties portal, or grab our 7 free wealth guides: https://billionairesai.academy/free",
    action: "send_bounty"
  },
  {
    id: "rule-4",
    trigger_keyword: "link",
    response_template: "Here is your VIP enrollment link with 10x BaaCoin Networth guaranteed: https://billionairesai.academy/academy. I am holding your slot for the next 30 minutes!",
    action: "send_paystack"
  }
];

export function generateAiCloserReply(
  incomingMessage: string,
  contactName: string
): { replyText: string; intent: string; recommendedAction: CloserRule['action'] } {
  const lower = incomingMessage.toLowerCase();

  if (lower.includes('how much') || lower.includes('cost') || lower.includes('price')) {
    return {
      replyText: `Hello ${contactName}! The masterclass is currently $99, but remember: you get 990 BaaCoin ($990 Networth) on Day 1 + Learn-to-Mine rewards. Price goes up tonight! Complete payment here: https://billionairesai.academy/paystack`,
      intent: 'Price Inquiry',
      recommendedAction: 'send_paystack'
    };
  }

  if (lower.includes('bounty') || lower.includes('job') || lower.includes('work')) {
    return {
      replyText: `${contactName}, we currently have ₦150,000 and ₦250,000 live bounties from Lagos fintechs waiting for developers and prompt engineers. Check available bounties here: https://billionairesai.academy/bounties`,
      intent: 'Bounty Claim',
      recommendedAction: 'send_bounty'
    };
  }

  if (lower.includes('interested') || lower.includes('yes') || lower.includes('ready') || lower.includes('register')) {
    return {
      replyText: `Fantastic move ${contactName}! Chinedu and 1,400+ African scholars are already learning and mining daily. Click here to secure your 10x BaaCoin Networth now: https://billionairesai.academy/academy`,
      intent: 'Ready to Buy',
      recommendedAction: 'send_paystack'
    };
  }

  // Default Nigerian high-urgency closer response
  return {
    replyText: `Great to connect ${contactName}! At Billionaires AI Academy, you don't just learn—you get 10x your tuition back in BaaCoin Networth ($990 collateral) and earn 60% royalties on prompt sales. Are you joining the 2026 cohort today?`,
    intent: 'Course Info',
    recommendedAction: 'send_course'
  };
}
