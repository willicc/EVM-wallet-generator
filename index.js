import chalk from 'chalk';
import { Wallet, ethers } from 'ethers';
import { appendFileSync } from 'fs';
import moment from 'moment';
import readlineSync from 'readline-sync';

// Function to create a new Ethereum account
function createAccountETH() {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey;
  const mnemonicKey = wallet.mnemonic.phrase;

  return { privateKey, publicKey, mnemonicKey };
}

// Main function using async IIFE
(async () => {
  try {
    // Get the total number of wallets to create from user input
    const totalWallet = readlineSync.question(
      chalk.yellow('Input how much the wallet you want: ')
    );

    let count = 1;

    // If the user entered a valid number greater than 1, set the count
    if (totalWallet > 1) {
      count = totalWallet;
    }

    // Create the specified number of wallets
    while (count > 0) {
      const createWalletResult = createAccountETH();
      const theWallet = new Wallet(createWalletResult.privateKey);

      if (theWallet) {
        // Save full wallet info to wallet.txt (replace result.txt)
        appendFileSync(
          './wallet.txt',
          `Address: ${theWallet.address} | Private Key: ${createWalletResult.privateKey} | Mnemonic: ${createWalletResult.mnemonicKey}\n`
        );
        // Save address to address.txt
        appendFileSync(
          './address.txt',
          `${theWallet.address}\n`
        );
        // Save privatekey to pvkey.txt
        appendFileSync(
          './pvkey.txt',
          `${createWalletResult.privateKey}\n`
        );
        // Display success message
        console.log(
          chalk.green(
            `[${moment().format('HH:mm:ss')}] => Wallet created...! Your address: ${theWallet.address}`
          )
        );
      }

      count--;
    }

    // Display final message
    setTimeout(() => {
      console.log(
        chalk.green(
          'All wallets have been created. Check wallet.txt, address.txt, and pvkey.txt for your results.'
        )
      );
    }, 3000);
    return;
  } catch (error) {
    // Display error message if an error occurs
    console.log(chalk.red('Your program encountered an error! Message: ' + error));
  }
})();
