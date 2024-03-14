import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { useQuery } from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import { getSignature } from "../../utils/zoomService";

const leaveUrl = "https://be2u7.csb.app/video-call-end";

export default function VideoCall() {
  const history = useHistory();
  const { password, meetingNumber, username, role } = useQuery();
  if (!password || !meetingNumber || !username || !role) {
    alert(
      `There's no valid arguments to join a meeting. Redirecting to home..`
    );
    history.push("/");
  }

  document.title = "Joining...";

  function joinMeeting(config) {
    ZoomMtg.init({
      isSupportAV: true,
      leaveUrl,
      success: (success) => {
        console.log("Init success", success);
        ZoomMtg.join({
          meetingNumber: config.meetingNumber,
          signature: config.signature,
          passWord: config.password,
          apiKey: config.apiKey,
          userName: config.username,
          success: (s) => {
            document.title = "Video call: Joined";
            console.log("JoinMeeting success", s);
          },
          error: (e) => {
            document.title = "Error joining";
            console.log("Error:ZoomMtg.join()", e);
            alert("check the log");
          }
        });
      },
      error: (e) => {
        console.log("Error:ZoomMtg.init()", e);
        alert("check the log");
      }
    });
  }

  function startMeeting() {
    getSignature({ meetingNumber, role })
      .then((resp) => {
        document.getElementById("zmmtg-root").style.display = "block";

        const data = resp.data;
        const config = {
          signature: data.signature,
          apiKey: data.apiKey,
          meetingNumber,
          role,
          password,
          username
        };
        joinMeeting(config);
      })
      .catch((e) => {
        console.log("ERROR:getSignature()".e);
      });
  }

  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/1.8.5/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    startMeeting();
  }, []);

  return <></>;
}
