<h1>🌟 Build & Deploy a Car Market WebSite | Next.js, Appwrite, Price range </h1>


<h2>📌 Project Overview</h2>
Welcome to my reposity, a dynamic and scalable car marketplace built with Next.js, Appwrite, and SendBird. This project enables users to buy and sell both brand-new and used cars with powerful search, filtering, and real-time chat capabilities. Perfect for developers aiming to build feature-rich marketplace platforms.

<hr>

<h2>🌟 Key Features</h2>
<ul>
<li>🔒 Authentication (Appwrite Register & Login)</li>
<li>🚗 List & Manage Car Listings (New & Used Cars)</li>
<li>🛠️ Reusable Filters (Price, Brand, Model, Year, Fuel Type, Condition)</li>
<li>🏢 Seller's Shop</li>
<li>🎮 Image Gallery with Thumbnails</li>
<li>💎 Price Range Selector</li>
<li>💡 Custom Form Generator for Listing Creation</li>
<li>💄 Reusable UploadImage Hook for Image Uploads</li>
<li>📊 Optimized Filtering & Search System</li>
<li>✨ Modern UI with ShadCN Components</li>
<li>✨ Built with Next.js & Appwrite for Full-stack Capabilities</li>
</ul>
<hr/>

## 🚀 Tools & Technologies

This project leverages the latest tools and frameworks for a robust development experience:

- **Next.js**: Scalable full-stack React framework
- **Appwrite**: Authentication, Database, and File Storage
- **SendBird**: Real-time chat system
- **TailwindCSS & Shadcn UI**: Beautiful, responsive design
- **React Hook Form & Zod**: Form validation & schema handling
- **TanStack Query**: Data fetching and caching
- **Vercel**: Seamless deployment

---

## 🔀 Getting Started

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of your project and configure these variables:

```plaintext
NEXT_APPWRITE_KEY=

NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT=<your-appwrite-project-id>

NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_COLLECTION_SHOP_ID=
NEXT_PUBLIC_APPWRITE_COLLECTION_CAR_LISTING_ID=
NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES_ID=<your-appwrite-storage-bucket>

NEXT_PUBLIC_SENDBIRD_APP_ID=<your-sendbird-app-id>
NEXT_PUBLIC_SENDBIRD_API_TOKEN=<>
```

### 3. Run the Application

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Access the app at `http://localhost:3000`.

---
