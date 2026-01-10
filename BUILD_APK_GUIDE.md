# 📱 Build Your Bhim Calculator APK - Complete Step-by-Step Guide

## ✅ Everything is Ready! Just Follow These Steps:

---

## 📋 **PART 1: First-Time Setup (Do Once)**

### Step 1: Install Node.js (if not installed)

**Check if you have Node.js:**
```bash
node --version
```

**If not installed, download from:** https://nodejs.org/
- Download the **LTS version** (Long Term Support)
- Install it on your computer
- Restart your terminal/command prompt

---

### Step 2: Install EAS CLI

Open your terminal/command prompt and run:

```bash
npm install -g eas-cli
```

**Wait for installation to complete** (takes 1-2 minutes)

**Verify installation:**
```bash
eas --version
```

You should see a version number like `5.x.x`

---

### Step 3: Create FREE Expo Account

**Option A: Through Terminal**
```bash
eas login
```

Follow the prompts:
- Choose "Sign up" if you don't have an account
- Enter your email
- Create a password
- Verify your email (check inbox)

**Option B: Through Website**
1. Go to: https://expo.dev/signup
2. Sign up with email or Google/GitHub
3. Verify your email
4. Then run `eas login` in terminal

---

## 🚀 **PART 2: Download Your Code**

### Option A: Using Git (if you pushed to GitHub)

```bash
git clone YOUR_GITHUB_REPO_URL
cd YOUR_REPO_NAME/frontend
```

### Option B: Download from Emergent Platform

1. Push code to GitHub using "Save to GitHub" button in Emergent
2. Go to your GitHub repository
3. Click green "Code" button → "Download ZIP"
4. Extract ZIP file
5. Open terminal in the `frontend` folder

---

## 📦 **PART 3: Install Dependencies**

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

**This will take 3-5 minutes** - be patient!

---

## 🏗️ **PART 4: Build Your APK (The Main Step!)**

### Step 1: Build APK

Run this command:

```bash
eas build --platform android --profile preview
```

### Step 2: Follow the Prompts

You'll see several questions:

#### ❓ **"Would you like to automatically create an EAS project?"**
→ Type: **Y** (Yes) and press Enter

#### ❓ **"Generate a new Android Keystore?"**
→ Type: **Y** (Yes) and press Enter
- This creates a signing key for your app
- Expo stores it securely for you

#### ❓ **"What would you like your Android application id to be?"**
→ Press Enter (uses default: `com.bhimcalculator.app`)
- Or type your own like: `com.yourname.bhimcalculator`

### Step 3: Wait for Build

You'll see:
```
✔ Build started
✔ Build in progress...
```

**Build Status Options:**
- Check status online: https://expo.dev/accounts/YOUR_ACCOUNT/projects/bhim-calculator/builds
- Or run: `eas build:list`

**Build Time:** Usually 10-20 minutes

### Step 4: Get Your APK!

When complete, you'll see:

```
✔ Build finished!

📦 APK Download URL:
https://expo.dev/accounts/[your-account]/projects/bhim-calculator/builds/[build-id]

Or scan this QR code to download on your phone:
[QR CODE]
```

**You can:**
1. **Click the URL** to download APK on your computer
2. **Scan QR code** with your phone to download directly
3. **Receive email** with download link

---

## 📲 **PART 5: Install APK on Your Phone**

### Method 1: Download Directly on Phone (Easiest)

1. Open the build URL on your phone's browser
2. Click "Download APK"
3. Allow "Install from unknown sources" (if prompted)
4. Open the downloaded APK file
5. Tap "Install"
6. Open "Bhim Universal Calculator"!

### Method 2: Transfer from Computer

1. Download APK to your computer
2. Connect phone via USB
3. Copy APK file to phone's Downloads folder
4. On phone: Open Files app → Downloads
5. Tap the APK file
6. Allow "Install from unknown sources" (if prompted)
7. Tap "Install"

---

## ✅ **VERIFICATION CHECKLIST**

After installing, test these features:

- [ ] App opens successfully
- [ ] Basic calculator works
- [ ] Scientific calculator works
- [ ] Settings page loads
- [ ] "Share App" button works (opens share dialog)
- [ ] "Rate Us" button works (shows confirmation)
- [ ] AI Voice calculator works (needs internet)
- [ ] Currency converter works (needs internet)
- [ ] Mini calculators work (EMI, GST, BMI, etc.)
- [ ] Themes change properly
- [ ] Settings persist after closing app

