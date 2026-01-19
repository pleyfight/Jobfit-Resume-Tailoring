# ResumeAI - Application Setup Guide

## Overview
ResumeAI is a full-stack Next.js 14 application that uses Google Gemini AI to create tailored, ATS-optimized resumes based on job descriptions.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **UI Components**: Shadcn UI
- **Database/Auth/Storage**: Supabase
- **AI Engine**: Google Gemini API (@google/generative-ai)
- **Form Management**: React Hook Form + Zod

## Prerequisites
1. Node.js 18+ installed
2. Supabase account and project
3. Google Gemini API key

## Environment Setup

### 1. Clone and Install Dependencies
```bash
cd /workspaces/Resume-Tailoring
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Supabase Database Setup

#### Run Migrations
Execute the SQL migrations in your Supabase SQL Editor in order:

1. `/supabase/migrations/001_initial_schema.sql`
2. `/supabase/migrations/002_storage_setup.sql`
3. `/supabase/migrations/003_generated_resumes.sql`

#### Create Demo User Profile
For MVP testing without authentication, create a demo user:

```sql
-- Insert demo user into auth.users (if not using Supabase Auth)
INSERT INTO public.profiles (id, full_name, email)
VALUES ('00000000-0000-0000-0000-000000000000', 'Demo User', 'demo@example.com')
ON CONFLICT (id) DO NOTHING;
```

#### Configure Storage Bucket
1. Go to Supabase Dashboard → Storage
2. Create a new bucket called `resumes`
3. Set it to **Public** (or configure appropriate RLS policies)

### 4. Get Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

## Development

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Access the Dashboard
Navigate to: `http://localhost:3000/dashboard`

## Application Architecture

### Database Schema
- **profiles**: User biographical information
- **work_experiences**: Employment history (duties + achievements)
- **educations**: Academic credentials
- **skills**: Technical, soft, and tool proficiencies
- **uploaded_documents**: PDF/DOCX resume uploads
- **generated_resumes**: AI-generated tailored outputs

### API Routes

#### POST `/api/ingest/upload`
Upload PDF/DOCX resume files to Supabase Storage

**Request**: `FormData` with `file` field
**Response**: Document metadata

#### POST `/api/ingest/manual`
Save manually entered user information

**Request**:
```json
{
  "profile": { "full_name": "...", "email": "...", ... },
  "work_experiences": [...],
  "educations": [...],
  "skills": [...]
}
```

#### POST `/api/generate`
Generate tailored resume using Gemini AI

**Request**:
```json
{
  "jobDescription": "string",
  "useDocuments": boolean
}
```

**Response**:
```json
{
  "success": true,
  "tailoredResume": {
    "summary": "...",
    "workExperiences": [...],
    "skills": { "technical": [...], "tools": [...], "soft": [...] },
    "education": [...],
    "matchScore": 85,
    "keyStrengths": [...],
    "recommendations": [...]
  }
}
```

### Component Structure

#### `/app/dashboard/page.tsx`
Main dashboard orchestrating the entire flow

#### `/components/IngestionForm.tsx`
Two-tab interface:
- **Upload Tab**: Drag-and-drop file uploader
- **Manual Tab**: Accordion-based forms for:
  - Basic Info
  - Work Experience (with highlighted "Achievements" field)
  - Education & Skills

#### `/components/JobTargetInput.tsx`
Large textarea for job description + Generate button

#### `/components/ResumeViewer.tsx`
A4-styled preview with:
- Match score badge
- Formatted sections (Summary, Experience, Skills, Education)
- Download functionality
- Recommendations panel

## Design System

### Colors (OKLCH)
- **Background**: `#F7F5F3` (Warm Grey)
- **Foreground**: `#2D2D2D` (Charcoal)
- **Accent**: `#6B6B6B` (Medium Grey)
- **Borders**: `#D1D1D1`, `#E5E5E5`

### Typography
- **Headings**: Instrument Serif (font-serif)
- **Body**: Inter (font-sans)

### Key UI Patterns
- **Cards**: White background with shadow-sm and border
- **Accordions**: Collapsible sections with rotate chevron
- **Achievements Field**: Highlighted with amber background to emphasize priority
- **Loading States**: Spinner animations on async actions

## Usage Flow

1. **Navigate to Dashboard** (`/dashboard`)
2. **Choose Input Method**:
   - **Option A**: Upload existing resume (PDF/DOCX)
   - **Option B**: Manually enter information via forms
3. **Paste Job Description** in the right panel
4. **Click "Generate Tailored Resume"**
5. **Review Output**: 
   - See match score
   - Review tailored content
   - Read recommendations
6. **Download** as text file

## AI Prompt Strategy

The Gemini prompt is designed to:
1. **Analyze** job description for keywords and requirements
2. **Map** user's experience to job requirements
3. **Prioritize** quantifiable achievements over generic duties
4. **Reorder** skills and experiences based on relevance
5. **Output** structured JSON for consistent rendering

### STAR Method
The AI is instructed to rewrite generic duties using the STAR framework:
- **S**ituation: Context
- **T**ask: Responsibility
- **A**ction: What you did
- **R**esult: Quantifiable outcome

## Troubleshooting

### Supabase Connection Errors
- Verify environment variables are set correctly
- Check Supabase project status
- Ensure RLS policies allow operations for demo user

### Gemini API Errors
- Verify API key is valid
- Check API quota/limits
- Ensure proper error handling in `/api/generate/route.ts`

### File Upload Issues
- Confirm `resumes` bucket exists in Supabase Storage
- Check bucket permissions (public or appropriate RLS)
- Verify file type validation (PDF/DOCX only)

### TypeScript Errors
```bash
npm run build
```
This will show any type errors that need fixing.

## Production Deployment

### Pre-Deployment Checklist
- [ ] Replace demo user ID with real authentication
- [ ] Implement proper RLS policies for all tables
- [ ] Add rate limiting to API routes
- [ ] Implement proper error logging (e.g., Sentry)
- [ ] Add file size limits and virus scanning for uploads
- [ ] Implement PDF text extraction library
- [ ] Add user session management
- [ ] Configure CORS policies
- [ ] Set up CI/CD pipeline

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel Dashboard.

## Future Enhancements

1. **Authentication**: Integrate Supabase Auth or NextAuth.js
2. **PDF Generation**: Use jsPDF or Puppeteer for professional PDF output
3. **Template Selection**: Multiple resume templates/styles
4. **Version History**: Track and compare different tailored versions
5. **Keyword Analysis**: Visual highlighting of matched keywords
6. **Cover Letter Generation**: Extend to cover letters
7. **Multi-Language Support**: i18n integration
8. **Real-time Collaboration**: Share and get feedback
9. **ATS Score Calculator**: Detailed ATS compatibility metrics
10. **LinkedIn Integration**: Import profile data directly

## Support

For issues or questions:
- Check `/TESTING_GUIDE.md` for testing procedures
- Review `/BACKEND_API_DOCS.md` for API details
- See `/IMPLEMENTATION_SUMMARY.md` for architecture overview

---

**Built with ❤️ using Next.js 14, Supabase, and Google Gemini AI**
