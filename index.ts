#! /usr/bin/env node  

import inquirer from "inquirer";
import chalk from "chalk";

//Initialize user balance and pin code
let myBalance = 40000;
let myPin = 1234;

// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t   <<<=============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===========>>>  ${chalk.bold.hex(`#9999FF`)(`Welcome To \`Code With Shoaib Habib\` - ATM Machine `)} <<<===========>>> `));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t   <<<=============================================>>>\n`));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: (chalk.green("Enter your pin code: "))
    }
])
if (pinAnswer.pin === myPin){
console.log(chalk.red("Pin is Correct, Login Successfully!"));

let operationAns = await inquirer.prompt([
    {
        name: "operation",
        type: "list",
        message: "Select an operation: ",
        choices: ["Withdraw Amount", "Check Balance"]
    
    }
])

if (operationAns.operation === "Withdraw Amount"){
    let withdrawAns = await inquirer.prompt([
        {
            name: "withdrawMethod",
            type: "list",
            message: "Select a withdrawal method:",
            choices: ["Fast Cash", "Enter Amount"]
        }
    ])

    if(withdrawAns.withdrawMethod === "Fast Cash"){
        let fastCashAns = await inquirer.prompt([
            {
                name: "fastCash",
                type: "list",
                message: "Select Amount:",
                choices: ["1000", "2000", "5000", "10000", "7000", "80000"]
            }
        ])
        if(fastCashAns.fastCash > myBalance){
            console.log("Insufficient Balance");
        }
        else{
            myBalance -=fastCashAns.fastCash
            console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
            console.log(`Your Remaining Balance is: ${myBalance}`);
        }

    }
    else if(withdrawAns.withdrawMethod === "Enter Amount"){
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Enter the amount to withdraw: "
            }
        ])
        
        if(amountAns.amount > myBalance){
            console.log("Insufficient Balance");
        }
        else{
            myBalance -= amountAns.amount;
            console.log(`${amountAns.amount} Withdraw Successfully`);
            console.log(`Your Remaining Balance is: ${myBalance}`);
            }
    }
    
}
else if (operationAns.operation === "Check Balance"){
    console.log(chalk.red(`Your Account Balance is: ${myBalance}`));
}

}
else{
    console.log("Pin is Incorrect, Try Again!");
}