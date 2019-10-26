class Person {
    constructor(name = 'Anonymus', age = 0) {
        this.name = name;
        this.age = age;
    }
    getDescription(){
        return `My name is ${this.name} and I'm ${this.age} years old.`
    }
    getGreedings(){
        return `Hi, I'm ${this.name}.`
    }
}
class Traveler extends Person{
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation=homeLocation;
    }
    haveHomeLocation(){
        return !!this.homeLocation;
    }
    getGreedings() {
        let greedings = super.getGreedings();
        if(this.haveHomeLocation()) {
            return greedings+=`I'm living in ${this.homeLocation}.`
        }

    }
}
const a = new Traveler('Mati', 21, "Krakow");
const b = new Person("Zbyszek", 45);
console.log(a.getGreedings());
console.log(b.getGreedings());
console.log(a);
console.log(b);
