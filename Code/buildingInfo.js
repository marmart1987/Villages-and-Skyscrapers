function info() {
  buildingInfo = [
    [ //Housing
      {
        name: "Woven Hut",
        time: 1,
        resources: {
          Wood: 10,
          Stone: 89
        },
        benifits: function () {
          playerInfo.production.WoodPH.amount += 10;
        }
      }, {
        name: "Wove Hut",
        time: 3,
        resources: {
          Wood: 120,
          Stone: 849
        },
        benifits: function () {}
      }




    ]
  

  ]

  playerInfo = {
    resources: {
      Wood: 0,
      Stone: 0

    },
    unroundedResources: {},
    production: {
      WoodPH: {
        pointer: "Wood",
        amount: 36001
      },
      StonePH: {
        pointer: "Stone"
      },

    },
    updateResources: function () {
      if (!getItem("buildingInfo")) {
        let startTime = Date.now();
        print(startTime);
      }
      if (playerInfo == pastProductionInfo) {
        for (let [key, value] of Object.entries(playerInfo.production)) {
          clear()


          let resourcesElapsedTime = (Date.now() - resourceUpdateTime) / 3600
          let amountPerSecond = value.amount;
          print(resourcesElapsedTime)

          //Number( playerInfo.unroundedResources[key]) += 1; 
          /*
          playerInfo.unroundedResources[value.pointer]+= amountPerSecond;
          
          
            
            print(playerInfo.unroundedResources[value.pointer],key)
            
           
            
            isResourceUpdateDone = true;
            */








        }
      } else {}
      Object.assign(pastProductionInfo, playerInfo);
      print(pastProductionInfo == playerInfo)
      resourceUpdateTime = Date.now();



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
      playerInfo.unroundedResources = playerInfo.resources;
      print(playerInfo.unroundedResources)




    }


  }



}

addBuildings = function (amount, section, order) {
  //  identifier = random(1, 10000000000000000);
  buildingInfo[section][order].timer = new startTimer(buildingInfo[section][order].time, section, order, amount);

  print(activeTimers + "start");

}

function startTimer(timeS, section, order, amount) {
  print(info);
  for (i = 0; i < Object.values(buildingInfo[section][order].resources).length; i++) {

    if (Object.getOwnPropertyDescriptor(playerInfo.resources, Object.keys(buildingInfo[section][order].resources)[i])) {


      print(i)
      let p = Object.getOwnPropertyDescriptor(playerInfo.resources, Object.keys(buildingInfo[section][order].resources)[i]);
      let l = p.value - Object.values(buildingInfo[section][order].resources)[i];
      Object.defineProperty(playerInfo.resources, Object.keys(buildingInfo[section][order].resources)[i], {
        value: l
      });
      print(playerInfo)

    } else {
      console.error("Material doesn't exist" + " : '" + Object.keys(buildingInfo[section][order].resources)[i] + "'. If issue persists contact developer.");
      //Object.keys(buildingInfo[section][order].resources)
    }


  }

  print(info);
  this.startTime = Date.now() / 1000;

  activeTimers.push(this);
  print(this);
  // section = section;
  // order = order;
  // time = timeS;

  //identifier = identifier;
  // amount = amount;

  //print(this.identifier);
  //print(startTimer);
  this.done = false;





  //this.check = function(element) { element.identifier != identifier;}
  this.timerUpdate = function (arNum) {
    //activeTimers[arNum] = this;

    this.elapsedTime = (Date.now() / 1000) - this.startTime;
    print(this.elapsedTime + ";;;;;;;;;;" + timeS + "!!!!!" + arNum + "???" + buildingInfo[section][order].amount)
    if (this.elapsedTime > timeS) {
      this.timerFinished(arNum);


    }



  }
  //print(Date.now());


  this.timerFinished = function (arNum) {


    // activeTimers.pop();
    //activeTimers = activeTimers.filter(this.check);
    activeTimers.splice(arNum, 1);
    //
    print(activeTimers);
    //print("identifier:  "+this.identifier);
    buildingInfo[section][order].amount += amount;


    print("!!!!!!!!!!!   " + buildingInfo[section][order].amount);
    if (buildingInfo[section][order].benifits()) {
      buildingInfo[section][order].benifits();
    }

    //clear(); 




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
  for (let i = 0; i < buildingInfo.length; i++) {

    for (let j = 0; j < buildingInfo[i].length; j++) {
      //run for each building
      buildingInfo[i][j].amount = 0;

    }






  }
}