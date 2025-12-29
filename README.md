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
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
```