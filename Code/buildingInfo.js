buildingInfo = {
  0: { //Production


    0: {
      name: "Woodcutter",
      time: 100,
      resources: {
        Wood: 100,

      },
      benifits: function () {
        playerInfo.production.WoodPH += 360;
      }
    },
    1: {
      name: "Woodcutter",
      time: 10,
      resources: {
        Wood: 100,

      },
      benifits: function () {
        playerInfo.production.WoodPH += 36000;
      }
    },
   
    
    

  },1:{}, 2: {},
    3: {},
    4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {},


}



playerInfo = {
  version: "dev-1.01",
  buildings: {},

  resources: {
    Wood: 0,
    Stone: 0

  },
  unroundedResources: {
    Wood: 0,
    Stone: 0
  },
  production: {
    WoodPH: 3600,

    StonePH: 0



  },
  lastResourceUpdate: Date.now(),
  updateResources: function () {

    // if (playerSave) {


    for (let [key, value] of Object.entries(playerInfo.production)) {



      let resourcesElapsedTime = (Date.now() - playerInfo.lastResourceUpdate) / 1000
      let amountPerSecond = value / 3600;
      let pointer = key.slice(0, -2);
      let amountPerFrame = resourcesElapsedTime * amountPerSecond
      playerInfo.unroundedResources[pointer] += amountPerFrame;
      playerInfo.resources[pointer] = floor(playerInfo.unroundedResources[pointer]);

    }

    console.debug(playerInfo.resources, playerInfo.unroundedResources)
    playerInfo.lastResourceUpdate = Date.now();

  },
  initializeProduction: function () {


    for (let [key, value] of Object.entries(playerInfo.production)) {
      if (!playerInfo.production[key]) {

        playerInfo.production[key] = 0

      }


    }
    playerInfo.unroundedResources = JSON.parse(JSON.stringify(playerInfo.resources));
    





  },


}





addBuildings = function (amount, section, order) {

  buildingInfo[section][order].timer = new startTimer(buildingInfo[section][order].time, section, order, amount);

  console.debug(activeTimers, "started");

}

function startTimer(timeS, section, order, amount) {

  for (i = 0; i < Object.values(buildingInfo[section][order].resources).length; i++) {

    if (Object.getOwnPropertyDescriptor(playerInfo.resources, Object.keys(buildingInfo[section][order].resources)[i])) {


      console.debug(i)
      let p = Object.getOwnPropertyDescriptor(playerInfo.resources, Object.keys(buildingInfo[section][order].resources)[i]);
      let l = p.value - Object.values(buildingInfo[section][order].resources)[i];
      Object.defineProperty(playerInfo.resources, Object.keys(buildingInfo[section][order].resources)[i], {
        value: l
      });
      console.debug(playerInfo)

    } else {
      console.error("Material doesn't exist" + " : '" + Object.keys(buildingInfo[section][order].resources)[i] + "'. If issue persists contact developer.");

    }


  }


  this.startTime = Date.now() / 1000;
  this.timeS = timeS;
  this.section = section;
  this.order = order;
  this.amount = amount;
  this.humanReadableName = buildingInfo[section][order].name;

  activeTimers.push(this);

}





timerUpdate = function (arNum) {


  activeTimers[arNum].elapsedTime = (Date.now() / 1000) - activeTimers[arNum].startTime;
  if (activeTimers[arNum].elapsedTime > activeTimers[arNum].timeS) {
    console.debug(JSON.parse(JSON.stringify(activeTimers)), "finished");
    playerInfo.buildings[activeTimers[arNum].section][activeTimers[arNum].order].amount += activeTimers[arNum].amount;

    if (buildingInfo[activeTimers[arNum].section][activeTimers[arNum].order].benifits()) {
      buildingInfo[activeTimers[arNum].section][activeTimers[arNum].order].benifits();
    }
    activeTimers.splice(arNum, 1);





  }
}

function defaultsDeep(target, defaults) {
  var clone = JSON.parse(JSON.stringify(target));

  function run(clone, defaults) {
    const DEFAULTS_PROPERTY_NAMES = Object.getOwnPropertyNames(defaults);
    DEFAULTS_PROPERTY_NAMES.forEach(function (property) {
      if (Object.prototype.toString.call(defaults[property]) === "[object Object]") {
        if (!clone.hasOwnProperty(property)) {
          clone[property] = {};
        }
        run(clone[property], defaults[property]);
      } else if (!clone.hasOwnProperty(property)) {
        clone[property] = defaults[property];
      }
    });
  }
  run(clone, defaults);
  return clone;
}
//thx to https://stackoverflow.com/questions/42284545/how-do-i-object-assign-default-values-to-another-partly-complete-object-only-f


initializeBuildings = function () {

  buildingInfo.length = Object.keys(buildingInfo).length;


  for (let i = 0; i < buildingInfo.length; i++) {
    buildingInfo[i].length = Object.keys(buildingInfo[i]).length
    console.debug(buildingInfo[i])
    playerInfo.buildings[i] = [];


    for (let j = 0; j < buildingInfo[i].length; j++) {
      //run for each building
      playerInfo.buildings[i][j] = {
        amount: 0,
        upgrades: null,
        name: buildingInfo[i][j].name
      }

      if (buildingInfo[i][j].startWith) {
        playerInfo.buildings[i][j].amount = Number(buildingInfo[i][j].startWith)
      }
      if(!buildingInfo[i][j].name){buildingInfo[i][j].name = " "}


    }
    console.log(playerInfo.buildings)
  }

}