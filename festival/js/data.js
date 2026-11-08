let player = {name:"勇者",hp:30,maxhp:30,mp:5,maxmp:5,attack:5,exp:0,level:1,defense:0,force:0,gold:0,
  defeatedEnemies:0};
const items = [{name:"potion",heal:10},{name:"ether",mp:10}];
const army_list =[{name:"素手",force:0,category:"starter"},{name:"布きれ",defense:0,category:"starter"},{name:"革のふく",defense:2,gold:10,category:"armor"},{name:"木のぼう",force:2,gold:10,category:"weapon"}]
const inventry = {potion:0,ether:0};
let equipment = {weapon:"素手",armor:"布きれ"}
let ownequipment = []
let enemy = null;
let turn = "player";
let message ="";
let flag ="";
let startTime = 0;
let stage=1;

const entranceImg = new Image();
entranceImg.src = "cave.jpg";
const pillarImg = new Image();
pillarImg.src = "pillar.jpg";

const stagedata={
    1:{"MAP":[["山小屋","雪原","雪原","雪原","雪原"],["雪原","雪原","宝箱","雪原","雪原"],["雪原","雪原","雪原","雪原","洞窟"]],
    "enemies":[{name:"雪だるま",hp:7,maxhp:7,attack:2,exp:2,gold:2,image:"snowman.png"},
               {name:"雪ねこ",hp:14,maxhp:14,attack:4,exp:3,gold:4,image:"cat.png"}],
    "tiles":{heal:"山小屋",battle:"雪原",entrance:"洞窟",treasure:"宝箱"},
    "Img":{heal:loghouseImg,battle:snowforestImg,entrance:entranceImg,treasure:treasureImg},
    "treasure":"closed"
    },
    2:{"MAP":[["洞窟","氷柱","氷柱","氷柱","氷柱"],["氷柱","氷柱","宝箱","氷柱","氷柱"],["氷柱","氷柱","氷柱","氷柱","ボス"]],
      "enemies":[{name:"こおりこうもり",hp:14,maxhp:14,attack:5,evade:0.1,exp:4,gold:6,image:"bat.png"},
                 {name:"氷の結晶",hp:20,maxhp:20,attack:4,defense:2,exp:6,gold:8,image:"ice.png"}],
      "boss":{name:"アイスドラゴン",hp:40,maxhp:40,attack:7,exp:15,gold:20,image:"dragon.png"},
      "tiles":{entrance:"洞窟",battle:"氷柱",boss:"ボス",treasure:"宝箱"},
      "Img":{entrance:entranceImg,battle:pillarImg,boss:dragonImg,treasure:treasureImg},
      "treasure":"closed"
    }
}

