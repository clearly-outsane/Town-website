import React, { useEffect, useState } from "react";
import { Video } from "./components";

import Unity, { UnityContent } from "react-unity-webgl";

const unityContent = new UnityContent(
    "unityBuild/uncompressed_webgl.json",
    "unityBuild/UnityLoader.js"
);

const App = () => {
    //for video
    const [inCall, setInCall] = useState(false);
    const [channelName, setChannelName] = useState("");

    const [isLoaded, setLoaded] = useState(false);
    const [progression, setProgression] = useState(0);
    const [message, setMessage] = useState("");
    const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });

    useEffect(function () {
        unityContent.on("progress", setProgression);
        unityContent.on("loaded", function () {
            setLoaded(true);
        });
        unityContent.on("error", function (message) {
            console.log("An error!", message);
        });
        unityContent.on("log", function (message) {
            console.log("A message!", message);
        });
        unityContent.on("canvas", function (element) {
            console.log("Canvas", element);
        });
        unityContent.on("Say", setMessage);
        unityContent.on("ClickedPosition", function (x, y) {
            setClickedPosition({ x, y });
        });

        unityContent.on("JoinChannel", function (channel) {
            setChannelName(channel);
            setInCall(true);
        });
    }, []);

    return (
        <div>
            <div id="container">
                <Unity
                    unityContent={unityContent}
                    style={{
                        background: "grey",
                        position: "absolute",
                        height: "100vh",
                        width: "100vw",
                        bottom: 0,
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
