import { useEffect, RefObject } from 'react';

function useOutsideClick(
  ref: RefObject<HTMLElement>,
  outsideHandler: Function,
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        outsideHandler();
        return false;
      }
    }
    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, [outsideHandler, ref]);
}

export default useOutsideClick;
