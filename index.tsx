import { renderToReadableStream } from "react-dom/server";

const styles = `
html,
body {
  padding: 0 !important;
  margin: 0 !important;
  padding-right: 15px;
  overflow-y: hidden;
  height: 100vh;
}
#canvas {
  background-color: #fefefe;
}
`;

const js = "function canvasWindowSizer(t){t.width=window.innerWidth,t.height=window.innerHeight}function initCanvasElement(){canvasWindowSizer(document.getElementById(`canvas`)),window.addEventListener(`resize`,canvasWindowSizer)}function Ball(t,i){this.x=0,this.y=0,this.radius=t,this.rotation=0,this.scaleX=1,this.scaleY=1,this.color=i,this.lineWidth=1}window.onload=function(){initCanvasElement();const t=document.getElementById(`canvas`),i=t.getContext(`2d`),n=new Ball(80,`#cc0099`);n.x=0,n.y=400,function e(){window.requestAnimationFrame(e,t),i.clearRect(0,0,t.width,t.height),n.x+=2,n.y+=0,n.draw(i)}()},Ball.prototype.draw=function(t){t.save(),t.translate(this.x,this.y),t.rotate(this.rotation),t.scale(this.scaleX,this.scaleY),t.lineWidth=this.lineWidth,t.fillStyle=this.color,t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI,!0),t.closePath(),t.fill(),t.stroke(),t.restore()};";

export default {
  port: 3000,
  async fetch(request: Request) {
    return new Response(
      await renderToReadableStream(
        <html>
          <head>
            <meta charSet="UTF-8"/>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>...</title>
            <style>{styles}</style>
          </head>
          <body>
            <canvas id="canvas"></canvas>
            <script>{js}</script>
          </body>
        </html>
      )
    );
  },
};
