const System = {
    string : electronAPI.getRes("./DATA/res/string.pur"),
    view : document.getElementById("pumaze_gameView"),
    ResList : [],
    CloseAppFunc : [],
    /**新增資源檔至遊戲中。
     * @return 資源檔的索引值。
     */
    addRes : (path) => {
        System.ResList.push(electronAPI.getRes(path));
        return System.ResList.length - 1;
    },
    /**開啟擴充內容。將覆蓋前一項內容，執行前應徹底清除舊有內容，必輾造成系統資源浪費。
     * @url : 文件路徑。
     * @cb : 讀取完成後執行的函式。
     * @cbe : 讀取失敗後執行的函式(回傳Error內容)。
     */
    __loadScript : (url, cb, cbe) => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "pumaze_expansion"
    
        try {
            script.onload = function () {
                cb();
            };
    
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        } catch (e) {
            if (null !== callbackError) cbe(e);
        }
    },
    /**執行擴充內容，使用上與System.__loadScript有相同要求，且該函式執行成功後會直接執行新擴充內容。 */
    RunExpansion : (url, cbe) => {
        System.__loadScript(url, () => {
            OnInit();
            SystemDisplay.Init();
            OnRun();
        }, cbe);
    }
    
}

const SystemKey = {
    KeyPressEvent : [],
    KeyDownEvent : [],
    KeyUpEvent : [],
    KeyPressFunc : (ev) => {
        for (var i in SystemKey.KeyPressEvent) {
            SystemKey.KeyPressEvent[i](ev);
        }
    },
    KeyDownFunc : (ev) => {
        for (var i in SystemKey.KeyDownEvent) {
            SystemKey.KeyDownEvent[i](ev);
        }
    },
    KeyUpFunc : (ev) => {
        for (var i in SystemKey.KeyUpEvent) {
            SystemKey.KeyUpEvent[i](ev);
        }
    }
}

const SystemDisplay = {
    InitWindow : [],
    Init : () => {
        for (var i in SystemDisplay.InitWindow) {
            SystemDisplay.InitWindow[i]();
        }
    },
    /**取得物件大小。
     * @mode : "w" => 寬， "h" => 高。
     * @args : 元素ID，也可以是多個ID組成的陣列。
     */
    GetSize : (mode, args) => {
        if (mode == 'w') {
            if (typeof args === typeof "") { return document.getElementById(args).clientWidth; }
            else {
                var num = 0;
                for (var i = 0; i < args.length; i++) {
                    num += document.getElementById(args[i]).clientWidth;
                }
                return num;
            }
        }
        else if (mode == 'h') {
            if(typeof args === typeof "") { return document.getElementById(args).clientHeight;}
            else {
                var num = 0;
                for(var i = 0; i < args.length; i++) {
                    num += document.getElementById(args[i]).clientHeight
                }
                return num;
            }
        }
    },
    /**重設視窗控件大小。 */
    ReWindowSize : (e) => {
        if (electronAPI.getWindowMode_isFull()) {
            document.getElementById('titleBar').style.display = 'None';
        }
        else {
            document.getElementById('titleBar').style.display = 'block';
            const titleBtn = document.getElementsByClassName('titleBtn');
            if (window.innerHeight <= 1680) {
                document.getElementById('titleBar').style.height = "32px";
                for (var i = 0; i < titleBtn.length; i++) {
                    titleBtn[i].style.height = "16px"
                    titleBtn[i].style.width = "16px"
                    titleBtn[i].style.padding = "8px"
                    titleBtn[i].style.padding.left = "12px"
                    titleBtn[i].style.padding.right = "12px"
    
                }
            }
            else if (window.innerHeight <= 1920) {
                document.getElementById('titleBar').style.height = "48px";
                for (var i = 0; i < titleBtn.length; i++) {
                    titleBtn[i].style.height = "24px"
                    titleBtn[i].style.width = "24px"
                    titleBtn[i].style.padding = "12px"
                    titleBtn[i].style.padding.left = "18px"
                    titleBtn[i].style.padding.right = "18px"
                }
            }
            else if (window.innerHeight > 1920) {
                document.getElementById('titleBar').style.height = "64px";
                for (var i = 0; i < titleBtn.length; i++) {
                    titleBtn[i].style.height = "32px"
                    titleBtn[i].style.width = "32px"
                    titleBtn[i].style.padding = "16px"
                    titleBtn[i].style.padding.left = "24px"
                    titleBtn[i].style.padding.right = "24px"
                }
            }
        }
        const view = document.getElementById("pumaze_gameView");
        view.style.height = "" + (window.innerHeight - SystemDisplay.GetSize("h", "titleBar")) + "px";
    },
    __CloseApp :() => { 
        for (var i in System.CloseAppFunc) {
            try {
                System.CloseAppFunc[i]();
            } catch {
                console.log("" + System.CloseAppFunc[i] + "不是方法。")
            }
        }
        electronAPI.closeApp(); 
    },
    __MaxApp :() => {
        if (electronAPI.getWindowMode_isMax()) {
            electronAPI.maxApp('normal');
        }
        else {
            electronAPI.maxApp('max');
        }
    },
    __MinApp : () => {
        electronAPI.minApp();
    }
}
//初始化應用程式
window.addEventListener("load", () => {
    document.title = System.string["title"];
    System.RunExpansion("./Expansion/MainGame/index.js")
});

//加入系統事件
window.addEventListener("resize", System.ReWindowSize);
window.addEventListener("keypress", SystemKey.KeyPressFunc)
window.addEventListener("keydown", SystemKey.KeyDownFunc)
window.addEventListener("keyup", SystemKey.KeyUpFunc)
SystemDisplay.InitWindow.push(() => {
    for (var i in document.getElementsByClassName("titleText")) {
        document.getElementsByClassName("titleText")[i].innerHTML = System.string["title"];
    }
})