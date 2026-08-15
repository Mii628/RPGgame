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
function start_Game(){
  let name = document.getElementById("nameInput").value;
  MAP = structuredClone(stagedata[stage].MAP);
  enemyMaster = structuredClone(stagedata[stage].enemies);
  boss = structuredClone(stagedata[stage].boss);
  if (name !== ""){
    player.name = name
  }
  change_scene("map")
  message="";
}

function reset_Game(){
  player = {name:"勇者",hp:30,maxhp:30,mp:5,maxmp:5,attack:5,level:1,exp:0,defense:0,force:0,gold:0,status:""};
  stage = 1;
  MAP = structuredClone(stagedata[stage].MAP);
  enemyMaster = structuredClone(stagedata[stage].enemies);
  boss = structuredClone(stagedata[stage].boss);
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
  if (MAP[y][x]==stagedata[stage].tiles.battle){
    if (chance(0.5)){
      flag = "normal"
      await start_Battle();
    }
  }else if (MAP[y][x]==stagedata[stage].tiles.heal){
    await full_heal();
  }else if (MAP[y][x]==stagedata[stage].tiles.boss){
    flag = "boss"
    await start_Boss();
  }
  render();
}

async function full_heal(){
  player.hp=player.maxhp;
  player.mp=player.maxmp;
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

function start_Boss(){
  turn = "player";
  enemy = boss;
  change_scene("battle");
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
  if(chance(defender.evade || 0)){
    return "miss";
  }
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
    return;}
  if (turn !== "player"){return}
  if (player.status=="freeze"){
    player.status="";
    set_Message("凍っていて動けない！");
    turn = "enemy";
    await wait(1000);
    e_attack();
    return;
  }
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
    await wait(1000);
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
  await wait(1000);
  if (enemy.skill=="freeze"){
    if (chance(0.2)){
      player.status="freeze";
      set_Message(player.name+"は凍ってしまった!！");
      await wait(1000);
    }
  }
}

async function coment(amount,turn){
  set_Message(amount + "ダメージ！");
  await wait(1000);
  if (turn == "enemy"){
    if (enemy.hp > 0){
      set_Message(enemy.name + "はまだいきている！");
    }else{
      set_Message(enemy.name + "をたおした！"); 
      if (flag =="normal"){
      await wait(1000);
      await drop_item();
      await wait(1000);
      await get_exp();
      await wait (1000);
      await get_gold();
      message="";
      }else{
        await wait(1000);
        if (stage!=3){
          stage++;
          MAP = structuredClone(stagedata[stage].MAP);
          enemyMaster = structuredClone(stagedata[stage].enemies);
          boss = structuredClone(stagedata[stage].boss);
          x = 0;
          y = 0;
          set_Message("次のステージに進む！");
          await wait(1000);
          change_scene("map");
        }else{
        change_scene("ending");
        }
      }
    }
    }else if (turn == "player"){
    if (player.hp > 0){
      set_Message(player.name + "はまだいきている！");
    }else{
      set_Message(player.name + "はやられた！");
      await wait(1000);
      reset_Game();
    }
  }
}

// ========================================
// 魔法
// ========================================
magic_list=[{name:"fire",mp:3,attack:8},{name:"thunder",mp:4,attack:10}];

async function p_magic(a){
  change_scene("battle")
  if (player.status=="freeze"){
    player.status="";
    set_Message("凍っていて動けない！");
    turn = "enemy";
    await wait(1000);
    e_attack();
    return;
  }
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
  if (player.status=="freeze"){
    player.status="";
    set_Message("凍っていて動けない！");
    turn = "enemy";
    await wait(1000);
    e_attack();
    return;
  }
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
  }else if (chance(0.5)){
    inventry.hipotion++;
    set_Message("ハイポーションをてにいれた")
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
  if (army.evade){
    const pre_army = army_list.find(item => item.name ===equipment.armor);
    player.evade -= pre_army.evade || 0;
    player.evade += army.evade || 0;
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