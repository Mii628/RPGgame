// ========================================
// ユーティリティ
// ========================================
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function chance(rate){
  return Math.random()<rate;
}
// ========================================
// タイトル・ゲーム開始
// ========================================
let MAP = [];
function start_Game(){
  let name = document.getElementById("nameInput").value;
  MAP = structuredClone(stagedata.MAP);
  enemyMaster = structuredClone(stagedata.enemies);
  boss = structuredClone(stagedata.boss);
  if (name !== ""){
    player.name = name
  }
  startTime = Date.now();
  change_scene("map")
  message="";
}

function reset_Game(){
  player = {name:"勇者",hp:30,maxhp:30,mp:5,maxmp:5,attack:5,level:1,exp:0,defense:0,force:0,gold:0,defeatedEnemies:0};
  enemyMaster = structuredClone(stagedata.enemies);
  boss = structuredClone(stagedata.boss);
  turn = "player";
  x=0;
  y=0;
  equipment = {weapon:"素手",armor:"布きれ"}
  ownequipment = [];
  change_scene("start")
}

// ========================================
// マップ処理
// ========================================
async function move(muki){
    if (moving){
    set_Message("移動中は操作できません");
    return;}
  if (muki=='right'){
    if (x<2){
      x++;
    }else{return}
  }
  else if (muki=='left'){
    if (x>0){
      x-=1;
    }else{return}
  }
  else if (muki=="up"){
    if (y>0){
      y-=1;
    }else{return}
  }else if (muki=="down"){
    if (y<2){
      y++;
    }else{return}
  }
  moving = true;
  await wait(1500);
  moving = false;
  if (MAP[y][x]==stagedata.tiles.battle){
    if (chance(0.5)){
      flag = "normal"
      await start_Battle();
    }
  }else if (MAP[y][x]==stagedata.tiles.heal){
    await full_heal();
  }else if (MAP[y][x]==stagedata.tiles.boss){
    flag = "boss"
    await start_Boss();
  }
}
render();


async function full_heal(){
  player.hp=player.maxhp;
  player.mp=player.maxmp;
  player.status = "";
  set_Message("HPとMPが全回復した！");
}

// ========================================
// 戦闘開始
// ========================================
function start_Battle(){
  turn = "player";
  Create_enemy();
  change_scene("battle");
}

async function start_Boss(){
  turn = "player";
  enemy = boss;
  change_scene("warning");
  await wait(2000);
  change_scene("battle");
  sceneHistory = [];
  sceneHistory.push("map");
  set_Message(boss.name+"があらわれた！");
}

function Create_enemy(){
  enemy = structuredClone(
    enemyMaster[Math.floor(Math.random() * enemyMaster.length)]
  );
  set_Message(enemy.name + "が現れた！");
}

// ========================================
// 戦闘
// ========================================
function Attack(attacker,defender){
  let damage;
  damage = Math.max(1,attacker.attack-(defender.defense||0)+(attacker.force||0))
  damage = Math.min(damage, defender.hp);
  defender.hp -= damage
  render();
  return damage;
}

async function p_attack(){
  if(player.hp <= 0){
    set_Message("もうたおれている！");
    return};
  if (turn !== "player"){return};
  let d = Attack(player,enemy);
  turn = "enemy"
  set_Message(player.name + "のこうげき！");
  slashEffect = true;
  render();
  setTimeout(() => {
    slashEffect = false;
    render();
  }, 500);
  render();
  await wait(1000);
  await coment(d,turn);
  await wait(1000);
  if (enemy.hp > 0){
    await e_attack()
  }else{
    player.defeatedEnemies++;
    if (flag == "normal"){
      change_scene("map");}
  }
}

async function e_attack(){
  if (turn !== "enemy"){return}
  let d = Attack(enemy,player);
  turn = "player"
  set_Message(enemy.name + "のこうげき！");
  await wait(1000);
  await coment(d,turn);
}

async function coment(amount,turn){
  set_Message(amount + "ダメージ！");
  await wait(1000);
  if (turn == "enemy"){
    if (enemy.hp > 0){
      set_Message(enemy.name + "はまだいきている！");
      await wait(1000);
    }else{
      set_Message(enemy.name + "をたおした！");
      if (flag =="normal"){
      await wait(1000);
      await drop_item();
      await wait(1000);
      await get_exp();
      await wait (1000);
      await get_gold();
      await wait(1000);
      set_Message("");
      }else{
        await wait(1000);
        set_Message("ボスをたおした！");
        await wait(1000);
        set_Message("ゲームクリア！");
        await wait(1000);
        set_Message("");
        change_scene("ending");
      }
    }
    }else if (turn == "player"){
    if (player.hp > 0){
      set_Message(player.name + "はまだいきている！");
      await wait(1000);
      set_Message("");
    }else{
      set_Message(player.name + "はやられた！");
      await wait(1000);
      set_Message("ゲームオーバー");
      await wait(1000);
      set_Message("");
      change_scene("gameover");
    }
  }
}

