export const deleteOverlay = (e) => {
  const overlay = e.target.closest("#overlay");
  if (overlay) overlay.dataset.active = "false";
};
