const dragon_Icon = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 640 512"
     fill="#222222">
  <path d="M18.32 255.78L192 223.96l-91.28 68.69c-10.08 10.08-2.94 27.31 11.31 27.31h222.7c-9.44-26.4-14.73-54.47-14.73-83.38v-42.27l-119.73-87.6c-23.82-15.88-55.29-14.01-77.06 4.59L5.81 227.64c-12.38 10.33-3.45 
  30.42 12.51 28.14zm556.87 34.1l-100.66-50.31A47.992 47.992 0 0 1 448 196.65v-36.69h64l28.09 22.63c6 6 14.14 9.37 22.63 9.37h30.97a32 32 0 0 0 28.62-17.69l14.31-28.62a32.005 32.005 0 0 0-3.02-33.51l-74.53-99.38C553.02
   4.7 543.54 0 533.47 0H296.02c-7.13 0-10.7 8.57-5.66 13.61L352 63.96 292.42 88.8c-5.9 2.95-5.9 11.36 0 14.31L352 127.96v108.62c0 72.08 36.03 139.39 96 179.38-195.59 6.81-344.56 41.01-434.1 60.91C5.78 478.67 0 485.88 
   0 494.2 0 504 7.95 512 17.76 512h499.08c63.29.01 119.61-47.56 122.99-110.76 2.52-47.28-22.73-90.4-64.64-111.36zM489.18 66.25l45.65 11.41c-2.75 10.91-12.47 18.89-24.13 18.26-12.96-.71-25.85-12.53-21.52-29.67z"/>
</svg>
`;

const loghouse_Icon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110">
  <polygon points="50,10 10,50 90,50" fill="#5B3923"/>
  <rect x="20" y="50" width="60" height="60" fill="#B67A3A"/>
  <rect x="35" y="60" width="30" height="30" fill="#FFD966"/>
  <line x1="50" y1="60" x2="50" y2="90" stroke="black" stroke-width="3"/>
  <line x1="35" y1="60" x2="35" y2="90" stroke="black" stroke-width="3"/>
  <line x1="65" y1="60" x2="65" y2="90" stroke="black" stroke-width="3"/>
  <line x1="35" y1="60" x2="65" y2="60" stroke="black" stroke-width="3"/>
  <line x1="35" y1="75" x2="65" y2="75" stroke="black" stroke-width="3"/>
  <line x1="35" y1="90" x2="65" y2="90" stroke="black" stroke-width="3"/>
</svg>
`;

const snowforest_Icon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110">
  <rect x="37.5" y="60" width="25" height="45" fill="#8B5A2B"/>
  <polygon points="50,15 25,55 75,55" fill="#2F6F5A"/>
  <polygon points="50,30 20,75 80,75" fill="#2F6F5A"/>
  <g stroke="#2f4f4f" stroke-width ="2">
  <polygon points="50,15 34,40 66,40" fill="white"/>
  </g>
</svg>
`;
const treasure_Icon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110">

  <!-- ふた -->
  <rect x="20" y="25" width="60" height="25"
        rx="4"
        fill="#C68642"
        stroke="#2B2B2B"
        stroke-width="3"/>

  <!-- 本体 -->
  <rect x="15" y="50" width="70" height="40"
        rx="4"
        fill="#A86A2C"
        stroke="#2B2B2B"
        stroke-width="3"/>

  <!-- 金具 -->
  <rect x="43" y="25" width="14" height="65"
        fill="#F7D154"
        stroke="#2B2B2B"
        stroke-width="2"/>

  <!-- 鍵穴 -->
  <circle cx="50" cy="68" r="4"
          fill="#2B2B2B"/>

</svg>
`;


function svgToImage(svgText) {

    const blob = new Blob(
        [svgText],
        { type: "image/svg+xml" }
    );

    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.src = url;

    return img;
}

// SVGアイコンを画像に変換
//heal spot
const loghouseImg = svgToImage(loghouse_Icon);
//battle spot
const snowforestImg = svgToImage(snowforest_Icon);
//boss
const dragonImg = svgToImage(dragon_Icon);

const treasureImg = svgToImage(treasure_Icon);

const mtbg = `<svg viewBox="0 0 1000 300" fill="none">
  <polygon
    points="220,270 320,90 420,270"
    fill="#6B87A8"
  />
  <polygon
    points="500,40 700,270 300,270"
    fill="#4F7299"
  />
  <polygon
    points="500,40 560,105 440,105"
    fill="white"
  />
  <polygon
    points="780,270 680,90 580,270"
    fill="#6B87A8"
  />
</svg>
`;

const snowbg=`
<svg viewBox="0 0 1000 600">

  <!-- 左上 -->
  <polygon points="120,80 150,140 120,200 90,140"
           fill="#4F7299"/>

  <!-- 右上 -->
  <polygon points="880,80 910,140 880,200 850,140"
           fill="#4F7299"/>

  <!-- 左下 -->
  <polygon points="120,420 150,480 120,540 90,480"
           fill="#4F7299"/>

  <!-- 右下 -->
  <polygon points="880,420 910,480 880,540 850,480"
           fill="#4F7299"/>

</svg>`;