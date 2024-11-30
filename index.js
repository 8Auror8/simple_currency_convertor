const input = require('sync-input');

// Introduction to user
console.log("Welcome to Currency Converter!")
console.log("1 USD equals 1 USD")
console.log("1 USD equals 113.5 JPY")
console.log("1 USD equals 0.89 EUR")
console.log("1 USD equals 74.36 RUB")
console.log("1 USD equals 0.75 GBP")

// Object with currencies
let currObject = {
    'USD': 1,
    'JPY': 113.5,
    'EUR': 0.89,
    'RUB': 74.36,
    'GBP': 0.75}


//Variables & Arrays
let result = 0;                                  //Result to be presented in the final text
let arrayEntries = Object.entries(currObject);   //Array created with the entries of the object
let arrayCurr = [];                              //Array created with the keys of the object
let curr1 = 0;                                   //Variable to calculate the result between currencies
let currFound = 0;                               //Variable to show if a currency has been found or not. 0 = Initializated / 1 = Found / 2 = Unknown
let selection = 0;                               //Variable that will have the selection of the user. 0 = Initializated / 1 = Convert to currencies / 2 = Exit program
let fromCurr = "";                               //Variable that will have the initial currency
let toCurr = "";                                 //Variable that will have the final currency
let selectPos = [1, 2]                           //Array that have the two only possibilities of selection
let amountCurr = 0                               //Variable that will have the amount of the user

//Fullfilment of Currencies's Array/Array of keys
for(let entry of arrayEntries){
    arrayCurr.push(entry[0]);
}

//Start the program. User selection.
while(selection === 0){
    console.log("What do you want to do?")
    console.log("1-Convert currencies 2-Exit program")
    currFound = 0
    selection = Number(input())
    if(!selectPos.includes(selection)){
        console.log("Unknown input")
        selection = 0
        continue
    }

    //Check which currencies and if they exist
    while((currFound === 0 || currFound === 2) && selection === 1){

        console.log("What do you want to convert?")

        //Initial currency
        fromCurr = input("From: ").toUpperCase().trim();
        if(!arrayCurr.includes(fromCurr)){
            console.log("Unknown currency")
            currFound = 2
            continue
        }else{
            currFound = 1
        }

        //Final currency
        toCurr = input("To: ").toUpperCase().trim();
        if(!arrayCurr.includes(toCurr)){
            console.log("Unknown currency")
            currFound = 2
            continue
        }else{
            currFound = 1
        }
    }

    //Once currencies have been checked, proceed to ask amount and see if it is less than 1 and if it is a number.

    while(currFound === 1 && selection === 1){
        amountCurr = Number(input("Amount: "))
        if(amountCurr < 1){
            console.log("The amount cannot be less than 1")
            continue
        }
        else if(isNaN(amountCurr)){
            console.log("The amount has to be a number")
            continue
        }
        else{
            break
        }
    }

    //If everything is OK, proceed to calculate.
    if(fromCurr === toCurr && selection === 1){
        result = amountCurr.toFixed(4)
        console.log(`Result: ${amountCurr} ${fromCurr} equals ${result} ${toCurr}`)
        selection = 0
        continue
    }
    else if(fromCurr !== toCurr && selection === 1){
        arrayEntries.forEach(entry =>{
            if(entry[0] === fromCurr){
                curr1 = (amountCurr / entry[1])
                // console.log("this is entry[0]: ", entry[0])
                // console.log("this is entry[1]: ", entry[1])
                // console.log("this is curr1: ", curr1)
            }
        })
        arrayEntries.forEach(entry=>{
            if(entry[0] === toCurr){
                result = (curr1 * entry[1])
                // console.log("this is curr1 TO: ", curr1)
                // console.log("this is entry[0]: ", entry[0])
                // console.log("this is entry[1]: ", entry[1])
                // console.log("this is result: ", result)
            }
        })

        console.log(`Result: ${amountCurr} ${fromCurr} equals ${result.toFixed(4)} ${toCurr}`)
        selection = 0;
        continue
        }
    }

if(selection === 2){
    console.log("Have a nice day!")
}

