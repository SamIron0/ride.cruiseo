'use client';

interface ContatinerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContatinerProps> = ({ children }) => {
  return (
    <div
      className="max-w-screen
                        xl:px-20
                        md:px-10
                        px-4"
    >
      {children}
    </div>
  );
};

export default Container;
