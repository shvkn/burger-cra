import { useEffect, useRef } from 'react';

const useForm = (handleSubmit: (e: SubmitEvent) => void) => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const formRefValue = formRef.current;
    formRefValue?.addEventListener('submit', handleSubmit);
    return () => formRefValue?.removeEventListener('submit', handleSubmit);
  }, [handleSubmit]);
  return formRef;
};

export default useForm;
