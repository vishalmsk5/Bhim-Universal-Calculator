# 🚀 Bhim Universal Calculator - Complete Deployment Guide

## 📋 Table of Contents
1. [Save Code to GitHub](#save-to-github)
2. [Download Source Code](#download-code)
3. [Build Android APK](#build-android-apk)
4. [Deploy to Google Play Store](#deploy-to-play-store)

---

## 1️⃣ Save Code to GitHub {#save-to-github}

### Method 1: Using Emergent Platform (Recommended)

**Step 1: Connect GitHub Account**
1. Click your **profile icon** (top right corner)
2. Click **"Connect GitHub"**
3. Authorize Emergent to access your GitHub
4. If already connected, verify connection status

**Step 2: Push Code to GitHub**
1. In the chat interface, click **"Save to GitHub"** button
2. Select or create a branch (e.g., `bhim-calculator-main`)
3. Click **"PUSH TO GITHUB"**
4. Wait for confirmation message
5. Your code is now saved to your GitHub repository!

### Method 2: Manual GitHub Push

If you want to push manually from your local machine:

```bash
# Clone from your GitHub after pushing via Emergent
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Or if you already have the code locally
git init
git add .
git commit -m "Bhim Universal Calculator - Complete App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 2️⃣ Download Source Code {#download-code}

### Option 1: Download from GitHub (After Pushing)
1. Go to your GitHub repository
2. Click green **"Code"** button
3. Click **"Download ZIP"**
4. Extract ZIP file to your computer

### Option 2: Download from Emergent
1. Use the VS Code view in Emergent
2. Browse `/app/frontend` and `/app/backend` directories
3. Copy files manually
4. Or use "Download Project" if available in your plan

### Project Structure You'll Get:
```
bhim-universal-calculator/
├── frontend/               # Expo React Native App
│   ├── app/               # All screens (index, settings, voice, explore, mini calculators)
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable components
│   ├── constants/         # Themes, currencies, quotes
│   ├── contexts/          # React contexts
│   ├── store/             # Zustand stores
│   ├── package.json       # Dependencies
│   └── app.json          # Expo configuration
├── backend/               # FastAPI Backend
│   ├── server.py         # Main API server
│   ├── requirements.txt  # Python dependencies
│   └── .env             # Environment variables
└── README.md            # Documentation
```

---

## 3️⃣ Build Android APK {#build-android-apk}

### Prerequisites
1. **Node.js** installed (v18 or higher)
2. **Expo CLI** installed: `npm install -g expo-cli`
3. **EAS CLI** installed: `npm install -g eas-cli`
4. **Expo Account** (free account works)

### Step-by-Step Build Process

#### Step 1: Prepare app.json
First, update `/app/frontend/app.json` with your app details:

```json
{
  "expo": {
    "name": "Bhim Universal Calculator",
    "slug": "bhim-calculator",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1565C0"
    },
    "android": {
      "package": "com.yourname.bhimcalculator",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1565C0"
      },
      "permissions": [
        "RECORD_AUDIO",
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ]
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

**IMPORTANT**: Change `"package": "com.yourname.bhimcalculator"` to your unique package name!

#### Step 2: Install Dependencies
```bash
cd frontend
npm install
# or
yarn install
```

#### Step 3: Configure EAS Build
```bash
# Login to Expo
eas login

# Initialize EAS Build
eas build:configure
```

This creates `eas.json`:
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

#### Step 4: Build APK for Testing
```bash
# Build APK (for direct installation on phones)
eas build --platform android --profile preview
```

This will:
- Upload your code to Expo servers
- Build the APK in the cloud
- Provide a download link when complete (usually 10-20 minutes)
- Send you an email with the download link

#### Step 5: Build AAB for Play Store
```bash
# Build AAB (for Google Play Store)
eas build --platform android --profile production
```

### Alternative: Local Build with Expo (Simpler for Testing)

```bash
# For quick testing only
expo build:android -t apk

# Follow prompts:
# - Choose "Generate new keystore"
# - Wait for build to complete
# - Download APK from provided link
```

---

## 4️⃣ Deploy to Google Play Store {#deploy-to-play-store}

### Prerequisites
1. **Google Play Console Account** ($25 one-time registration fee)
2. **AAB file** from EAS Build (production profile)
3. **App assets**: Icon, screenshots, description
4. **Privacy Policy** (required for Play Store)

### Step 1: Prepare App Assets

**Required Assets:**
- **App Icon**: 512x512px PNG (high resolution)
- **Feature Graphic**: 1024x500px PNG
- **Screenshots**: 
  - At least 2 screenshots
  - Phone: 16:9 or 9:16 aspect ratio
  - Tablet: Optional but recommended
- **Short Description**: Max 80 characters
- **Full Description**: Max 4000 characters
- **Privacy Policy**: URL to your privacy policy

**Example Descriptions:**

**Short Description:**
```
Dr. Ambedkar-inspired calculator with AI, 20+ tools, 157 currencies. Free forever!
```

**Full Description:**
```
🙏 Jai Bhim! Bhim Universal Calculator

Inspired by Dr. B.R. Ambedkar's vision of education and equality, Bhim Universal Calculator is a world-class, completely FREE calculator app designed for everyone.

✨ FEATURES:
• Basic & Scientific Calculators with advanced functions
• AI Voice Calculator - Natural language processing
• 157 World Currencies - Real-time conversion
• Business Tools - EMI, GST, Profit/Loss, Discount calculators
• 20+ Mini Calculators - BMI, Currency, Construction, Discount, EMI, Expense Split, GST, Profit/Loss, and more
• 17 Languages - Full multilingual support
• 4 Beautiful Themes - Including Constitution Gold
• Daily Inspiration - Quotes from Dr. B.R. Ambedkar
• Ambedkar Watermark - Subtle tribute to Babasaheb

🎯 MISSION:
Following Dr. Ambedkar's principle of "Educate, Agitate, Organize," we provide world-class calculation tools FREE FOREVER to empower everyone.

📱 TECHNICAL EXCELLENCE:
• Offline-first design
• Fast & responsive
• Clean, modern interface
• Regular updates

💯 100% FREE - No Ads, No In-App Purchases, No Hidden Fees

Made with ❤️ to honor Dr. B.R. Ambedkar's legacy.

Jai Bhim! 🙏
```

### Step 2: Create App in Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **"Create app"**
3. Fill in details:
   - App name: **Bhim Universal Calculator**
   - Default language: **English (United States)**
   - App or game: **App**
   - Free or paid: **Free**
   - Category: **Tools** or **Productivity**
4. Accept declarations and create app

### Step 3: Complete Store Listing

Navigate to **"Store presence" → "Main store listing"**:

1. **App details**: Enter short & full description
2. **Graphics**: Upload icon, feature graphic, screenshots
3. **Categorization**: Tools/Productivity, Everyone rating
4. **Contact details**: Your email, website (optional), phone (optional)
5. **Privacy policy**: URL to your privacy policy

**Sample Privacy Policy** (You need to host this on a website):
```
Privacy Policy for Bhim Universal Calculator

Last updated: [DATE]

Bhim Universal Calculator ("we", "our", "us") is committed to protecting your privacy.

INFORMATION WE COLLECT:
- We do NOT collect any personal information
- We do NOT track your usage
- We do NOT share your data with anyone

DATA STORAGE:
- Calculation history stored locally on your device only
- Currency rates cached locally for offline use
- App settings stored locally

THIRD-PARTY SERVICES:
- Currency conversion uses exchangerate-api.com (no personal data sent)
- AI features use Emergent LLM (voice input processed, not stored)

PERMISSIONS:
- Microphone: Only for AI Voice Calculator feature (not recorded)
- Internet: Only for currency rates and AI features

CHILDREN'S PRIVACY:
- Our app does not knowingly collect information from children under 13

CONTACT:
For questions, contact: [YOUR EMAIL]

By using Bhim Universal Calculator, you agree to this policy.
```

### Step 4: Upload AAB File

1. Go to **"Release" → "Production"**
2. Click **"Create new release"**
3. Click **"Upload"** and select your AAB file
4. Fill in release notes:

```
🙏 Jai Bhim! Initial Release v1.0.0

Features:
✅ Basic & Scientific Calculators
✅ AI Voice Calculator
✅ 157 World Currencies
✅ 20+ Mini Calculators (EMI, GST, BMI, Currency, etc.)
✅ Business Tools (Profit/Loss, Discount, Split Bills)
✅ 17 Languages
✅ 4 Beautiful Themes
✅ Dr. Ambedkar Inspiration & Quotes
✅ 100% FREE Forever

"Educate, Agitate, Organize" - Dr. B.R. Ambedkar
```

### Step 5: Content Rating

1. Go to **"Policy" → "App content"**
2. Complete **Content rating questionnaire**
3. For a calculator app, answer:
   - No violence
   - No sexual content
   - No drugs/alcohol
   - No gambling
   - No user-generated content
4. Submit and receive your rating (likely Everyone)

### Step 6: Target Audience

1. Declare target age group: **13+** or **All ages**
2. Confirm app is suitable for children (if applicable)

### Step 7: Data Safety

1. Go to **"Data safety"** section
2. Answer questions:
   - Does your app collect or share user data? **NO**
   - Is data encrypted in transit? **YES** (if using HTTPS)
   - Can users request data deletion? **NOT APPLICABLE**
3. Submit form

### Step 8: Review and Publish

1. Complete all required sections (Play Console will show checklist)
2. Go to **"Publishing overview"**
3. Review everything one final time
4. Click **"Send for review"**
5. **Wait 1-7 days** for Google's review

### Step 9: After Approval

Once approved:
- Your app will be live on Google Play Store!
- Share the link: `https://play.google.com/store/apps/details?id=com.yourname.bhimcalculator`
- Update the "Rate Us" button in your app with this link

---

## 🎯 Quick Command Reference

### Build Commands
```bash
# Install dependencies
cd frontend && npm install

# Test locally
npx expo start

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production

# Check build status
eas build:list
```

### Backend Deployment (Optional)
```bash
# Your backend can be deployed to:
# - Railway.app
# - Render.com
# - Heroku
# - DigitalOcean
# - AWS/Google Cloud

# Example for Railway:
railway login
railway init
railway up
```

---

## 📞 Support & Resources

### Expo Documentation
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Submit to Play Store](https://docs.expo.dev/submit/android/)
- [App Configuration](https://docs.expo.dev/versions/latest/config/app/)

### Google Play Console
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Launch Checklist](https://developer.android.com/distribute/best-practices/launch/launch-checklist)

### Emergent Platform
- Use the support agent for platform-specific questions
- Check your subscription plan for Mobile Agent access

---

## ✅ Checklist Before Publishing

- [ ] Updated `app.json` with correct package name
- [ ] Created app icon and splash screen
- [ ] Tested app thoroughly on real Android device
- [ ] All features working (Share, Rate Us, AI Voice, etc.)
- [ ] Fixed all critical bugs
- [ ] Created Privacy Policy and hosted it online
- [ ] Registered Google Play Developer account ($25)
- [ ] Prepared all Play Store assets (icon, screenshots, descriptions)
- [ ] Built production AAB file
- [ ] Completed all Play Console requirements
- [ ] Reviewed app thoroughly before submission

---

## 🎉 Success Path Summary

1. **Save to GitHub** → Click "Save to GitHub" in Emergent
2. **Download Code** → Download ZIP from GitHub or use Emergent
3. **Build APK** → Use EAS Build (`eas build --platform android --profile preview`)
4. **Test APK** → Install on your phone and test everything
5. **Build AAB** → Use EAS Build production profile
6. **Setup Play Console** → Register, create app, complete store listing
7. **Upload AAB** → Submit for review
8. **Wait for Approval** → Usually 1-7 days
9. **Go Live!** → Your app is on Google Play Store!

**Need help?** Ask in the chat or use the support agent for platform-specific guidance.

**Jai Bhim! 🙏 Good luck with your app launch!**
