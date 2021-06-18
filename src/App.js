import React, { useEffect, useState } from "react";
import { Video } from "./components";

import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "unityBuild/uncompressed_webgl.loader.js",
  dataUrl: "unityBuild/uncompressed_webgl.data",
  frameworkUrl: "unityBuild/uncompressed_webgl.framework.js",
  codeUrl: "unityBuild/uncompressed_webgl.wasm",
});

const App = () => {
  //for video
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  const [isLoaded, setLoaded] = useState(false);
  const [progression, setProgression] = useState(0);
  const [message, setMessage] = useState("");
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });

  useEffect(function () {
    unityContext.on("progress", setProgression);
    unityContext.on("loaded", function () {
      setLoaded(true);
    });
    unityContext.on("error", function (message) {
      console.log("An error!", message);
    });
    unityContext.on("log", function (message) {
      console.log("A message!", message);
    });
    unityContext.on("canvas", function (element) {
      console.log("Canvas", element);
    });
    unityContext.on("Say", setMessage);
    unityContext.on("ClickedPosition", function (x, y) {
      setClickedPosition({ x, y });
    });

    setChannelName("lol");
    setInCall(true);
  }, []);

  return (
    <div>
      <div id="container">
        <Unity
          unityContext={unityContext}
          style={{
            background: "grey",
            position: "absolute",
            height: "100vh",
            width: "100vw",
          }}
          tabIndex={1}
        />

        <div id="overlay">
          <Video
            inCall={inCall}
            setInCall={setInCall}
            channelName={channelName}
          />
          <div>
            {progression * 100 < 100 && (
              <p style={{ color: "white" }}>
                Loading {progression * 100} percent...
                {isLoaded === true && <p>Loaded!</p>}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
