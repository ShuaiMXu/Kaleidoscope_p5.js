var cnv;
let img;  //Declare variable 'img'.
//slider setup
let speedSlider, noise1, noise2, rColor, gColor, bColor,light,num;

// this variable will hold our shader object
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('assets/basic.vert', 'assets/basic.frag');
  // Load the image
  img = loadImage('assets/anjiao.png');
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(500, 50);
  cnv.style('z-index','-2');
}

function setup() {
  //建立Canvas
  cnv = createCanvas(800, 800,WEBGL);
  noStroke();
  centerCanvas();
  background(255);
  textSize(32);
  fill(0, 102, 153);

  // 创建 slider
  speedSlider = createSlider(1, 20, 5,1);
  speedSlider.position(130, 45);
  button = createButton("速率/形态");
  button.position(30, 45);

  noise1Slider = createSlider(0, 1000, 500,0.1);
  noise1Slider.position(130, 85);
  button = createButton("形态1");
  button.position(30, 85);

  noise2Slider = createSlider(0, 10, 1,0.01 );
  noise2Slider.position(130, 125);
  button = createButton("形态2");
  button.position(30, 125);

  rSlider = createSlider(0, 100, 10,0.1 );
  rSlider.position(130, 165);
  button = createButton("颜色 R");
  button.position(30, 165);

  gSlider = createSlider(0, 100, 30,0.1 );
  gSlider.position(130, 205);
  button = createButton("颜色 G");
  button.position(30, 205);

  bSlider = createSlider(0, 100, 55,0.1 );
  bSlider.position(130, 245);
  button = createButton("颜色 B");
  button.position(30, 245);

  lightSlider = createSlider(100, 500, 150,10 );
  lightSlider.position(130, 285);
  button = createButton("亮度");
  button.position(30, 285);

  numSlider = createSlider(300, 4000, 1000,10 );
  numSlider.position(130, 325);
  button = createButton("万花筒焦段");
  button.position(30, 325);
}

function draw(){
  //slider
  const speed = speedSlider.value();

  const noise1 = noise1Slider.value();

  const noise2 =  noise2Slider.value();

  const rColor = rSlider.value();

  const gColor = gSlider.value();

  const bColor = bSlider.value();

  const light = lightSlider.value();

  const num = numSlider.value();

  // shader() sets the active shader with our shader
  shader(theShader);
  theShader.setUniform("iResolution", [800, 800]);
  theShader.setUniform('noise1', noise1);
  theShader.setUniform('noise2', noise2);
  theShader.setUniform('rColor', rColor * 0.01);
  theShader.setUniform('gColor', gColor * 0.01);
  theShader.setUniform('bColor', bColor * 0.01);
  theShader.setUniform('light', light * 0.01);
  theShader.setUniform('num', num);

  theShader.setUniform('iTime', frameCount * speed * 0.002);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  // rect gives us some geometry on the screen
  rectMode(CENTER);
  rect(width/2,height/2,100, 100);

}

function windowResized() {
  centerCanvas();
}
