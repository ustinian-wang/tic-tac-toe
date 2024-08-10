import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App.jsx";

// 这里类似new Vue的创建方式 new Vue({el:"#root"});
const root = createRoot(document.getElementById("root"));

// $vm.render添加渲染函数
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);