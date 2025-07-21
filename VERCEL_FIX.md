# Vercel Image Fix Instructions

## The Problem
- Vercel is deploying from the `main` branch which has `character-ai-demo.html`
- Our fixes are on the `clean-main` branch which has `index.html`
- The `main` branch has secrets that prevent direct pushing

## Solution Options

### Option 1: Change Vercel Deployment Branch (Recommended)
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Git" section
4. Change the "Production Branch" from `main` to `clean-main`
5. Save and redeploy

### Option 2: Quick Fix on Current Deployment
Since we can't push to main due to secrets, you need to:

1. Go to GitHub web interface
2. Navigate to the `main` branch
3. Edit `character-ai-demo.html` directly
4. Find and replace all image paths:
   - Change `'./naincy pelosi.jpg'` to `'naincy-pelosi.jpg'` (fix the space in filename)
   - Remove all `./` prefixes from image URLs
   - Just use `'filename.jpg'` format

### Image Path Format That Works
```javascript
// ❌ Wrong
background-image: url('./image.jpg');
background-image: url('/image.jpg');

// ✅ Correct
background-image: url('image.jpg');
```

### Files That Need Images
All these files should be in your repository root:
- FriendGPT-3.jpg
- naincy-pelosi.jpg (NOT "naincy pelosi.jpg" with space)
- cryptoexpert.jpeg
- waifu-anime.jpg
- jennieGPT.jpg
- coacharnieGPT.jpg
- scarlett.png
- dev-matrix.png
- lunaGPT.png
- chef-marco.png
- alex-explorer.png
- melody-rivers.png
- sage-wisdom.png

## Verification
After making changes, visit:
- Your main site to check if avatars load
- `/image-test.html` (if using clean-main branch)
- `/debug.html` (if using clean-main branch)