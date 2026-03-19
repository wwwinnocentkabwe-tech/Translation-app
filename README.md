# 🌐 TranslateNow - Multilingual Translation Web App

**Full Stack Development Assignment**  
**Submitted: March 2026**  

A clean, modern, and fully functional real-time translation web application built exactly as per the assignment requirements. It allows users to translate text between languages using the free **MyMemory Translation API**, with an interface that matches the provided design mockup (Figure 1) perfectly.

---

## ✨ Project Overview

TranslateNow is a responsive single-page web application that simulates a real-world multilingual communication tool. Users can:
- Enter text (up to 500 characters)
- Select source and target languages
- Get instant translations
- Swap languages with one click
- Listen to both original and translated text (Text-to-Speech)
- Copy text with visual feedback

The app loads with the **exact default requirement**:  
**"Hello, how are you"** translated from **English → French**.

---

## ✅ Features Implemented (100% of Assignment Requirements)

### Mandatory Features
- **Exact UI Match** to the provided design mockup (rounded card, dual panels, language selectors, swap button, icons, blue Translate button)
- Default translation on page load: "Hello, how are you" (EN → FR)
- Input textarea with **500 character limit** + live counter
- Translate button that triggers API call
- Source language dropdown including **Detect Language**, English, and French
- Target language selection
- **Swap languages** button (swaps both languages AND text content)
- **Text-to-Speech** (Listen) for both input and output
- **Copy** buttons for both panels with success feedback
- Full error handling and loading state

### Bonus Features (All Implemented)
- Real-time translation using **debounce** (650ms)
- Loading spinner on Translate button
- Responsive mobile-friendly design
- Clean, modern UI with smooth animations
- Proper ES6+ JavaScript structure

---

## 🛠️ Technology Stack

- **HTML5** – Semantic structure
- **CSS3** (external `styles.css`) – Custom styles + Tailwind CDN for rapid responsive layout
- **Vanilla JavaScript (ES6+)** (external `script.js`) – No frameworks
- **MyMemory Translation API** (`https://api.mymemory.translated.net/get`)
- **Web Speech API** – For Text-to-Speech
- **Clipboard API** – For copying text

---

## 📁 Project Structure
translation-app/
├── index.html          # Main entry point
├── styles.css          # All custom styling
├── script.js           # All JavaScript logic
└── README.md           # This file
text---

## 🚀 Setup Instructions (Any Device)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/translation-app.git
   cd translation-app

Run the app
Double-click index.html
OR open it in Chrome / Firefox / Edge


No installation required — works instantly.
Internet connection needed for the translation API and Tailwind CDN.
🔧 How It Works

Translation: Uses correct GET request to MyMemory API (fixed the incorrect POST example in the assignment PDF)
Real-time: Input changes trigger translation after 650ms debounce
Detect Language: Automatically handled by the API when "auto" is selected
TTS: Browser-native speech synthesis with proper language codes
Error Handling: Graceful messages if API fails or network issues occur
