function phi(n) {
    if(n < 0) return new ExpantaNum(0);
    if(n === 0) return new ExpantaNum(0);
    if(n === 1) return new ExpantaNum(1);
    // 使用递推方式计算斐波那契数列
    let a = new ExpantaNum(0);
    let b = new ExpantaNum(1);
    
    for(let i = 2; i <= n; i++) {
        let temp = a.add(b);
        a = b;
        b = temp;
    }
    
    return b;
}

function cost(id) {
    var count = player.p["buyable" + id];
    switch(id) {
        case 1:
            return new ExpantaNum(1.11).pow(count.add(1));
        case 2:
            return new ExpantaNum(2.37).pow(count.add(1));
        case 3:
            return new ExpantaNum(1e3).mul(new ExpantaNum(4.73).pow(count));
        case 4:
            return new ExpantaNum(1e5).mul(new ExpantaNum(4.93).pow(count));
        case 5:
            return new ExpantaNum(1e8).mul(new ExpantaNum(5.13).pow(count));
        case 6:
            return new ExpantaNum(1e15).mul(new ExpantaNum(1e5).pow(count));
        case 7:
            return new ExpantaNum(1e25).mul(new ExpantaNum(1e7).pow(count));
        case 8:
            return new ExpantaNum(1e40).mul(new ExpantaNum(1e9).pow(count));
        case 9:
            return new ExpantaNum(1e50).mul(new ExpantaNum(1e11).pow(count));
        default:
            return new ExpantaNum(1);
    }
}

function gain(id) {
    var count = player.p["buyable" + id];
    switch(id) {
        case 1:
            return new ExpantaNum(1).add(count);
        case 2:
            return new ExpantaNum(2).pow(count);
        case 3:
            return new ExpantaNum(3).pow(count);
        case 4:
            return new ExpantaNum(4).pow(count);
        case 5:
            return new ExpantaNum(5).pow(count);
        case 6:
            return new ExpantaNum(6).pow(count);
        case 7:
            return new ExpantaNum(7).pow(count);
        case 8:
            return new ExpantaNum(8).pow(count);
        case 9:
            return new ExpantaNum(9).pow(count);
        default:
            return new ExpantaNum(1);
    }
}

