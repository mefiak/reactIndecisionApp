const user = {
    name:'Mati',
    instruments: ['guitar', 'ukulele', 'cajon'],
    printInstrumentsPlayed(){
        this.instruments.forEach((instrument) => {
            console.log(this.name + ' plays on ' + instrument);
        });
    }
};
user.printInstrumentsPlayed();
const multiplier = {
    numbers: [1,2,3,4,5,6,7,8,9,10],
    multiplyBy: 10,
    multiplicatedArray() {
        return this.numbers.map((number) => number*this.multiplyBy);
    } 
};
console.log(multiplier.multiplicatedArray())
console.log(multiplier.numbers)