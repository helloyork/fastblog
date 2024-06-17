
# FastBlog

FastBlog is a simple blog application built with Next.js and Tailwind CSS. It is a project for learning Next.js and Tailwind CSS.  

It has a simple blogging framework that includes **database connections**, **backend** (in development), and **frontend** (in development). It is a project to learn Next.js and Tailwind CSS.

This project is still in development, and if you have any questions, we welcome anyone's contributions or corrections.

## Getting Started

First, run the development server:

```bash
git clone https://github.com/helloyork/fastblog.git

cd fastblog

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How To Get Started

### 1. Edit the `fastblog.config.js` file

Modify the 'fastblog.config.js' file to configure the database connection and user system information.

For example:

```typescript
import { AuthProviderType, DatabaseProviderType } from "@lib/services/services";
import type { UserFastBlogConfig } from "@lib/app/config/types";

const config: UserFastBlogConfig<{
    
    // Specify the database provider
    database: DatabaseProviderType.Postgres;
    
    // Specify the authentication provider
    auth: AuthProviderType.Credential;
}> = {
    services: {
        database: {
            type: DatabaseProviderType.Postgres,
            config: {
                
                // Don't worry, NextJS takes care of environment variables automatically
                // You just need to set the environment variables in the .env file
                // or in the environment where the application is running.
                username: process.env.DATABASE_USERNAME,
                database: process.env.DATABASE_DBNAME,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                password: process.env.DATABASE_PWD
            }
        }
    }
};
export default config;
```

> source: [@lib/app/config/types.ts](./src/app/_lib/app/config/types.ts)

### 2. Edit the `client.config.js` file

Modify the 'client.config.js' file to configure the frontend settings.

For example:

```typescript
import {UserClientConfig} from "@lib/app/config/types";

const config: UserClientConfig = {
    elements: {
        NavBar: {
            settings: {
                items: [
                    
                    // Links in the navigation bar
                    {
                        title: "Home",
                        href: "/"
                    },
                    {
                        title: "About",
                        href: "/about"
                    }
                ]
            }
        }
    },
    app: {
        metadata: {
            
            // Metadata settings
            title: {
                default: "FastBlog",
                template: "FastBlog - %s"
            },
            description: "Fast and simple blog"
        }
    }
};

export default config;
```

> source: [@lib/app/config/types.ts](./src/app/_lib/app/config/types.ts)

### 3. Customize the colors (Optional)

You can customize the colors in the `tailwind.config.js` file.

read more about [Tailwind CSS](https://tailwindcss.com/docs/configuration)

### 4. Add a Post

todo

### 5. Publish!

todo

## Learn More

Check out these documents:

## Deploy

todo
