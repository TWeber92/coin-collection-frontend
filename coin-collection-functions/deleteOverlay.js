export const handler = async (e) => {
  const overlay = e.target.closest("#overlay");
  if (overlay) {
    overlay.hidden = true;
    document.body.dataset.overlay = "false";
  }
};
