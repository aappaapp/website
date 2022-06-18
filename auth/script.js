function handleResetPassword(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then((email) => {
        var accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        $('.resetPassword').show();
        $('.resetPassword > h1').text(accountEmail);
        var newPassword = $('.resetPassword > input');

        // Save the new password.
        auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);
            alert('The Work is Done. Please go away.');
            window.close();

            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
        });
    }).catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
    });
};
function handleRecoverEmail(auth, actionCode, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    var restoredEmail = null;
    // Confirm the action code is valid.
    auth.checkActionCode(actionCode).then((info) => {
        // Get the restored email address.
        restoredEmail = info['data']['email'];

        // Revert to the old email.
        return auth.applyActionCode(actionCode);
    }).then(() => {
        // Account email reverted to restoredEmail

        // TODO: Display a confirmation message to the user.

        // You might also want to give the user the option to reset their password
        // in case the account was compromised:
        auth.sendPasswordResetEmail(restoredEmail).then(() => {
            // Password reset confirmation sent. Ask user to check their email.
            alert('Password reset confirmation sent. Check your email.');
        }).catch((error) => {
            // Error encountered while sending password reset code.
        });
    }).catch((error) => {
        // Invalid code.
    });
};
function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    auth.applyActionCode(actionCode).then((resp) => {
        // Email address has been verified.

        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        alert('The Work is Done. Please go away.');
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
    }).catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
    });
};
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Implement $.query.get()

    // Get the action to complete.
    var mode = $.query.get('mode');
    // Get the one-time code from the query parameter.
    var actionCode = $.query.get('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    var continueUrl = $.query.get('continueUrl');
    // (Optional) Get the language code if available.
    var lang = $.query.get('lang') || 'en';

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    var config = {
        'apiKey': "AIzaSyCFhgKQiV_9q5dViKHLAslf4e1FJuN6qvk" // Copy this key from the web initialization
        // snippet found in the Firebase console.
    };
    var app = firebase.initializeApp(config);
    var auth = app.auth();

    // Handle the user management action.
    switch (mode) {
        case 'resetPassword':
            // Display reset password handler and UI.
            handleResetPassword(auth, actionCode, continueUrl, lang);
            break;
        case 'recoverEmail':
            // Display email recovery handler and UI.
            handleRecoverEmail(auth, actionCode, lang);
            break;
        case 'verifyEmail':
            // Display email verification handler and UI.
            handleVerifyEmail(auth, actionCode, continueUrl, lang);
            break;
        default:
        // Error: invalid mode.
    }
}, false);
