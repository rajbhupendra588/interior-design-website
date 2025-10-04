# Deployment Guide

This guide covers deploying the LuxeInteriors website to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Production build tested locally (`npm run build && npm start`)
- [ ] Lighthouse performance score ≥ 90
- [ ] All pages tested for responsiveness
- [ ] Forms tested and validated
- [ ] SEO metadata verified on all pages
- [ ] Analytics tracking configured

## 🚀 Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications, offering:
- Automatic SSL
- Global CDN
- Automatic deployments from Git
- Preview deployments for PRs
- Built-in analytics

### Steps:

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project settings (auto-detected for Next.js)

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   EMAIL_API_KEY=<your_value>
   CRM_API_KEY=<your_value>
   NEXT_PUBLIC_GA_ID=<your_value>
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=<your_value>
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your production URL (e.g., `luxeinteriors.vercel.app`)

5. **Custom Domain**
   - Go to Settings → Domains
   - Add your custom domain (e.g., `luxeinteriors.com`)
   - Update DNS records as instructed
   - SSL certificate is automatically provisioned

### Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t luxeinteriors .
docker run -p 3000:3000 --env-file .env.local luxeinteriors
```

## ☁️ AWS Deployment

### Option 1: AWS Amplify

1. Go to AWS Amplify Console
2. Connect your GitHub repository
3. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
4. Add environment variables
5. Deploy

### Option 2: AWS ECS (Elastic Container Service)

1. Build and push Docker image to ECR
2. Create ECS task definition
3. Create ECS service
4. Configure Application Load Balancer
5. Set up Auto Scaling
6. Configure CloudWatch for monitoring

### Option 3: AWS EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repository
git clone <your-repo-url>
cd interior-design-website

# Install dependencies
npm ci

# Build
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start npm --name "luxeinteriors" -- start
pm2 save
pm2 startup

# Configure Nginx as reverse proxy
sudo yum install nginx
sudo nano /etc/nginx/conf.d/luxeinteriors.conf
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name luxeinteriors.com www.luxeinteriors.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🌐 Cloudflare Configuration

1. **Add Site to Cloudflare**
   - Add your domain
   - Update nameservers at your registrar

2. **SSL/TLS Settings**
   - SSL/TLS → Overview → Full (strict)
   - Edge Certificates → Always Use HTTPS: On
   - Automatic HTTPS Rewrites: On

3. **Speed Optimizations**
   - Speed → Optimization
   - Auto Minify: Enable all (JS, CSS, HTML)
   - Brotli: On
   - Rocket Loader: Off (can interfere with React)

4. **Caching Rules**
   ```
   Cache Level: Standard
   Browser Cache TTL: 4 hours
   ```

5. **Page Rules** (optional)
   ```
   *luxeinteriors.com/images/*
   Cache Level: Cache Everything
   Edge Cache TTL: 1 month
   ```

## 📊 Post-Deployment Setup

### 1. Google Analytics

Add to `src/app/layout.tsx`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  )
}
```

### 2. Google Search Console

1. Verify site ownership
2. Submit sitemap: `https://luxeinteriors.com/sitemap.xml`
3. Monitor indexing status

### 3. Configure CDN for Images

Use Cloudflare Images or AWS CloudFront:
```typescript
// next.config.js
images: {
  loader: 'cloudflare',
  domains: ['your-cdn-domain.com'],
}
```

### 4. Set Up Monitoring

**Vercel Analytics** (if using Vercel):
```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Sentry for Error Tracking:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 5. Performance Monitoring

Use Lighthouse CI in your GitHub Actions:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://luxeinteriors.com
            https://luxeinteriors.com/portfolio
            https://luxeinteriors.com/services
          uploadArtifacts: true
```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use platform-specific secret management
   - Rotate API keys regularly

2. **CSP Headers**
   Add to `next.config.js`:
   ```javascript
   async headers() {
     return [{
       source: '/:path*',
       headers: [
         {
           key: 'Content-Security-Policy',
           value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com; style-src 'self' 'unsafe-inline';"
         }
       ]
     }]
   }
   ```

3. **Rate Limiting**
   Implement on API routes:
   ```typescript
   // Use libraries like 'express-rate-limit' or implement custom middleware
   ```

## 🎯 Rollback Strategy

### Vercel
- Go to Deployments tab
- Find previous successful deployment
- Click "..." → "Promote to Production"

### Docker/ECS
- Deploy previous image tag
- Update ECS service to use old task definition

### EC2 with PM2
```bash
git checkout <previous-commit>
npm ci
npm run build
pm2 restart luxeinteriors
```

## 📈 Performance Optimization

1. **Enable Caching**
   ```typescript
   // next.config.js
   async headers() {
     return [{
       source: '/images/:path*',
       headers: [
         {
           key: 'Cache-Control',
           value: 'public, max-age=31536000, immutable',
         },
       ],
     }]
   }
   ```

2. **Optimize Images**
   - Use Next.js Image component
   - Serve WebP/AVIF formats
   - Implement lazy loading

3. **Enable Compression**
   - Vercel: Automatic
   - Nginx: Enable gzip
   - AWS: Use CloudFront compression

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Verify variable names start with `NEXT_PUBLIC_` for client-side
- Restart development server after changes
- Check platform-specific env var syntax

### Performance Issues
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## 📞 Support

For deployment assistance:
- Email: devops@luxeinteriors.com
- Slack: #deployment channel

---

**Last Updated:** October 2025

