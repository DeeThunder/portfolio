# Netlify Deployment Guide

## Quick Deploy (5 minutes)

### Prerequisites
- GitHub account
- Netlify account (free tier is fine)
- Your portfolio code pushed to GitHub

---

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Sleek engineering portfolio"

# Create main branch
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git push -u origin main
```

---

## Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your repositories
5. Select your portfolio repository

---

## Step 3: Configure Build Settings

Netlify should auto-detect Next.js, but verify these settings:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 or higher (set in Environment Variables if needed)

Click **"Deploy site"**

---

## Step 4: Wait for Deployment

- Initial deployment takes 2-3 minutes
- Netlify will show build logs
- Once complete, you'll get a URL like: `https://random-name-123.netlify.app`

---

## Step 5: Custom Domain (Optional)

### Option A: Netlify Subdomain
1. Go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Enter your preferred name: `yourname-portfolio.netlify.app`

### Option B: Custom Domain
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions
5. Netlify provides free SSL certificate

---

## Automatic Deployments

Every time you push to GitHub, Netlify will automatically:
1. Pull the latest code
2. Run `npm run build`
3. Deploy the new version
4. Your site updates in ~2 minutes

---

## Environment Variables (If Needed Later)

If you add features that need environment variables:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Enter key and value
4. Redeploy the site

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify `package.json` has all dependencies
- Ensure Node version is 18+

### 404 Errors
- Verify publish directory is `.next`
- Check Next.js version compatibility

### Slow Build Times
- Builds typically take 2-3 minutes
- If longer, check for large dependencies

---

## Next.js Specific Settings

### next.config.js
Your current config is already set up for static export:

```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For static export compatibility
  },
}
```

This ensures images work correctly on Netlify.

---

## Performance Optimization

After deployment, check your site's performance:

1. Run Lighthouse audit in Chrome DevTools
2. Check Core Web Vitals
3. Optimize images if needed
4. Enable Netlify's asset optimization (optional)

---

## Monitoring

Netlify provides:
- **Analytics** (paid feature)
- **Deploy notifications** (email/Slack)
- **Build logs** (free)
- **Form submissions** (if you add forms later)

---

## Cost

- **Free tier includes**:
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - Automatic HTTPS
  - Continuous deployment
  - Custom domain support

This is more than enough for a personal portfolio!

---

## Your Portfolio is Ready! 🚀

Once deployed, share your portfolio URL:
- Add it to your resume
- Share on LinkedIn
- Include in GitHub profile
- Use in job applications

**Example URL**: `https://atanda-peace.netlify.app`
