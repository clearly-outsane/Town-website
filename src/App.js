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
