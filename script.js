// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions(retry, issue) {

  let passwordLength;
  let availableChars = [];
  let options = {};

  // Get user input
  if (retry) {
    switch (issue) {
      case 'invType':
        passwordLength = prompt('Value is not a number, please try again. What length should your password be? It must be a number between 8 and 128.')
        break
      case 'invLength':
        passwordLength = prompt('Value is not within 8 and 128. What length should your password be? It must be a number between 8 and 128.')
        break
      case 'invChars':
        passwordLength = prompt('You must select at least one character type. What length should your password be? It must be a number between 8 and 128.')
        break
    }
  } else {
    passwordLength = prompt('What length should your password be? It must be a number between 8 and 128.')
  }

  // User cancelled input, break out of function
  if (passwordLength === null) {
    return
  }

  // Value is not null, convert to number
  passwordLength = parseInt(passwordLength);

  // Validate user input with recursive call
  if (isNaN(passwordLength)) {                          // check user input is number
    return getPasswordOptions(true, 'invType')
  }
  if (passwordLength < 8 || passwordLength > 128) {     // check user input is correct length
    return getPasswordOptions(true, 'invLength')
  }

  // Confirm user choices for character types
  if (confirm('Include lowercase characters? Press cancel for no')) {
    availableChars.push(...lowerCasedCharacters)
  }
  if (confirm('Include uppercase characters? Press cancel for no')) {
    availableChars.push(...upperCasedCharacters)
  }
  if (confirm('include numbers? Press cancel for no')) {
    availableChars.push(...numericCharacters)
  }
  if (confirm('Include special characters? Press cancel for no')) {
    availableChars.push(...specialCharacters)
  }

  // Check at least one character type has been submitted
  if (!availableChars.length) {
    return getPasswordOptions(true, 'invChars')
  }

  // Build options object
  options.length = Math.floor(passwordLength) // Round down to remove decimals
  options.chars = availableChars;             // Store options as array

  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {
  const options = getPasswordOptions();

  // User cancelled input
  if (options === null) return;

  let password = '';
  let charsLength = options.chars.length;

  // Generate random password using options
  for (i = 0; i < options.length; i++) {
    password += options.chars[Math.floor(Math.random() * (charsLength))]
  }

  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);