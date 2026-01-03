## project started learning started

## ES Lint Configuration

The beauty of JavaScript `Standard Style` is that it's simple. No one wants to maintain multiple hundred-line style configuration files for every module/project they work on. Enough of this madness!

This module saves you (and others!) time in three ways:

No configuration. The easiest way to enforce consistent style in your project. Just drop it in.
Automatically format code. Just run standard --fix and say goodbye to messy or inconsistent code.
Catch style issues & programmer errors early. Save precious code review time by eliminating back-and-forth between reviewer & contributor.
Adopting standard style means ranking the importance of code clarity and community conventions higher than personal style. This might not make sense for 100% of projects and development cultures, however open source can be a hostile place for newbies. Setting up clear, automated contributor expectations makes a project healthier.

**Step1:**
run: `npm install eslint-config-standard` if issue persists use `--legacy-peer-deps`

**Steps2:**

`npm run lint`

**Step 3:** Tailwind lint
`npm install eslint-plugin-tailwindcss --legacy-peer-deps`

then
`"plugin:tailwindcss/recommended"`

**Step 4:** Prettier

`npm install eslint-config-prettier --legacy-peer-deps`

then

`"prettier"`

then

`npm install prettier --legacy-peer-deps`

**Step 5:** confirm and update the `eslint.config.mjs`

```js
import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import standard from "eslint-config-standard";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // Next.js rules
  ...nextVitals,
  ...nextTs,

  // JavaScript Standard Style
  standard,

  // Tailwind recommended rules
  {
    plugins: {
      tailwindcss,
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
    },
  },

  // Disable ESLint rules that conflict with Prettier
  prettier,

  // Ignore generated files
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

## structure the imports

`npm i eslint-plugin-import --save-dev --legacy-peer-deps`

now write the rules for it

```js
import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import importPlugin from "eslint-plugin-import";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // Next.js + TypeScript rules
  ...nextVitals,
  ...nextTs,

  // Register plugins
  {
    plugins: {
      import: importPlugin,
      tailwindcss,
    },
  },

  // Custom import/order rules
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],

          "newlines-between": "always",

          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],

          pathGroupsExcludedImportTypes: ["builtin"],

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      "comma-dangle": "off",
    },
  },

  // TypeScript-specific overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },

  // Disable ESLint rules that conflict with Prettier
  prettier,

  // Ignore generated files
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

## Adding font

**Step 1:** Download the desired font from google font

**Step 2:** Unzip the downloaded file and paste it into the font folder inside of `app Router`

**Step 3:** Now in the rootLayout, make variable fot these fonts such as:

```js
const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});
```

👉 `localFont` is Next.js’s built-in font loader for fonts stored inside your project.

It gives you:

- Zero layout shift (CLS-safe)
- Automatic font optimization
- No network request to Google Fonts
- Full support for variable fonts

`Local fonts` are better because they load faster, protect user privacy (no data sent to Google), give you full control over font loading, improve Core Web Vitals/SEO, and don’t rely on third-party services—making your site more reliable and production-ready.

**Step 4:** Now activate these fonts via

```js

<html lang="en">
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );


```

1. `inter.className` is used when you have to make this font being applied immediately and be the default.

2. `inter.variable` is used when you want to have control over its classes and customize according to yourself whenever needed.

**Step 5:** Now use it anywhere as:

```js
import React from "react";

const Home = () => {
  return (
    <>
      <div className="text-red-400">Home</div>
      <h1 className="text-3xl font-bold font-space-grotesk text-emerald-500">
        Welcome to learning fonts in Next.js (grotesk font)
      </h1>
      <hr />
      <h2 className=" font-inter text-2xl font-bold text-red-400">
        Hello i am Neeraj (Inter font)
      </h2>
    </>
  );
};

export default Home;
```

## 4. Implementing Dark Mode

**Step 1:** Install Next-Theme
` npm install next-themes`

**Step 2:** Create a context folder at the project level and create a component named `ThemeProvider.tsx`

```js
import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...prop }: ThemeProviderProps) => {
  return <NextThemesProvider>{children}</NextThemesProvider>;
};

export default ThemeProvider;
```

**Step 3:** Now import the `ThemeProvider` in `RootLayout` and then wrap the children inside `ThemeProvider`

```js
<html lang="en">
  <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </body>
</html>
```

## 5. Implementing Authorization in Next.js

**Step 1:** Create a folder as a route groups for the `auth` inside the `app directory`. And inside of that create the two subfolder as `signIn` & `signUp`.

```js
(auth)---> sign-in (page.tsx) & sign-up (page.tsx)

```

**Step 2:** Now as we want that there should be no `Navbar` at the auth page so we will have to modify something.

