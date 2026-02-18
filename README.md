# Nanny Services

A modern web application for finding and booking appointments with professional nannies. The platform allows parents to browse caregiver profiles, filter candidates, save favourites, and schedule appointments — all in one place.

## 🚀 Features

- **Authentication** — Secure Sign Up, Log In, and Log Out via Firebase Authentication.
- **Nannies Catalog** — Browse a list of nannie profiles including avatar, name, rating, price per hour, location, experience, and education.
- **Read More / Reviews** — Expand any card to read the nanny's full bio and verified parent reviews.
- **Filtering & Sorting** — Filter/sort nannies by:
    - Alphabetical order (A → Z, Z → A)
    - Price (Low → High, High → Low)
    - Popularity (by Rating)
- **Load More** — Paginated listing (3 cards per page) with a "Load more" button.
- **Favourites** — Authenticated users can toggle favourites; data is persisted in Firebase Realtime Database in real time.
- **Appointment Booking** — Modal form with:
    - Fields: name, e-mail, phone, date of birth, comment.
    - Custom time-picker dropdown (30-min slots, 09:00–18:00).
    - Validation via `react-hook-form` + `yup`.
    - Success / error notifications (react-hot-toast).
    - Pre-fill of name, e-mail, and phone from the authenticated user's profile.
- **Responsive Design** — Fully adaptive layout for Desktop (≥1440px), Tablet (≤1024px), and Mobile (≤480px).
- **Theme Switcher** — 4 colour themes (Red / Blue / Green / Dark), persisted in localStorage.

## 🛠 Tech Stack

| Layer            | Technologies                                        |
| ---------------- | --------------------------------------------------- |
| **Frontend**     | React 19, TypeScript                                |
| **Build**        | Vite 7                                              |
| **Routing**      | React Router DOM 7                                  |
| **Styling**      | CSS Modules, `clsx`, `modern-normalize`             |
| **Forms**        | `react-hook-form`, `yup`, `@hookform/resolvers`     |
| **Backend / DB** | Firebase Realtime Database, Firebase Authentication |
| **Icons / UX**   | `react-icons`, `react-hot-toast`                    |

## 📂 Project Structure

```
src/
├── assets/               # Static images (hero photo, etc.)
├── components/
│   ├── AppointmentForm/  # Booking modal form
│   ├── Filters/          # Sorting/filtering dropdown
│   ├── FloatingActions/  # Floating theme & scroll buttons
│   ├── Header/           # Navigation, auth triggers, burger menu
│   ├── Layout/           # App shell with outlet
│   ├── Loader/           # Spinner component
│   ├── LoginForm/        # Login modal form
│   ├── Modal/            # Reusable portal modal
│   ├── NannyCard/        # Nanny profile card with expand/reviews
│   ├── RegistrationForm/ # Registration modal form
│   ├── ScrollToTop/      # Auto-scroll to top on navigation
│   ├── ThemeSwitcher/    # Colour theme selector
│   └── shared/           # Shared UI primitives
├── firebase/
│   ├── firebase.ts       # Firebase app initialisation
│   └── constants.ts      # DB root path constants
├── hooks/
│   ├── useAuth.ts        # Firebase Auth state & methods
│   ├── useFavorites.ts   # Real-time favourites (read + toggle)
│   ├── useFormHelpers.ts # Shared form success/reset logic
│   ├── useModal.ts       # Modal open/close state
│   └── useNannyFilter.ts # Sorting & filtering logic
├── pages/
│   ├── HomePage/         # Landing page with hero section
│   ├── NanniesPage/      # Full nannies catalog
│   └── FavoritesPage/    # Saved nannies (auth-protected)
├── types/
│   └── nanny.ts          # Nanny & Review TypeScript interfaces
├── App.tsx               # Route declarations
├── index.css             # Global CSS variables & themes
└── main.tsx              # App entry point
```

## 📦 Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-username/nanny-services.git
cd nanny-services
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure Firebase**

Create a `.env` file in the project root:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_DATABASE_URL=your_database_url
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

> **Note:** Never commit `.env` to version control. It is already listed in `.gitignore`.

**4. Run the development server**

```bash
npm run dev
```

**5. Build for production**

```bash
npm run build
```

**6. Preview the production build**

```bash
npm run preview
```

## 🔐 Security Notes

- All Firebase secrets are stored in `.env` (not committed to Git).
- Favourites are stored under `users/{uid}/favorites` in Firebase Realtime Database — only accessible by the authenticated owner via Firebase Security Rules.
- Auth state is managed entirely client-side via Firebase SDK; no custom backend is exposed.

## 📄 License

This project was created as a pet project for study purposes. Feel free to fork and adapt.
