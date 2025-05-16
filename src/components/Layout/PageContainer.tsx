import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  noPadding?: boolean;
  noFooter?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  title, 
  noPadding = false,
  noFooter = false
}) => {
  // Update document title
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | Scan-n-Go`;
    } else {
      document.title = 'Scan-n-Go - Contactless Cafeteria Checkout';
    }
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${noPadding ? '' : 'pt-20 pb-10'}`}>
        {title && !noPadding && (
          <div className="container mx-auto px-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
          </div>
        )}
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default PageContainer;