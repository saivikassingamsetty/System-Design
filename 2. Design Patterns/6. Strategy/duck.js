var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FlyWithWings = /** @class */ (function () {
    function FlyWithWings() {
    }
    FlyWithWings.prototype.fly = function () {
        console.log("Flying.. Flying...");
    };
    return FlyWithWings;
}());
var FlyNoWay = /** @class */ (function () {
    function FlyNoWay() {
    }
    FlyNoWay.prototype.fly = function () {
        console.log("I Can't fly");
    };
    return FlyNoWay;
}());
var Quack = /** @class */ (function () {
    function Quack() {
    }
    Quack.prototype.quack = function () {
        console.log("Quack.. Quack..");
    };
    return Quack;
}());
var MuteQuack = /** @class */ (function () {
    function MuteQuack() {
    }
    MuteQuack.prototype.quack = function () {
        console.log("... Silence ...");
    };
    return MuteQuack;
}());
var Squeek = /** @class */ (function () {
    function Squeek() {
    }
    Squeek.prototype.quack = function () {
        console.log("Squeek");
    };
    return Squeek;
}());
var Duck = /** @class */ (function () {
    function Duck() {
        this.flyBehaviour = new FlyWithWings();
        this.quackBehaviour = new Quack();
    }
    Duck.prototype.display = function () {
        console.log("Hi, I'm a duck!");
    };
    Duck.prototype.swim = function () {
        console.log("Swimming...");
    };
    Duck.prototype.quack = function () {
        this.quackBehaviour.quack();
    };
    Duck.prototype.fly = function () {
        this.flyBehaviour.fly();
    };
    Duck.prototype.setFlyBehaviour = function (flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
    };
    Duck.prototype.setquackBehaviour = function (quackBehaviour) {
        this.quackBehaviour = quackBehaviour;
    };
    return Duck;
}());
var pondDuck = /** @class */ (function (_super) {
    __extends(pondDuck, _super);
    function pondDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    pondDuck.prototype.display = function () {
        console.log("Hey, I'm a pond duck!");
    };
    return pondDuck;
}(Duck));
var rubberDuck = /** @class */ (function (_super) {
    __extends(rubberDuck, _super);
    function rubberDuck() {
        var _this = _super.call(this) || this;
        _this.setquackBehaviour(new Squeek());
        _this.setFlyBehaviour(new FlyNoWay());
        return _this;
    }
    rubberDuck.prototype.display = function () {
        console.log("Hey, I'm a rubber duck!");
    };
    return rubberDuck;
}(Duck));
var woodenDuck = /** @class */ (function (_super) {
    __extends(woodenDuck, _super);
    function woodenDuck() {
        var _this = _super.call(this) || this;
        _this.setquackBehaviour(new MuteQuack());
        _this.setFlyBehaviour(new FlyNoWay());
        return _this;
    }
    woodenDuck.prototype.display = function () {
        console.log("Hey, I'm a wooden duck!");
    };
    return woodenDuck;
}(Duck));
var duck = new pondDuck();
//giving ability to fly
duck.setFlyBehaviour(new FlyWithWings());
duck.fly();
duck.quack();
//taking off ability to fly and making it silent
duck.setFlyBehaviour(new FlyNoWay());
duck.fly();
duck.setquackBehaviour(new MuteQuack());
duck.quack();
