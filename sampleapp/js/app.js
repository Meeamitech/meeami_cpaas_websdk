
Module.onRuntimeInitialized = (_) => {
   let regbtn = document.getElementById("regbtn");
   regbtn.disabled = false;
};

function addToLog(data) {
   let p = document.getElementById("logging");
   p.textContent += " |:| " + data;
}

const onRegistrationCalled = async function () {
   let config = {};

   config.userName = document.getElementById("userName").value;
   config.password = document.getElementById("password").value;

   config.appId = "965c546e-f3b9-40cd-a07d-07f7637a7452";
   config.callsEventCb = CallManagerNotification;

   try {
      await ME.init(config);
      addToLog("Initilization success")

      let regbtn = document.getElementById("regbtn");
      regbtn.disabled = true;

   } catch (err) {
      console.log(err);
      addToLog("Initilization failed")
   }
};

// start call
const onCallBtnPressed = async function (isVideo) {

   let uri = document.getElementById("uri").value;
   let config = {
      isVideo: isVideo,
      localVideoElement: document.getElementById("localVideo"),
      remoteVideoElement: document.getElementById("remoteVideo"),
   };

   try {

      // config is optional..
      let callObj = await ME.makeCall(uri, config);

      if (callObj != null) {
         // Assigning handler to hangup button..
         let hangupbtn = document.getElementById("hangupbtn");
         hangupbtn.disabled = false;
         hangupbtn.onclick = () => {
            callObj.endCall();
            hangupbtn.disabled = true;
         };
      }
   } catch (err) {
      console.log("Make call failed..", err);
   }
};

// remote side call indications handler..
const CallManagerNotification = function (notificationObj) {
   let callObj = notificationObj.data;
   switch (notificationObj.type) {
      case window.ME.callNotifications.INCOMING_CALL: {

         let hangupbtn = document.getElementById("hangupbtn");
         let r = confirm("Accept call from : " + notificationObj.remoteUri);

         // Incoming call accepted.
         if (r == true) {
            if (callObj.isVideo) {
               let config = {
                  isVideo: true,
                  localVideoElement: document.getElementById("localVideo"),
                  remoteVideoElement: document.getElementById("remoteVideo"),
               };
               callObj.answerCall(config);
            } else {
               callObj.answerCall();
            }


            hangupbtn.disabled = false;
            hangupbtn.onclick = () => {
               callObj.endCall();
               hangupbtn.disabled = true;
            };
         } else {
            // Incoming call rejected..
            callObj.endCall();
            hangupbtn.disabled = true;
         }
         break;
      }

      case window.ME.callNotifications.CALL_PROGRESS: {
         console.log("Call in progress..");
         addToLog("Progress");
         break;
      }

      case window.ME.callNotifications.CALL_RINGING: {
         console.log("Ringing at callee..");
         addToLog("Ringing");
         break;
      }

      case window.ME.callNotifications.CALL_CONNECTED: {
         addToLog("Connected");
         break;
      }

      case window.ME.callNotifications.CALL_ENDED: {
         console.log("Call_Ended");

         let hangupbtn = document.getElementById("hangupbtn");
         hangupbtn.disabled = true;
         addToLog("Ended");
         break;
      }
   }
};

