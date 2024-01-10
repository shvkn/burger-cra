import { createRef, RefObject, useEffect, useRef, useState } from 'react';

const baseDatasetKey = 'intersectionObserverEntry';
const datasetName = `${baseDatasetKey}Name`;
export const useIntersectionObserver = <T extends string>({
  threshold = 0,
  root = null,
  rootMargin = '0%',
}: IntersectionObserverInit): {
  current: string | null;
  register: (name: T) => object;
  elementsRefs: Record<T, RefObject<HTMLElement>>;
} => {
  // const [current, setCurrent] = useState<RefObject<HTMLElement> | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const elementsRefs = useRef({} as Record<T, RefObject<HTMLElement>>);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const register = (key: T) => {
    const ref = createRef<HTMLElement>();
    elementsRefs.current[key] = ref;
    return { ref };
  };

  const extractId = (element: HTMLElement) => {
    const name = element.dataset[datasetName];
    return name;
  };

  useEffect(() => {
    const updateEntry = (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          const element = item.target as HTMLElement;
          console.log(element, item);
          const id = extractId(element);
          console.log(id);
          if (id) {
            setCurrent(id);
          }
        }

        // if (item.intersectionRatio >= 0.5) {
        //   console.log({ element, isIntersecting: item.isIntersecting });
        //   const name = element.dataset[datasetName];
        //   if (!!name) {
        //     update(name as T);
        //   }
        // }
      });
    };

    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport) {
      return;
    }

    const observer = observerRef.current
      ? observerRef.current
      : new IntersectionObserver(updateEntry, {
          threshold,
          root,
          rootMargin,
        });

    Object.entries<RefObject<HTMLElement>>(elementsRefs.current).forEach(([key, ref]) => {
      if (!!ref?.current) {
        ref.current.dataset[datasetName] = key;
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [elementsRefs.current, root, rootMargin, threshold]);

  return { current, register, elementsRefs: elementsRefs.current };
};
