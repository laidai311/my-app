import { useState, useEffect, useReducer } from 'react';

const reducer = (value) => (value + 1) % 1000000;

export function useForceUpdate(){
  const [, update] = useReducer(reducer, 0);
  return update;
}

export function useTextSelection() {
    const forceUpdate = useForceUpdate();
    const [selection, setSelection] = useState(null);

    const handleSelectionChange = () => {
        setSelection(document.getSelection());
        forceUpdate();
    };

    useEffect(() => {
        setSelection(document.getSelection());
        document.addEventListener('selectionchange', handleSelectionChange);
        return () =>
            document.removeEventListener(
                'selectionchange',
                handleSelectionChange
            );
    }, []);

    return selection;
}
