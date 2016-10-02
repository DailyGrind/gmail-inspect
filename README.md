# GmailInspect
To deploy this application, modify `www/assets/js/gmailplot/gmailsecurity.js` to include your Google API Client Id.

```javascript
var GMAIL_SECURITY = {
	// Your Client ID can be retrieved from your project in the Google
	// Developer Console, https://console.developers.google.com
	CLIENT_ID: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
	SCOPES: [ 'https://www.googleapis.com/auth/gmail.readonly']
}
```
