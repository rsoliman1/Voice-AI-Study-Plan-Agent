import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

console.log('API key loaded:', process.env.ANTHROPIC_API_KEY ? 'YES (length ' + process.env.ANTHROPIC_API_KEY.length + ')' : 'NO');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, target_date, plan_summary } = req.body;

  if (!subject || !plan_summary) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `You are a study coach. The user has just received this study plan:

Subject: ${subject}
Target date: ${target_date || 'not specified'}
Plan summary: ${plan_summary}

Generate three concise, actionable, subject-specific tips that go beyond what's in the plan — things only someone familiar with this specific subject or exam would know. Format as flowing prose suitable for being spoken aloud. No bullets, no markdown, no numbered lists. Each tip should be one or two sentences. Total response under 30 seconds of speech (about 75 words).`
      }]
    });

    res.status(200).json({
      tips: message.content[0].text
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}