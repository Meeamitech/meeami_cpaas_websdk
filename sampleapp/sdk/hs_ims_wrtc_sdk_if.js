(function (window) {
   function Event(name) {
      this.name = name;
      this.callbacks = [];
   }

   Event.prototype.registerCallback = function (callback) {
      this.callbacks.push(callback);
   };

   function EventDispatcher() {
      this.events = {};
   }

   EventDispatcher.prototype.registerEvent = function (eventName) {
      var event = new Event(eventName);
      this.events[eventName] = event;
   };

   EventDispatcher.prototype.dispatchEvent = function (eventName, eventArgs) {
      this.events[eventName].callbacks.forEach(function (callback) {
         callback(eventArgs);
      });
   };

   EventDispatcher.prototype.addEventListener = function (eventName, callback) {
      this.events[eventName].registerCallback(callback);
   };

   function md5cycle(f, h) {var i = f[0], n = f[1], r = f[2], g = f[3]; i = ff(i, n, r, g, h[0], 7, -680876936), g = ff(g, i, n, r, h[1], 12, -389564586), r = ff(r, g, i, n, h[2], 17, 606105819), n = ff(n, r, g, i, h[3], 22, -1044525330), i = ff(i, n, r, g, h[4], 7, -176418897), g = ff(g, i, n, r, h[5], 12, 1200080426), r = ff(r, g, i, n, h[6], 17, -1473231341), n = ff(n, r, g, i, h[7], 22, -45705983), i = ff(i, n, r, g, h[8], 7, 1770035416), g = ff(g, i, n, r, h[9], 12, -1958414417), r = ff(r, g, i, n, h[10], 17, -42063), n = ff(n, r, g, i, h[11], 22, -1990404162), i = ff(i, n, r, g, h[12], 7, 1804603682), g = ff(g, i, n, r, h[13], 12, -40341101), r = ff(r, g, i, n, h[14], 17, -1502002290), i = gg(i, n = ff(n, r, g, i, h[15], 22, 1236535329), r, g, h[1], 5, -165796510), g = gg(g, i, n, r, h[6], 9, -1069501632), r = gg(r, g, i, n, h[11], 14, 643717713), n = gg(n, r, g, i, h[0], 20, -373897302), i = gg(i, n, r, g, h[5], 5, -701558691), g = gg(g, i, n, r, h[10], 9, 38016083), r = gg(r, g, i, n, h[15], 14, -660478335), n = gg(n, r, g, i, h[4], 20, -405537848), i = gg(i, n, r, g, h[9], 5, 568446438), g = gg(g, i, n, r, h[14], 9, -1019803690), r = gg(r, g, i, n, h[3], 14, -187363961), n = gg(n, r, g, i, h[8], 20, 1163531501), i = gg(i, n, r, g, h[13], 5, -1444681467), g = gg(g, i, n, r, h[2], 9, -51403784), r = gg(r, g, i, n, h[7], 14, 1735328473), i = hh(i, n = gg(n, r, g, i, h[12], 20, -1926607734), r, g, h[5], 4, -378558), g = hh(g, i, n, r, h[8], 11, -2022574463), r = hh(r, g, i, n, h[11], 16, 1839030562), n = hh(n, r, g, i, h[14], 23, -35309556), i = hh(i, n, r, g, h[1], 4, -1530992060), g = hh(g, i, n, r, h[4], 11, 1272893353), r = hh(r, g, i, n, h[7], 16, -155497632), n = hh(n, r, g, i, h[10], 23, -1094730640), i = hh(i, n, r, g, h[13], 4, 681279174), g = hh(g, i, n, r, h[0], 11, -358537222), r = hh(r, g, i, n, h[3], 16, -722521979), n = hh(n, r, g, i, h[6], 23, 76029189), i = hh(i, n, r, g, h[9], 4, -640364487), g = hh(g, i, n, r, h[12], 11, -421815835), r = hh(r, g, i, n, h[15], 16, 530742520), i = ii(i, n = hh(n, r, g, i, h[2], 23, -995338651), r, g, h[0], 6, -198630844), g = ii(g, i, n, r, h[7], 10, 1126891415), r = ii(r, g, i, n, h[14], 15, -1416354905), n = ii(n, r, g, i, h[5], 21, -57434055), i = ii(i, n, r, g, h[12], 6, 1700485571), g = ii(g, i, n, r, h[3], 10, -1894986606), r = ii(r, g, i, n, h[10], 15, -1051523), n = ii(n, r, g, i, h[1], 21, -2054922799), i = ii(i, n, r, g, h[8], 6, 1873313359), g = ii(g, i, n, r, h[15], 10, -30611744), r = ii(r, g, i, n, h[6], 15, -1560198380), n = ii(n, r, g, i, h[13], 21, 1309151649), i = ii(i, n, r, g, h[4], 6, -145523070), g = ii(g, i, n, r, h[11], 10, -1120210379), r = ii(r, g, i, n, h[2], 15, 718787259), n = ii(n, r, g, i, h[9], 21, -343485551), f[0] = add32(i, f[0]), f[1] = add32(n, f[1]), f[2] = add32(r, f[2]), f[3] = add32(g, f[3])} function cmn(f, h, i, n, r, g) {return h = add32(add32(h, f), add32(n, g)), add32(h << r | h >>> 32 - r, i)} function ff(f, h, i, n, r, g, t) {return cmn(h & i | ~h & n, f, h, r, g, t)} function gg(f, h, i, n, r, g, t) {return cmn(h & n | i & ~n, f, h, r, g, t)} function hh(f, h, i, n, r, g, t) {return cmn(h ^ i ^ n, f, h, r, g, t)} function ii(f, h, i, n, r, g, t) {return cmn(i ^ (h | ~n), f, h, r, g, t)} function md51(f) {txt = ""; var h, i = f.length, n = [1732584193, -271733879, -1732584194, 271733878]; for (h = 64; h <= f.length; h += 64)md5cycle(n, md5blk(f.substring(h - 64, h))); f = f.substring(h - 64); var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; for (h = 0; h < f.length; h++)r[h >> 2] |= f.charCodeAt(h) << (h % 4 << 3); if (r[h >> 2] |= 128 << (h % 4 << 3), h > 55) for (md5cycle(n, r), h = 0; h < 16; h++)r[h] = 0; return r[14] = 8 * i, md5cycle(n, r), n} function md5blk(f) {var h, i = []; for (h = 0; h < 64; h += 4)i[h >> 2] = f.charCodeAt(h) + (f.charCodeAt(h + 1) << 8) + (f.charCodeAt(h + 2) << 16) + (f.charCodeAt(h + 3) << 24); return i} var hex_chr = "0123456789abcdef".split(""); function rhex(f) {for (var h = "", i = 0; i < 4; i++)h += hex_chr[f >> 8 * i + 4 & 15] + hex_chr[f >> 8 * i & 15]; return h} function hex(f) {for (var h = 0; h < f.length; h++)f[h] = rhex(f[h]); return f.join("")} function md5(f) {return hex(md51(f))} function add32(f, h) {return f + h & 4294967295} if ("5d41402abc4b2a76b9719d911017c592" != md5("hello")) function add32(f, h) {var i = (65535 & f) + (65535 & h); return (f >> 16) + (h >> 16) + (i >> 16) << 16 | 65535 & i}

   class MeeamiSdk {
      constructor() {
         this.mNativeInterface = null;
         this.mCallSessions = [];
         this.mLocalStream = null;

         this.mPostToMc = null;
         this.mDomainName = null;
         this.mAppCb = null;
         this.mCallEvtCb = null;
         this.eventDispatcher = new EventDispatcher();
         this.eventDispatcher.registerEvent("init");

         // TODO :: Document this
         this.mConfigParams = {
            authToken: null,
            appId: null,
            domainName: null,
            uri: null,
            displayName: "",
            provServerUri: "prov-cpaasstg.meeamitech.com",
            //provServerUri: "prov-transition.meeamitech.com",
         };

         this.msg_type_enum = {
            HS_VOIP_MC_WEBRTC_MSG_SDP_OFFER: 0,
            HS_VOIP_MC_WEBRTC_MSG_SDP_ANSWER: 1,
            HS_VOIP_MC_WEBRTC_MSG_STM_ADDED: 2,
            HS_VOIP_MC_WEBRTC_MSG_STM_RMVED: 3,
            HS_VOIP_MC_WEBRTC_MSG_OTHER: 4,
            HS_VOIP_MC_WEBRTC_MSG_CREATE_FAILED: 5,
            HS_VOIP_MC_WEBRTC_MSG_SDP_FAILED: 6,
            HS_VOIP_MC_WEBRTC_MSG_INV_FAILED: 7,
            HS_VOIP_MC_WEBRTC_MSG_PUBLISH_FAILED: 8,
            HS_VOIP_MC_WEBRTC_MSG_ACCEPT_FAILED: 9,
         };

         this.connect_mode = {
            HS_VOIP_MODE_RESERVED: 0,
            HS_VOIP_MODE_RECVONLY: 1,
            HS_VOIP_MODE_SENDONLY: 2,
            HS_VOIP_MODE_SENDRECV: 3,
            HS_VOIP_MODE_INACTIVE: 4,
         };

         this.callMode = {
            CALL_MODE_AUDIO: 0,
            CALL_MODE_VIDEO_RECVONLY: 1,
            CALL_MODE_VIDEO_SENDONLY: 2,
            CALL_MODE_VIDEO_SENDRECV: 3,
         };

         this.SystemNotification = {
            INITIALIZATION_SUCCESS: 0,
            INITIALIZATION_FAILED: 1,
            DEINITIALIZATION_SUCCESS: 2,
            ON_OTP_SENT: 3,
            OTP_SEND_FAILED: 4,
            OTP_VERIFICATION_SUCCESS: 5,
            OTP_VERIFICATION_FAILED: 6,
            REGISTRATION_SUCCESS: 7,
            REGISTRATION_FAILED: 8,
            DEREGISTRATION_SUCCESS: 9,
            DEREGISTRATION_FAILED: 10,
            ON_NETWORK_CONNECTED: 11,
            ON_NETWORK_DISCONNECTED: 12,
         };

         this.callmgrNotificationObject = {
            INCOMING_CALL: 0,
            CALL_ENDED: 1,
            SWITCH_CALL_SUCCESS: 2,
            SWITCH_CALL_FAILED: 3,
            INCOMING_CALL_REDIRECTED: 4,
            INCOMING_CALL_REJECTED: 5,
            CONFERENCE_CALL: 6,
            VOICE_MESSAGE_WAIT: 7,
         };

         this.callSessionNotificationObject = {
            CALL_PROGRESS: 0,
            CALL_ANSWER_FAILED: 1,
            CALL_END_FAILED: 2,
            CALL_ENDED: 3,
            REMOTE_HOLD: 4,
            IS_ON_LOCAL_HOLD: 5,
            IS_ON_MUTE: 6,
            CALL_REPLACED: 7,
            CALL_REPLACE_FAILURE: 8,
            CALL_FORWARD_REQUEST: 9,
            CALL_FORWARDED: 10,
            START_VIDEO_REQUEST: 11,
            START_VIDEO_SUCCESS: 12,
            START_VIDEO_FAILED: 13,
            STOP_VIDEO_SUCCESS: 14,
            STOP_VIDEO_FAILED: 15,
            CALL_RING_OUT: 16,
            CALL_EARLY_MEDIA: 17,
            CALL_STATE_CONNECTED: 18,
         };

         //TODO: document this
         this.callNotifications = {
            // combination of callmgrNotificationObject+this.callSessionNotificationObject
            // exposed to user..
            INCOMING_CALL: "INCOMING_CALL",
            CALL_PROGRESS: "CALL_PROGRESS",
            CALL_ENDED: "CALL_ENDED",
            CALL_REJECTED: "CALL_REJECTED",
            CALL_ANSWER_FAILED: "CALL_ANSWER_FAILED",
            CALL_END_FAILED: "CALL_END_FAILED",
            CALL_ANSWER_SUCCESS: "CALL_ANSWER_SUCCESS",
            CALL_RINGING: "CALL_RINGING",
            CALL_CONNECTED: "CALL_CONNECTED",
         };

         this.Errors = {
            MAKE_CALL_FAILED: {
               CODE: 7000,
            },
            ANSWER_CALL_FAILED: {
               CODE: 7001,
            },
            END_CALL_FAILED: {
               CODE: 7002,
            },
         };
         // window.ME = this;
      }

      initHelper(callBack) {
         this.eventDispatcher.registerEvent("MEESDK_INIT");
         this.eventDispatcher.addEventListener("MEESDK_INIT", (obj) => {
            callBack(obj);
         });
         this.mNativeInterface.init("/config", "");
      }

      /**
       *
       *
       * @param {string} configParams.appId
       * @param {string} configParams.authToken
       *
       * @param {string} configParams.email
       * @param {string} configParams.password
       * @param {function} configParams.callsEventCb
       * @returns a promise which onsuccess gives indications.
       * @memberof MeeamiSdk
       */
      init(configParams) {
         // TODO: email password based
         return new Promise((resolve, reject) => {
            // to check if webassemby context is ready or not.
            // Module.onRuntimeInitialized = () => {
            this.mNativeInterface = new Module.HsCommonSdkWasmIf();

            console.log(this.mNativeInterface, "ANJNAI");

            this.mPostToMc = Module.cwrap(
               "hs_voip_webrtc_msg_create_and_post",
               "void",
               ["number", "number", "string", "number"]
            );


            // Mandatory params checking..
            if (!(configParams && configParams.userName && configParams.password && configParams.appId)) {
               reject(new Error("Bad Configuration"));
            }
            let input = configParams.appId + ":" + configParams.userName + ":" + configParams.password
            let token = md5(input);

            console.log(input, ":", token);
            console.log("anjjjjjj");


            // Mandatory parameters
            this.mConfigParams.authToken = token;
            this.mConfigParams.appId = configParams.appId;

            // Optional
            this.mCallEvtCb = configParams.callsEventCb;

            this.initHelper((res) => {
               resolve(res);
            });
            // };
            setTimeout(() => {
               reject(new Error("wasm not ready"));
            }, 30000);
         });
      }

      getContext(callId) {
         for (let cs of this.mCallSessions) {
            if (cs.id == callId) return cs;
         }
         console.trace(
            // console.log(
            "JS-WEBRC: [getContext] couldn't find call context with id ",
            callId
         );
         return null;
      }

      removeContext(callId) {
         console.log(`JS-WEBRC: [removeContext] for callId [${callId}]`);
         for (let i = 0, len = this.mCallSessions.length; i < len; i++) {
            if (this.mCallSessions[i].id == callId) {
               this.mCallSessions.splice(i, 1);
            }
         }
      }

      createCallSessionObject(callId, isVideo, localvideo, remotevideo) {
         console.log(
            `JS-WEBRC: [createCallSessionObject][${callId}] callId(${callId})`
         );
         let obj = {
            id: callId,
            pc: null, // Peerconnection object
            iceCandidates: [],
            localStream: null,
            iceServers: null,
            isVideo: isVideo,
            media_mode: {
               audio: this.connect_mode.HS_VOIP_MODE_SENDRECV,
               video: this.connect_mode.HS_VOIP_MODE_INACTIVE,
            },
            UI: {
               // localVideo: localvideo ? localvideo : document.createElement("video"),
               // remoteVideo: remotevideo
               //   ? remotevideo
               //   : document.createElement("video"),

               localVideo: localvideo,
               remoteVideo: remotevideo,
            },
         };
         obj.answerCall = this.answerCall;
         obj.endCall = this.endCall;
         obj.parent = this;
         return obj;
      }

      startRegistration(uri, displayName, domainName) {
         if (null == this.mNativeInterface) {
            console.log("JS-WEBRTC: [startRegistration] Invalid state");
            return;
         }
         this.mNativeInterface.startRegistrationIf(uri, displayName, domainName);
         return;
      }

      startProvisioning(imsi, appId, serverUri, token) {
         if (null == this.mNativeInterface) {
            console.log("JS-WEBRTC: [startRegistration] Invalid state");
            return;
         }
         this.mNativeInterface.startProvisioning(imsi, appId, serverUri, token);
         return;
      }

      userNameToUri(username) {
         return "sip:" + username + "@" + this.mConfigParams.domainName;
      }

      /**
       *
       *
       * @param {boolean} isVideo
       * @returns
       * @memberof MeeamiSdk
       */
      getMode(isVideo) {
         return isVideo
            ? this.callMode.CALL_MODE_VIDEO_SENDRECV
            : this.callMode.CALL_MODE_AUDIO;
      }

      /**
       * Setting call notification handler.
       *
       * @param {function} callBk
       * @memberof MeeamiSdk
       */
      setCallNotificationHandler(callBk) {
         this.mCallEvtCb = callBk;
      }

      /**
       * Initiating a call.
       *
       * @param {string} username
       * @param {video} config.localVideoElement
       * @param {video} config.remoteVideoElement
       * @param {boolean} config.isVideo
       * @returns {number} callId
       * @memberof MeeamiSdk
       */
      makeCall(username, config) {
         return new Promise((resolve, reject) => {
            let uri = this.userNameToUri(username);

            if (this.mCallEvtCb == null) {
               console.log(
                  `JS-WEBRTC : [makeCall] set callback before using this api`
               );
               reject(new Error("set callback before using this api"));
            }

            if (null == this.mNativeInterface) {
               console.log("JS-WEBRTC: [makeCall] Invalid state");
               reject(new Error("Invalid state"));
            }

            let mode;
            if (config && config.isVideo) {
               mode = this.getMode(config.isVideo);
            } else {
               mode = this.getMode(false);
            }

            let callId = this.mNativeInterface.startCall(uri, mode);

            console.log(`JS-WEBRTC : [makeCall][${callId}] mode:${mode}`);

            // calling failed..
            if (callId == 1) {
               console.log(`JS-WEBRTC : [makeCall][${callId}] failed `);
               reject(new Error("Couldn't place call"));
            }

            // TODO :: if local video elements not given.. u should add one?
            let cs;
            let isVideo = config && config.isVideo;
            let localPlayback = isVideo
               ? config.localVideoElement
               : document.createElement("audio");

            localPlayback.autoplay = true;
            localPlayback.muted = true;

            let remotePlayback = isVideo
               ? config.remoteVideoElement
               : document.createElement("audio");

            remotePlayback.autoplay = true;

            cs = this.createCallSessionObject(
               callId,
               isVideo,
               localPlayback,
               remotePlayback
            );

            this.mCallSessions.push(cs);
            console.log(this.mCallSessions);
            resolve(cs);
         });
      }

      /**
       *
       * @param {boolean} config.isVideo
       * @param {video} config.localVideo
       * @param {video} config.remoteVideo
       * @returns ??
       * @memberof MeeamiSdk
       */
      answerCall(config) {
         return new Promise((resolve, reject) => {
            if (this.id == null) {
               console.error("JS-WEBRTC : [answerCall] Invalid state");
               reject(new Error("Calls not present"));
            }

            let ctxt = this.parent.getContext(this.id);
            if (ctxt == null) {
               console.error("JS-WEBRTC : [answerCall] Invalid state");
               reject(new Error("Invalid State"));
            }

            if (config && config.isVideo) {
               ctxt.UI.isVideo = true;
               ctxt.UI.localVideo = config.localVideoElement;
               ctxt.UI.localVideo.muted = true;
               ctxt.UI.remoteVideo = config.remoteVideoElement;
            } else {
               ctxt.UI.isVideo = false;
               ctxt.UI.localVideo = document.createElement("audio");
               ctxt.UI.localVideo.autoplay = true;
               ctxt.UI.localVideo.muted = true;
               ctxt.UI.remoteVideo = document.createElement("audio");
               ctxt.UI.remoteVideo.autoplay = true;
            }

            ctxt.UI.localVideo.srcObject = this.parent.mLocalStream;

            let mode;
            if (config && config.isVideo) {
               mode = this.parent.getMode(config.isVideo);
            } else {
               mode = this.parent.getMode(false);
            }

            console.log(`JS-WEBRTC : [answerCall][${this.id}] mode(${mode}) `);
            let x = this.parent.mNativeInterface.answerCall(this.id, mode);

            if (x == 1) {
               console.log(`JS-WEBRTC : [answerCall][${this.id}] failed `);
               reject(new Error("Something wrong.."));
            }
            resolve();
         });
      }

      /**
       * End call
       *
       * @memberof MeeamiSdk
       */
      endCall() {
         console.log(`JS-WEBRTC : [endCall][${this.id}] `);
         this.parent.mNativeInterface.endCall(this.id);
      }

      removeMedia(pc, audiomode, videomode) {
         console.log(
            `JS-WEBRTC : [removeMedia] audio:${audiomode} video:${videomode}`
         );
         if (
            audiomode == this.connect_mode.HS_VOIP_MODE_INACTIVE ||
            videomode == this.connect_mode.HS_VOIP_MODE_INACTIVE
         ) {
            pc.removeStream(this.mLocalStream);
         }
      }

      async addMedia(constraints, cs) {
         return new Promise(async (resolve, reject) => {
            if (!cs) reject();
            console.log(`JS-WEBRTC : [addMedia] constraints ${constraints}`);
            try {
               this.mLocalStream = await navigator.mediaDevices.getUserMedia(
                  constraints
               );

               // cs.pc.addStream(this.mLocalStream);
               // this.mLocalStream.getTracks().forEach((track) => {
               //   await cs.pc.addTrack(track);
               // });
               if (cs.isVideo) {
                  cs.pc.addTrack(
                     this.mLocalStream.getVideoTracks()[0],
                     this.mLocalStream
                  );
               } else {
                  console.log("NOT adding local video tracks..");
               }
               cs.pc.addTrack(
                  this.mLocalStream.getAudioTracks()[0],
                  this.mLocalStream
               );
               cs.UI.localVideo.srcObject = this.mLocalStream;

               resolve();
            } catch (err) {
               console.log(`JS-WEBRTC : [addMedia] Get User Media error "${err}"`);
               reject(err);
            }
         });
      }

      async modifyMediaStream(callId, audiomode, videomode) {
         return new Promise(async (resolve, reject) => {
            try {
               console.log(
                  `JS-WEBRTC : [modifyMediaStream][${callId}] audio:${audiomode} video:${videomode}`
               );

               // TODO : test purpose
               // audiomode = this.connect_mode.HS_VOIP_MODE_SENDRECV;
               // videomode = this.connect_mode.HS_VOIP_MODE_SENDRECV;

               let callsession = this.getContext(callId);
               if (callsession == null) {
                  reject();
               }

               if (
                  audiomode == this.connect_mode.HS_VOIP_MODE_SENDRECV &&
                  videomode == this.connect_mode.HS_VOIP_MODE_SENDRECV
               ) {
                  await this.addMedia({audio: true, video: true}, callsession);
               } else if (audiomode == this.connect_mode.HS_VOIP_MODE_SENDRECV) {
                  await this.addMedia({audio: true}, callsession);
               } else if (videomode == this.connect_mode.HS_VOIP_MODE_SENDRECV) {
                  await this.addMedia({video: true}, callsession);
               } else if (
                  audiomode == this.connect_mode.HS_VOIP_MODE_INACTIVE &&
                  videomode == this.connect_mode.HS_VOIP_MODE_INACTIVE
               ) {
                  this.removeMedia(callsession.pc, audiomode, videomode);
               }
               resolve();
            } catch (e) {
               console.log(`JS-WEBRTC : [modifyMediaStream][${callId}] error:`, e);
               this.endCall();
               reject();
            }
         });
      }

      closePeerConnection(callId) {
         console.log(`JS-WEBRTC : [closePeerConnection][${callId}]`);
         let callsession = this.getContext(callId);
         if (callsession && callsession.pc) {
            if (this.mLocalStream) {
               this.mLocalStream.getTracks().forEach((track) => {
                  track.stop();
               });
            }
            callsession.pc.ontrack = null;
            callsession.pc.onremovetrack = null;
            callsession.pc.onremovestream = null;
            callsession.pc.onicecandidate = null;
            callsession.pc.oniceconnectionstatechange = null;
            callsession.pc.onsignalingstatechange = null;
            callsession.pc.onicegatheringstatechange = null;
            callsession.pc.onnegotiationneeded = null;
            callsession.pc.close();
            callsession.pc = null;
            this.removeContext(callId);
         }
      }

      // call strart will be here..
      async onnegotiationneeded(event, callId) {
         console.log(`JS-WEBRTC : [onnegotiationneeded] ${callId}`);
         let callsession = this.getContext(callId);
         if (callsession == null) {
            return;
         }
         console.log(
            "JS-WEBRTC : [onnegotiationneeded] SignalingState ",
            callsession.pc.signalingState
         );
         if (callsession.pc) {
            try {
               let description = await callsession.pc.createOffer();

               // remote offer might recvd while creating offer
               if (callsession.pc.signalingState != "stable") {
                  console.log(
                     `JS-WEBRTC : [onnegotiationneeded]  Invalid state "${callsession.pc.signalingState}"`
                  );
                  return;
               }
               console.log(`JS-WEBRTC : [onnegotiationneeded]  createOffer success`);
               await callsession.pc.setLocalDescription(description);
               console.log(
                  "JS-WEBRTC : [onnegotiationneeded] setLocalDescription done"
               );
               console.log(
                  `JS-WEBRTC : [onnegotiationneeded]  sending HS_VOIP_MC_WEBRTC_MSG_SDP_OFFER`
               );
               this.mPostToMc(
                  callId,
                  this.msg_type_enum.HS_VOIP_MC_WEBRTC_MSG_SDP_OFFER,
                  description.sdp,
                  description.sdp.length
               );
            } catch (err) {
               console.log(
                  "JS-WEBRTC : [onnegotiationneeded]  onnegotiationneeded error",
                  err
               );
            }
         } else {
            console.log("JS-WEBRTC : [onnegotiationneeded] No session avaialble");
         }
      }

      createPeerConnection(callId, mediaConstraints, iceServers) {
         console.log(`JS-WEBRTC : [createPeerConnection] ${callId}`);
         console.log("JS-WEBRTC: ICE Servers", iceServers);

         // Open stun and turn servers.
         iceServers = {
            iceServers: [
               {
                  url: "stun:stun.l.google.com:19302",
               },
               {
                  url: "turn:numb.viagenie.ca",
                  credential: "muazkh",
                  username: "webrtc@live.com",
               },
            ],
         };

         let session = this.getContext(callId);
         if (session == null) {
            console.log(
               `JS-WEBRTC : [createPeerConnection] ${callId} creating ctxt`
            );
            session = this.createCallSessionObject(callId, false, null, null);
            this.mCallSessions.push(session);
         }

         session.media_mode.audio = mediaConstraints.audio
            ? this.connect_mode.HS_VOIP_MODE_SENDRECV
            : this.connect_mode.HS_VOIP_MODE_INACTIVE;
         session.media_mode.video = mediaConstraints.video
            ? this.connect_mode.HS_VOIP_MODE_SENDRECV
            : this.connect_mode.HS_VOIP_MODE_INACTIVE;

         session.iceServers = iceServers;

         session.pc = new RTCPeerConnection(iceServers);

         // Local ICE candidates came..
         session.pc.onicecandidate = (event) => {
            console.log(`JS-WEBRTC : [onicecandidate] ${callId}.`);
            if (event.candidate) {
               let tmp = JSON.stringify({
                  ice: event.candidate,
               });
               console.log(
                  "JS-WEBRTC : [onicecandidate]" + tmp,
                  event.candidate,
                  event.candidate.length
               );
               let msg = event.candidate.toJSON().candidate;

               this.mPostToMc(
                  callId,
                  this.msg_type_enum.HS_VOIP_MC_WEBRTC_MSG_OTHER,
                  msg,
                  msg.length
               );
            }
         };

         session.pc.ontrack = (event) => {
            console.log(`JS-WEBRTC : ontrack ${callId}`);
            var cs = this.getContext(callId);
            if (cs == null) {
               console.log(`JS-WEBRTC : [ontrack] callId(${callId}) bad state.`);
            }
            if (cs && cs.UI.remoteVideo) {
               console.log(event.streams);
               cs.UI.remoteVideo.srcObject = event.streams[0];
            } else {
               cs.UI.remoteVideo.srcObject = event.streams[0];
               console.log("anjani==no remotevideo element");
            }
         };

         session.pc.onnegotiationneeded = (event) => {
            this.onnegotiationneeded(event, callId);
         };

         session.pc.oniceconnectionstatechange = () => {
            console.log(
               `JS-WEBRTC : [oniceconnectionstatechange]  connection state : ${session.pc.iceConnectionState}`
            );
            switch (session.pc.connectionState) {
               case "closed":
               case "failed":
                  this.closePeerConnection();
                  break;
            }
         };

         session.pc.onsignalingstatechange = async () => {
            console.log(
               `JS-WEBRTC : [onsignalingstatechange] signalling state : ${session.pc.signalingState}`
            );
            switch (session.pc.signalingState) {
               case "stable":
                  var icelen = session.iceCandidates.length;
                  for (var i = 0; i < icelen; i++) {
                     console.log(
                        "JS-WEBRTC : [onsignalingstatechange] adding iceCandidates from Q"
                     );
                     var candidate = session.iceCandidates.pop();
                     try {
                        await session.pc.addIceCandidate(
                           new RTCIceCandidate(candidate)
                        );
                     } catch (e) {
                        console.log(
                           "JS-WEBRTC : [onsignalingstatechange] Failed to add ICE Candidates :",
                           e
                        );
                     }
                  }
                  break;
               case "closed":
                  this.closePeerConnection();
                  break;
            }
         };
      }

      async setRemoteDescription(callId, sdp, isOffer) {
         console.log(
            `JS-WEBRTC : [setRemoteDescription] callId(${callId}) isOffer(${isOffer})`
         );
         var callsession = this.getContext(callId);
         if (callsession == null) {
            console.log(
               `JS-WEBRTC : [setRemoteDescription] callId(${callId}) bad state.`
            );
            return;
         }

         var sdp_type = isOffer == 1 ? "offer" : "answer";

         if (callsession && callsession.pc) {
            try {
               await callsession.pc.setRemoteDescription(
                  new RTCSessionDescription({
                     type: sdp_type,
                     sdp: sdp,
                  })
               );
               console.log(
                  `JS-WEBRTC : [setRemoteDescription][${callId}] done. signallingState:(${callsession.pc.signalingState})`
               );
               if (isOffer) {
                  await this.modifyMediaStream(
                     callId,
                     callsession.media_mode.audio,
                     callsession.media_mode.video
                  );
                  var description = await callsession.pc.createAnswer();
                  await callsession.pc.setLocalDescription(description);

                  this.mPostToMc(
                     callId,
                     this.msg_type_enum.HS_VOIP_MC_WEBRTC_MSG_SDP_ANSWER,
                     description.sdp,
                     description.sdp.length
                  );
               }
            } catch (err) {
               console.log(
                  `JS-WEBRTC : [setRemoteDescription][${callId}] Handling failed (${err}))`
               );
            }
         } else {
            console.log(
               `JS-WEBRTC : [setRemoteDescription][${callId}] No callsession Object for callId(${callId})`
            );
         }
      }

      receivingRemoteIce(callId, candidate) {
         console.log(
            `JS-WEBRTC : [receivingRemoteIce][${callId}] candidates : (${candidate})`
         );

         let callsession = this.getContext(callId);

         if (callsession == null) {
            console.error("JS-WEBRTC : [receivingRemoteIce] Invalid state");
            return null;
         }

         let iceObj = {
            candidate: candidate,
            sdpMid: 0,
            sdpMLineIndex: 0,
         };

         if (callsession.pc) {
            callsession.pc
               .addIceCandidate(new RTCIceCandidate(iceObj))
               .catch((err) => {
                  console.log(
                     `JS-WEBRTC : [receivingRemoteIce][${callId}] addIceCandidate failure ${err} ${iceObj}`
                  );
               });
         } else {
            console.log(`JS-WEBRTC : [receivingRemoteIce][${callId}]  failure`);
         }
      }

      systemManagerNotification(obj) {
         console.log(
            ">>>>>>>>>>>>>>>>>>>>>>> systemNotification <<<<<<<<<<<<<<<<<<<<<<<<",
            obj.type,
            obj
         );
         let notification = {};
         switch (obj.type) {
            case this.SystemNotification.INITIALIZATION_SUCCESS: {
               this.startProvisioning(
                  "+919000000000",
                  this.mConfigParams.appId,
                  this.mConfigParams.provServerUri,
                  this.mConfigParams.authToken
               );
               return;
            }
            case this.SystemNotification.REGISTRATION_SUCCESS: {
               // TODO:: Remove this in production
               //addToLog("Registration success");
               notification.code = 200;
               notification.reasonPhrase = "success";
               break;
            }
            case this.SystemNotification.OTP_VERIFICATION_SUCCESS: {
               // TODO:: Remove this in production
               //addToLog("Provisioning success");
               this.mConfigParams.uri = obj.data.uid.uri;
               this.mConfigParams.domainName = obj.data.domainName;
               this.mConfigParams.displayName = obj.data.uid.displayName;

               // let domainName = obj.data.domainName;
               // let displyName = obj.data.uid.displyName;

               //TODO: Could be improved??
               this.mConfigParams.uri = obj.data.uid.uri.slice(
                  4,
                  obj.data.uid.uri.indexOf(obj.data.domainName) - 1
               );

               this.startRegistration(
                  this.mConfigParams.uri,
                  this.mConfigParams.displayName,
                  this.mConfigParams.domainName
               );
               return;
            }
            case this.SystemNotification.INITIALIZATION_FAILED: {
               notification.code = 4000;
               notification.reasonPhrase = "INITIALIZATION_FAILED";
               break;
            }
            case this.SystemNotification.OTP_SEND_FAILED: {
               notification.code = 4001;
               notification.reasonPhrase = "OTP_SEND_FAILED";
               break;
            }
            case this.SystemNotification.OTP_VERIFICATION_FAILED: {
               notification.code = 4002;
               notification.reasonPhrase = "OTP_VERIFICATION_FAILED";
               break;
            }
            case this.SystemNotification.REGISTRATION_FAILED: {
               notification.code = 4003;
               notification.reasonPhrase = "REGISTRATION_FAILED";
               break;
            }
            case this.SystemNotification.DEREGISTRATION_SUCCESS: {
               break;
            }
            case this.SystemNotification.DEREGISTRATION_FAILED: {
               break;
            }
            case this.SystemNotification.DEINITIALIZATION_SUCCESS: {
               break;
            }
         }
         this.eventDispatcher.dispatchEvent("MEESDK_INIT", notification);
      }

      CallManagerNotification(obj) {
         // TODO:: Remove this in production
         console.log(`JS-WEBRTC : [CallManagerNotification] ${obj.type}`);
         let ev = {};
         switch (obj.type) {
            case this.callmgrNotificationObject.INCOMING_CALL: {
               console.log("INCOMING_CALL..", obj.data.callId);
               ev.type = this.callNotifications.INCOMING_CALL;
               ev.remoteUri = obj.data.remoteUri;
               ev.isVideo = (obj.data.eCallMode == 0) ? false : true;
               let session = this.getContext(obj.data.callId);
               if (session == null) {
                  console.log(
                     `JS-WEBRTC : [CallManagerNotification] ${callId} creating ctxt`
                  );
                  session = this.createCallSessionObject(
                     obj.data.callId,
                     false,
                     null,
                     null
                  );
                  this.mCallSessions.push(session);
               }

               session.isVideo = obj.data.eCallMode;
               ev.data = session;
               break;
            }
            case this.callmgrNotificationObject.CALL_ENDED: {
               ev.type = this.callNotifications.CALL_ENDED;
               break;
            }
            case this.callmgrNotificationObject.INCOMING_CALL_REJECTED: {
               ev.type = this.callNotifications.CALL_REJECTED;
            }
         }
         this.mCallEvtCb(ev);
      }

      CallSessionNotification(callSessionEvt) {
         // TODO:: Remove this in production
         console.log(
            `JS-WEBRTC : [CallSessionNotification] ${callSessionEvt.type}`
         );
         let notification = {};
         switch (callSessionEvt.type) {
            case this.callSessionNotificationObject.CALL_PROGRESS: {
               notification.type = this.callNotifications.CALL_PROGRESS;
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_ANSWER_FAILED: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_END_FAILED: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_ENDED: {
               notification.type = this.callNotifications.CALL_ENDED;
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.IS_ON_LOCAL_HOLD: {
               notification.type = "";
               notification.data = {};
            }
            case this.callSessionNotificationObject.IS_ON_MUTE: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_REPLACED: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_REPLACE_FAILURE: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_FORWARD_REQUEST: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_FORWARDED: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.START_VIDEO_REQUEST: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.START_VIDEO_SUCCESS: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.START_VIDEO_FAILED: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.STOP_VIDEO_SUCCESS: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.STOP_VIDEO_FAILED: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_RING_OUT: {
               notification.type = this.callNotifications.CALL_RINGING;
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_EARLY_MEDIA: {
               notification.type = "";
               notification.data = {};
               break;
            }
            case this.callSessionNotificationObject.CALL_STATE_CONNECTED: {
               notification.type = this.callNotifications.CALL_CONNECTED;
               notification.data = {};
               break;
            }
         }
         this.mCallEvtCb(notification);
      }
   }

   window.ME = new MeeamiSdk();
})(window);

window.Module = {locateFile: (url) => `./sdk/${url}`};
