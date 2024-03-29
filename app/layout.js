import MainHeader from '@/components/main-header/main-header';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'DishDrop',
  description: 'Delicious meals, shared by a food-loving community.',
};

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
