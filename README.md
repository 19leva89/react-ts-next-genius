This project contains the following technologies

Authentication and User Management:
- Clerk (Authentication and User Management)

Core Technologies:
- React 19
- TypeScript
- Next 15 (framework)

Data Fetching and State Management:
- Prisma 6 (ORM for DB)

Image Handling and Optimization:
- Sharp (image optimizer)

Middleware and Server Utilities:
- Concurrently (all projects are running in tandem)

Styling and UI Frameworks:
- Next Themes (using theme switcher)
- shadcn/ui (stylization)
- Tailwind CSS (stylization)

Utilities and Libraries:
- Knip (code analyzer and declutter)
- PostCSS (transforms CSS code to AST)


To run the client and server via concurrently:
terminal powershell -> npm run all
terminal powershell -> npm run lint (loading ESLint checker)
terminal powershell -> npm run knip

terminal powershell -> npx prisma generate
terminal powershell -> npx prisma db push
terminal powershell -> npx prisma db pull
terminal powershell -> npx prisma db seed (loading test DB)
terminal powershell -> npx prisma migrate reset

terminal CommandPrompt -> stripe login
terminal CommandPrompt -> stripe listen --forward-to localhost:3000/api/webhook