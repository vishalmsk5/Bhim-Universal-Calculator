# 🙏 Bhim Universal Calculator - Dr. B.R. Ambedkar Inspired

> "Educate, Agitate, Organize" - Dr. B.R. Ambedkar

A world-class, FREE calculator app inspired by Dr. B.R. Ambedkar, featuring AI voice calculator, 157 currencies, 20+ mini tools, and multilingual support.

---

## ✨ Features

### Core Calculators
- ✅ **Basic Calculator** - Modern interface, real-time results
- ✅ **Scientific Calculator** - Trig, log, power, factorial (using mathjs)
- ✅ **AI Voice Calculator** - Natural language voice input

### Financial & Business Tools
- 💰 **EMI Calculator** - Loan calculations
- 💰 **GST Calculator** - Tax calculations
- 💰 **Profit/Loss Calculator** - Business calculations
- 💰 **Discount Calculator** - Savings calculator
- 💰 **Expense Split** - Bill splitting tool

### Mini Calculators (20+)
- 🏗️ **Construction**, 📐 **BMI**, 💱 **Currency** (157 currencies), 🔢 **Unit Converter**
- ⚡ **Electricity**, ⛽ **Fuel**, 🏠 **Room Comfort**, 📚 **Study Timer**, and more...

### Ambedkar Inspiration
- 🙏 **Jai Bhim Greeting**, 🖼️ **Watermark**, 📖 **Daily Quotes**, 📚 **About Babasaheb**

### Other Features
- 🌍 **17 Languages**, 🎨 **4 Themes**, 📊 **History**, 📤 **Share**, 🔊 **Feedback**, 📱 **Offline-First**

---

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npx expo start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
echo "EMERGENT_LLM_KEY=your_key_here" > .env
python server.py
```

---

## 📱 Build Android APK

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for complete instructions:

```bash
cd frontend
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

---

## 📁 Project Structure

```
bhim-universal-calculator/
├── frontend/              # Expo React Native App
│   ├── app/              # Screens (index, settings, voice, explore, mini calculators)
│   ├── components/       # Reusable UI components
│   ├── constants/        # Themes, currencies, quotes
│   ├── store/            # Zustand state management
│   └── package.json
├── backend/              # FastAPI Backend
│   ├── server.py        # Main API
│   └── requirements.txt
└── docs/
    └── DEPLOYMENT_GUIDE.md  # Complete deployment guide
```

---

## 🛠️ Technologies

- **Frontend:** Expo, React Native, Zustand, mathjs, expo-speech
- **Backend:** FastAPI, MongoDB, emergent-integrations-llm
- **APIs:** Emergent LLM, exchangerate-api.com

---

## 📖 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - GitHub, APK building, Play Store publishing
- **[SHARE_RATEUS_FIX.md](SHARE_RATEUS_FIX.md)** - Recent bug fixes
- **[INFRASTRUCTURE_FIX.md](INFRASTRUCTURE_FIX.md)** - Infrastructure fixes

---

## 🙏 About Dr. B.R. Ambedkar

Dr. Bhimrao Ramji Ambedkar (1891-1956) - Indian jurist, economist, social reformer, and Father of the Indian Constitution. This app honors his vision of equality and education for all.

**Made with ❤️ to honor Dr. B.R. Ambedkar's legacy**

**Jai Bhim! 🙏**
