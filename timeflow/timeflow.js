const STARTYEAR = 1970;
const UNITSPERTICK = 30;
const STARTY = 200
const IMGINITMARKERPADDING = 2;
const MARKERHEIGHT = 10;
const IMGTXTPADDING = 5;
const SPACEBETWEENTXTLINES = 2;
const CHARWIDTH = 7;
const CHARHEIGHT = 14;
const MAXCARDHEIGHT = 175;
const MAXY =MAXCARDHEIGHT*7
const TICKHEIGHT_1 = 3;
const TICKHEIGHT_2 = 5;
const TICKHEIGHT_3 = 7;
const TICKHEIGHT_4 = 15;




window.onload = function()
{
  
  fetch("./timeflow-records.json")
  .then(response => response.json())
  .then(json => initializeCanvas(json));
}




function xByYear( year ){
  return (  year - STARTYEAR ) * UNITSPERTICK;
}


function loadImage( imgurl, cb){
  if(imgurl==="") return;
  const img = document.createElement('img');
  img.src = imgurl;
  document.getElementsByTagName("body")[0].appendChild(img);
  const imgcheckinterval = setInterval(()=>{ 
    if ( img.complete ) {
      clearInterval(imgcheckinterval);
      cb(img);
    }
  },500);
}


function redrawScaleCanvas(data, scalecanvas, gridcanvas, offset,zoom){
  const stx = scalecanvas.getContext("2d"); 
  const gtx = gridcanvas.getContext("2d");
  stx.clearRect(0, 0, scalecanvas.width, scalecanvas.height);
  gtx.clearRect(0, 0, gridcanvas.width, gridcanvas.height);

  gtx.lineWidth = 1;


  stx.fillStyle = "white";
  stx.strokeStyle = "#BBBBBB";
  stx.font = '10px sans-serif';
  stx.lineWidth = 1;
  stx.beginPath();
  stx.moveTo(0,0);
  stx.lineTo(scalecanvas.width,0);


  const ticksize = UNITSPERTICK*zoom;
  const startpixel = offset % ticksize;  


  let x=startpixel;
  let year;

  for( let k = startpixel ; x < scalecanvas.width + startpixel ; k++ ){
    year = STARTYEAR + Math.round( ( x - offset ) / ticksize );
    

    // ===== Grid Line =====
    if( year%10 === 0 ) {
      gtx.strokeStyle = "#666666";
    } else {
      gtx.strokeStyle = "#555555";
    }

    gtx.beginPath();
    gtx.moveTo(x + 0.5 ,0);
    gtx.lineTo(x + 0.5 , gridcanvas.height );
    gtx.closePath();
    gtx.stroke();
    // ===================


    stx.moveTo(x + 0.5 ,0);
    stx.lineTo(x + 0.5 , (year%10 === 0 ? TICKHEIGHT_4 : TICKHEIGHT_3) );
    stx.font = '12px sans-serif';
    const ndigits = `${year}`.length;

    if( year%10 === 0 || ticksize > 30) {
      stx.fillText( year , x - (ndigits*12)/4 , TICKHEIGHT_4 + 15);
    }

    x+=ticksize;
  }
  stx.stroke();


}

