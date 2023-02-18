import { RefObject, useEffect, useState } from 'react';

export type TEntityEqualComparer = (
  first: IntersectionObserverEntry,
  second: IntersectionObserverEntry
) => boolean;

const useIntersectionObserver = (
  elementsRefs: Array<RefObject<Element>>,
  entityEqualComparer: TEntityEqualComparer,
  { threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const updateEntry = (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach((item) => {
        if (item.isIntersecting && (!entry || !entityEqualComparer(entry, item))) {
          setEntry(item);
        }
      });
    };
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport) {
      return;
    }
    const observer = new IntersectionObserver(updateEntry, { threshold, root, rootMargin });
    elementsRefs.forEach((ref) => {
      if (!!ref?.current) {
        observer.observe(ref.current);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, [elementsRefs, entry, entityEqualComparer, root, rootMargin, threshold]);
  return entry;
};

export default useIntersectionObserver;
