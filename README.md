# Mastermind

## Introduction

You have a storage device that would allow you to get access to the 7,002 Bitcoins, however you threw away the piece of paper you wrote down your PIN on.  
Your storage device gives users limited number of guesses before it seizes up and encrypts its contents forever.

You need to guess the correct PIN within the allotted attempts or you will lose all your Bitcoin.  
Luckily, your storage device has a special feature that will tell you if you guessed any of the numbers
correctly. It tells you if you guessed any digits correctly, but does not tell you which digit you 
guessed correctly.

## Installation

git clone https://github.com/ryzhong/mastermind.git

cd mastermind

npm install

npm start

-> Opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How it works

1. The user will click on the start game button to begin.
2. The user can enter a guess to what the PIN is.
3. There will be a feedback based on the user's guess.
4. The user can enter new guesses until they run out of tries or if they guess correctly.

## Extensions 

There is a hint function that allows the user to get a random correct PIN number.

Note: I wanted to add this feature because I originally thought that the game would not give feedback about guessing more than one number or number and digit correctly.  
To make the game easier for the user, I thought that adding a hint function would help balance the game out.  
I didn't want to make it too easy either, so I the hint will give a random correct PIN number with no location.

## Journal

My [journal](https://docs.google.com/document/d/1e5KZlyN8xC27sb8LR8mzX5C5YhOGUlmrdKekhHh4SyM/edit?usp=sharing) that includes my thought process throughout the coding challenge.