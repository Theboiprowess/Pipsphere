# Pipsphere - Forex Education Platform

A modern, premium forex education website built with Next.js, TypeScript, Tailwind CSS, and Supabase. Pipsphere provides structured learning, mentorship, and community support for aspiring traders.

## 🚀 Features

- **Modern Landing Page**: Professional hero section, program previews, trader profiles, testimonials
- **Course Management**: Beginner, intermediate, and advanced forex programs with detailed curriculum
- **Supabase Authentication**: Secure sign-up, sign-in, and session management with Supabase Auth
- **Payment Integration**: 
  - Stripe for card payments
  - Crypto payment support (USDT via TRC20 and ERC20 networks)
- **Student Dashboard**: Track enrolled courses, progress, and upcoming live sessions
- **Course Learning Interface**: Video lessons, progress tracking, module navigation, and downloadable resources
- **Admin Dashboard**: Manage courses, users, orders, and payments
- **Supabase Realtime**: Live updates for sessions, enrollments, and notifications
- **Supabase Storage**: File storage for course videos, images, and resources
- **Responsive Design**: Mobile-first approach with polished UI
- **SEO Optimized**: Metadata, sitemap, robots.txt, and structured data
- **Legal Pages**: Privacy Policy, Terms of Service, Risk Disclaimer, Refund Policy

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL database, Auth, Storage, Realtime)
- **Authentication**: Supabase Auth
- **Payments**: Stripe, Crypto payment abstraction (NOWPayments, Coinbase Commerce, BitPay)
- **Deployment**: Vercel (recommended), Netlify, or any Node.js hosting

## 📋 Prerequisites

- Node.js 18+ 
- Supabase account (free tier works)
- npm or yarn package manager
- Stripe account (optional, for card payments)
- Crypto payment provider account (optional, for USDT payments)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pipsphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase project**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - In your Supabase project, go to the SQL Editor
   - Run the SQL script from `supabase/schema.sql` to create the database schema
   - Enable the following extensions in your Supabase project:
     - Storage API (for file uploads)
     - Realtime (for live updates)

4. **Create Storage buckets**
   In your Supabase project, create the following storage buckets:
   - `course-images` (public)
   - `lesson-videos` (public)
   - `lesson-resources` (public)
   - `trader-images` (public)

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   
   # Stripe (Optional - for card payments)
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"
   
   # Crypto Payment (Optional - for USDT payments)
   CRYPTO_PAYMENT_PROVIDER="nowpayments" # Options: nowpayments, coinbase, bitpay
   NOWPAYMENTS_API_KEY="your-nowpayments-api-key"
   NOWPAYMENTS_API_SECRET="your-nowpayments-api-secret"
   COINBASE_COMMERCE_API_KEY="your-coinbase-api-key"
   BITPAY_MERCHANT_ID="your-bitpay-merchant-id"
   
   # Crypto Wallet Addresses (for manual configuration)
   USDT_TRC20_WALLET_ADDRESS="your-trc20-wallet-address"
   USDT_ERC20_WALLET_ADDRESS="your-erc20-wallet-address"
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_NAME="Pipsphere"
   ```

6. **Seed the database**
   ```bash
   npm run db:seed
   ```

   This will create:
   - Admin user (admin@pipsphere.com / admin123)
   - 4 trader profiles
   - 3 sample courses with modules and lessons
   - 2 membership plans
   - Sample testimonials
   - Sample live session

   **Important**: Change the admin password after first login!

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
pipsphere/
├── supabase/
│   ├── schema.sql              # Database schema for Supabase
│   └── seed.ts                 # Database seed data
├── src/
│   ├── app/
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes (using Supabase)
│   │   ├── courses/           # Course pages
│   │   ├── dashboard/         # Student dashboard
│   │   ├── (legal pages)/     # Privacy, Terms, etc.
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── metadata.ts        # SEO metadata
│   ├── components/
│   │   ├── Navigation.tsx     # Main navigation
│   │   └── Footer.tsx         # Site footer
│   ├── lib/
│   │   ├── auth-supabase.ts   # Supabase authentication utilities
│   │   ├── crypto-payment.ts  # Crypto payment abstraction
│   │   ├── stripe.ts          # Stripe integration
│   │   ├── supabase.ts        # Supabase client configuration
│   │   ├── supabase-db.ts     # Database operations helper
│   │   ├── supabase-storage.ts # Storage operations helper
│   │   └── supabase-realtime.ts # Realtime subscriptions helper
│   └── types/
│       └── supabase.ts        # TypeScript types for Supabase
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🔐 Security Considerations

1. **Never commit sensitive data**: `.env` files are gitignored
2. **Change default credentials**: Update admin password immediately
3. **Use strong secrets**: Generate secure API keys
4. **Enable HTTPS**: Use SSL in production
5. **Row Level Security**: Supabase RLS policies are configured for data protection
6. **Payment security**: 
   - Never store card data (handled by Stripe)
   - Never store private crypto keys
   - Verify all payment webhooks
7. **Admin-only routes**: Protected by middleware and RLS policies
8. **Service role key**: Only use service role key on server-side operations

## 💳 Payment Setup

### Stripe Integration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhook endpoints for payment confirmation
4. Add webhook secret to `.env`

### Crypto Payment Integration

Choose a provider (NOWPayments, Coinbase Commerce, or BitPay):

1. Create an account with your chosen provider
2. Generate API keys
3. Configure wallet addresses for USDT (TRC20 and ERC20)
4. Add credentials to `.env`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set environment variables on your server

3. Start the application:
   ```bash
   npm start
   ```

4. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "pipsphere" -- start
   ```

