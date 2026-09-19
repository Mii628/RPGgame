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

const stagedata={
    "MAP":[["山小屋","雪原","雪原"],["雪原","雪原","雪原"],["雪原","雪原","ボス"]],
    "enemies":[{name:"雪だるま",hp:7,maxhp:7,attack:2,exp:2,gold:2,image:"snowman.jpg"},
               {name:"雪ねこ",hp:12,maxhp:12,attack:3,exp:3,gold:4,image:"cat.jpg"}],
    "boss":{name:"アイスドラゴン",hp:30,maxhp:30,attack:5,exp:8,gold:20,image:"dragon.jpg"},
    "tiles":{heal:"山小屋",battle:"雪原",boss:"ボス"},
    "Icon":{heal:loghouse_Icon,battle:snowforest_Icon,boss:dragon_Icon},
    "Img":{heal:loghouseImg,battle:snowforestImg,boss:dragonImg}
}