
  buildingInfo = {
    0: { //Production


      0: {
        name: "Woodcutter",
        time: 100,
        resources: {
          Wood: 100,
          
        },
        benifits: function () {
          playerInfo.production.WoodPH.amount += 360;
        }
      }, 1: {
        name: "Woodcutter",
        time: 100,
        resources: {
          Wood: 100,
          
        },
        benifits: function () {
          playerInfo.production.WoodPH.amount += 360;
        }
      },
      2:{name:"woonknk"}
    
      },


  }

  playerInfo = {

    resources: {
      Wood: 0,
      Stone: 0

    },
    unroundedResources: {
      Wood: 0,
      Stone: 0
    },
    production: {
      WoodPH: {
        pointer: "Wood",
        amount: 3600
      },
      StonePH: {
        pointer: "Stone"

      },

    },
    lastResourceUpdate: Date.now(),
    updateResources: function () {

      // if (playerSave) {


      for (let [key, value] of Object.entries(playerInfo.production)) {



        let resourcesElapsedTime = (Date.now() - playerInfo.lastResourceUpdate) / 1000
        let amountPerSecond = value.amount / 3600;
        let amountPerFrame = resourcesElapsedTime * amountPerSecond
        playerInfo.unroundedResources[value.pointer] += amountPerFrame;
        playerInfo.resources[value.pointer] = floor(playerInfo.unroundedResources[value.pointer]);

      }

      console.debug(playerInfo.resources, playerInfo.unroundedResources)
      playerInfo.lastResourceUpdate = Date.now();
      // }
    },
    initializeProduction: function () {
      

      for (let [key, value] of Object.entries(playerInfo.production)) {
        if (!playerInfo.production[key].amount) {
          Object.defineProperty(playerInfo.production[key], "amount", {
            value: 0,
            writable: true
          });
        }


      }
      playerInfo.unroundedResources = JSON.parse(JSON.stringify(playerInfo.resources));
      console.debug(playerInfo.unroundedResources)





    },
    playerInfo: Date.now()


  }





addBuildings = function (amount, section, order) {

  buildingInfo[section][order].timer = new startTimer(buildingInfo[section][order].time, section, order, amount);

  console.debug(activeTimers,"started");

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


timerFinished = function (arNum) {

  console.debug(activeTimers, "finished");
  buildingInfo[activeTimers[arNum].section][activeTimers[arNum].order].amount += activeTimers[arNum].amount;

  if (buildingInfo[activeTimers[arNum].section][activeTimers[arNum].order].benifits()) {
    buildingInfo[activeTimers[arNum].section][activeTimers[arNum].order].benifits();
  }
  activeTimers.splice(arNum, 1);




}


timerUpdate = function (arNum) {


  activeTimers[arNum].elapsedTime = (Date.now() / 1000) - activeTimers[arNum].startTime;
  if (activeTimers[arNum].elapsedTime > activeTimers[arNum].timeS) {

    timerFinished(arNum);


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


    for (let j = 0; j < buildingInfo[i].length; j++) {
      //run for each building
      buildingInfo[i][j].amount = 0;

    }
  }

}