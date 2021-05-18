## Meeami’s Web SDK getting started
Using Meeami’s Web SDK involves a 4 step process.
1. Creating an account in the web portal 
2. Create test users
3. Copying SDK files and configuring web server 
4. Using SDK APIs in the webpage


## Creating Account in the web portal
Visit https://cpaasstg.meeamitech.com/#/signup and create an account. Once account is created, login to dashboard to find *Project Keys* section which will contain *Project ID* and *Project Secret*. These two tokens will be used to uniquely identify your account.


## Create Users
To create a user call the below rest api as shown by the curl request below:
> Note: Replace xxx in the blow curl request with Project ID in place of AppID and Project Secret in place of AppSecret.

```
curl -X POST \https://prov-cpaasstg.meeamitech.com/OnboardUsers\
        -H 'Content-Type: application/json' \
        -H 'cache-control: no-cache' \
        -d ' {
          "AppID" : "xxx",
          "AppSecret" : "xxx",
          "UsersData" : [
            {
              "UserName" : "testuser1",
              "Password" : "test123"
            },
            {
              "UserName" : "testuser2",
              "Password" : "test123"
            }
          ]
        }'
```

> Note2: To create multiple users in a single rest call, add multiple user blocks in UsersData list in above json document.


## Download SDK files and configuring web server
### Download SDK:
Copy following files from [this repository](./sdk) to the example folder of your web server
  -  sdk/adapter.js
  -  sdk/hs_ims_wrtc_sdk_if.js
  -  sdk/hsimsweb.data
  -  sdk/hsimsweb.fetch.js
  -  sdk/hsimsweb.js
  -  sdk/hsimsweb.js.mem
  -  sdk/hsimsweb.wasm
  -  sdk/hsimsweb.wasm.map
  -  sdk/hsimsweb.worker.js </br>

In case of apache2 server copy these to */var/www/html/sdk*
> Note: Make sure to copy the sdk folder as script internally fetches these files from ./sdk/ location.

Web Server which is serving above files must include these two headers in the response:
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp

**Configure Web server:**

**Apache2:** Add the following in httpd.conf or any other in-use configuration file.
```
Header set Cross-Origin-Opener-Policy same-origin
Header set Cross-Origin-Embedder-Policy require-corp
```

Note: Make sure to use valid domain name with https; as webrtc mandates the use of https.

## Using SDK APIs in the webpage
### Load downloaded script files in the same order as listed below
```js
   <script src="./js/adapter.js"></script> 
   <script src="./js/hs_ims_wrtc_sdk_if.js"></script> 
   <script src="./sdk/hsimsweb.js"></script>
```


### Initialization and Registration:
```js
ME.init(config)
```

**Parameters:**
1. config.userName
2. config.password
3. config.appId
```
events:
  ME.CallNotifications.INCOMING_CALL
  ME.CallNotifications.CALL_PROGRESS
  ME.CallNotifications.CALL_ENDED
  ME.CallNotifications.CALL_REJECTED
  ME.CallNotifications.CALL_ANSWER_FAILED
  ME.CallNotifications.CALL_END_FAILED
  ME.CallNotifications.CALL_ANSWER_SUCCESS
  ME.CallNotifications.CALL_RINGING
  ME.CallNotifications.CALL_CONNECTED
```
            
All api calls must be called only after Init function successfully returned.
    
    
### Making call [Caller->Callee]
```js
let cs = await ME.makeCall(uri, config);
```

**Parameters:**
1. uri    : phonenumber (+9199xxxxxxxx)
2. config : (optional)
    - isVideo: is video call or not (true/false)
    - localVideoElement: html video element
    - remoteVideoElement:  html video element

**returns:** callObject


### CallsEvtCb

```js
callsEvtCb(callNotifications)
```

```
callNotifications :
  INCOMING_CALL: "INCOMING_CALL",
  CALL_PROGRESS: "CALL_PROGRESS",
  CALL_ENDED: "CALL_ENDED",
  CALL_REJECTED: "CALL_REJECTED",
  CALL_ANSWER_FAILED: "CALL_ANSWER_FAILED",
  CALL_END_FAILED: "CALL_END_FAILED",
  CALL_ANSWER_SUCCESS: "CALL_ANSWER_SUCCESS",
  CALL_RINGING: "CALL_RINGING",
  CALL_CONNECTED: "CALL_CONNECTED"
```


### End call / hangup

```js
callObject.endCall();
```

**Callee side :** callObject is the value received in from event *window.ME.callNotifications.INCOMING_CALL* </br>
**Caller side :** callObject is the value received as window.ME.makeCall() API.  </br>

```js

// Caller side
callobj = ME.makeCall();
callobj.endCall();

// Callee side
const CallManagerNotification = function (notification) {
    switch(notifications.type) {
        case window.ME.callNotifications.INCOMING_CALL:
            callobj = notifications.data;
            callobj.endCall();
    }
}
```

### Answering incoming call
```js
callobj.answerCall();
```

callObject comes from window.ME.callNotifications.INCOMING_CALL notifications.data

**Usage:**

```js

const CallManagerNotification = function (notification) {
    switch(notifications.type) {
        case window.ME.callNotifications.INCOMING_CALL:
            callobj = notifications.data;
            callobj.answerCall();
    }
}

```


### Usage scenario
To ensure js scripts have loaded call Module. </br>
Wait for script to load and then call initialize API *Module.onRuntimeInitialized*. This is a good way to ensure that module is loaded completely, before calling module initialization api.


**Example script:**
```javascript
Module.onRuntimeInitialized = (_) => {
   console.log(“module loaded successfully”);

   config.userName = "<username>";
   config.password = "<password>";
   config.appId    = "<project-id>";

   config.callsEventCb = CallManagerNotification;
   try {
      await ME.init(config);
      console.log("Initialization success");
   } catch (err) {
      console.log(err);
   }
};
// Note: replace fields enclosed in angular brackets (username, password and appid).
```



Once the initialization is done the page is ready to make outgoing and receive incoming calls.
To make outbound audio call call the api like so:

```js
let callObj = await ME.makeCall(“testuser2”);
```
This will initiate an outbound call.

To handle mid call events and incoming call events implement CallManagerNotification function like so:

```js
const CallManagerNotification = function (notificationObj) {
   let callObj = notificationObj.data;
   switch (notificationObj.type) {
      case window.ME.callNotifications.INCOMING_CALL: {
         // Incoming call request received.

         callObj.answerCall();  // Accept incoming call
         break;
      }

      case window.ME.callNotifications.CALL_PROGRESS: {
         // Call in progress
         break;
      }

      case window.ME.callNotifications.CALL_RINGING: {
         // Ringing at callee
         break;
      }

      case window.ME.callNotifications.CALL_CONNECTED: {
         // Connected
         break;
      }

      case window.ME.callNotifications.CALL_ENDED: {
         // Call Ended
         break;
      }
   }
};
```
A working example is presented at https://ft-cpaasstg.meeamitech.com/web/ for your reference. 


