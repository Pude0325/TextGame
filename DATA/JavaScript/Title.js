// window.addEventListener('resize', (e) => {
//     if (electronAPI.getWindowMode_isFull()) {
//         document.getElementById('titleBar').style.display = 'None';
//     }
//     else {
//         document.getElementById('titleBar').style.display = 'block';
//         const titleBtn = document.getElementsByClassName('titleBtn');
//         if (window.innerHeight <= 1680) {
//             document.getElementById('titleBar').style.height = 32;
//             for (var i = 0; i < titleBtn.length; i++) {
//                 titleBtn[i].style.height = "16px"
//                 titleBtn[i].style.width = "16px"
//                 titleBtn[i].style.padding = "8px"
//                 titleBtn[i].style.padding.left = "12px"
//                 titleBtn[i].style.padding.right = "12px"

//             }
//         }
//         else if (window.innerHeight <= 1920) {
//             document.getElementById('titleBar').style.height = 48;
//             for (var i = 0; i < titleBtn.length; i++) {
//                 titleBtn[i].style.height = 24
//                 titleBtn[i].style.width = 24
//                 titleBtn[i].style.padding = 12
//                 titleBtn[i].style.padding.left = 18
//                 titleBtn[i].style.padding.right = 18
//             }
//         }
//         else if (window.innerHeight > 1920) {
//             document.getElementById('titleBar').style.height = 64;
//             for (var i = 0; i < titleBtn.length; i++) {
//                 titleBtn[i].style.height = 32
//                 titleBtn[i].style.width = 32
//                 titleBtn[i].style.padding = 16
//                 titleBtn[i].style.padding.left = 24
//                 titleBtn[i].style.padding.right = 24
//             }
//         }
//     }
//     const view = document.getElementById("pumaze_gameView");
//     view.style.height = window.innerHeight - System.GetSize("h", "titleBar");
// })
// function CloseApp() { electronAPI.closeApp(); }
// function MaxApp() {
//     if (electronAPI.getWindowMode_isMax()) {
//         electronAPI.maxApp('normal');
//     }
//     else {
//         electronAPI.maxApp('max');
//     }
// }
// function MinApp() {
//     electronAPI.minApp();
// }