const square = function(x){
    return x*x;
}
const squareArrow = (x) =>{
    return x*x;
}
console.log(squareArrow(15));

const getFirstName1 = (fullName) =>{
    return fullName.split(' ')[0]
}
const getFirstName2 = (fullName) => fullName.split(' ')[0]
const user = {
    fullName: 'Redrigo Gonzalez',
    age: 35,
    hobby: 'guitarplayer'
};
console.log(getFirstName1(user.fullName))
console.log(getFirstName2(user.fullName))
