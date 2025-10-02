import React from 'react';

type HelmetContextType = {
  helmet: Record<string, any>;
  helmetInstances: Set<any>;
  setHelmet: (helmet: any) => void;
};

export const HelmetContext = React.createContext<HelmetContextType>({
  helmet: {},
  helmetInstances: new Set(),
  setHelmet: () => {},
});

export const HelmetProvider = ({
  children,
  context = {
    helmet: {},
    helmetInstances: new Set(),
    setHelmet: () => {},
  },
}: {
  children: React.ReactNode;
  context?: {
    helmet: Record<string, any>;
    helmetInstances: Set<any>;
    setHelmet: (helmet: any) => void;
  };
}) => {
  const helmetContext = React.useMemo(
    () => ({
      helmet: context.helmet,
      helmetInstances: context.helmetInstances,
      setHelmet: context.setHelmet,
    }),
    [context]
  );

  return (
    <HelmetContext.Provider value={helmetContext}>
      {children}
    </HelmetContext.Provider>
  );
};

export const Helmet = ({ children }: { children: React.ReactNode }) => {
  const context = React.useContext(HelmetContext);

  React.useEffect(() => {
    const instance = {
      rendered: true,
      props: { children },
      context,
      emitChange: () => {},
    };

    context.helmetInstances.add(instance);

    return () => {
      context.helmetInstances.delete(instance);
    };
  }, [children, context]);

  // Process meta tags and title
  React.useEffect(() => {
    const childArray = React.Children.toArray(children);
    childArray.forEach(child => {
      if (React.isValidElement(child)) {
        if (child.type === 'title') {
          document.title = child.props.children;
        } else if (child.type === 'meta') {
          const { name, content } = child.props;
          if (name && content) {
            const meta = document.querySelector(`meta[name="${name}"]`);
            if (meta) {
              meta.setAttribute('content', content);
            } else {
              const newMeta = document.createElement('meta');
              newMeta.setAttribute('name', name);
              newMeta.setAttribute('content', content);
              document.head.appendChild(newMeta);
            }
          }
        }
      }
    });
  }, [children]);

  return null;
};
