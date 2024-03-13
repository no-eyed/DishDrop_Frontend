import MainHeader from '@/components/main-header/main-header';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
