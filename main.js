#!/use/bin/env node


import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'How much do you know about gaming? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlueBright('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    Please don't kill me...
    I really don't want to die, I have my children Joe and Dee and don't want to leave them without a dad.
    So get all the questions right ... for my sake
    `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. Remember my life and my children's future is on the line here! \n` });
    } else {
    spinner.error({ text: `💀💀💀 My poor beautiful children...what will they do without me! WHAT WILL THEY DO WITHOUT ME AND IT'S ALL BECAUSE OF YOU...all because of y-y- ~cough cough~ -ou ${playerName}. ~breathes out last breath~`});
    process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Thank you for playing, ${playerName} ! \n Here is $ 1 0 0 0 0 0 0 !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
  
      console.log(
        chalk.green(
          `Make sure to game hard, game well, and game smart.`
        )
      );
      process.exit(0);
    });
  }

async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'What was the first ever video game? \n',
      choices: [
        'Pong',
        'Tennis For Two', // Correct
        'Mario Bros.',
        'Call Of Duty',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Tennis For Two');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'confirm',
        message: 'Minecraft has been sold over 200 million times. (y = true, n = false) \n',
    });


    return handleAnswer(answers.question_2 === true );
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Around how many Mario games are there? \n',
        choices:[
            'Around 20',
            'Around 50',
            'Around 100',
            'Around 200',
            'Around 500',
        ],
    });


    return handleAnswer(answers.question_3 === 'Around 200');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'imput',
        message: 'What was the first video game to be played in space? (capitilize the name of the video game)'
    });


    return handleAnswer(answers.question_4 === 'Tetris');
}

async function finalquestion() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'number',
        message: 'Since you are a hardcore gamer...what is the square root of 64?',
    });
    return handleAnswer(answers.question_5 === 8);
}

console.clear();
await welcome()
await askName();
await question1();
await question2();
await question3();
await question4();
await finalquestion();
await winner();