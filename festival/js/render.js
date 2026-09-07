let scene = "start";
let sceneHistory = [];
let slashEffect=false;
let x = 0;
let y = 0;
let drawPlayerX = 0;
let drawPlayerY = 0;
let moving = false;

function render(){
  const menu = document.getElementById("menu");
  const msg = document.getElementById("msg");
  if (scene == "start"){
    menu.innerHTML = `名前を入力：<input id="nameInput">
      <button onclick="start_Game()">決定</button>`;
  }else if (scene == "battle"){
    let hpPercent= player.hp/player.maxhp*100;
    let enemyimage = `
    <div class="enemy-area">
  <div class="enemy">${enemy.image}</div>
  ${slashEffect ? '<div class="slash"></div>' : ''}
  </div>`;
  menu.innerHTML = `
  <div id="msg">${message}</div>
  <div class="enemy">${enemy.name}</div>
  ${enemyimage}
  <div>${enemy.name}   HP : ${enemy.hp}</div>
  <div>${player.name}　HP : ${player.hp}</div>
  <div class="hp-bar"><div class="hp-fill" style="width:${hpPercent}%"></div></div>
  <div>MP : ${player.mp}
  Lv : ${player.level}</div>
 <button onclick="p_attack()">たたかう</button>
 <button onclick="change_scene('mahou')">まほう</button>
 <button onclick="change_scene('item')">アイテム</button>
 <button onclick="back()">にげる</button>`
  }else if (scene == "mahou"){
      let magicButtons = `
      <button onclick="p_magic('fire')">ファイア  MP3</button>
      `;
      if(player.level>=2){
        magicButtons += `
        <button onclick="heal()">ヒール  MP2</button>
        `;
      }if(player.level>=4){
        magicButtons += `
        <button onclick="p_magic('thunder')">サンダー  MP4</button>
        `;
      }
    menu.innerHTML =`<div class="enemy">${enemy.name}</div>
    <div>${enemy.name}　 HP: ${enemy.hp}</div>
    <div>${player.name}　HP: ${player.hp}</span> 
    MP: ${player.mp}
    Lv: ${player.level}</div>
    ${magicButtons}
    <button onclick="back()">もどる</button>`;
  }else if (scene == "map"){
    menu.innerHTML = `
    <h1>マップ</h1>
    <canvas id="game" width="1250" height="300"></canvas>
    <div id="msg">${message}</div>
    <div>現在地：${MAP[y][x]}</div>
    <div class="move-buttons">
    <button onclick="move('up')">↑上</button>
    </div>
    <div class="move-buttons">
    <button onclick="move('left')">← 左</button>
    <button onclick="move('right')">右 →</button>
    </div>
    <div class="move-buttons">
    <button onclick="move('down')">↓下</button>
    </div>
    <br>
    <button onclick="change_scene('menu')">メニュー</button>
    <button onclick="change_scene('bukiya')">武器屋</button>
    <button onclick="reset_Game()">タイトルにもどる</button>`; 
    
    drawMap();
  }else if (scene == "item"){
    let itemButtons=`<button onclick="use_item('potion')">ポーション：${inventry.potion}</button>
    <button onclick="use_item('ether')">エーテル：${inventry.ether}</button>
    <button onclick="use_item('hipotion')">ハイポーション：${inventry.hipotion}</button>`
    menu.innerHTML =`<div id="msg">${message}</div>
    <div class="enemy">${enemy.name}</div>
    <div>${enemy.name}　 HP: ${enemy.hp}</div>
    <div>${player.name}　HP: ${player.hp}
    MP: ${player.mp}</span>
    Lv: ${player.level}</div>
    ${itemButtons}
    <button onclick="back()">もどる</button>`;
  }else if (scene == "menu"){
    menu.innerHTML =`<h2>メニュー</h2>
    <button onclick="change_scene('status')">ステータス</button>
    <button onclick="change_scene('equipment')">装備</button>
    <button onclick="back()">もどる</button>`;
  }else if (scene == "status"){
    menu.innerHTML =`<h3>名前：${player.name}</h3>
    <div>HP : ${player.hp} / ${player.maxhp}</div>
    <div>MP : ${player.mp} / ${player.maxmp}</div>
    <div>Lv : ${player.level}</div>
    <div>次のレベルまであと　${player.level * 2 + 3 - player.exp}</div>
    <br>
    <div>攻撃: ${player.attack}</div>
    <div>武器補正: +${player.force}</div>
    <div>防御: ${player.defense}</div>
    <br>
    <div>武器: ${equipment.weapon ?? "なし"}</div>
    <div>防具: ${equipment.armor ?? "なし"}</div>
    <br>
    <button onclick="back()">もどる</button>`
  }else if(scene=="bukiya"){
    let weaponButtons = army_list.filter(item => item.category === "weapon").map(item => {
      if (
        ownequipment.includes(item.name)
      ) {
        return `
        <button disabled>${item.name}（購入済）</button>
        `;
      }
      return `<button onclick="buy('${item.name}')">${item.name} (${item.gold}G)</button>
      `;
    }).join("");
    let armorButtons = army_list.filter(item => item.category === "armor").map(item => {
      if (
        ownequipment.includes(item.name)
      ) {
        return `
        <button disabled>${item.name}（購入済）</button>
        `;
      }
      return `<button onclick="buy('${item.name}')">${item.name} (${item.gold}G)</button>
      `;
    }).join("");
    menu.innerHTML = `
    <h3>いまの所持金：${player.gold}G</h3>
    <div id="msg">${message}</div>
    <div class="shop-container">
    <div>
    <h4>武器</h4>
    ${weaponButtons}
    </div>
    <div>
    <h4>防具</h4>
    ${armorButtons}
    </div>
    <button onclick="change_scene('menu')">メニュー</button>
    <button onclick="back()">もどる</button>
  `;
  }else if (scene == "warning"){
    menu.innerHTML =`<div class="warning">⚠ WARNING ⚠</div>`
  }else if (scene == "ending"){
    menu.innerHTML=`<div class="ending">GAME CLEAR!!</div>
    <p>世界に平和がもどった！</p>
    <div>到達レベル : ${player.level}</div>
    <div>倒した敵の数 : ${player.defeatedEnemies}</div>
    <div>プレイ時間 : ${getPlayTime()}</div>
    <br>
    <button onclick="reset_Game()">タイトルへ</button>
  `}else if (scene == "gameover"){
    menu.innerHTML=`<div class="ending">GAME OVER</div>
    <p>あなたは死んでしまった...</p>
    <div>到達レベル : ${player.level}</div>
    <div>倒した敵の数 : ${player.defeatedEnemies}</div>
    <div>プレイ時間 : ${getPlayTime()}</div>
    <br>
    <button onclick="reset_Game()">タイトルへ</button>
  `;
  }else if (scene == "equipment"){

  let weaponButtons = ownequipment
    .map(name => army_list.find(a => a.name === name))
    .filter(item => item.category === "weapon")
    .map(item => `
      <button onclick="equip_army('${item.name}')">
        ${item.name} 攻撃+${item.force}  
        ${item.name === equipment.weapon ? "[装備中]" : ""}
      </button>
    `)
    .join("");

  let armorButtons = ownequipment
    .map(name => army_list.find(a => a.name === name))
    .filter(item => item.category === "armor")
    .map(item => `
      <button onclick="equip_army('${item.name}')">
        ${item.name} 防御+${item.defense}
        ${item.name === equipment.armor ? "[装備中]" : ""} 
      </button>
    `)
    .join("");

  menu.innerHTML = `
    <h3>武器</h3>
    <div>装備中の武器: ${equipment.weapon}</div>
    ${weaponButtons || "武器はありません"}

    <h3>防具</h3>
    <div>装備中の防具: ${equipment.armor}</div>
    ${armorButtons || "防具はありません"}

    <br>
    <button onclick="back()">もどる</button>
  `;
}
}
render();

