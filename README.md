# Nanantha - Client Side (Frontend)

- **Live Server:** https://nanantha.vercel.app/

## **Project Overview**

Nanantha Client is a modern online bookstore built with Next.js. Users can browse books, view detailed product pages, manage their shopping cart, and complete secure payments through Mollie. The platform offers an engaging and responsive user experience, with a separate dashboard for both users and admins to manage orders, products, and reviews. Developed with TypeScript, Tailwind CSS, and modern Next.js features, Nanantha ensures scalability and high performance. Data interactions are powered through APIs connecting to a backend built with MongoDB.

## **Tech Stack**

- **Frontend Framework:** NextJS (React + TypeScript)
- **UI Library:** Shadcn & Tailwind CSS
- **Routing:** NextJS App Router
- **API Requests:** NextJS Built-in Functionalities
- **Authentication:** Custom Secure Authentication
- **Payment System:** Mollie

## **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/mahfuzzayn/nanantha-client.git
cd nanantha-client
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Environment Variables**

Create a `.env.local` file in the root directory and add the following:

```env
# Base API
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1

# ReCaptcha Credentials
NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=your_recaptcha_client_key
NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=your_recaptcha_secret_key

# User & Admin Login Credentials
NEXT_PUBLIC_LOGIN_DEMO_USER_EMAIL=your_login_demo_user_email
NEXT_PUBLIC_LOGIN_DEMO_USER_PASSWORD=your_login_demo_user_password

NEXT_PUBLIC_LOGIN_DEMO_ADMIN_EMAIL=your_login_demo_admin_email
NEXT_PUBLIC_LOGIN_DEMO_ADMIN_PASSWORD=your_login_demo_admin_password
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Your app will be available at `http://localhost:3000`.

## **Features**

-   Public routes: Home, Products, Product Detail, About Us, FAQ & Blogs
-   Private routes: Cart, User & Admin Dashboard, Products, Orders & Reviews Managment
-   Responsive design, error handling, and UI enhancements

## **Build & Deployment**

To build the project for production:

```sh
npm run build
```

For deployment, use **Vercel**, **Netlify**, or other static hosting services.

Developed by [Mahfuz Zayn](https://mahfuzzayn.netlify.app/).
