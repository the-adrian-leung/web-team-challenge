# Rick and Morty Wiki

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses TypeScript, Chakra UI for styling, and Apollo Client to query the Rick and Morty GraphQL API.

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone git@github.com:the-adrian-leung/web-team-challenge.git
cd web-team-challenge
yarn
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure
- src/app: Contains the main application components and pages.
- src/components: Contains reusable UI components such as CharacterModal, UserModal, and Footer.
- src/app/providers.tsx: Configures the context providers including Chakra UI, ThemeProvider, and Apollo Client.
- src/app/layout.tsx: Defines the root layout of the application.
- src/app/information/page.tsx: The Information Page that displays a list of characters with pagination and modals.
- src/app/user-info/page.tsx: The User Info Page that collects user information before accessing the Information Page.

## Features
- Responsive Design: The application is responsive and works on both mobile and desktop devices.
- User Information Modal: A blocking modal that collects the user's username and job title before accessing the data.
- Character Modal: Displays detailed information about a character when clicked.
- Pagination: Allows users to navigate through pages of characters.
- GraphQL Integration: Uses Apollo Client to query the Rick and Morty GraphQL API.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

[DEMO URL](https://web-team-challenge.vercel.app/)

## License
This project is licensed under the MIT License.

### Conclusion

The [README.md](http://_vscodecontentref_/1) file now includes updated and correct information about the project, its setup, usage, and features. This should make it easier for users to understand and work with the project.