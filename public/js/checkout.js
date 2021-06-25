const { response } = require("express");

var stripe = Stripe(
  "pk_test_51J5QHpFYy5pEztMBUDR1geVmNVFKynLXhlOXBM5LhiC2cvIqj1tE6pouRtl38aQHBqFNWqZcNdAJP3ozoFjvIEXZ00JkInF3o4"
);

const $form = $("#checkout-form");
$form.submit((event) => {
  $("#payment=error").removeClass("hidden");
  $form.find("button").prop("disable", true); //now user can not submit the form multiple times
  Stripe.card.createToken(
    {
      number: $("#card-number").val(),
      cvc: $("#card-cvc").val(),
      exp_month: $("#card-expiry-month").val(),
      exp_year: $("#car-expiry.year").val(),
      name: $("#card-name").val(),
    },
    StripeResponseHandler
  );
  return false; //I do not have validate yet, so I do not want to send it to server
});

const StripeResponseHandler = (status, response) => {
  if (response.error) {
    //Problem!

    //show the error an the form
    $("#payment=error").text(response.error.message);
    $("#payment=error").removeClass("hidden");
    $form.find("button").prop("disabled", false); //Re-enable submission
  } else {
    //Token was created!
    //Get the token Id:
    const token = response.id;
    //Insert the token into form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    //Submit the form
    $form.get(0).submit();
  }
};

/**
 * Fill out the payment details with the test card information:
Enter 4242 4242 4242 4242 as the card number.
Enter any future date for card expiry.
Enter any 3-digit number for CVC.
Enter any billing postal code.
 */
