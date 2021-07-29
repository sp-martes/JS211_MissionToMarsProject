'use strict';
const assert = require('assert');


const jobType = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

class CrewMember {
  constructor(name, job, specialSkill){
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null
  }

  enterShip(shippy){
    if(this.ship){
      this.leaveShip();
    }
    this.ship = shippy 
    shippy.crew.push(this)
    
    if(jobType[this.job] == shippy.type || this.job == 'programmer'){
      shippy.readyForMission = true
    }
  }
  
  leaveShip(){
    let ilocated = this.ship.crew.indexOf(this)
    this.ship.crew.splice(ilocated,1)
    this.ship = null
  }
}


class Ship {
  constructor(name, type, ability){
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
    this.readyForMission = false
  }

  missionStatement(){
    return (this.readyForMission ? this.ability : "Can't perform a mission yet.")
  }
}


    // Previous ways of returning missionStatement below

    // got it the way I wanted 
    // with the help of this https://flexiple.com/loop-through-object-javascript/
    
    // let crew = Object.keys(this.crew);
    // let jobMatch = [];
    // crew.forEach((member) => {
    //   jobMatch.push(jobType[this.crew[member].job])
    // });
    // let match = (jobMatch.indexOf(this.type) > -1) || jobMatch.includes('Any Ship!')
    // return (match ? this.ability : "Can't perform a mission yet.")
    

    // find is probably better than object keys for missionStatement()

    // let jobMatch = this.crew.find(member => { 
    //   return(jobType[member.job] == this.type || member.job == 'programmer')
    // });
    
    // return (jobMatch ? this.ability : "Can't perform a mission yet.")

    let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
    let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
    const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
    console.log('crewmember1 initial:',crewMember1)
    crewMember1.enterShip(mav)
    console.log('crewmember1 entermav:',crewMember1)
    crewMember1.enterShip(hermes)
    console.log('crewmember1 leaveMav enterHermes:',crewMember1)
    crewMember1.leaveShip();
    console.log('crewmember1 leave ship:',crewMember1)







// Begin by reading the tests and building a function that will full each one.
// As you build, you might not have to build them in order, maybe you do...
// These are the tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      // this creates a CrewMember and passes the following arguments into its constructor:
      // 'Rick Martinez', 'pilot', 'chemistry'
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      // this creates a new Ship. Can you build a class that can be called so that this Ship can be built?
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');      
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");
      const crewMember3 = new CrewMember('Rick Sanchez', 'programmer', 'science');
      crewMember1.enterShip(mav);
      crewMember3.enterShip(mav);
      console.log('crewmember3 1:',crewMember3)
      crewMember3.leaveShip();
      console.log('crewmember3 2:',crewMember3)
      console.log('mav crew members 1:',mav.crew)
      crewMember3.enterShip(hermes);
      
      console.log('mav crew members:2',mav.crew)
      console.log('hermes crew members:',hermes.crew)
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
      // test below is what led to the finished code
      // console.log('mav crew 1 job',jobTypes[mav.crew[0].job])
      assert.equal(mav.missionStatement(), "Ascend into low orbit");
      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
      console.log('hermes crew members 2:',hermes.crew)
    });
  });
}
