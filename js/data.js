let player = {name:"勇者",hp:30,maxhp:30,mp:5,maxmp:5,attack:5,exp:0,level:1,defense:0,evade:0,force:0,gold:100,status:""};
const items = [{name:"potion",heal:10},{name:"ether",mp:10},{name:"hipotion",heal:15}];
const army_list =[{name:"素手",force:0,category:"starter"},{name:"布きれ",defense:0,category:"starter"},{name:"革のふく",defense:2,gold:10,category:"armor"},{name:"木のぼう",force:2,gold:10,category:"weapon"}]
const inventry = {potion:0,ether:0,hipotion:0};
let equipment = {weapon:"素手",armor:"布きれ"}
let ownequipment = []
let enemy = null;
let turn = "player";
let message ="";
let flag ="";

const stagedata={
  1:{
    "MAP":[["自宅","森","森"],["森","森","森"],["森","森","ボス"]],
    "enemies":[{name:"スライム",hp:12,attack:2,exp:2,gold:3,image:slime_Icon},
               {name:"オオカミ",hp:18,attack:4,exp:3,gold:5,image:wolf_Icon}],
    "boss":{name:"ドラゴン",hp:60,attack:8,exp:8,gold:20,image:dragon_Icon},
    "tiles":{heal:"自宅",battle:"森",boss:"ボス"},
    "Icon":{heal:house_Icon,battle:forest_Icon,boss:dragon_Icon}
  },
  2:{
    "MAP":[["山小屋","雪原","雪原"],["雪原","雪原","雪原"],["雪原","雪原","ボス"]],
    "enemies":[{name:"ゆきだるま",hp:25,attack:5,exp:5,gold:8,image:snowman_Icon,skill:"freeze"},
               {name:"ゆきねこ",hp:20,attack:6,evade:0.15,exp:5,gold:10,image:cat_Icon}],
    "boss":{name:"アイスドラゴン",hp:120,attack:12,image:dragon_Icon,skill:"freeze"},
    "tiles":{heal:"山小屋",battle:"雪原",boss:"ボス"},
    "Icon":{heal:loghouse_Icon,battle:snowforest_Icon,boss:dragon_Icon}
  }
}
console.log("data.js loaded");