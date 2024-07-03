```markdown
  # TicketsPRO

  TicketsPRO is a personal project aimed at managing tickets through a web application built with React, TypeScript, and Firebase. It provides user authentication, allowing users to sign in with email/password or Google account. The application includes features for ticket creation, status tracking, and password recovery via email. It emphasizes clean UI design and UX optimization for seamless ticket management.

  ## Features

  - **User Authentication**: Sign in with email/password or Google account.
  - **Ticket Management**: Create, view, and track ticket statuses.
  - **Password Recovery**: Reset passwords via email verification.
  - **UI/UX**: Intuitive interface for easy navigation and usability.

  ## Technologies Used

  - React, TypeScript, SCSS, Firebase (Firestore, Authentication)
  - Other Tools: React Router, React Hook Form, Firebase SDK
```

## Getting Started

1. **Clone the repository:**

   ```git
   git clone https://github.com/DiegoXavier-hub/chamados.git
   cd ticketspro
   ```

2. **Install dependencies:**

   ```git
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add your Firebase configuration details in `src/services/firebaseConnection.ts`
   - Enable Email/Password and Google authentication methods
   - Set up Firestore database rules

4. **Run the application:**

   ```node
   npm start
   ```

5. **Open in your browser:**

   ```node
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
