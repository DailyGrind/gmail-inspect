

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': GMAIL_SECURITY.CLIENT_ID,
      'scope': GMAIL_SECURITY.SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadGmailApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: GMAIL_SECURITY.CLIENT_ID, scope: GMAIL_SECURITY.SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Gmail API client library. List messages once client library
 * is loaded.
 */
function loadGmailApi() {
  gapi.client.load('gmail', 'v1').then(initializeApp);
}

/**
 * Print all messages in the authorized user's inbox. If no messages
 * are found an appropriate message is printed.
 */
function initializeApp() {

  var p = new Promise(function(resolve, reject) {
    var batch = gapi.client.newBatch();
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'CATEGORY_PROMOTIONS',
      'q': 'is:unread',
      'maxResults': 400
    }).then(function(resp) {
      var messages = resp.result.messages;
      if (messages && messages.length > 0) {
        for (i = 0; i < messages.length; i++) {
          var message = messages[i];
          batch.add(gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': message.id,
            'fields': 'payload/headers'
          }), 'messageRequest'+message.id);
        }
        batch.then(function(response) {
          var messages = response.result;
          var domains = [];
          for(messageId in messages) {
            if(!messages[messageId].result.error && messages[messageId].result.payload) {
              var headers = messages[messageId].result.payload.headers;
              for(header of headers) {
                if(header.name === 'From') {
                  var sender = header.value;
                  var domain = sender.substring(sender.lastIndexOf('@')+1, sender.length-1);
                  domains.push(domain);
                }
              }
            }
          }
          resolve(domains);
        });
      } else {
        reject();
      }
    });
  });

  p.then(plot);

}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}