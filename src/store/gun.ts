import Gun from "gun/gun";
import "gun/lib/webrtc";

// let peers;

const process = { env: { NODE_ENV: "" } };

function peers(): string[] {
  // if (process.env.NODE_ENV === "development") {
  //   peers = ["http://localhost:8765/gun"];
  // } else {
  //   peers = [
  //     // Community relay peers: https://github.com/amark/gun/wiki/volunteer.dht
  //     // "https://www.raygun.live/gun",
  //     "https://gunmeetingserver.herokuapp.com/gun",
  //     // "https://gun-us.herokuapp.com/gun",
  //     // "https://gun-eu.herokuapp.com/gun",
  //   ];
  // }
  return ["https://gunmeetingserver.herokuapp.com/gun"];
}

declare global {
  interface Window {
    gun: any;
  }
}

const gun = new Gun({
  peers: peers(),
});
window.gun = gun;
// const gun = null;
export { gun };
