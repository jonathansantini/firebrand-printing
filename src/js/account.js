document.addEventListener('DOMContentLoaded', function() {
  const accountMenu = document.getElementById('accountMenu');
  const tabContainer = document.getElementById('productInfo');
  if (!accountMenu || !tabContainer) {
    return null;
  }

  accountMenu.addEventListener("change", event => {
    event.preventDefault();
    const option = event.target.options[event.target.selectedIndex];
    const tab = tabContainer.querySelector('button[data-bs-target="' + option.dataset.bsTarget + '"]')
    tab.click();
  })
});