
/////////////////////////////////////////////////////////////////////////////////////////////
var html_code = `

<!-- pop-up dialog box, containing a form -->
<dialog id="sell_dialog_box">
  <form method="dialog">
    <p>
      <label for="full_name">Full Name:</label>
      <input type="text" name="full_name" id="full_name_input" placeholder="Enter your Full Name..." required>

      <br />
      
      <label for="e_mail">E-mail</label>
      <input type="email" name="e_mail" id="e_mail_input" placeholder="Enter your e-mail..." required>

      <br />

      <label for="message">Message</label>
      <input type="text" name="message" id="message_input" placeholder="Leave your message here..." required>
      
    </p>
    <div>
      <button id="cancel_btn" type="reset">Cancel</button>
      <button id="submit_btn" type="submit">Submit</button>
    </div>
  </form>
</dialog>

`;

$('#app').append(html_code)
////////////////////////////////////////////////////////////////////////////////////////////
const dialog = $("#sell_dialog_box");
const submitButton = $("#sell_dialog_box > #submit_btn ");
const cancelButton = $("#sell_dialog_box > #cancel_btn");

////////////////////////////////////////////////////////////////////////////////////////////
//$("#sell_your_products_link").click(/*todo*/) 
////////////////////////////////////////////////////////////////////////////////////////////
//dialog.returnValue = "";

//
submitButton.click( () => {
  
});

// Form cancel button closes the dialog box
cancelButton.click( () => {
  dialog.close("");
});
////////////////////////////////////////////////////////////////////////////////////////////