---

## 🎯 **QUICK COMMAND REFERENCE**

### Check Build Status
```bash
eas build:list
```

### Build Again (if needed)
```bash
eas build --platform android --profile preview
```

### Build for Play Store (AAB format)
```bash
eas build --platform android --profile production
```

### Cancel a Build
```bash
eas build:cancel
```

---

## 🆘 **TROUBLESHOOTING**

### Problem: "eas: command not found"
**Solution:**
```bash
npm install -g eas-cli
```

### Problem: "Not logged in"
**Solution:**
```bash
eas login
```

### Problem: "Build failed"
**Check:**
1. Run `eas build:list` to see error
2. Make sure all dependencies installed: `npm install`
3. Check you're in the `frontend` folder
4. Check internet connection

### Problem: "Cannot install APK"
**Solution:**
1. Go to phone Settings → Security
2. Enable "Install from unknown sources" or "Allow from this source"
3. Try installing again

### Problem: "App crashes on open"
**Check:**
1. Did you test with Expo Go first?
2. Is your backend running for API calls?
3. Check error logs in: Settings → Apps → Bhim Calculator → Storage → Clear cache

---

## 💡 **TIPS & BEST PRACTICES**

### 1. Test Before Building
Always test with Expo Go first:
```bash
npx expo start
```

### 2. Save Build URLs
Expo emails you the build link - save it! You can reinstall from the same link.

### 3. Version Updates
When you make changes:
1. Update `version` in `app.json` (e.g., "1.0.1")
2. Update `versionCode` (e.g., 2)
3. Build again

### 4. Monitor Builds
Check your build history: https://expo.dev/accounts/[your-account]/builds

### 5. Free Build Limits
- FREE: 30 builds/month
- If you need more: $29/month for unlimited

---

## 📊 **BUILD PROFILES EXPLAINED**

### `preview` Profile (APK)
- Creates standalone APK file
- For testing and sharing
- Direct install on phones
- **Use this for testing!**

### `production` Profile (AAB)
- Creates AAB for Google Play Store
- Smaller file size
- Optimized for store
- **Use this for publishing!**

### `development` Profile
- For development builds
- Larger file size
- More debugging info

---

## 🎉 **SUCCESS! What's Next?**

After you get your APK working:

1. **Test thoroughly** - Use all features
2. **Share with friends** - Get feedback
3. **Fix any bugs** - Update code, rebuild
4. **Build AAB for Play Store:**
   ```bash
   eas build --platform android --profile production
   ```
5. **Submit to Play Store** - See DEPLOYMENT_GUIDE.md

---

## 📞 **GET HELP**

### Expo Documentation
- **EAS Build Guide:** https://docs.expo.dev/build/introduction/
- **Build Troubleshooting:** https://docs.expo.dev/build-reference/troubleshooting/

### Common Questions
- **Q: How long does build take?**
  A: 10-20 minutes usually
  
- **Q: Can I build for iOS?**
  A: Yes! Use `--platform ios` (needs Mac for testing)
  
- **Q: Is my FREE build limit enough?**
  A: Yes! 30 builds/month is plenty for testing

- **Q: Where is my keystore saved?**
  A: Expo stores it securely in their cloud

- **Q: Can I download the same APK again?**
  A: Yes! The build URL stays active

---

## ✅ **YOUR FILES ARE READY!**

I've created these files for you:
- ✅ `/app/frontend/app.json` - Updated with Android config
- ✅ `/app/frontend/eas.json` - Build configuration
- ✅ This guide - Step-by-step instructions

**Everything is configured!** Just:
1. Download your code
2. Run the commands above
3. Get your APK!

---

## 🙏 **Final Checklist Before Building**

- [ ] Node.js installed
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Expo account created (FREE)
- [ ] Logged in (`eas login`)
- [ ] Code downloaded to your computer
- [ ] In the `frontend` folder
- [ ] Dependencies installed (`npm install`)
- [ ] Ready to run: `eas build --platform android --profile preview`

**GOOD LUCK! 🚀**

**After you get the APK, test everything and let me know if you need any fixes!**

**Jai Bhim! 🙏**
