# NatrajX Law Firm - Complete Implementation Guide

## 🎯 What Has Been Created

### ✅ Core Structure
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + Python with MongoDB support
- **Dummy Data**: Complete dataset for all pages
- **Color Scheme**: Limited to 3 colors (Red #DC2626, Gold #F59E0B, Dark Gray #1F2937)

### ✅ Components Created
1. **Navigation** - Sticky header with mobile menu
2. **Footer** - Multi-column with social links
3. **Hero** - Animated landing section
4. **Card Components** - Consistent design across all pages

### 📄 Pages to Implement

#### 1. Team Page (`/team`)
**Features:**
- Grid of team member cards
- Each card shows:
  - Name, designation, specialization
  - Experience years
  - Education
  - Contact info (email, phone)
  - Social links (LinkedIn, Twitter)
- Hover effects with lift animation
- Gradient header on cards

**Card Design:**
```tsx
<div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all card-glow">
  <div className="h-64 bg-gradient-to-br from-primary to-gold-600">
    {/* Name & Designation */}
  </div>
  <div className="p-6">
    {/* Details */}
  </div>
</div>
```

#### 2. Clients Page (`/clients`)
**Features:**
- Logo grid (2x2 on mobile, 4x4 on desktop)
- Client logos with fallback
- Industry tags
- Hover zoom effect
- CTA section at bottom

#### 3. Blog Pages (`/blog` and `/blog/[slug]`)
**Features:**
- Blog listing with image cards
- Category filters
- Individual blog post view
- Author info, read time, date
- Related posts

**Blog Card:**
```tsx
<div className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
  <img className="h-48 w-full object-cover" />
  <div className="p-6">
    <h3>Title</h3>
    <p>Excerpt</p>
    <div>Author, Date, Read Time</div>
  </div>
</div>
```

#### 4. Contact Page (`/contact`)
**Features:**
- Contact form with fields:
  - Name (required)
  - Email (required, validated)
  - Phone (required)
  - Practice Area (dropdown)
  - Message (textarea)
  - File upload (case files)
- Form validation
- Success/error messages
- Office locations with maps

**Form Implementation:**
```tsx
"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceArea: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to /api/v1/contact
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Form fields */}
    </form>
  );
}
```

#### 5. Our Channel Page (`/channel`)
**Features:**
- YouTube video grid
- Video thumbnails
- Title, views, duration
- Embedded player on click
- Subscribe button

**Video Card:**
```tsx
<div className="bg-white rounded-xl overflow-hidden shadow-lg">
  <img src={video.thumbnail} className="w-full h-48 object-cover" />
  <div className="p-4">
    <h3>{video.title}</h3>
    <div>Views: {video.views} • {video.duration}</div>
  </div>
</div>
```

#### 6. Internships Page (`/internships`)
**Features:**
- Program description
- Application form with fields:
  - Personal info (name, email, phone)
  - Education details
  - University/College
  - Year of study
  - Resume upload
  - Cover letter
  - Available dates
- Form submission to API

#### 7. Expertise Page (`/expertise`)
**Features:**
- Grid of 20 practice areas
- Each area shows icon + title
- Click leads to `/expertise/[id]`

#### 8. Expertise Detail Page (`/expertise/[id]`)
**Features:**
- Practice area description
- Services offered
- Top lawyer for this area (from team data)
- Enquiry form specific to this area
- Case studies/success stories

**Enquiry Form Fields:**
- Name, Email, Phone
- Company (optional)
- Brief description of legal need
- Preferred consultation date
- Submit to API with practice area tag

#### 9. Login Page (`/login`)
**Features:**
- Login form for admin/clients
- Email & password fields
- "Forgot password" link
- "Remember me" checkbox
- JWT authentication

**Login Form:**
```tsx
<form className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
  <h2>Login to NatrajX</h2>
  <input type="email" placeholder="Email" />
  <input type="password" placeholder="Password" />
  <button>Login</button>
</form>
```

## 🎨 Consistent Card Design Guidelines

### Color Usage
- **Primary (#DC2626)**: Buttons, links, important elements
- **Gold (#F59E0B)**: Accents, gradients with primary
- **Secondary (#1F2937)**: Dark text, headers

### Card Template
```tsx
<motion.div
  whileHover={{ y: -10 }}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border card-glow p-6"
>
  {/* Gradient accent */}
  <div className="h-2 w-full bg-gradient-to-r from-primary to-gold-600 rounded-t-2xl -mt-6 -mx-6 mb-4" />
  
  {/* Content */}
  <div className="space-y-4">
    {/* Your content here */}
  </div>
</motion.div>
```

### Hover Effects
```css
/* In globals.css */
.hover-lift {
  transition: transform 0.3s;
}

.hover-lift:hover {
  transform: translateY(-10px);
}

.card-glow::before {
  /* Shine effect on hover */
}
```

## 🔌 API Integration

### Contact Form Submission
```typescript
const response = await fetch('/api/v1/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### Fetching Blog Posts
```typescript
const posts = await fetch('/api/v1/blogs').then(r => r.json());
```

### Expertise Enquiry
```typescript
const response = await fetch(`/api/v1/expertise/${areaId}/enquiry`, {
  method: 'POST',
  body: JSON.stringify(enquiryData)
});
```

## 📱 Responsive Design

All cards use responsive grid:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

## 🚀 Next Steps

1. **Implement all page components** using the templates above
2. **Connect forms to backend API**
3. **Add real images** and content
4. **Test responsiveness** on all devices
5. **Deploy** to production

## 📦 File Structure

```
frontend/src/
├── app/
│   ├── page.tsx (Home)
│   ├── team/page.tsx
│   ├── clients/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── channel/page.tsx
│   ├── internships/page.tsx
│   ├── expertise/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   └── login/page.tsx
├── components/
│   ├── Navigation.tsx
│   └── Footer.tsx
└── data/
    └── dummyData.ts
```

## 💡 Implementation Priority

1. ✅ Core components (Nav, Footer, Hero)
2. ⏳ Team page (use dummy data)
3. ⏳ Clients page (use dummy data)
4. ⏳ Contact form (with validation)
5. ⏳ Blog pages (listing + individual)
6. ⏳ Channel page (YouTube videos)
7. ⏳ Internship application
8. ⏳ Expertise with enquiry
9. ⏳ Login page

All implementations should use the consistent card design and color scheme!