function initializeCanvas(data){

  const scalecanvas =  document.getElementById("scale");
  const scalerect = scalecanvas.getBoundingClientRect();
  const gridcanvas =  document.getElementById("grid");
  const gridrect = gridcanvas.getBoundingClientRect();
  gridcanvas.width = gridrect.width;
  gridcanvas.height = gridrect.height;
  
  scalecanvas.width = scalerect.width;
  scalecanvas.height = scalerect.height;

  const gtx = gridcanvas.getContext("2d");  
  const stx = scalecanvas.getContext("2d");

  redrawScaleCanvas(data, scalecanvas,gridcanvas,0);

  const canvasElement = document.getElementById("timeline");
  const rect = canvasElement.getBoundingClientRect();
  canvasElement.width = rect.width;
  canvasElement.height = rect.height;

  const canvas = new InfiniteCanvas(canvasElement);
  let t;
  canvas.addEventListener('draw', () => {
    t = canvas.rectangle.coordinateSystems.screen.infiniteCanvasContextBase;
    redrawScaleCanvas(data,scalecanvas,gridcanvas,t.e,t.a);
  });

  //This triggers the redraw on horizonal resizing and avoids image "squishing"
  canvas.setUnits(InfiniteCanvas.CSS_UNITS);

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  ctx.font = '14px sans-serif';
  const x = xByYear(1975);
  const y = 30;
  ctx.lineWidth = 0;
  ctx.beginPath();
  ctx.moveTo(x, y );
  ctx.lineToInfinityInDirection(0,-1);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y-3, 3, 0, 2 * Math.PI);
  ctx.fill();


  ctx.fillText('Paulo is born!', x + 10, y);

  let currY = STARTY; 
  let lastMaxX=Number.MIN_VALUE;

  let maxRightMostX = Number.MIN_VALUE;


  data.forEach( record => {
    const minX = xByYear(record.start);
    const maxX = xByYear(record.end);

    let yIncrement = 0;
    if( minX < lastMaxX ){      
      yIncrement = MAXCARDHEIGHT;
      if( currY - MARKERHEIGHT >= STARTY ){
        yIncrement = -MAXCARDHEIGHT;
      }
    }

    const minY = currY + yIncrement;
    const maxY = minY + 10;
    
    currY = maxY + 10;
    
   
    const imgwidth = 100;
    let imageHeight = 0;
    loadImage( record.image, img =>{
      imageHeight = img.height * imgwidth/img.width;
      ctx.drawImage(img,minX , minY - imageHeight , imgwidth, imageHeight);
      ctx.beginPath();
      ctx.moveTo(minX, minY+MARKERHEIGHT);
      //ctx.lineToInfinityInDirection(0,-1);
      ctx.lineTo(minX, minY-imageHeight);
      ctx.closePath();
      ctx.stroke();
      

    });

    ctx.beginPath();
    ctx.moveTo(minX, minY );
    ctx.lineTo(maxX, minY);
    ctx.lineTo(maxX, maxY);
    ctx.lineTo(maxX-MARKERHEIGHT/2, maxY-MARKERHEIGHT/2);
    ctx.lineTo(minX+MARKERHEIGHT/2, maxY-MARKERHEIGHT/2);
    ctx.lineTo(minX, maxY);
    ctx.fill();
    ctx.closePath();

    let maxtextwidth = 0;
    const nlines = record.description.length +1;
    let textsize = { width: CHARWIDTH , height: CHARHEIGHT } //stx.measureText("A");
    currY = currY - nlines * ( textsize.height + SPACEBETWEENTXTLINES )
    
    
    record.description.forEach(textline => { 
      textsize = { width: textline.length * CHARWIDTH , height: CHARHEIGHT } ;//stx.measureText(textline);
      maxtextwidth = ( maxtextwidth > textsize.width ? maxtextwidth : textsize.width) ;
      ctx.fillText(textline, minX + imgwidth + IMGTXTPADDING, currY );
      currY += textsize.height; 
    } );

    const rightMostX = minX + imgwidth + IMGTXTPADDING + maxtextwidth; 
    maxRightMostX = ( maxRightMostX > rightMostX ? maxRightMostX : rightMostX );
    //DEBUG: ctx.strokeRect(minX,minY+MARKERHEIGHT, rightMostX - minX, - 75 );
    
    if( rightMostX > maxX ) {
      let yIncrement = MAXCARDHEIGHT;
      if( currY - MARKERHEIGHT >= STARTY && minX > maxRightMostX ){
        yIncrement = -MAXCARDHEIGHT;
      }
      currY+=yIncrement;
    } else {
      currY=minY;
    }    
    currY = currY > MAXY ? STARTY : currY;
    

    
    lastMaxX = maxX;

  })




}