// --- API Key Management ---
const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKeyBtn");
const keySaved = document.getElementById("keySaved");

chrome.storage.local.get("apiKey", ({ apiKey }) => {
  if (apiKey) apiKeyInput.value = apiKey;
});

saveKeyBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  chrome.storage.local.set({ apiKey: key }, () => {
    keySaved.style.display = "inline";
    setTimeout(() => (keySaved.style.display = "none"), 2000);
  });
});

// --- Scan Page ---
const scanBtn = document.getElementById("scanBtn");
const questionList = document.getElementById("questionList");
const answerSection = document.getElementById("answerSection");
const answerContainer = document.getElementById("answerContainer");

let currentLang = "en";

scanBtn.addEventListener("click", () => {
  scanBtn.disabled = true;
  scanBtn.textContent = "Scanning...";
  questionList.innerHTML = '<div class="status"><div class="spinner"></div></div>';

  chrome.runtime.sendMessage({ type: "SCAN_PAGE" }, (response) => {
    scanBtn.disabled = false;
    scanBtn.textContent = "Scan Page";

    if (!response || !response.results) {
      questionList.innerHTML = '<div class="empty"><p>Could not scan page. Make sure you are on a Quora page.</p></div>';
      return;
    }

    currentLang = response.lang || "en";
    const results = response.results;

    if (results.length === 0) {
      questionList.innerHTML = '<div class="empty"><p>No matching questions found on this page. Try searching for tool-related topics on Quora.</p></div>';
      return;
    }

    questionList.innerHTML = "";
    results.forEach((item) => {
      const card = document.createElement("div");
      card.className = "question-card";
      const scoreClass = item.score >= 70 ? "high" : "";
      card.innerHTML = `
        <span class="score ${scoreClass}">${item.score}% match</span>
        ${item.isCurrentPage ? '<span class="current-tag">This Page</span>' : ""}
        <div class="q-text">${escapeHtml(item.question)}</div>
        <div class="q-tool">Tool: ${item.toolId.replace(/-/g, " ")}</div>
        <div class="q-actions">
          <button class="btn btn-primary btn-sm generate-btn" data-question="${escapeAttr(item.question)}" data-tool-url="${escapeAttr(item.toolUrl)}" data-tool-id="${escapeAttr(item.toolId)}">Generate Answer</button>
          ${item.href ? `<a href="${escapeAttr(item.href)}" target="_blank" class="btn btn-secondary btn-sm">Open</a>` : ""}
        </div>
      `;
      questionList.appendChild(card);
    });

    // Attach generate handlers
    document.querySelectorAll(".generate-btn").forEach((btn) => {
      btn.addEventListener("click", handleGenerate);
    });
  });
});

// --- Generate Answer ---
async function handleGenerate(e) {
  const btn = e.target;
  const question = btn.dataset.question;
  const toolUrl = btn.dataset.toolUrl;

  btn.disabled = true;
  btn.textContent = "Generating...";
  answerSection.style.display = "block";
  answerContainer.innerHTML = '<div class="status"><div class="spinner"></div><p style="margin-top:8px;">Generating answer with Claude...</p></div>';

  chrome.runtime.sendMessage(
    { type: "GENERATE_ANSWER", question, lang: currentLang, toolUrl },
    (response) => {
      btn.disabled = false;
      btn.textContent = "Generate Answer";

      if (response.error) {
        answerContainer.innerHTML = `<div class="error">${escapeHtml(response.error)}</div>`;
        return;
      }

      const answer = response.answer;
      answerContainer.innerHTML = `
        <div class="answer-box">
          <div class="answer-text">${escapeHtml(answer)}</div>
          <div class="answer-actions">
            <button class="btn btn-copy btn-sm" id="copyBtn">Copy to Clipboard</button>
            <button class="btn btn-secondary btn-sm" id="regenBtn" data-question="${escapeAttr(question)}" data-tool-url="${escapeAttr(toolUrl)}">Regenerate</button>
          </div>
        </div>
      `;

      document.getElementById("copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(answer).then(() => {
          const cb = document.getElementById("copyBtn");
          cb.textContent = "Copied!";
          cb.style.background = "#059669";
          setTimeout(() => {
            cb.textContent = "Copy to Clipboard";
            cb.style.background = "";
          }, 2000);
        });
      });

      document.getElementById("regenBtn").addEventListener("click", handleGenerate);
    }
  );
}

// --- Helpers ---
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
