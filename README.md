# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# CRUDappFrontend

## Tehnologii:

- React
- Vite
- Tailwind CSS

## Instalare si rulare:

bash:

- git clone https://github.com/onodi-blanka/CRUDappFrontend.git
- cd CRUDappFrontend
- npm install
- npm run dev

# CRUDapp (backend)

## Tehnologii:

- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT pentru autentificare
- Bcrypt pentru criptarea parolelor
- Jest pentru testare
- ES Modules

## Instalare si rulare:

bash:

- git clone https://github.com/onodi-blanka/CRUDapp.git
- cd CRUDapp
- npm install
- creare fisier .env care sa contina:
  DATABASE_URL="url-ul bazei de date"
  JWT_SECRET_KEY="cheie_secreta"
- npx prisma migrate dev --name init
- npm run dev
- npx prisma studio

## Instalare si rulare teste backend:

bash:

- npm install --save-dev jest
- se adauga in package.json:
  "scripts": {
  ...
  "test": "jest"
  }
- npm test (se ruleaza cand ne aflam in fisierul pt teste)
