var CLIENT_ID = '886703376797-9c7jq93lfin11mqmr8a23ockncbg6p3t.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCcasb6qzuC18BByQK4DtByjgjZgfM7cNQ';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'none';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('events');
  var h3 = document.createElement('p');
  h3.innerHTML = message
  pre.append(h3);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var startDate = new Date()
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 5,
    'timeMin': startDate.toISOString(),
   // 'timeMax': maxDate.toISOString(),
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    console.log(events)
    var pre = document.getElementById('events')
    var h3 = document.createElement('h3')
    h3.innerHTML="Events:"
    pre.append(h3)

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
          appendPre(event.summary + ' (' + when + ')')
        }else{
          var ndate = when.split('T')
          var n2date = ndate[1].split('-')
          var n3date = n2date[0].split(':')
          var n4date = ndate[0].split('-')
          if (Number(n3date[0]) < 12) {
            n3date[2] = 'am'
          } else {
            n3date[2] = 'pm'
          }
          if (n3date[0] == '00'){
            n3date[0] = '12'
          } else if (Number(n3date[0])>12){
            n3date[0] = String(Number(n3date[0]-12))
          }
          n3date[0] = n3date[0] + ":"
          appendPre(event.summary + '\n' + n3date.join('') + " (" + n4date[1] + '-' + n4date[2] + ")")
        }
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}
