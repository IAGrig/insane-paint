function changeColor(color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

function getRandomColor() {
  var r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return "rgb(" + r + "," + g + "," + b + ")";
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let Wwidth = window.innerWidth * 0.9;
let Wheith = window.innerHeight;
canvas.width = Wwidth;
canvas.height = Wheith;

const fileUploader = document.getElementById("fileChoose");
const fileUploadButton = document.getElementById("insertFileButton");
fileUploadButton.onclick = () => {
  let file = fileUploader.value;
  if (file) {
    canvas.style.backgroundImage = `url(${file})`;
  }
};

const colorPicker = document.getElementById("colorPick");
colorPicker.onchange = (e) => {
  changeColor(colorPicker.value);
};

const lineWeight = document.getElementById("lineWeight");
lineWeight.value = 20;
const lineWeightNum = document.getElementById("lineWeightNum");
lineWeightNum.value = lineWeight.value;

lineWeight.onchange = (e) => {
  ctx.lineWidth = lineWeight.value;
  lineWeightNum.value = lineWeight.value;
};

lineWeightNum.onchange = (e) => {
  ctx.lineWidth = lineWeightNum.value;
  lineWeight.value = lineWeightNum.value;
};

const clearButton = document.getElementById("clear");
clearButton.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var randomizeColor = false;
const randomColorButton = document.getElementById("randomColor");
randomColorButton.onclick = (e) => {
  if (randomizeColor) {
    randomizeColor = false;
    randomColorButton.value = "Random Color";
  } else {
    randomizeColor = true;
    randomColorButton.value = "State Color";
  }
};

let isMouseDown = false;
ctx.lineWidth = 20;

document.onmousedown = (e) => {
  isMouseDown = true;
  ctx.beginPath();
};
document.onmouseup = (e) => {
  isMouseDown = false;
};

canvas.onmousemove = function (e) {
  if (isMouseDown) {
    if (randomizeColor) {
      changeColor(getRandomColor());
    }
    let x = e.clientX - window.innerWidth * 0.1;
    let y = e.clientY;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
};

canvas.onclick = function (e) {
  if (randomizeColor) {
    changeColor(getRandomColor());
  }
  let x = e.clientX - window.innerWidth * 0.1;
  let y = e.clientY;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y);
};
