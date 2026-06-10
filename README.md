Study Plan Generator
A voice-based AI study planner built with an ElevenLabs workflow agent, Claude API, and Google Calendar integration. Users describe what they're studying for, and the agent generates a personalized study plan through conversation — then optionally adds the sessions to their Google Calendar.

How It Works
The agent has 8 conversational stages and 3 branches (exam prep, class review, or skill learning). It collects what the user is studying for, their timeline, weak topics, and available hours, then generates a structured plan with named techniques like active recall and spaced repetition. The user can refine the plan, get extra tactical tips from Claude, and add study sessions to their Google Calendar — all by voice.

Tech Stack
ElevenLabs Conversational AI (workflow agents)
Claude Sonnet 4.6 + Gemini 2.5 Flash (multi-LLM)
Node.js + Vercel Serverless Functions
Google Calendar API
Anthropic Claude API

Project Structure
study-plan-tools/
├── api/
│   ├── enhance-plan.js       # Calls Claude for subject-specific tips
│   └── add-to-calendar.js    # Creates Google Calendar events
├── package.json
└── .gitignore
The agent itself is configured in the ElevenLabs dashboard.
