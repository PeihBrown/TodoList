# TechTask Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack

- **Frontend**: Next.js App Router
- **Styling**: Chakra Ui, StoryBook
- **Package Manager**: npm
- **State Manage**: zustand
- **Testing**: Jest

## Project Structure

```
├── src/
│ ├── app/
│ │ └── page.tsx
│ ├── features/
│ │ └── tasks/
│ │ ├── components/
│ │ ├── hooks/
│ │ └── interfaces/
│ ├── stores/
│ └── ultis/
└── tsconfig.json
```

## Installation and Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/PeihBrown/TodoList.git
   cd TodoList
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Run preview story book:
   ```bash
   npm run storybook
   ```

5. Run linting:
   ```bash
   npm run lint
   ```

6. Run linting with auto-fix:
   ```bash
   npm run lint:fix
   ```

7. Run tests:
   ```bash
   npm test
   ```

   To run tests in watch mode:
   ```bash
   npm run test:watch
   ```

   To run tests with coverage:
   ```bash
   npm run test:coverage
   ```


## Features

This TodoList project is built with Next.js and includes several key features:

1. **Task Management with MockAPI Integration**
   - Add new tasks to your todo list
   - Update existing tasks
   - List Task and filter buttons
   - All task operations are synchronized with a MockAPI backend
   - API endpoint: `https://mockapi.io/projects/67052084031fd46a830ec126`

2. **Robust Testing**
   - Comprehensive unit tests for custom hooks and logic with Jest
   - Ensures reliability and maintainability of the application

3. **Code Quality Tools**
   - ESLint for code linting
     - Helps maintain consistent code style
     - Catches potential errors early in development
   - Prettier for automatic code formatting
     - Ensures uniform code style across the project

4. **UI Component Documentation with Storybook**
   - Interactive UI component Chakra UI library
   - Facilitates component development and testing in isolation
   - Provides a visual reference for all UI components used in the project

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.