interface ComposeProvidersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providers: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

/**
 * 
Compose all providers
The [leftmost] Provider in the array will become the [outermost] Provider, which can be called by the Provider on the [right].
 */
export const ComposeProviders = ({
  providers,
  children,
}: ComposeProvidersProps) => {
  return (
    <>
      {providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
      }, children)}
    </>
  );
};
