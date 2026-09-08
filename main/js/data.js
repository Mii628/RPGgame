let player = {name:"勇者",hp:30,maxhp:30,mp:5,maxmp:5,attack:5,exp:0,level:1,defense:0,evade:0,force:0,gold:0,
  status:"",defeatedEnemies:0};
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
    "enemies":[{name:"スライム",hp:8,attack:2,exp:2,gold:2,image:slime_Icon},
               {name:"オオカミ",hp:15,attack:4,exp:3,gold:4,image:wolf_Icon}],
    "boss":{name:"ドラゴン",hp:30,attack:6,exp:8,gold:15,image:dragon_Icon},
    "tiles":{heal:"自宅",battle:"森",boss:"ボス"},
    "Icon":{heal:house_Icon,battle:forest_Icon,boss:dragon_Icon},
    "Img":{heal:houseImg,battle:forestImg,boss:dragonImg}
  },
  2:{
    "MAP":[["山小屋","雪原","雪原"],["雪原","雪原","雪原"],["雪原","雪原","ボス"]],
    "enemies":[{name:"ゆきだるま",hp:18,attack:6,exp:5,gold:8,image:snowman_Icon,skill:"freeze"},
         {name:"ゆきねこ",hp:15,attack:5,evade:0.15,exp:5,gold:10,image:cat_Icon}],
    "boss":{name:"アイスドラゴン",hp:50,attack:10,exp:10,gold:20,image:dragon_Icon,skill:"freeze"},
    "tiles":{heal:"山小屋",battle:"雪原",boss:"ボス"},
    "Icon":{heal:loghouse_Icon,battle:snowforest_Icon,boss:dragon_Icon},
    "Img":{heal:loghouseImg,battle:snowforestImg,boss:dragonImg}
  },
  3:{
    "MAP":[["温泉","火山","火山"],["火山","火山","火山"],["火山","火山","ボス"]],
    "enemies":[{name:"マグマスライム",hp:25,attack:10,exp:7,evade:0.15,gold:12,image:slime_Icon},
                {name:"フレイムホース",hp:35,attack:14,exp:9,gold:16,image:horse_Icon,skill:"burn"}],
    "boss":{name:"ファイアドラゴン",hp:80,attack:15,exp:15,gold:25,image:dragon_Icon,skill:"burn"},
    "tiles":{heal:"温泉",battle:"火山",boss:"ボス"},
    "Icon":{heal:hotspring_Icon,battle:volcano_Icon,boss:dragon_Icon},
    "Img":{heal:hotspringImg,battle:volcanoImg,boss:dragonImg}
  }
}