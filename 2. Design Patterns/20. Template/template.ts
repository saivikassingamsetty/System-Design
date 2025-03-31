interface Enemy {
  position: string;
}

class GameMap {
  center: string = "";
}

abstract class GameAI {
  map: GameMap = new GameMap();
  scouts: any[] = [];
  warriors: any[] = [];

  //template method, which deal with other template methods
  takeTurn() {
    this.collectResources();
    this.buildStructures();
    this.buildUnits();
    this.attack();
  }

  //it will be a hook, if the implementation left blank
  collectResources() {
    //Steps to collect Resources
  }

  //abstract methods
  abstract buildStructures(): void;
  abstract buildUnits(): void;

  attack() {
    const enemy = this.getClosestEnemy();
    if (enemy) {
      this.sendWarriors(enemy.position);
    } else {
      this.sendScouts(this.map.center);
    }
  }

  abstract sendWarriors(position: string): void;
  abstract sendScouts(position: string): void;

  getClosestEnemy(): Enemy | undefined {
    return;
  }
}

class OrcsAI extends GameAI {
  buildStructures(): void {}

  buildUnits(): void {}

  sendWarriors(position: string): void {
    if (this.warriors.length > 5) {
      //send them!
    }
  }

  sendScouts(position: string): void {
    if (this.scouts.length > 0) {
      //send them!
    }
  }
}

class MonsterAI extends GameAI {
  //monsters can't collect
  collectResources(): void {}

  //monsters can't build
  buildStructures(): void {}
  buildUnits(): void {}

  sendWarriors(position: string): void {
    if (this.warriors.length > 5) {
      //send them!
    }
  }

  sendScouts(position: string): void {
    if (this.scouts.length > 0) {
      //send them!
    }
  }
}
