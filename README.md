# This project contains the following technologies

AI (Artificial Intelligence) tools:
- OpenAI (creating AI models)
- Replicate (creating AI models)

Animation and Interaction:
- Typed.js (text animation)

Authentication and User Management:
- Clerk (Authentication and User Management)

Core Technologies:
- React 19
- TypeScript
- Next 15 (framework)

Data Fetching and State Management:
- Axios (sending requests to backend)
- Prisma 6 (ORM for DB)
- React Hook Form (working with forms)
- Zustand (state management)

Form and Validation:
- Zod (first schema validation)

Image Handling and Optimization:
- Sharp (image optimizer)

Middleware and Server Utilities:
- Concurrently (all projects are running in tandem)

Payment:
- Stripe (payment service provider)

Real-time Communication:
- Crisp (chat service provider)

Styling and UI Frameworks:
- Lucide React (stylization)
- Next Themes (using theme switcher)
- shadcn/ui (stylization)
- Tailwind CSS (stylization)
- Sonner (stylization)

Text Editing:
- React Markdown
- React Syntax Highlighter (adding syntax highlight to code)

Utilities and Libraries:
- Knip (code analyzer and declutter)
- PostCSS (transforms CSS code to AST)


# Project setup commands:
terminal powershell -> `npm i` (install dependencies)
terminal powershell -> `npx npm-check-updates --interactive` (update dependencies)
terminal powershell -> `npm run all`
terminal powershell -> `npm run lint` (loading ESLint checker)
terminal powershell -> `npm run types` (loading TypeScript checker)
terminal powershell -> `npm run knip` (loading Knip checker)

# Database commands:
terminal powershell -> `npx prisma generate`
terminal powershell -> `npx prisma db push`
terminal powershell -> `npx prisma migrate reset`

terminal powershell -> `npx prisma db seed` (loading test DB)

# GitHub commands:
terminal powershell -> `git pull origin master` (get latest changes)

terminal powershell -> `git add .` (add all changes)
terminal powershell -> `git commit -m "commit message"` (commit changes)
terminal powershell -> `git checkout -b <branch-name>` (create new branch)

terminal powershell -> `git push origin master` (push changes to master)
terminal powershell -> `git push origin <branch-name>` (push changes to branch)

# Stripe commands:
terminal CommandPrompt -> `stripe login`
terminal CommandPrompt -> `stripe listen --forward-to localhost:3000/api/webhook`