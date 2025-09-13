# ArogyaLink Healthcare Platform

ArogyaLink is a comprehensive, AI-powered healthcare platform designed to revolutionize the way patients and providers manage health records, access intelligent medical insights, and utilize telemedicine. Built for modern healthcare needs, ArogyaLink ensures lifetime security and accessibility for health data, while leveraging the latest advancements in artificial intelligence for medical analysis and support.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
  - [Database & ORM](#database--orm)
  - [AI & External Services Integration](#ai--external-services-integration)
  - [Authentication & Session Management](#authentication--session-management)
  - [Data Storage Strategy](#data-storage-strategy)
  - [File Upload & Processing](#file-upload--processing)
  - [External Dependencies](#external-dependencies)
- [Getting Started](#getting-started)
  - [Local Development](#local-development)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Overview

ArogyaLink offers a unified interface for patients to store, manage, and analyze their lifetime health records. The platform integrates multiple advanced AI capabilities, including medical report analysis (MedGamma), medical image generation (Phorix), visual AI diagnostics (AILens), and medicine identification using computer vision. It supports secure telemedicine, personalized health insights, and emergency contact management, making it an essential tool for both individuals and healthcare professionals.

---

## Key Features

- **Centralized Health Record Management:** Store all medical documents, images, prescriptions, and consultation histories in one secure place.
- **AI-Driven Medical Analysis:** Automated insights for medical reports, advanced image analysis, and medicine identification through integrated AI services.
- **Medical Illustration Generation:** Utilize OpenAI’s DALL-E 3 and Phorix for on-demand generation of medical diagrams and educational images.
- **Visual AI Diagnostics:** Early detection of health issues using AI-powered analysis of X-rays, scans, and other medical images.
- **Telemedicine Services:** Schedule and manage virtual appointments, maintain consultation records, and store emergency contacts.
- **Personal Medicine Tracker:** Track prescriptions, dosages, and medicine schedules with intelligent reminders and identification.
- **User-Centric Design:** Responsive, accessible UI with dark mode, built for both mobile and desktop experiences.
- **Robust Security:** Session-based authentication, HTTP-only cookies, encrypted credentials, and CSRF protection for user safety.
- **Audit Trail and Historical Insights:** Persist AI analysis results for lifetime health tracking and auditability.

---

## System Architecture

### Frontend Architecture

- **Framework:** React with TypeScript, powered by Vite for lightning-fast development and builds.
- **UI Library:** Shadcn/ui, Radix UI primitives for accessibility, Lucide React icons for a consistent visual language.
- **Styling:** Tailwind CSS with custom tokens, responsive layouts, and dark mode support.
- **Routing:** Wouter for simple, lightweight SPA navigation.
- **State Management:** TanStack Query for efficient server state management, caching, and synchronization.
- **Component Structure:** Modular and reusable components with strong separation of logic, view, and state.
- **Form Handling:** React Hook Form for robust, type-safe forms and validation.
- **Utility Libraries:** date-fns for date manipulation, Class Variance Authority for dynamic class composition.

### Backend Architecture

- **Framework:** Express.js with TypeScript for scalable and maintainable RESTful APIs.
- **API Design:** Organized route handlers for users, files, records, consultations, and AI analysis.
- **File Handling:** Multer middleware for secure multipart file uploads, with strict size (10MB) and type checks (PDF, JPEG, PNG).
- **Authentication:** Replit Auth integration using OpenID Connect for federated, session-based authentication.
- **Middleware:** Custom logging, error handling, and security checks.
- **Bundling:** ESBuild for fast and optimized code deployments.

### Database & ORM

- **Database:** PostgreSQL hosted on Neon serverless infrastructure for high availability and scalability.
- **ORM:** Drizzle ORM for type-safe schema definitions, migrations, and queries.
- **Schema Management:** Centralized in a shared directory for consistency across frontend and backend.
- **Migrations:** Managed using Drizzle Kit for easy evolution and integrity.
- **Connection Pooling:** Neon driver for efficient database connections and scalability.

### AI & External Services Integration

- **Google Gemini API:** MedGamma for medical report analysis, AILens for image diagnostics, and text enhancement.
- **OpenAI API:** GPT-5 for advanced language processing, DALL-E 3 for medical illustration generation.
- **Phorix:** Medical image generation and enhancement for patient education.
- **Computer Vision:** Automated medicine identification and general image analysis.
- **File Processing:** Native support for medical documents (PDFs) and images (JPEG, PNG).

### Authentication & Session Management

- **Provider:** Replit Auth with OpenID Connect.
- **Session Storage:** PostgreSQL-backed, using connect-pg-simple for persistent, reliable login sessions.
- **User Profiles:** Comprehensive management of medical information, appointments, and emergency contacts.
- **Security Features:** HTTP-only cookies, encrypted session handling, and CSRF protection.

### Data Storage Strategy

- **Health Records:** Structured and indexed storage for all medical data, with secure file URLs.
- **AI Analysis Results:** Persistent storage of AI-generated insights, enabling historical audits.
- **Medicine Database:** Personal medicine tracking with dosage, schedule, and computer vision identification.
- **Consultation Records:** Telemedicine appointments and history.
- **Emergency Contacts:** Fast access to critical contact information.

### File Upload & Processing

- **Upload Strategy:** Multer-based handling with 10MB size limit per file.
- **Supported Formats:** PDF for documents/reports, JPEG/PNG for images.
- **Validation:** Type and size validation before file processing.
- **Storage:** Files are stored on the server filesystem with secure, URL-based access patterns.

### External Dependencies

- **Core AI Services:** Google Gemini (MedGamma, AILens), OpenAI (GPT-5, DALL-E 3), Phorix.
- **Database Services:** Neon Database serverless PostgreSQL.
- **Authentication:** Replit Auth, connect-pg-simple.
- **UI & Styling:** Radix UI, Shadcn/ui, Tailwind CSS, Lucide React.
- **Utilities:** TanStack Query, date-fns, Class Variance Authority, Multer, React Hook Form.

---

## Getting Started

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/arogyalink.git
   cd arogyalink
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   _(Run in both `frontend/` and `backend/` directories)_

3. **Configure Environment Variables**
   Copy `.env.example` to `.env` in both `frontend/` and `backend/` directories.
   Fill in your database URLs, API keys, and secrets. See [Environment Variables](#environment-variables).

4. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

5. **Start Frontend**
   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Access Application**
   Open your browser and visit: `http://localhost:5173`

### Environment Variables

**Backend (.env):**
```
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_GEMINI_API_KEY=your_google_gemini_key
OPENAI_API_KEY=your_openai_key
CORS_ORIGIN=http://localhost:5173
REPLIT_AUTH_CLIENT_ID=your_replit_client_id
REPLIT_AUTH_CLIENT_SECRET=your_replit_client_secret
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3000
```

---

## Project Structure

```
arogyalink/
├── backend/
│   ├── src/
│   │   ├── controllers/       # REST API route handlers (users, files, records, consultations, AI)
│   │   ├── db/                # Drizzle ORM schemas, queries, migrations
│   │   ├── middleware/        # Logging, error handling, authentication, security
│   │   ├── ai/                # Integration with Gemini, OpenAI, Phorix, CV
│   │   ├── utils/             # Helper functions/utilities
│   │   └── index.ts           # Express server entry point
│   ├── uploads/               # Medical file storage
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components (forms, cards, modals, etc.)
│   │   ├── pages/             # Main views (dashboard, health records, consultations, profile)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Frontend utilities
│   │   ├── styles/            # Tailwind CSS and custom styles
│   │   └── main.tsx           # App entry point
│   └── package.json
├── shared/
│   ├── db/                    # Centralized schema definitions
│   └── types/                 # Shared TypeScript types
├── README.md
└── .env.example
```

---

## Development Workflow

- **Frontend:** Vite-powered development server, modular TypeScript codebase, live HMR for rapid iteration.
- **Backend:** Type-safe REST APIs, organized route handlers, Drizzle ORM migrations, and Express.js middleware.
- **Testing:** Vitest or Jest for unit and integration tests.
- **Linting & Formatting:** ESLint and Prettier for code quality and consistency.
- **Database Management:** Drizzle Kit for effortless migrations and schema updates.
- **Deployment:** Deployable to Vercel, Netlify, or any Node.js host. Neon for serverless PostgreSQL.

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

## Contributing

ArogyaLink welcomes contributions from developers, healthcare professionals, and researchers.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feat/your-feature`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to your branch (`git push origin feat/your-feature`).
5. Open a Pull Request and describe your changes.

---

## Contact

Developed and maintained by **Sourabh Kumar**  
Email: [sourabhk0703@gmail.com](mailto:sourabhk0703@gmail.com)  
GitHub: [Sourabh Kumar](https://github.com/sourabhk00)

For support, partnership, or collaboration, please contact us.

---
