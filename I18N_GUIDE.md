# Internationalization (i18n) Guide

## Overview

This project uses **next-intl** for internationalization support. The app currently supports:
- **English (en)** - Default language
- **Hindi (hi)** - हिंदी

## 🌍 How It Works

### Architecture

1. **Middleware**: Automatically detects user's preferred language and redirects to appropriate locale
2. **Dynamic Routes**: All pages are nested under `[locale]` directory
3. **Translation Files**: JSON files in `/messages` directory contain all translations
4. **Locale Prefix**: Uses "as-needed" strategy (default locale 'en' has no prefix in URL)

### URL Structure

```
/ or /en → English (default)
/hi → Hindi
/hi/about → About page in Hindi
/portfolio → Portfolio in English (default)
```

## 📁 File Structure

```
src/
├── i18n.ts                          # i18n configuration
├── middleware.ts                    # Locale detection middleware
├── app/
│   ├── [locale]/                    # All localized pages
│   │   ├── layout.tsx              # Locale-specific layout
│   │   ├── page.tsx                # Home page
│   │   ├── about/
│   │   ├── portfolio/
│   │   ├── services/
│   │   └── ...
│   ├── layout.tsx                   # Root layout
│   ├── globals.css
│   └── admin/                       # Non-localized admin routes
├── components/
│   └── ui/
│       └── LanguageSwitcher.tsx     # Language switcher component
messages/
├── en.json                          # English translations
└── hi.json                          # Hindi translations
```

## 🚀 Usage

### 1. Using Translations in Components

#### Server Components (default in App Router)

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('navigation');
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

#### Client Components

```tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';

export function MyClientComponent() {
  const t = useTranslations('hero');
  const locale = useLocale();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

### 2. Creating Locale-Aware Links

```tsx
import { useLocale } from 'next-intl';
import Link from 'next/link';

export function MyComponent() {
  const locale = useLocale();
  
  // Helper function for locale-aware paths
  const getLocalePath = (path: string) => {
    return locale === 'en' ? path : `/${locale}${path}`;
  };
  
  return (
    <Link href={getLocalePath('/about')}>
      About Us
    </Link>
  );
}
```

### 3. Adding New Translations

1. Add the translation key to both language files:

**messages/en.json**
```json
{
  "common": {
    "newKey": "New English Text"
  }
}
```

**messages/hi.json**
```json
{
  "common": {
    "newKey": "नया हिंदी पाठ"
  }
}
```

2. Use it in your component:
```tsx
const t = useTranslations('common');
return <div>{t('newKey')}</div>;
```

### 4. Adding a New Language

1. **Add locale to configuration** (`src/i18n.ts`):
```typescript
export const locales = ['en', 'hi', 'es'] as const; // Add 'es' for Spanish

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिंदी',
  es: 'Español', // Add Spanish name
};
```

2. **Create translation file** (`messages/es.json`):
```json
{
  "navigation": {
    "home": "Inicio",
    "about": "Acerca de",
    ...
  }
}
```

3. **Test the new locale** by visiting `/es`

## 🎨 Language Switcher Component

The `LanguageSwitcher` component is already integrated into the Header. It:
- Shows current language with a globe icon
- Displays a dropdown with available languages
- Maintains the current page when switching languages
- Automatically handles locale routing

```tsx
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// Use anywhere in your app
<LanguageSwitcher />
```

## 📝 Translation File Structure

Translations are organized by feature/section:

```json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    ...
  },
  "hero": {
    "title": "Crafting Homes",
    ...
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    ...
  }
}
```

### Best Practices

1. **Nested Keys**: Group related translations
2. **Descriptive Names**: Use clear, semantic key names
3. **Consistency**: Keep the same structure across all language files
4. **Variables**: Use placeholders for dynamic content:

```json
{
  "greeting": "Hello, {name}!"
}
```

```tsx
t('greeting', { name: 'John' }) // → "Hello, John!"
```

## 🔧 Configuration

### Locale Detection Strategy

The middleware uses automatic locale detection based on:
1. URL path (e.g., `/hi/about`)
2. Browser's language preference (Accept-Language header)
3. Falls back to default locale ('en')

### Locale Prefix Strategy

We use `'as-needed'` strategy:
- Default locale (en): No prefix → `/about`
- Other locales: With prefix → `/hi/about`

To change this, edit `src/middleware.ts`:

```typescript
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Options: 'always', 'as-needed', 'never'
});
```

## 🎯 Common Scenarios

### Scenario 1: Translating Dynamic Content

For content from CMS or database, consider:

```tsx
const projects = [
  { 
    id: 1, 
    title_en: "Modern Villa",
    title_hi: "आधुनिक विला",
    description_en: "...",
    description_hi: "..."
  }
];

// In component
const locale = useLocale();
const project = projects[0];
const title = locale === 'en' ? project.title_en : project.title_hi;
```

### Scenario 2: SEO & Metadata

Update metadata for each locale:

```tsx
// app/[locale]/about/page.tsx
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  };
}
```

### Scenario 3: Formatting Dates & Numbers

```tsx
import { useFormatter } from 'next-intl';

function MyComponent() {
  const format = useFormatter();
  
  return (
    <div>
      {/* Format numbers */}
      <p>{format.number(1234.56, { style: 'currency', currency: 'INR' })}</p>
      
      {/* Format dates */}
      <p>{format.dateTime(new Date(), { dateStyle: 'long' })}</p>
    </div>
  );
}
```

## 🐛 Troubleshooting

### Issue: "Messages are not defined"
**Solution**: Ensure you're using the component inside `NextIntlClientProvider` (already set up in `[locale]/layout.tsx`)

### Issue: Links not working after adding i18n
**Solution**: Update all internal links to use locale-aware paths:
```tsx
// Before
<Link href="/about">About</Link>

// After
const locale = useLocale();
<Link href={`/${locale === 'en' ? '' : locale + '/'}about`}>About</Link>
```

### Issue: Admin routes affected by i18n
**Solution**: Admin routes are excluded in middleware. Keep them outside `[locale]` directory.

## 📚 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Unicode CLDR](https://cldr.unicode.org/) - For proper locale data

## 🔄 Migration Guide

If you need to add i18n to existing pages:

1. Move the page from `app/page-name/` to `app/[locale]/page-name/`
2. Replace hardcoded text with `t()` calls
3. Add translations to JSON files
4. Update internal links to be locale-aware
5. Test both languages

## ✅ Checklist for New Pages

- [ ] Page is inside `app/[locale]/` directory
- [ ] All text uses `t()` from `useTranslations()`
- [ ] All internal links are locale-aware
- [ ] Translations added to both `en.json` and `hi.json`
- [ ] Metadata is translated (if applicable)
- [ ] Tested in both languages

---

**Need Help?** Check the existing components (`Header.tsx`, `HeroSection.tsx`) for implementation examples.