## 📊 Database Management

### Supabase Dashboard
- Access your database via Supabase Dashboard
- Use the Table Editor to view and edit data
- Use the SQL Editor for complex queries
- Enable Realtime for live updates
- Configure Storage buckets

### Running the SQL Schema
- Copy the contents of `supabase/schema.sql`
- Paste into Supabase SQL Editor
- Execute to create all tables and policies

### Seeding Data
```bash
npm run db:seed
```

## 🧪 Testing

The project includes basic API route testing. To add comprehensive testing:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 📝 Compliance Notes

- **Financial Disclaimer**: The platform prominently states that content is educational, not financial advice
- **Risk Warnings**: Trading risks are clearly disclosed throughout the site
- **No Guarantees**: No promises of profits or guaranteed returns
- **Data Protection**: Privacy policy and terms of service are provided
- **Refund Policy**: Clear refund policy is outlined

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For technical support or questions:
- Email: support@pipsphere.com
- Documentation: [Link to documentation]
- Issues: [GitHub Issues]

## 🔄 Updates and Maintenance

Regular updates should include:
- Security patches
- Dependency updates
- Feature enhancements
- Content updates (courses, testimonials)

## 📈 Performance Optimization

- Images are optimized with Next.js Image component
- Code splitting is automatic with Next.js
- CSS is purged with Tailwind
- Database queries are optimized with Supabase
- Static generation where possible
- Supabase Edge Functions for global performance

## 🌐 Internationalization

The platform is currently English-only. To add i18n:
1. Install `next-intl` or similar package
2. Create translation files
3. Update components to use translations

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## ⚠️ Important Reminders

- This is an educational platform, not a financial advisory service
- Users must be aware of trading risks
- Admin credentials must be changed immediately
- Regular security audits are recommended
- Keep dependencies updated
- Monitor payment transactions regularly
- Backup database regularly (Supabase provides automated backups)

## 🎯 Future Enhancements

Potential future features:
- Live trading integration with brokers
- Advanced analytics and reporting
- Mobile app (React Native)
- Advanced community features
- Certification programs
- Prop firm partnerships

## 🔧 Supabase-Specific Features

### Realtime Subscriptions
The application uses Supabase Realtime for:
- Live session updates
- Enrollment notifications
- Lesson progress tracking
- Payment status updates

### Storage Management
- Course images are stored in `course-images` bucket
- Lesson videos in `lesson-videos` bucket
- Downloadable resources in `lesson-resources` bucket
- Trader profile images in `trader-images` bucket

### Row Level Security (RLS)
- Public data is readable by authenticated users
- User-specific data is protected by user ID
- Admin operations require admin role
- All policies are defined in `supabase/schema.sql`

---

Built with ❤️ by the Pipsphere team