// ========================================
// 魔法
// ========================================
let magic_list=[{name:"fire",mp:3,attack:12},{name:"thunder",mp:4,attack:18}];

async function p_magic(a){
  change_scene("battle")
  const magic = magic_list.find(item => item.name === a);
  if (turn !== "player"){return};
  if (player.mp < magic.mp){
    set_Message("MPがたりない！");
    return;
  }
  player.mp -= magic.mp;
  let temp = player.attack;
  player.attack = magic.attack;
  let d = Attack(player, enemy);
  turn ="enemy";
  player.attack = temp;
  set_Message(magic.name + "！");
  await wait(1000);
  await coment(d,turn);
  if (enemy.hp > 0){
    await wait(1000);
    e_attack();
}else{
  await wait(1000);
  if (flag == "normal"){
      change_scene("map");
  }
  }
}

async function heal(){
  change_scene("battle");
  if (turn !== "player"){return};
  if (player.mp < 2){
    set_Message("MPがたりない！");
    return;
  }else{
  player.mp-=2;
  player.hp=Math.min(player.maxhp,player.hp+5);
  set_Message("HPが回復した！");
  await wait(1000);
  turn ="enemy";
  e_attack();
  }
}

// ========================================
// 経験値・レベルアップ
// ========================================
async function get_exp(){
  player.exp+=enemy.exp;
  set_Message(player.name+"は経験値を"+enemy.exp+"獲得した");
  await wait(1000);
  if (player.exp>=nextExp()){
    await level_up();
  }
}
function nextExp(){
  return player.level * 2 + 3;
}

async function level_up(){
  set_Message("レベルアップ!!");
  player.exp-=nextExp();
  player.level++;
  await wait(1000);
  set_Message(player.name +"はレベル"+player.level+"になった!!");
  player.maxhp+=5;
  player.hp+=5;
  player.maxmp+=2;
  player.mp+=2;
  player.attack+=1;
  if(player.level % 4 == 0){
    player.defense += 1;
}
  add_army(player.level);
}

async function get_gold(){
  player.gold+=enemy.gold;
  set_Message(player.name+"は"+enemy.gold+"G手に入れた")
}

// ========================================
// アイテム
// ========================================
async function use_item(item_name){
  const item = items.find(item => item.name === item_name);
  if (!inventry[item_name]){
    set_Message("そのアイテムはありません");
    return;
  }
  inventry[item_name]--;
  if (item.heal){
    player.hp = Math.min(player.maxhp,player.hp + item.heal);
  }if(item.mp){
    player.mp = Math.min(player.maxmp,player.mp + item.mp);
  }
  set_Message(item_name +"を使った");
  await wait(1000);
  turn="enemy";
  change_scene("battle");
  await wait(1000);
  e_attack();
}

async function drop_item(){
  if (chance(0.2)){
    inventry.potion++;
    set_Message("ポーションをてにいれた")
  }else if (chance(0.4)){
    inventry.ether++;
    set_Message("エーテルをてにいれた")
  }
  await wait(1000);
}

// ========================================
// 装備
// ========================================
function equip_army(army_name){
  const army = army_list.find(item => item.name === army_name);
  if (!army) return;
  if (army.category=="weapon"){
    const pre_army = army_list.find(item => item.name ===equipment.weapon);
    player.force -= pre_army.force;
    player.force += army.force;
    equipment.weapon = army_name;
  }
  else if (army.category=="armor"){
    const pre_army = army_list.find(item => item.name ===equipment.armor);
    player.defense -= pre_army.defense;
    player.defense += army.defense;
    equipment.armor = army_name;
  }
  render();
}

async function buy(army_name){
  const army = army_list.find(item => item.name === army_name);
  if (ownequipment.includes(army.name)) return;
  if (player.gold>=army.gold){
    equip_army(army_name);
    player.gold-=army.gold;
    set_Message(army.name+"を手に入れた");
    ownequipment.push(army.name)
  }else{
    set_Message("お金が足りない！")
  }
  render();
}

function add_army(level){
  if (level == 3){
    army_list.push({name:"てつのけん",force:4,gold:15,category:"weapon"})
  }
  if (level == 4){
    army_list.push({name:"てつのよろい",defense:4,gold:15,category:"armor"})
  }
  if (level == 6){
    army_list.push({name:"皮のコート",defense:3,evade:0.1,gold:20,category:"armor"})
  }
}

// ========================================
// メッセージ
// ========================================

function set_Message(text){
  message = text;
  const msg = document.getElementById("msg");
  if (msg){
    msg.innerText = text;
  }
}

// ========================================
// 時間計測
// ========================================
function getPlayTime() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
  return `${minutes}分 ${seconds}秒`;
}