import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, timezone = 'America/New_York', events } = req.body;

  if (!subject || !events || !Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'Missing subject or events array' });
  }

  try {
    const created = [];
    for (const event of events) {
      const result = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: `${subject}: ${event.title}`,
          description: event.description || '',
          start: {
            dateTime: event.start,
            timeZone: timezone,
          },
          end: {
            dateTime: event.end,
            timeZone: timezone,
          },
          colorId: '5', // yellow — optional, makes events visually distinct
        },
      });
      created.push(result.data.id);
    }

    res.status(200).json({
      success: true,
      events_created: created.length,
      message: `Added ${created.length} study sessions to your calendar.`,
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    res.status(500).json({ error: error.message });
  }
}