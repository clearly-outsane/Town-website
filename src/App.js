import React, { useEffect, useState } from "react";
import { Video } from "./components";

import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "unityBuild/myunityapp.loader.js",
  dataUrl: "unityBuild/myunityapp.data",
  frameworkUrl: "unityBuild/myunityapp.framework.js",
  codeUrl: "unityBuild/myunityapp.wasm",
});

const App = () => {
  return (
    <div>
      <div>
        {/* <Video /> */}
        <Unity
          unityContext={unityContext}
          style={{
            width: "600px",
            height: "600px",
            border: "2px solid black",
            background: "grey",
          }}
        />
      </div>
    </div>
  );
};

export default App;
