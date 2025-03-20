# AI Recipe Generator

An AI-powered recipe generator that creates personalized recipes based on user-provided ingredients, dietary preferences, and images. Users can sign up using email/password or Google, customize their cooking preferences, and save their favorite recipes. The application leverages Google’s Generative AI for recipe creation, Firebase for authentication and data storage, and supports multiple languages through i18n.

## Overview

The **AI Recipe Generator** is an innovative application that uses AI to generate personalized recipes. The application accepts leftover ingredients (including images) and user preferences to output unique, tailored recipes. Users can authenticate via email/password or Google and save their recipes along with customized dietary preferences.

---

## Features

- **AI-Powered Recipe Generation:**  
  Uses Google Generative AI (Gemini API) to analyze images and ingredients, then generate detailed recipes.

- **User Authentication:**  
  Firebase Authentication for secure sign-up/sign-in with Email/Password and Google providers.

- **User Data Storage:**  
  Stores user-saved recipes and preferences in Firebase Firestore.

- **Multilingual Support:**  
  Internationalized interface supporting English, Japanese, and Chinese using react-i18next.

- **Responsive UI:**  
  Desktop and mobile views with dynamic tabs and accordion components enhanced with Framer Motion animations.

- **Ingredient Extraction from Images:**  
  Analyze images to automatically detect food ingredients with unique IDs, nutrient details, and selection states.

---

## Technologies Used

- **Frontend:**  
  React, TypeScript, Tailwind CSS, Framer Motion, react-i18next

- **Backend:**  
  Node.js, Express, Google Generative AI (Gemini API)

- **Authentication & Database:**  
  Firebase Authentication, Firestore

- **Deployment & Build:**  
  Vite, Node.js server

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/ai-recipe-generator.git
   cd ai-recipe-generator
   ```

2. **Install Dependencies for Frontend & Backend:**

   For the frontend (inside the `client` folder, if separated):

   ```bash
   npm install
   # or
   yarn install
   ```

   For the backend (inside the `server` folder):

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file for your backend with your Firebase credentials and Gemini API key. For example:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your_project
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   ```

   For the frontend, if using Vite, ensure you have a `.env` file with variables prefixed with `VITE_`.

---

## Environment Variables

- **Firebase:**  
  Configure your Firebase project credentials in the `.env` file.
- **Gemini API Key:**  
  Add your Gemini API key as `GEMINI_API_KEY`.

- **PORT:**  
  The backend server port (default: 5000).

---

## API Endpoints

- **GET /**  
  Root route to check if the server is running.

- **POST /get-ingredients**  
  Accepts an image file (via multipart/form-data) and returns a JSON array of ingredients extracted by AI.  
  _Example Ingredient Object:_

  ```json
  {
    "id": "unique-identifier",
    "name": "Tomato",
    "nutrients": {
      "calories": 18,
      "protein": 0.9,
      "carbs": 3.9,
      "fat": 0.2
    },
    "selected": false
  }
  ```

- **POST /generate-recipe**  
  Accepts ingredients, preferences, and language, then returns an AI-generated recipe.

---

## Authentication & User Data

The project uses Firebase Authentication to allow users to sign up with email/password and Google provider.  
User saved recipes and preferences are stored in Firestore.

For authentication, see:

- **Email/Password Sign Up & Sign In:**  
  Functions using `createUserWithEmailAndPassword` and `signInWithPopup`.
- **User Context:**  
  An AuthContext provides the current user data throughout the application.

For data storage, see:

- **Firestore:**  
  Functions to save and retrieve user recipes/preferences.

---

## Internationalization (i18n)

The application is fully internationalized using `react-i18next`.  
Translation keys are provided for common terms such as:

- **"minutes", "serving", "calories", "cuisine"**
- **"Your Ingredients", "Additional Ingredients", "Instructions"**
- **"Generate Recipe"**
- Dietary preferences, cooking preferences, and various authentication texts  
  Translations are available in English, Japanese, and Chinese.  
  To change languages, use the provided language switcher component.

---

## Running the Application

### Frontend

1. **Start the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Access the Application:**  
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### Backend

1. **Start the Server:**

   ```bash
   node server.js
   # or if using nodemon:
   nodemon server.js
   ```

2. **Backend Endpoints:**  
   The server listens on the port specified in your environment variables (default: 5000).

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes.
4. Push to your branch.
5. Create a Pull Request describing your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Generative AI Documentation](https://cloud.google.com/generative-ai)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
