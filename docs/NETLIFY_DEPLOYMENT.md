# Netlify Deployment Guide

## Automatic Deployment Status ✅

Your repository is now configured for **automatic deployment** to Netlify. Every push to `main` will trigger a new deployment.

## Recent Deployment

**Commit**: `feat: Complete design system refactor and Tailwind v4 migration`  
**SHA**: `d0c4925`  
**Status**: Pushed to GitHub ✅

## Netlify Configuration

Your project includes a comprehensive `netlify.toml` configuration:

### Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

### Deployment Contexts

#### Production (main branch)
```toml
command = "npm run build"
NODE_ENV = "production"
VITE_APP_ENV = "production"
```

#### Deploy Previews (PRs)
```toml
command = "npm run build"
NODE_ENV = "staging"
VITE_APP_ENV = "staging"
```

### Performance Features

✅ **CSS Processing**: Bundle and minify  
✅ **JS Processing**: Bundle and minify  
✅ **HTML Processing**: Pretty URLs  
✅ **Image Compression**: Enabled  
✅ **Caching**: Optimized headers for static assets  

### Security Headers

The following security headers are automatically applied:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Plugins

1. **Lighthouse Plugin** - Runs performance audits on every deploy
   - Performance: 90%+
   - Accessibility: 90%+
   - Best Practices: 90%+
   - SEO: 90%+

2. **Sitemap Submission Plugin** - Auto-submits sitemap to search engines
   - Google
   - Bing
   - Yandex

### Redirects & Routing

✅ **SPA Routing**: All routes redirect to `index.html` for client-side routing  
✅ **Internationalization**: Support for `/es/*` routes  
✅ **404 Handling**: Custom 404 page  

## Setting Up Netlify (If Not Already Connected)

### Option 1: Netlify Dashboard (Recommended)

1. **Go to Netlify**: https://app.netlify.com
2. **Click "Add new site"** → "Import an existing project"
3. **Connect to GitHub**: Select your repository
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - **Important**: Leave all other settings as default (netlify.toml will handle everything)
5. **Deploy!**

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize (in your project directory)
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Build command: npm run build
# - Publish directory: dist
# - Link to GitHub repository
```

### Option 3: netlify.toml in Repo (Already Done! ✅)

Your `netlify.toml` is already configured and committed. When you connect the repository to Netlify, it will automatically use these settings.

## Verifying Deployment

### 1. Check Netlify Dashboard
Visit: https://app.netlify.com/sites/[your-site-name]/deploys

You should see:
- ✅ Deploy status: Success
- ✅ Build time: ~1-2 minutes
- ✅ Deploy URL

### 2. Check Build Logs
Look for:
```
✓ built in 17.34s
Site is live ✨
```

### 3. Test Your Site
Visit your Netlify URL and verify:
- ✅ Homepage loads correctly
- ✅ All sections visible (Hero, Stats, Features, Roadmap, Community, CTA)
- ✅ Hover effects work (blue glow on cards)
- ✅ Custom colors applied (blue/violet accents)
- ✅ Animations work (fade-in, slide-up)
- ✅ Navigation works
- ✅ Footer displays properly
- ✅ Dark mode enabled by default

## Environment Variables

If you need to add environment variables:

### Via Netlify Dashboard
1. Go to **Site settings** → **Environment variables**
2. Add your variables:
   - `VITE_API_URL`
   - `VITE_ANALYTICS_ID`
   - etc.

### Via netlify.toml
Already configured for different contexts:
- Production: `VITE_APP_ENV=production`
- Staging: `VITE_APP_ENV=staging`
- Development: `VITE_APP_ENV=development`

## Custom Domain Setup

### 1. Add Domain in Netlify
1. Go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `liftfire.app`)

### 2. Configure DNS
Add these records to your DNS provider:

**For root domain (liftfire.app):**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer)
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

### 3. Enable HTTPS
Netlify automatically provisions SSL certificates via Let's Encrypt.

## Deployment Workflow

### Automatic Deployment
```bash
# Make changes
git add .
git commit -m "your changes"
git push origin main

# Netlify automatically:
# 1. Detects push
# 2. Runs npm install
# 3. Runs npm run build
# 4. Deploys dist/ folder
# 5. Runs Lighthouse audit
# 6. Submits sitemap
```

### Manual Deployment
```bash
# Via CLI
netlify deploy --prod

# Or via dashboard
# Trigger deploy → Deploy site
```

## Deployment Status Badge

Add to your README:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/[YOUR-SITE-ID]/deploy-status)](https://app.netlify.com/sites/[YOUR-SITE-NAME]/deploys)
```

## Troubleshooting

### Build Fails

**Check build logs** in Netlify dashboard:

Common issues:
1. **Node version mismatch** → Ensure Node 18+ in netlify.toml ✅
2. **Missing dependencies** → Check package.json
3. **Build errors** → Run `npm run build` locally first
4. **Tailwind not working** → Check `@import 'tailwindcss'` in index.css ✅

### Site Not Updating

1. **Clear Netlify cache**: Deploy settings → Clear cache and deploy
2. **Check branch**: Ensure you pushed to `main`
3. **Check deploy logs**: Look for errors

### Custom Colors Not Applied

This was the critical issue we fixed! ✅
- Old config was ignored in Tailwind v4
- Now using `@theme` in CSS
- If colors still not working, rebuild: `npm run build`

## Monitoring

### Lighthouse Reports
View after each deploy in Netlify dashboard:
- **Deploys** → Click deploy → **Plugin: Lighthouse**

### Sitemap Submission
Automatic submission to search engines after each deploy.

### Performance Monitoring
Check Netlify Analytics (if enabled) for:
- Page views
- Bandwidth
- Build minutes

## Next Steps

1. ✅ **Push to GitHub** - Done!
2. 🔄 **Check Netlify** - Deployment should be running
3. 👀 **Verify Site** - Check all features work
4. 🎉 **Share URL** - Your site is live!

## Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Support](https://www.netlify.com/support/)
- [Netlify Status](https://www.netlifystatus.com/)

---

**Your site is configured for automatic deployment!** 🚀

Every push to `main` will automatically build and deploy your site to Netlify.

