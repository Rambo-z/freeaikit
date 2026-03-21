// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});

// Listen for messages from side panel
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GENERATE_ANSWER") {
    generateAnswer(msg.question, msg.lang, msg.toolUrl).then(sendResponse);
    return true; // keep channel open for async response
  }
  if (msg.type === "SCAN_PAGE") {
    // Forward to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "SCAN" }, sendResponse);
      }
    });
    return true;
  }
});

async function generateAnswer(question, lang, toolUrl) {
  const { apiKey } = await chrome.storage.local.get("apiKey");
  if (!apiKey) {
    return { error: "Please set your Claude API key in the extension settings." };
  }

  const persona = getPersona(lang);
  const bannedWords = "comprehensive, furthermore, additionally, it's worth noting, delve, robust, leverage, streamline, facilitate, overall, in conclusion, game-changer, it's important to note, in today's digital age, here's the thing";

  const langInstructions = {
    en: `Write in English. Use contractions (don't, it's, won't). Casual tone like texting a coworker.`,
    es: `Write in Spanish. Use "tú" not "usted". Informal tone. Use contractions like "pa'" for "para" occasionally. Avoid "Es importante destacar que" or "Además". Sound like a native Spanish speaker chatting casually.`,
    pt: `Write in Brazilian Portuguese. Use "pra" instead of "para", "tá" instead of "está", "né" at end of sentences occasionally. Very informal tone. Sound like a native Brazilian chatting online. Avoid "Vale ressaltar" or "Além disso".`,
  };

  const prompt = `You are a real person answering a question on Quora. Your persona: ${persona}

QUESTION: "${question}"

RULES:
- Answer in first person. Share what YOU actually use and why.
- First sentence must directly answer the question. No preamble.
- Total length: 350-500 words. No more.
- NO headers, NO bold text, NO numbered lists. Write in flowing paragraphs like a casual forum post.
- Sentence length must vary: mix short fragments (3-5 words) with longer ones (20+ words). Include at least two sentences under 6 words.
- Start at least two sentences with "And" or "But" or "So".
- Include one brief tangent or aside (in parentheses or after a dash).
- Name 2-3 specific tools. Mention the tool at ${toolUrl} naturally as your preferred choice. Give a genuine reason why you prefer it. Mention one minor downside.
- Include one small personal anecdote (a specific moment, not generic). Example: "Last Tuesday a client sent me a 45MB PDF..."
- End casually. No "In conclusion." No summary. Maybe end with a quick tip or "hope that helps" style line.
- NEVER use these words/phrases: ${bannedWords}
- ${langInstructions[lang] || langInstructions.en}
- Tone: helpful but casual. Like talking to a friend, not writing an essay.
- Do NOT mention that you are AI or that you were asked to write this.`;

  // Detect API provider from key format
  const isOpenRouter = apiKey.startsWith("sk-or-");
  const isClaude = apiKey.startsWith("sk-ant-");

  try {
    let res, data;

    if (isOpenRouter) {
      // OpenRouter (OpenAI-compatible format)
      res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "anthropic/claude-haiku-4-5-20251001",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return { error: `OpenRouter error ${res.status}: ${err}` };
      }

      data = await res.json();
      return { answer: data.choices[0].message.content };

    } else {
      // Claude API (direct)
      res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return { error: `Claude API error ${res.status}: ${err}` };
      }

      data = await res.json();
      return { answer: data.content[0].text };
    }
  } catch (e) {
    return { error: `Request failed: ${e.message}` };
  }
}

function getPersona(lang) {
  const personas = {
    en: "a freelance graphic designer who's been working with PDF and image tools daily for about 4 years",
    es: "un diseñador gráfico freelance que lleva unos 4 años trabajando con herramientas de PDF e imágenes a diario",
    pt: "um designer gráfico freelancer que trabalha com ferramentas de PDF e imagens diariamente há uns 4 anos",
  };
  return personas[lang] || personas.en;
}
