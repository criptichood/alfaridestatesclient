# Alfarid Estates NextJS Starter (Inital Design with Firebase Studio)

This project is a NextJS starter application designed for Alfarid Estates, built within Firebase Studio. Incorporating essential features and internationalization capabilities.

## Features

- **Internationalization (i18n):** Supports English (en), French (fr), Hausa (ha), and Chinese (zh).
- **Navigation:** Includes a responsive header and footer.
- **Core Pages:** Homepage, Gallery, Videos, and Services sections.
- **AI Tool:** An integrated AI feature (details on specific functionality can be found within the `src/ai` directory).

## Environment Variables

This project requires Firebase environment variables to connect to your Firebase project. You will need to configure these in your local environment or in your hosting provider's settings. The required variables typically include:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

You can usually find these values in your Firebase project settings under "Project settings" -> "General" -> "Your apps".

## Running Locally
1. **Clone the repository:**
2. cd to the directory
3. npm install
4. npm run dev