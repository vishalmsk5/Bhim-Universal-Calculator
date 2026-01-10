# Bhim Universal Calculator

## 🌟 Overview

**Bhim Universal Calculator** is a world-class, multilingual Android calculator app inspired by Dr. B.R. Ambedkar's vision of equality, education, and progress. This comprehensive calculator suite combines smart features with everyday practicality.

### Tagline
*"One free calculator for everyone — powered by knowledge and equality."*

---

## ✨ Key Features

### 📱 Core Calculators
- **Basic Calculator** - Clean, modern interface with haptic feedback
- **Scientific Calculator** - Advanced functions (sin, cos, tan, log, ln, memory, etc.)
- **AI Voice Calculator** - Natural language math processing using Emergent LLM
- **Currency Converter** - Live exchange rates for 8+ popular currencies

### 💼 Business Tools
- **EMI Calculator** - Loan calculator with detailed breakdown
- **GST Calculator** - India-specific tax calculations (5%, 12%, 18%, 28%)
- **Discount Calculator** - Quick discount and savings calculator
- **Expense Splitter** - Split bills among friends
- **Profit/Loss Calculator** - Business margin calculations

### 🧮 20+ Mini Calculators
1. Unit Converter
2. Electricity Bill Estimator
3. Mileage & Fuel Cost Tracker
4. Internet Speed Cost Analyzer
5. Construction Material Estimator
6. Recipe Quantity Calculator
7. Geometry & Engineering Helper
8. Time Zone Converter
9. Battery Cost Checker
10. Study Timer (Pomodoro Mode)
11. Workshop Helper
12. BMI Calculator
13. Water Tank Volume
14. Paint Estimator
15. Room Comfort Index
...and more!

### 🎨 Ambedkar-Inspired Features
- **Quote of the Day** - Daily inspiration from Dr. B.R. Ambedkar
- **4 Beautiful Themes**:
  - Deep Blue (Default)
  - Constitution Gold
  - Night Mode
  - Gradient Glow
- **Jai Bhim Greeting** - Optional startup greeting
- **Babasaheb Watermark** - Optional background image
- **About Babasaheb** - Biography and top quotes section

### 🌍 Multi-Language Support
- English (US & India)
- Hindi, Marathi, Tamil, Telugu, Gujarati
- Malayalam, Bengali, Kannada, Punjabi
- Arabic (RTL support)
- French, German, Spanish, Italian, Russian

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React Native (Expo)
- **Navigation**: expo-router (file-based routing)
- **State Management**: Zustand
- **UI Components**: Custom React Native components
- **Voice**: expo-speech
- **Charts**: react-native-gifted-charts

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **AI Integration**: Emergent LLM (OpenAI GPT-4o-mini)
- **Currency API**: exchangerate-api.com

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Yarn
- Python 3.11+
- MongoDB

### Frontend Setup
```bash
cd /app/frontend
yarn install
yarn start
```

### Backend Setup
```bash
cd /app/backend
pip install -r requirements.txt
python server.py
```

### Environment Variables

**Backend (.env)**
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
EMERGENT_LLM_KEY=sk-emergent-f2cD109Cd9dF400B99
```

**Frontend (.env)**
```
EXPO_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

---

## 📱 App Structure

```
frontend/
├── app/                    # Expo Router pages
│   ├── index.tsx          # Home (Basic Calculator)
│   ├── voice.tsx          # AI Voice Calculator
│   ├── business.tsx       # Business Tools Hub
│   ├── explore.tsx        # All Mini Calculators
│   ├── settings.tsx       # App Settings
│   └── mini/              # Mini Calculator Screens
│       ├── emi.tsx
│       ├── gst.tsx
│       ├── currency.tsx
│       └── ...
├── components/            # Reusable Components
│   ├── BasicCalculator.tsx
│   ├── ScientificCalculator.tsx
│   └── QuoteOfDay.tsx
├── store/                 # Zustand State Management
│   ├── useThemeStore.ts
│   ├── useLanguageStore.ts
│   └── useSettingsStore.ts
└── constants/             # Theme, Language, Quotes
    ├── themes.ts
    ├── languages.ts
    └── quotes.ts

backend/
└── server.py             # FastAPI Backend with AI & Currency APIs
```

---

## 🎯 API Endpoints

### AI Voice Calculator
```bash
POST /api/ai/voice-calculate
{
  "query": "What is 45 plus 18 percent of 200?"
}
Response: {"result": "The answer is 81."}
```

### Currency Converter
```bash
POST /api/currency/convert
{
  "amount": 100,
  "from": "USD",
  "to": "INR"
}
Response: {"result": 8300, "from_currency": "USD", "to_currency": "INR"}
```

### Calculation History
```bash
GET /api/history
```

---

## 🎨 Themes

1. **Deep Blue** - Professional blue with gold accents
2. **Constitution Gold** - Warm gold theme inspired by the Constitution
3. **Night Mode** - Dark theme for low-light usage
4. **Gradient Glow** - Modern gradient design

---

## 💰 Monetization

**100% Free Forever** - No premium features, no subscriptions.

**AdMob Integration** (Placeholder configured):
- Banner ads on calculator screens
- Interstitial ads every 5-7 sessions
- Easy to add your own AdMob Publisher ID

---

## 🔧 Customization

### Adding Your AdMob IDs
1. Get Publisher ID from Google AdMob
2. Add banner and interstitial ad unit IDs
3. Update ad components in the app

### Adding More Languages
1. Add language to `constants/languages.ts`
2. Add translations in i18n configuration
3. App auto-detects device language

---

## 📜 Dr. B.R. Ambedkar Quotes

The app features 25+ inspiring quotes including:
- "Educate, Agitate, Organize."
- "I measure the progress of a community by the degree of progress which women have achieved."
- "Life should be great rather than long."
- "Cultivation of mind should be the ultimate aim of human existence."

---

## 🙏 Credits

**Inspired by**: Dr. Bhimrao Ramji Ambedkar (1891-1956)
- Indian jurist, economist, social reformer, and political leader
- Chief architect of the Indian Constitution
- Champion of equality and education

---

## 📞 Support

For issues or feature requests, please contact the development team.

---

## 📄 License

This app is built as a tribute to Dr. B.R. Ambedkar's vision of accessible education and equality for all.

---

## 🌟 App Store Description

**Title**: Bhim Universal Calculator – Inspired by Dr. B.R. Ambedkar

**Short Description**:
Free AI-powered multilingual calculator with 20+ smart tools, business features, and daily Ambedkar quotes. Educate, Agitate, Organize.

**Keywords**: Ambedkar Calculator, Bhim App, Multilingual Calculator, Smart Calculator, AI Voice Calculator, GST EMI Loan, Free Calculator, Babasaheb Ambedkar

**Tags**: #JaiBhim #BhimCalculator #AmbedkarApp #UniversalCalculator #FreeAIApp #EducateAgitateOrganize

---

*Made with ❤️ for everyone - Free Forever*
