
const accountMenu = document.getElementById('accountMenu')
accountMenu.addEventListener("change", event => {
  const option = event.target.options[event.target.selectedIndex];
  const tabTrigger = new bootstrap.Tab(option);
  tabTrigger.show();
})