document.addEventListener('DOMContentLoaded', function() {
  const billingAddressCheckbox = document.getElementById('billing-address');
  const billingAddressForm = document.querySelector('.js-billing-address');
  if (!billingAddressCheckbox || !billingAddressForm) {
    return null;
  }

  if (billingAddressCheckbox.checked) {
    if (!billingAddressForm.classList.contains('d-none')) {
      billingAddressForm.classList.add('d-none');
    }
  }

  billingAddressCheckbox.addEventListener('click', function () {
    billingAddressForm.classList.toggle('d-none')
  })
});