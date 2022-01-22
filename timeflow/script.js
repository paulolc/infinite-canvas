window.onload = function()
{
  initializeCanvas();
}

//window.addEventListener('resize', initializeCanvas);


function initializeCanvas(ev){



  const canvasElement = document.getElementById("timeline");
  const scalecanvas =  document.getElementById("scale");

  const rect = canvasElement.getBoundingClientRect();
  const scalerect = scalecanvas.getBoundingClientRect();

  scalecanvas.width = scalerect.width;
  scalecanvas.height = scalerect.height;

  canvasElement.width = rect.width;
  canvasElement.height = rect.height;

  const stx = scalecanvas.getContext("2d");

  const canvas = new InfiniteCanvas(canvasElement);
  canvas.setUnits(InfiniteCanvas.CSS_UNITS);


  const ctx = canvas.getContext("2d");
  //ctx.fillStyle = "#444444";
  //ctx.fillRect(-Infinity, -Infinity, Infinity, Infinity);

  

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";


  //stx.strokeStyle = "#FF0000";
  stx.fillStyle = "white";
  stx.strokeStyle = "#BBBBBB";
  //stx.font = '10px sans-serif';
  //stx.fillText('Hello world', 10, 50);
  stx.lineWidth = 1;

  stx.beginPath();
  stx.moveTo(0,0);
  stx.lineTo(0,scalecanvas.width);



  let n = 100;

  for( let x = 5 ; x < scalecanvas.width ; x+=5){
    stx.moveTo(x + 0.5 ,0);
    stx.lineTo(x + 0.5 , ( x % 20 ? 3 : 7 ));
    stx.lineTo(x + 0.5 , ( x % 40 ? 5 : 10 ));
    if(x%40===0){
      //console.log(n);
      stx.fillText(n, x-8, 25);
      n+=10;
    }
  }
  stx.stroke();




  // Set line width
  ctx.lineWidth = 10;

  // Wall
  ctx.strokeRect(75, 140, 150, 110);

  // Door
  ctx.fillRect(130, 190, 40, 60);

  // Roof
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();

  ctx.font = '10px sans-serif';
  ctx.fillText('Hello world', 10, 50);
}