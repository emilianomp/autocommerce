# AutoCommerce - Final Project

This is a complete, functional, and optimized e-commerce application for automobiles, built with Next.js, TypeScript, and Tailwind CSS. It simulates a real-world client delivery.

## Features

- **Product Catalog**: Browse a list of available cars with search and pagination.
- **Shopping Cart**: Add, remove, and manage cars in your cart using Context API.
- **Simulated Authentication**: A simple login system using `localStorage` to protect private routes like the cart and admin panel.
- **Product Management (CRUD)**: An admin panel to create, read, update, and delete car listings, simulating calls to a backend API.
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop devices.
- **Modern UI/UX**: A clean, professional design with interactive elements and toast notifications for user feedback.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the app in development mode, run:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod
- **Icons**: Lucide React
