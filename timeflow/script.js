window.onload = function()
{
  initializeCanvas();
}

//window.addEventListener('resize', initializeCanvas);



function redrawScaleCanvas(scalecanvas, offset,zoom){
  const stx = scalecanvas.getContext("2d");
  stx.clearRect(0, 0, scalecanvas.width, scalecanvas.height);

  stx.fillStyle = "white";
  stx.strokeStyle = "#BBBBBB";
  stx.font = '10px sans-serif';
  stx.lineWidth = 1;
  stx.beginPath();
  stx.moveTo(0,1);
  stx.lineTo(1,scalecanvas.width);


  const startN = 10;
  const TICKHEIGHT_1 = 3;
  const TICKHEIGHT_2 = 5;
  const TICKHEIGHT_3 = 7;
  const TICKHEIGHT_4 = 10;

  const k = 1;

  let n = startN;
  //let k = KINCSIZE;

  const INTERVAL = 5;

  const TICKSIZE = 20*zoom;
  const OFFSET = 1970;
  const STARTPIXEL = Math.round(-offset/TICKSIZE);  

  console.log(STARTPIXEL);

  let x=STARTPIXEL;


// > 25 -> 1
// < 25 -> 2      25/12.5 = 2
//Math.ceil(TICKSIZE/12.5)


  for( let k = STARTPIXEL ; k < scalecanvas.width + STARTPIXEL / TICKSIZE ; k++ ){
    x+=TICKSIZE;
    n=k+OFFSET;
    stx.moveTo(x + 0.5 ,0);
    stx.lineTo(x + 0.5 , ( n % INTERVAL ? TICKHEIGHT_1 : TICKHEIGHT_3 ));
    stx.lineTo(x + 0.5 , ( n % (INTERVAL*2) ? TICKHEIGHT_2 : TICKHEIGHT_4 ));
    if( n %(INTERVAL*2 )===0){
      stx.font = '15px sans-serif';
      const ndigits = `${n}`.length;
      stx.fillText(n, x - (ndigits*15)/4, TICKHEIGHT_4 + 15);
    } else {
        if( n %(INTERVAL )===0 && TICKSIZE > 15 ){
          stx.font = '15px sans-serif';
          const ndigits = `${n}`.length;
          stx.fillText(n, x - (ndigits*15)/4, TICKHEIGHT_4 + 15);
        } else {
            if( TICKSIZE > 35 ){
              stx.font = '15px sans-serif';
              const ndigits = `${n}`.length;
              stx.fillText(n, x - (ndigits*15)/4, TICKHEIGHT_4 + 15);
            }
        }
    } 
  }
  stx.stroke();


}



function initializeCanvas(ev){

  const scalecanvas =  document.getElementById("scale");
  const scalerect = scalecanvas.getBoundingClientRect();
  scalecanvas.width = scalerect.width;
  scalecanvas.height = scalerect.height;

  redrawScaleCanvas(scalecanvas,0);




  const canvasElement = document.getElementById("timeline");
  const rect = canvasElement.getBoundingClientRect();
  canvasElement.width = rect.width;
  canvasElement.height = rect.height;


  const canvas = new InfiniteCanvas(canvasElement);
  let t;
  canvas.addEventListener('draw', () => {
    t = canvas.rectangle.coordinateSystems.screen.infiniteCanvasContextBase;

    redrawScaleCanvas(scalecanvas,t.e,t.a);


    //console.log( [t.a,t.b,t.c,t.d,t.e,t.f] );
    //console.log(canvas.rectangle.coordinateSystems.screen.inverseBase);
    //console.log(canvas.rectangle.coordinateSystems.screen.infiniteCanvasContextBase);
    //console.log(canvas.rectangle.coordinateSystems.screen.inverseInfiniteCanvasContextBase);
    //console.log(canvas.viewBox);
  });



  //This triggers the redraw on horizonal resizing and avoids image "squishing"
  canvas.setUnits(InfiniteCanvas.CSS_UNITS);


  const ctx = canvas.getContext("2d");
  //ctx.fillStyle = "#444444";
  //ctx.fillRect(-Infinity, -Infinity, Infinity, Infinity);

  

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  // Set line width
  ctx.lineWidth = 10;

  // Wall
  ctx.strokeRect(-25, 140, 150, 110);

  // Door
  ctx.fillRect(30, 190, 40, 60);

  // Roof
  ctx.beginPath();
  ctx.moveTo(-50, 140);
  ctx.lineTo(50, 60);
  ctx.lineTo(150, 140);
  ctx.closePath();
  ctx.stroke();

  ctx.font = '10px sans-serif';
  ctx.fillText('Hello world', -90, 50);
}