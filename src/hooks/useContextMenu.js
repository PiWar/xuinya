export const useContextMenu = menuRef => {
  const openContextMenu = e => {
    if (menuRef.current) {
      e.preventDefault();
      menuRef.current.classList.add('open');
    }
  };

  const closeContextMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.remove('open');
    }
  };

  return {
    openContextMenu,
    closeContextMenu,
  };
};
