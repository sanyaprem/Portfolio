# 🚀 V1 Portfolio

### ✅ Features Added:
1. **Top Navbar** - Smooth scroll to sections
2. **Resume Download** - Button in navbar
3. **Skills Section** - Proficiency bars (not charts!)
4. **Live GitHub** - Real-time repo data
5. **Architecture & Docs** - In project modals

## 🚀 Quick Start

### 1. Install
```bash
npm install --legacy-peer-deps
```

### 2. Run
```bash
npm run dev
```

### 3. Open
Visit: **http://localhost:3000**

## 🎨 Sections (In Order)

1. **Home** - Your V1 hero (unchanged)
2. **Projects** - Your V1 projects + architecture/docs in modals
3. **Skills** - NEW! Proficiency bars
4. **GitHub** - NEW! Live stats from your repos
5. **Articles** - Your V1 Medium articles (unchanged)

## 📝 Customize Your Content

### Add Your Resume:
1. Save as `/public/resume.pdf`
2. Download button works automatically!

### Update Projects:
File: `src/data/content.ts`

Projects already have architecture & docs! Example:
```typescript
{
  id: 'your-project',
  // ... other fields
  architecture: `
    **System Architecture:**
    Your architecture description here
  `,
  documentation: [
    '**Setup**: Installation steps',
    '**Usage**: How to use',
    '**Config**: Configuration details'
  ]
}
```

### Add Skills:
File: `src/data/content.ts`

```typescript
{ name: 'Python', category: 'Backend', proficiency: 95 }
```

Categories: `'AI/ML'`, `'Backend'`, `'Frontend'`, `'Tools'`, `'Data'`

## 🌐 Your URLs

- GitHub: `https://github.com/sanyaprem` ✅
- LinkedIn: `https://www.linkedin.com/in/sanyaprem/` ✅
- Medium: `@sanyapb` ✅
- Email: `sanyapb@gmail.com` ✅

## 🎯 Navbar Links

- Home → `#home`
- Projects → `#projects`
- Skills → `#skills` (NEW!)
- GitHub → `#github` (NEW!)
- Articles → `#articles`
- Resume → Downloads `/public/resume.pdf`

## 🔧 File Structure

```
portfolio-v1-clean/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # With Navbar
│   │   ├── page.tsx            # All sections
│   │   ├── globals.css         # No scrollbars!
│   │   └── api/medium/route.ts # Medium API
│   ├── components/
│   │   ├── AnimatedBackground.tsx  
│   │   ├── Hero.tsx                
│   │   ├── Projects.tsx            
│   │   ├── ProjectCard.tsx         
│   │   ├── Articles.tsx            
│   │   ├── Navbar.tsx              
│   │   ├── Skills.tsx              
│   │   └── GitHubStats.tsx         
│   └── data/
│       └── content.ts          
├── public/
│   ├── resume.pdf              # ADD YOUR RESUME
│   └── projects/               # ADD IMAGES (optional)
└── package.json
```

## 📱 Responsive

- Desktop: Full navbar, all features
- Mobile: Hamburger menu, stacked sections
- Tablet: Optimized layout

## 🚫 No Scrollbars!

Scrollbars are completely hidden but scrolling still works perfectly!

## 🌐 Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "V1 portfolio"
git push

# On vercel.com:
# 1. Import repository
# 2. Deploy
# 3. Done!
```

## 🛠 Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Three.js
- Framer Motion
- Lucide Icons