function change_scene(nextscene){
  sceneHistory.push(scene);
  scene = nextscene;
  console.log(sceneHistory);
  render();
}

function back(){
  if(flag == "boss"){
    set_Message("ボス戦からは逃げられない！");
    return;
  }
  scene = sceneHistory.pop();
  player.status = "";
  message="";
  render();
}


function drawMap(){
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const TILE_SIZE = 70;
    const mapWidth = MAP[0].length * TILE_SIZE;
    const mapHeight = MAP.length * TILE_SIZE;
    const offsetX = (canvas.width - mapWidth) / 2;
    const offsetY = (canvas.height - mapHeight) / 2;
    for (let row = 0; row < MAP.length; row++) {
      for (let col = 0; col < MAP[row].length; col++) {
        const drawX = offsetX + col * TILE_SIZE;
        const drawY = offsetY + row * TILE_SIZE;

        if (MAP[row][col] === stagedata.tiles.heal) {
            ctx.drawImage(stagedata.Img.heal,drawX,drawY,TILE_SIZE,TILE_SIZE);
        }
        else if (MAP[row][col] === stagedata.tiles.battle) {
            ctx.drawImage(stagedata.Img.battle,drawX,drawY,TILE_SIZE,TILE_SIZE);
        }
        else if (MAP[row][col] === stagedata.tiles.boss) {
            ctx.drawImage(stagedata.Img.boss,drawX,drawY,TILE_SIZE,TILE_SIZE);
        }
        ctx.strokeRect(drawX, drawY, TILE_SIZE, TILE_SIZE);
        }
    }
    // プレイヤー
    let targetX = offsetX + x * TILE_SIZE + TILE_SIZE / 2;
    let targetY = offsetY + y * TILE_SIZE + TILE_SIZE / 2 + 25;
    if (drawPlayerX === 0 && drawPlayerY === 0) {
    drawPlayerX = targetX;
    drawPlayerY = targetY;
}
    const HERO_SIZE = 40;
    drawPlayerX += (targetX - drawPlayerX) * 0.05;
    drawPlayerY += (targetY - drawPlayerY) * 0.05;
    ctx.beginPath();
    ctx.arc(
    drawPlayerX,
    drawPlayerY,
    HERO_SIZE / 2 - 8,
    0,
    Math.PI * 2
  );
    ctx.fillStyle = "cyan";
    ctx.fill();
    if (Math.abs(drawPlayerX - targetX) < 1 && Math.abs(drawPlayerY - targetY) < 1) {
        drawPlayerX = targetX;
        drawPlayerY = targetY;
    }
}

function gameLoop(){
    if(scene === "map"){
        drawMap();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();