addLayer("p", {
    symbol: "P",
    position: 0,
    branches: ["s","so"],
    startData() { 
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            buyable1: new ExpantaNum(0),
            buyable2: new ExpantaNum(0),
            buyable3: new ExpantaNum(0),
            buyable4: new ExpantaNum(0),
            buyable5: new ExpantaNum(0),
            buyable6: new ExpantaNum(0),
            buyable7: new ExpantaNum(0),
            buyable8: new ExpantaNum(0),
            buyable9: new ExpantaNum(0),
        }
    },
    color: "#FFFF93",
    resource: "声望", 
    type: "normal", 
    requires: new ExpantaNum(10),
    exponent: 0.5,
    baseAmount() { return player.points },
    baseResource: "点数",
    gainMult() { 
        mult = new ExpantaNum(1)
                mult = mult.mul(new ExpantaNum(1.5).pow(player.s.points)).max(1)
            if(hasUpgrade("s",12)) mult = mult.mul(upgradeEffect("s",12)).max(1)
            if(hasUpgrade("so",12)) mult = mult.mul(layers.so.upgrades[12].effect().max(1))
        return mult
    },
    gainExp() { 
        var exp = new ExpantaNum(1)
            if(hasUpgrade("so",23)) exp = exp.mul(layers.so.upgrades[23].effect().max(0).add(1))
            if(hasUpgrade("s",13)) exp = exp.mul(layers.s.upgrades[13].effect().max(0).add(1))
        return exp
    },
    row: 1, 
    layerShown() { return true },
    hotkeys:[
		{key: "p", description: "P: 进行层级P重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
	],
    doReset(resettingLayer) {
        let keep = [];
			if(hasMilestone("s",10)) keep.push("buyable1","buyable2","buyable3","buyable4","buyable5","buyable6","buyable7","buyable8","buyable9",);
                  if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
    passiveGeneration(){
        if(hasMilestone("s",6)) return 1
        if(hasMilestone("s",5)) return 0.1
        if(hasMilestone("s",4)) return 0.01
    },
    update(diff){
        if(hasMilestone("s",1)&&layers.p.clickables[1].canClick()) layers.p.clickables[1].onClick()
        if(hasMilestone("s",2)&&layers.p.clickables[2].canClick()) layers.p.clickables[2].onClick()
        if(hasMilestone("s",3)&&layers.p.clickables[3].canClick()) layers.p.clickables[3].onClick()
        if(hasMilestone("s",4)&&layers.p.clickables[4].canClick()) layers.p.clickables[4].onClick()
        if(hasMilestone("s",5)&&layers.p.clickables[5].canClick()) layers.p.clickables[5].onClick()
        if(hasMilestone("s",6)&&layers.p.clickables[6].canClick()) layers.p.clickables[6].onClick()
        if(hasMilestone("s",7)&&layers.p.clickables[7].canClick()) layers.p.clickables[7].onClick()
        if(hasMilestone("s",8)&&layers.p.clickables[8].canClick()) layers.p.clickables[8].onClick()
        if(hasMilestone("s",9)&&layers.p.clickables[9].canClick()) layers.p.clickables[9].onClick()
    },
    clickables: {
        1: {
            title() {
                return "<h3>点数倍增器<br><h4>价格: " + format(cost(1)) + " 声望<br>拥有: " + format(player[this.layer].buyable1) + 
                        "<br>点数获取×" + format(gain(1))
            },
            cost() {
                return cost(1);
            },
            gain() {
                return gain(1);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",1))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable1 = player[this.layer].buyable1.add(1)
                }
            }
        },
        2: {
            title() {
                return "<h3>点数倍增器^2<br><h4>价格: " + format(cost(2)) + " 声望<br>拥有: " + format(player[this.layer].buyable2) + 
                "<br>点数获取×" + format(gain(2))
            },
            cost() {
                return cost(2);
            },
            gain() {
                return gain(2);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",2))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable2 = player[this.layer].buyable2.add(1)
                }
            }
        },
        3: {
            title() {
                return "<h3>点数倍增器^3<br><h4>价格: " + format(cost(3)) + " 声望<br>拥有: " + format(player[this.layer].buyable3) + 
                "<br>点数获取×" + format(gain(3))
            },
            cost() {
                return cost(3);
            },
            gain() {
                return gain(3);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",3))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable3 = player[this.layer].buyable3.add(1)
                }
            }
        },
        4: {
            title() {
                return "<h3>点数倍增器^4<br><h4>价格: " + format(cost(4)) + " 声望<br>拥有: " + format(player[this.layer].buyable4) + 
                "<br>点数获取×" + format(gain(4))
            },
            cost() {
                return cost(4);
            },
            gain() {
                return gain(4);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",4))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable4 = player[this.layer].buyable4.add(1)
                }
            }
        },
        5: {
            title() {
                return "<h3>点数倍增器^5<br><h4>价格: " + format(cost(5)) + " 声望<br>拥有: " + format(player[this.layer].buyable5) + 
                "<br>点数获取×" + format(gain(5))
            },
            cost() {
                return cost(5);
            },
            gain() {
                return gain(5);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",5))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable5 = player[this.layer].buyable5.add(1)
                }
            }
        },
        6: {
            title() {
                return "<h3>点数倍增器^6<br><h4>价格: " + format(cost(6)) + " 声望<br>拥有: " + format(player[this.layer].buyable6) + 
                "<br>点数获取×" + format(gain(6))
            },
            cost() {
                return cost(6);
            },
            gain() {
                return gain(6);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",6))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable6 = player[this.layer].buyable6.add(1)
                }
            }
        },
        7: {
            title() {
                return "<h3>点数倍增器^7<br><h4>价格: " + format(cost(7)) + " 声望<br>拥有: " + format(player[this.layer].buyable7) + 
                "<br>点数获取×" + format(gain(7))
            },
            cost() {
                return cost(7);
            },
            gain() {
                return gain(7);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",7))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable7 = player[this.layer].buyable7.add(1)
                }
            }
        },
        8: {
            title() {
                return "<h3>点数倍增器^8<br><h4>价格: " + format(cost(8)) + " 声望<br>拥有: " + format(player[this.layer].buyable8) + 
                "<br>点数获取×" + format(gain(8))
            },
            cost() {
                return cost(8);
            },
            gain() {
                return gain(8);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",8))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable8 = player[this.layer].buyable8.add(1)
                }
            }
        },
        9: {
            title() {
                return "<h3>点数倍增器^9<br><h4>价格: " + format(cost(9)) + " 声望<br>拥有: " + format(player[this.layer].buyable9) + 
                "<br>点数获取×" + format(gain(9))
            },
            cost() {
                return cost(9);
            },
            gain() {
                return gain(9);
            },
            canClick() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                return {
                    "height": "180px",
                    "width": "180px",
                    "color": "#000000ff"
                };
            },
            onClick() {
                if (player[this.layer].points.gte(this.cost())) {
                    if(!hasMilestone("s",9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                    player[this.layer].buyable9 = player[this.layer].buyable9.add(1)
                }
            }
        }
    },
    tabFormat:{
		主界面:{
			buttonStyle(){return {'color':'#ffff93ff'}},
			content:[
				"main-display",
				"prestige-button",//raw-html
				"blank",
				"resource-display",
                //"blank",
                //["raw-html",function(){return "<img src='Tree/2.jpg'>"}],
                //"blank",
                //["display-text",function() {return 	"<h3>距离树复活还有" + format(player.t.treetime , 2 ) + "秒"}],
                //"blank",
                //["bar", "Tree"],
                "blank",
                ["row", [["clickable",1],"blank","blank",["clickable",2],"blank","blank",["clickable",3]]],
                "blank",
                ["row", [["clickable",4],"blank","blank",["clickable",5],"blank","blank",["clickable",6]]],
                "blank",
                ["row", [["clickable",7],"blank","blank",["clickable",8],"blank","blank",["clickable",9]]],
                "blank",
                "upgrades"
                ]
			},
        },
},
)
addLayer("s", {
    symbol: "Sun",
    position: 1,
    startData() { 
        return {
            unlocked: false,
            points: new ExpantaNum(0),
        }
    },
    color: "#00fff2ff",
    resource: "阳光", 
    type: "static", 
    effectDescription(){return "这使你的点数获取和声望获取 ×" + format(new ExpantaNum(1.5).pow(player.s.points))},
    //canBuyMax() {return hasChallenge("so",12)},
    requires: new ExpantaNum(1e25),
    exponent: 2.2275,
    base: 5,
    baseAmount() { return player.p.points },
    baseResource: "声望",
    gainMult() { 
        mult = new ExpantaNum(1)
            mult = mult.div(new ExpantaNum(2).pow(player.so.points)).max(1)
            if(hasUpgrade("so",13)) mult = mult.div(layers.so.upgrades[13].effect().max(1))
        return mult
    },
    gainExp() { 
        var exp = new ExpantaNum(1)
            if(hasUpgrade("so",24)) exp = exp.mul(layers.so.upgrades[24].effect().max(0).add(1))
        return exp
    },
    row: 2,
    layerShown() { return player.p.points.gte(1e20) || player.s.unlocked },
    doReset(resettingLayer) {
        let keep = [];
			keep.push();
            
                  if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
    upgrades:{
    11:{
		title:"sUpg11",
		description:"增加点数获取<br>基于点数",
        effect(){
				var eff = new ExpantaNum(1)
				eff = eff.mul(player.points.logBase(10)).max(1)
				return eff
		},
		effectDisplay(){return "x" + format(upgradeEffect(this.layer,this.id))},
		cost:new ExpantaNum(5),
		unlocked(){return true},
	},
    12:{
		title:"sUpg12",
		description:"增加声望获取<br>基于声望",
        effect(){
				var eff = new ExpantaNum(1)
                eff = eff.mul(player.p.points.pow(0.1)).max(1)
				return eff
		},
		effectDisplay(){return "x" + format(upgradeEffect(this.layer,this.id))},
		cost:new ExpantaNum(10),
		unlocked(){return true},
	},
    13:{
		title:"sUpg13",
		description:"增加声望获取指数<br>基于阳光",
        effect(){
				var eff = new ExpantaNum(1)
                eff = eff.mul(player.s.points.pow(0.05)).sub(1).max(0)
				return eff
		},
		effectDisplay(){return "x" + format(upgradeEffect(this.layer,this.id))},
		cost:new ExpantaNum(20),
		unlocked(){return true},
	},
},
    milestones: {
        1: {
            requirementDescription: "2 阳光",
            effectDescription: "自动购买点数倍增器并且不消耗声望",
            done() { return player.s.points.gte(2) }
        },
        2: {
            requirementDescription: "3 阳光",
            effectDescription: "自动购买点数倍增器^2并且不消耗声望",
            unlocked(){ return hasMilestone('s',1) },
            done() { return player.s.points.gte(3) }
        },
        3: {
            requirementDescription: "4 阳光",
            effectDescription: "自动购买点数倍增器^3并且不消耗声望",
            unlocked(){ return hasMilestone('s',2) },
            done() { return player.s.points.gte(4) }
        },
        4: {
            requirementDescription: "5 阳光",
            effectDescription: "自动购买点数倍增器^4并且不消耗声望,每秒自动获取1%可获得的声望",
            unlocked(){ return hasMilestone('s',3) },
            done() { return player.s.points.gte(5) }
        },
        5: {
            requirementDescription: "6 阳光",
            effectDescription: "自动购买点数倍增器^5并且不消耗声望,每秒自动获取10%可获得的声望",
            unlocked(){ return hasMilestone('s',4) },
            done() { return player.s.points.gte(6) }
        },
        6: {
            requirementDescription: "7 阳光",
            effectDescription: "自动购买点数倍增器^6并且不消耗声望,每秒自动获取100%可获得的声望",
            unlocked(){ return hasMilestone('s',5) },
            done() { return player.s.points.gte(7) }
        },
        7: {
            requirementDescription: "9 阳光",
            effectDescription: "自动购买点数倍增器^7并且不消耗声望",
            unlocked(){ return hasMilestone('s',6) },
            done() { return player.s.points.gte(9) }
        },
        8: {
            requirementDescription: "10 阳光",
            effectDescription: "自动购买点数倍增器^8并且不消耗声望",
            unlocked(){ return hasMilestone('s',7) },
            done() { return player.s.points.gte(10) }
        },
        9: {
            requirementDescription: "11 阳光",
            effectDescription: "自动购买点数倍增器^9并且不消耗声望,解锁新的内容",
            unlocked(){ return hasMilestone('s',8) },
            done() { return player.s.points.gte(11) }
        },
        10: {
            requirementDescription: "30 阳光",
            effectDescription: "保留点数倍增器的购买",
            unlocked(){ return hasMilestone('s',9) },
            done() { return player.s.points.gte(30) }
        },
    },
    tabFormat: {
        主界面:{
			buttonStyle(){return {'color':'#00fff2ff'}},
			content:[
				"main-display",
				"prestige-button",//raw-html
				"blank",
                "upgrades",
                "milestones",
                ]
			},
    }
})
function getsoul(){
    var getsoul = new ExpantaNum(0)
        getsoul = getsoul.add(phi(player.so.points))
            if(hasUpgrade("so",15)) getsoul = getsoul.mul(layers.so.upgrades[15].effect().max(1))
        return getsoul
}
addLayer("so", {
    symbol: "Soul",
    position: 2,
    startData() { 
        return {
            unlocked: false,
            points: new ExpantaNum(0),
            soul: new ExpantaNum(0),
        }
    },
    color: "#80ff00ff",
    resource: "灵魂", 
    type: "static", 
    canBuyMax() {return false},
    effectDescription(){return "这使你的点数获取和阳光获取 ×" + format(new ExpantaNum(2).pow(player.so.points))},
    requires: new ExpantaNum(1e140),
    exponent: 3.5,
    base: 20,
    baseAmount() { return player.p.points },
    baseResource: "声望",
    gainMult() { 
        mult = new ExpantaNum(1)
            if(hasUpgrade("so",14)) mult = mult.div(layers.so.upgrades[14].effect().max(1))
            if(hasMilestone('so',2)) mult = mult.div(player.points.pow(0.25).max(1).min(1.79e308))
        return mult
    },
    gainExp() { 
        var exp = new ExpantaNum(1)
            if(hasUpgrade("so",25)) exp = exp.mul(layers.so.upgrades[25].effect().max(0).add(1))
        return exp
    },
    row: 2, 
    layerShown() { return player.p.points.gte(1e135) || player.so.unlocked || hasMilestone('s',9)},
    update(diff){
        if(hasMilestone("so",0)&&player.so.points.gt(0)) player.so.soul = player.so.soul.add(getsoul().mul(diff))
        },
    upgrades: {
        11: {
            title: "SoUpg11",
            description: "增加点数获取<br>基于灵魂碎片",
            cost: new ExpantaNum(50),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.pow(2)).max(1)
                return eff
            },
            effectDisplay() { 
                return "×" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        12: {
            title: "SoUpg12",
            description: "增加声望获取<br>基于灵魂碎片",
            cost: new ExpantaNum(100),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul).max(1)
                return eff
            },
            effectDisplay() { 
                return "×" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        13: {
            title: "SoUpg13",
            description: "增加阳光获取<br>基于灵魂碎片",
            cost: new ExpantaNum(200),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(2).mul(100)).max(1)
                return eff
            },
            effectDisplay() { 
                return "×" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        14: {
            title: "SoUpg14",
            description: "增加灵魂获取<br>基于灵魂碎片",
            cost: new ExpantaNum(400),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(3).mul(100)).max(1)
                return eff
            },
            effectDisplay() { 
                return "×" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        15: {
            title: "SoUpg15",
            description: "增加灵魂碎片获取<br>基于灵魂碎片",
            cost: new ExpantaNum(800),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(5)).max(1)
                return eff
            },
            effectDisplay() { 
                return "×" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        21: {
            title: "SoUpg21",
            description: "解锁一个挑战",
            cost: new ExpantaNum(1600),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        22: {
            title: "SoUpg22",
            description: "增加点数获取指数基于灵魂碎片",
            cost: new ExpantaNum(3200),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            unlocked() { return hasChallenge("so",11) },
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(10).mul(0.01)).max(0)
                return eff
            },
            effectDisplay() { 
                return "+" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        23: {
            title: "SoUpg23",
            description: "增加声望获取指数基于灵魂碎片",
            cost: new ExpantaNum(6400),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            unlocked() { return hasUpgrade("so",22)},
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(10).mul(0.005)).max(0)
                return eff
            },
            effectDisplay() { 
                return "+" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        24: {
            title: "SoUpg24",
            description: "增加阳光获取指数基于灵魂碎片",
            cost: new ExpantaNum(12800),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            unlocked() { return hasUpgrade("so",23)&&hasMilestone("so",3)},
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(10).mul(0.01)).max(0)
                return eff
            },
            effectDisplay() { 
                return "+" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
        25: {
            title: "SoUpg25",
            description: "增加灵魂获取指数基于灵魂碎片<br>并且解锁新的挑战",
            cost: new ExpantaNum(25600),
            currencyInternalName: "soul",
            currencyDisplayName: "灵魂碎片",
            unlocked() { return hasUpgrade("so",24)&&hasMilestone("so",3)},
            effect() {
                var eff = new ExpantaNum(1)
                    eff = eff.mul(player.so.soul.logBase(10).mul(0.1)).max(0)
                return eff
            },
            effectDisplay() { 
                return "+" + format(this.effect()); 
            },
            canAfford() {
                return player.so.soul.gte(this.cost);
            },
            pay() {
                player.so.soul = player.so.soul.sub(this.cost);
            }
        },
    },
    milestones: {
        0: {
            requirementDescription: "2 灵魂",
            effectDescription: "开始产生灵魂碎片(在有灵魂的情况下)",
            done() { return player.so.points.gte(2) }
        },
        1: {
            requirementDescription: "3 灵魂",
            effectDescription(){
                return "增加点数的获取基于点数<br>当前：x " + format(player.points.pow(0.5))
            },
            unlocked(){ return hasMilestone('so',0) },
            done() { return player.so.points.gte(3) }
        },
        2: {
            requirementDescription: "4 灵魂",
            effectDescription(){
                return "增加灵魂的获取基于点数(1.79e308达到上限)<br>当前：x " + format(player.points.pow(0.25).min(1.79e308))
            },
            unlocked(){ return hasMilestone('so',1) },
            done() { return player.so.points.gte(4) }
        },
        3: {
            requirementDescription: "9 灵魂",
            effectDescription(){
                return "解锁新的灵魂碎片升级"
            },
            unlocked(){ return hasMilestone('so',2) },
            done() { return player.so.points.gte(9) }
        },
    },
    challenges: {
        11: {
            name: "SoChg11",
            challengeDescription: "进入挑战后重置S层并且点数获取^0.8",
            canComplete(){return player.points.gte("1e260")},
            goalDescription(){return format(ExpantaNum("1e260"))+"点数"},
            rewardDescription(){return `点数获取^1.2<br>解锁新的灵魂碎片升级`},
            unlocked(){return hasUpgrade("so",21)},
            onEnter(){
                layerDataReset("s")
            },
            onExit(){player.so.activeChallenge = 11},
            //onComplete(){player.p.digitCapacity = n(5)},
        },
        12: {
            name: "SoChg12",
            challengeDescription: "进入挑战后重置S层并且点数获取^0.6",
            canComplete(){return player.points.gte("1e265")},
            goalDescription(){return format(ExpantaNum("1e265"))+"点数"},
            rewardDescription(){return `点数获取^1.5<br>解锁新的灵魂碎片升级`},
            unlocked(){return hasUpgrade("so",25)},
            onEnter(){
                layerDataReset("s")
                player.p.buyable1 = n(0)
                player.p.buyable2 = n(0)
                player.p.buyable3 = n(0)
                player.p.buyable4 = n(0)
                player.p.buyable5 = n(0)
                player.p.buyable6 = n(0)
                player.p.buyable7 = n(0)
                player.p.buyable8 = n(0)
                player.p.buyable9 = n(0)
            },
            onExit(){player.so.activeChallenge = 12},
            //onComplete(){player.p.digitCapacity = n(5)},
        },
    },
    tabFormat: {
        主界面:{
			buttonStyle(){return {'color':'#80ff00ff'}},
			content:[
				"main-display",
				"prestige-button",//raw-html
				"blank",
                //"upgrades",
                "milestones",
                ]
			},
        灵魂碎片:{
           buttonStyle(){return {'color':'#80ff00ff'}},
            content:[
                //"main-display",
                ["display-text",
              	function() {
					    return 	"<h3>您有 " + "<span style='color: " + "#80ff00ff" + " ; font-size: 30px;'>" + 
						format(player.so.soul) + "</span>" + " 灵魂碎片"
						},
			    ],
                ["display-text",
              	function() {
                    var getsoul = new ExpantaNum(1)
                    if(hasUpgrade("so",15)) getsoul = getsoul.mul(layers.so.upgrades[15].effect().max(1))
                    var display = player.so.points.gt(0)?format(new ExpantaNum(phi(player.so.points).mul(getsoul).max(1))):new ExpantaNum(0)
					    return "<br><h4>您每秒获得 " + "<span style='color: " + "#80ff00ff" + " ; font-size: 25px;'>" + 
						display + "</span>" + " 灵魂碎片"
						},
			    ],
                //"prestige-button",//raw-html
                "blank",
                "upgrades",
                "challenges"
                //"milestones",
                ]
            },
        },
})
addLayer("g", {
    symbol: "G",
    position: 0,
    branches: ["p"],
    startData() { 
        return {
            unlocked: true,
            points: new ExpantaNum(0),
        }
    },
    color: "#4FFFB0",
    resource: "齿轮", 
    type: "normal", 
    requires: new ExpantaNum("1e5555"),
    exponent: 0.5,
    baseAmount() { return player.points },
    baseResource: "点数",
    gainMult() { 
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { 
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 1, 
    layerShown() { return player.points.gte("1e5550")||player.g.best.gt(0) },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            //layerDataReset("p")
        }
    },
    update(){
        if(player.g.best.lt(player.g.points))player.g.best = player.g.points
    },
    clickables: {
        1: {
            title() {
                return "重置阳光和灵魂<br>获取齿轮<br>当前可获得: " + format(player.s.points.add(player.so.points).sub(62).max(0))
            },
            canClick() {
                return player.s.points.add(player.so.points).sub(62).max(0).gt(0)
            },
            style() {
                if (this.canClick()) {
                    return {
                        "height": "100px",
                        "width": "200px",
                        "color": "#000000",
                        "background-color": "#4FFFB0"
                    }
                } else {
                    return {
                        "height": "100px",
                        "width": "200px",
                        "color": "#000000",
                        "background-color": "#bf8080",
                    }
                }
            },
            gain(){
                return player.s.points.add(player.so.points).sub(62).max(0)
            },
            onClick() {
                if (this.canClick()) {
                    player.g.points = player.g.points.add(this.gain())
                    layerDataReset("s")
                    layerDataReset("so")
                        if(hasMilestone("g",0)) player.s.upgrades = [11,12,13]
                        if(hasMilestone("g",1)) player.so.milestones = [0]
                }
            }
        }
    },
    milestones: {
        0: {
            requirementDescription: "2 齿轮",
            effectDescription: "保留SUpg11,SUpg12,SUpg13",
            done() { return player.g.points.gte(2) }
        },
        1: {
            requirementDescription: "4 齿轮",
            effectDescription: "保留So节点第一个里程碑,但是产出灵魂碎片降低",
            unlocked(){ return hasMilestone('g',0) },
            done() { return player.g.points.gte(4)}
        },/*
        2: {
            requirementDescription: "4 灵魂",
            effectDescription(){
                return "增加灵魂的获取基于点数(1.79e308达到上限)<br>当前：x " + format(player.points.pow(0.25).min(1.79e308))
            },
            done() { return player.so.points.gte(4) }
        },
        3: {
            requirementDescription: "9 灵魂",
            effectDescription(){
                return "解锁新的灵魂碎片升级"
            },
            done() { return player.so.points.gte(9) }
        },*/
    },
    tabFormat: {
        主界面: {
            buttonStyle() { return { 'color': '#4FFFB0' } },
            content: [
                ["display-text", function() { 
                    return "<h2>您有 <h2 style='color:#4FFFB0'>" + format(player.g.points) + " </h2><h2>齿轮" 
                }],
                ["display-text", function() { 
                    return "这使你点数获取× " + format(n(1000).pow(player.g.points)) + "<br>" 
                }],
                "blank",
                ["clickable", 1],
                "blank",
                ["display-text", function() { 
                    if (player.s.points.gte(new ExpantaNum(51))&&player.so.points.gte(new ExpantaNum(12))) {
                        return "<h3 style='color:#4FFFB0'>您已拥有足够的阳光和灵魂来获取齿轮!<br>每多拥有一个阳光或灵魂就可多获取一个齿轮</h3>"
                    } else {
                        return "<h3 style='color:#FF4444'>阳光和灵魂不足<br>还需要 " + format(new ExpantaNum(51).sub(player.s.points).max(0)) + " 阳光和 " + format(n(12).sub(player.so.points).max(0)) + "灵魂</h3>"
                    }
                }],
                "milestones",
            ]
        },
    },
})
addLayer("m", {
    symbol: "M",
    tooltip() { return ("软上线")},
    position: 1,
    startData() { 
        return {
            unlocked: true,
            points: new ExpantaNum(0),
        }
    },
    color: "#808080",
    resource: "里程碑点", 
    type: "normal",  
    requires: new ExpantaNum(1),
    exponent: 1,
    baseAmount() { return player.m.points },
    baseResource: "点数",
    gainMult() { 
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { 
        var exp = new ExpantaNum(1)
        return exp
    },
    row: "side", 
    layerShown() { return hasMilestone("m",0) },
    milestones: {
        0: {
            requirementDescription: "第一层软上线",
            effectDescription: "到达1e22后点数获取开根",
            done() { return player.points.gte(1e22) }
        },
        1: {
            requirementDescription: "第二层软上线",
            effectDescription: "到达1e222后点数获取开根",
            done() { return player.points.gte(1e222) }
        },
        2: {
            requirementDescription: "第三层软上限",
            effectDescription: "到达1e2222后点数获取开根",
            done() { return player.points.gte("1e2222") }
        },
        3: {
            requirementDescription: "第四层软上限",
            effectDescription: "到达1e22222后点数获取开根",
            done() { return player.m.points.gte("1e22222") }
        },/*
        4: {
            requirementDescription: "25个里程碑点",
            effectDescription: "解锁第五个里程碑效果",
            done() { return player.m.points.gte(25) }
        },
        5: {
            requirementDescription: "50个里程碑点",
            effectDescription: "解锁第六个里程碑效果",
            done() { return player.m.points.gte(50) }
        },
        6: {
            requirementDescription: "100个里程碑点",
            effectDescription: "解锁第七个里程碑效果",
            done() { return player.m.points.gte(100) }
        },
        7: {
            requirementDescription: "200个里程碑点",
            effectDescription: "解锁第八个里程碑效果",
            done() { return player.m.points.gte(200) }
        },
        8: {
            requirementDescription: "500个里程碑点",
            effectDescription: "解锁第九个里程碑效果",
            done() { return player.m.points.gte(500) }
        },
        9: {
            requirementDescription: "1000个里程碑点",
            effectDescription: "解锁第十个里程碑效果",
            done() { return player.m.points.gte(1000) }
        }*/
    },
    tabFormat:{
		主界面:{
			buttonStyle(){return {'color':'#ffff93ff'}},
			content:[
				    "milestones",
                ]
			},
        },

})