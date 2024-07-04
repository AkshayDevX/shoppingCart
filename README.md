# Shopping Cart

This project is a shopping cart application built using Next.js and Nest.js.

## Client

### Enabling TanStack Query DevTools

To enable TanStack Query DevTools, uncomment the following lines in `client/components/queryProvider`:

```javascript
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// <ReactQueryDevtools initialIsOpen={false} />
```

## Running the Client in Development Mode

Install dependencies and start the client:

```bash
npm install
npm run dev
```

## Server

### Setup Environment Variables

Create a .env file in the server directory and add your Cloudinary credentials for adding products. Example:

```env
DATABASE_URL="your_mongodb_url"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### Create Admin User

To get admin access, create an admin user using Postman or any other API tool. Use the following endpoint with a POST request by providing following inputs in JSON:

```bash
http://localhost:8000/users

username:
password:
role: "admin"
```

### Running the Server

Install dependencies and start the server:

```bash
npm install
npm run start
```
