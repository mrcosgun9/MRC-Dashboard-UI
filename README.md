This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Configuration

The repository now includes a `.env.development` file with sane local defaults. Usage recommendations:

1. Copy `.env.development` to `.env.local` for any machine-specific or secret overrides (Git ignores `.env.local`).
2. Run the dev server; Next.js automatically loads `.env.local`, `.env.development`, then `.env` (falling back when keys are missing).
3. Public variables must be prefixed with `NEXT_PUBLIC_` to be exposed to the browser.

Key variables:

- `BASE_API` / `NEXT_PUBLIC_BASE_API`: Backend API base URL.
- `NEXT_PUBLIC_CHAT_HUB`: SignalR / websocket hub URL.
- `NEXT_PUBLIC_APP_DOMAIN`: Used to build absolute file/image URLs.
- `AUTH_SECRET`: NextAuth secret (replace in `.env.local` for real usage).
- `DATABASE_URL`: Prisma connection string (never commit production credentials).
- `MAIN_APP_PUBLIC_PATH`: Absolute path to the `public` directory used by file upload actions.

Production values should remain only in deployment-specific secrets (e.g., hosting platform environment variables) and not be committed.
