const languageOptions = [
    { code: "auto", name: "Detect Language" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" }
];

const voiceLangMap = { "en":"en-US","fr":"fr-FR","es":"es-ES","de":"de-DE","it":"it-IT","pt":"pt-PT","auto":"en-US" };

const sourceSelect = document.getElementById("source-lang");
const targetSelect = document.getElementById("target-lang");
const swapBtn = document.getElementById("swap-btn");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const charCount = document.getElementById("char-count");
const translateBtn = document.getElementById("translate-btn");
const btnText = document.getElementById("btn-text");

let debounceTimer = null;
let isTranslating = false;

function populateLanguages() {
    sourceSelect.innerHTML = languageOptions.map(l => `<option value="${l.code}">${l.name}</option>`).join('');
    targetSelect.innerHTML = languageOptions.filter(l => l.code !== "auto").map(l => `<option value="${l.code}">${l.name}</option>`).join('');
}

function updateCharCount() {
    const count = inputText.value.length;
    charCount.textContent = `${count}/500`;
    charCount.style.color = count > 450 ? '#f59e0b' : '#9ca3af';
}

async function performTranslation() {
    const text = inputText.value.trim();
    if (!text || isTranslating) return;

    isTranslating = true;
    translateBtn.classList.add("loading");
    btnText.textContent = "Translating...";

    const source = sourceSelect.value;
    const target = targetSelect.value;

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
        const res = await fetch(url);
        const data = await res.json();
        outputText.value = data.responseData?.translatedText || "Translation unavailable";
    } catch (err) {
        outputText.value = "❌ Translation failed. Please try again.";
    } finally {
        isTranslating = false;
        translateBtn.classList.remove("loading");
        btnText.textContent = "Translate";
    }
}

function speak(text, lang) {
    if (!('speechSynthesis' in window)) return alert("Text-to-Speech not supported");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLangMap[lang] || "en-US";
    speechSynthesis.speak(utterance);
}

async function copyToClipboard(text, btn) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    const original = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => btn.innerHTML = original, 1500);
}

function swapLanguages() {
    const tempLang = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempLang;

    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
    updateCharCount();
    performTranslation();
}

// Event Listeners
function initEvents() {
    inputText.addEventListener("input", () => {
        updateCharCount();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (inputText.value.trim()) performTranslation();
        }, 650);
    });

    translateBtn.addEventListener("click", performTranslation);
    swapBtn.addEventListener("click", swapLanguages);

    document.getElementById("listen-input").addEventListener("click", () => speak(inputText.value, sourceSelect.value));
    document.getElementById("listen-output").addEventListener("click", () => speak(outputText.value, targetSelect.value));
    document.getElementById("copy-input").addEventListener("click", () => copyToClipboard(inputText.value, document.getElementById("copy-input")));
    document.getElementById("copy-output").addEventListener("click", () => copyToClipboard(outputText.value, document.getElementById("copy-output")));
}

// Initialize
function init() {
    populateLanguages();
    sourceSelect.value = "en";
    targetSelect.value = "fr";
    inputText.value = "Hello, how are you";
    updateCharCount();

    setTimeout(() => performTranslation(), 300);
    initEvents();
}

window.onload = init;