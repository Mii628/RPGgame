let scene = "start";
let sceneHistory = [];
let stage=3;
let slashEffect=false;
let x = 0;
let y = 0;
function render(){
  const menu = document.getElementById("menu");
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
  menu.innerHTML = `<div id="msg">${message}</div>
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
 <button onclick="change_scene('menu')">メニュー</button>
 <button onclick="back()">にげる</button>
 <button onclick="reset_Game()">タイトルにもどる</button>`
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
   let MAPview=MAP.map((row,rowIndex)=>{
     return row.map((place, colIndex) => {
      if(MAP[rowIndex][colIndex]==stagedata[stage].tiles.heal){if(y === rowIndex && x === colIndex){
        return `<span class="current mapIcon">${stagedata[stage].Icon.heal}</span>`;
      }return `<span class="mapIcon">${stagedata[stage].Icon.heal}</span>`;
      }else if (MAP[rowIndex][colIndex]==stagedata[stage].tiles.battle){if(y === rowIndex && x === colIndex){
        return `<span class="current mapIcon">${stagedata[stage].Icon.battle}</span>`;
      }return `<span class="mapIcon">${stagedata[stage].Icon.battle}</span>`;
      }else if (MAP[rowIndex][colIndex]==stagedata[stage].tiles.boss){if(y === rowIndex && x === colIndex){
        return `<span class="current mapIcon">${stagedata[stage].Icon.boss}</span>`;}
        return `<span class="mapIcon">${stagedata[stage].Icon.boss}</span>`;       
      }
     return place;
   }).join(" ");
  }).join("<br>");
    menu.innerHTML = `
    <div id="msg">${message}</div>
    <h2>マップ</h2>
    <div>現在地：${MAP[y][x]}</div>
    <div>座標　：${y},${x}</div>
    <div class="map">${MAPview}</div>
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
    <button onclick="change_scene('menu')">メニュー</button>
    <button onclick="change_scene('bukiya')">武器屋</button>
    <button onclick="reset_Game()">タイトルにもどる</button>`;
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
    <button onclick="back()">もどる</button>`
  }else if (scene == "status"){
    menu.innerHTML =`<h3>名前：${player.name}</h3>
    <div>HP : ${player.hp} / ${player.maxhp}</div>
    <div>MP : ${player.mp} / ${player.maxmp}</div>
    <div>Lv : ${player.level}</div>
    <div>次のレベルまであと　${player.level * 2 + 3 - player.exp}</div>
    <br>
    <div>攻撃: ${player.attack}</div>
    <div>武器補正: ${player.force}</div>
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
  }else if (scene == "ending"){
    menu.innerHTML=`<h1>THE END</h1>
    <p>世界に平和がもどった！</p>
    <button onclick="reset_Game()">タイトルへ</button>
  `
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
        ${item.name} 防御+${item.defense} 回避+${item.evade || 0} 
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
  scene = sceneHistory.pop();
  message="";
  render();
}