- 1. Make a route group for the root purpose as `(root)` at the `app directory` level.

- 2. Now create a `layout.tsx` folder and include the `Navbar` in this component.

```js
import Navbar from "@/components/ui/navigation/navbar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
```

- 3. In the same folder of (root) move the `page.tsx` of the `app directory`. this will act as the shared homepage.

```js
import React from "react";

const Home = () => {
  return (
    <>
      <div className="text-red-400">Home</div>
      <h1 className="text-3xl font-bold font-space-grotesk text-emerald-500">
        Authentication in Next.js
      </h1>
      <hr />
    </>
  );
};

export default Home;
```

**Step 3:** Now create a `layout.tsx` for the auth rote group also which will act as the layout for the auth but without the `Navbar`

```js
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>;
};

export default AuthLayout;
```

## 6. Implementing Auth.js

**Step 1:** Go to the `Auth.js` and create an account there and then install it.

- 1. `npm install next-auth@beta`
- 2. Set Up the environment: `npx auth secret`

- - This will create a `env.local` file that will contain the `AUTH_SECRET`

**Step 3:** Now create configuration
This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc.

- 1. create a new `auth.ts` file at the root of your app with the following content.

```js
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
```

- 2. Add a Route Handler under /app/api/auth/[...nextauth]/route.ts.

```js
// route.ts
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
```

- 3. Add optional `Middleware` to keep the session alive, this will update the session expiry every time its called.

```js
// middleware.ts

export { auth as middleware } from "@/auth";
```

**Step 4:** Now set up the authentication method such as `Github`, `Google`, etc.

**Step 5:** For GithUb:

- 1. Log into your github account and go to setting -->developer options --->authentication ---> Oauth -->register new oAuth.

- 2. Homepage url: `http://localhost:3000` & Authorization callback url: `http://localhost:3000/api/auth/callback/github`

- 3. Copy the client id and paste it into the `.env.local` as `AUTH_GITHUB_ID`

- 4. Now you also need to create the `client secret` for this click on the `generate new client secret` option. For this you will be asked to verify your github id verify it by entering the OTP.

Now copy the `client id` and paste it into the `.env.local` as `AUTH_GITHUB_SECRET`

Your .env.local` should look something like this:

```js
AUTH_SECRET =
  "your auth secret generate through running this command - npx auth secret";

AUTH_GITHUB_ID = "your github client id";
AUTH_GITHUB_SECRET = "your client secret";
```

**Step 6:** Now go to the `auth.ts` file and import the provider such as `Github`

```js
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});
```

**Step 7:** To make the our app less error prone we will make a route constants sho that our app does not crashes due to any writting error.

```js
const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export default ROUTES;
```

**Step 8:** Now create a `handleSignIn` function in the `socilaAuthForm.jsx` or any other component where the ui of auth is available.

```js
// SocilaAuthForm.js

const handleSignIn = async (provider: "github" | "google") => {
  try {
    await signIn(provider, {
      callbackUrl: ROUTES.HOME,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    toast("auth toast", {
      title: `sign in using ${provider}`,
      description:
        error instanceof Error
          ? error.message
          : "An error occured during sign-in",
      variant: "destructive",
    });
  }
};
```

**Step 9:** Now to access the session which will be generated when the user signs in, we will need to wrap the whole application under `sessionProvider` coming from `next/auth`.

- 1. Now first make the `RootLayout` a async function
- 2. create a variable for session and import `auth` from `auth/react`
- 3. provide the session to the `sessionProvider`

Now the authentication will work fine.

_Remember:_ `redirect` of signIn should be set to true or either removed as it creates some conflict due to which the fallback goes to other options

```js
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { auth } from "@/auth";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
};
```

This will make the authentication work fine.

## 7. Implementing Log oUT

**Step 1:** Just go to the HomePage and create a form

- in this we will be using the `server-function` of the `Next.js` to implement the `sign out`

- 1. Create a form as:

```js
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const Home = async () => {
  const session = await auth(); //remember that this shuld be imported from `@/auth` and not the `@/auth/react`
  console.log(session);

  return (
    <>
      <div className="text-red-400 pt-20 px-12">
        <h1>Home</h1>

        <form
          className="px-10 pt-25"
          action={async () => {
            "use server"; //define server
            await signOut({ redirectTo: ROUTES.SIGN_IN }); //signOUT function
          }}
        >
          <Button type="submit" className="cursor-pointer">
            Log Out
          </Button>
        </form>
      </div>
    </>
  );
};

export default Home;
```

_Remember:_ For Google authentication do the same as github from google console `oAuth section` from `Api`
