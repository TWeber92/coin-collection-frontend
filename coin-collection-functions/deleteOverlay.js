export const deleteOverlay = async (e) => {
  const overlay = e.target.closest("#overlay");
  if (overlay) overlay.hidden = true;
};
