# GmailInspect

## Google API Client ID Setup
To deploy this application, modify `www/assets/js/gmailplot/gmailsecurity.js` to include your Google API Client Id.

```javascript
var GMAIL_SECURITY = {
	// Your Client ID can be retrieved from your project in the Google
	// Developer Console, https://console.developers.google.com
	CLIENT_ID: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
	SCOPES: [ 'https://www.googleapis.com/auth/gmail.readonly']
}
```

## Building and deploying with Docker
The included `Dockerfile` packages everything up into a self-contained static web server, served up via [nginx](https://hub.docker.com/_/nginx/). Build and deploy with the following.

```bash
docker build -t some-nginx .
docker run --name gmail-inspect -d -p 8080:80 some-nginx
```