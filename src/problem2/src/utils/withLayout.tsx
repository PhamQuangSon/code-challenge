import React from "react";

// Higher-Order Component for Layout
const withLayout = (WrappedComponent: React.ComponentType) => {
  return function WithLayout(props: JSX.IntrinsicAttributes) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="pt-8 px-4 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900 dark:text-white antialiased min-h-[calc(100vh-140px)] mx-auto max-w-screen-xl">
          <WrappedComponent {...props} />
        </main>
      </div>
    );
  };
};

export default withLayout;
