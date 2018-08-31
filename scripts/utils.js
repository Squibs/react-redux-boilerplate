import chalk from 'chalk';

// from create-react-app (https://github.com/facebook/create-react-app/blob/next/packages/react-dev-utils/formatWebpackMessages.js#L26)
const formatMessage = (message, isError) => {
  let lines = message.split('\n');

  if (lines.length > 2 && lines[1] === '') {
    lines.splice(1, 1); // remove extra newline
  }

  // remove webpack-specific loader notification from filename
  if (lines[0].lastIndexOf('!') !== -1) {
    lines[0] = lines[0].substr(lines[0].lastIndexOf('!') + 1);
  }

  // clean up entry points on warnings
  lines = lines.filter(line => line.indexOf(' @ ') !== 0);

  // line 0 is filename, line 1 is main error message
  if (!lines[0] || !lines[1]) {
    return lines.join('n');
  }

  // cleans up verbose 'module not found' messages for files and packages
  if (lines[1].indexOf('Module not found: ') === 0) {
    lines = [
      lines[0],
      lines[1] // clean up message because 'module not found: ' is descriptive enough
        .replace("Cannot resolve 'file' or 'directory' ", '')
        .replace('Cannot resolve module ', '')
        .replace('Error: ', '')
        .replace('[CaseSensitivePathsPlugin] ', ''),
    ];
  }

  // clean up export errors
  const exportError = /\s*(.+?)\s*(")?export '(.+?)' was not found in '(.+?)'/;
  if (lines[1].match(exportError)) {
    lines[1] = lines[1].replace(
      exportError,
      "$1 '$4' does not contain an export named '$3'.",
    );
  }

  lines[0] = chalk.inverse(lines[0]);

  // reassemble the message
  message = lines.join('\n');
  message = message.replace(
    /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
    '',
  );

  return message.trim();
};

// from create-react-app (https://github.com/facebook/create-react-app/blob/next/packages/react-dev-utils/formatWebpackMessages.js#L120)
export const formatWebpackMessages = (json) => {
  const formattedErrors = json.errors.map(message => formatMessage(message, true));
  const formattedWarnings = json.warnings.map(message => formatMessage(message, false));

  const friendlySyntaxErrorLabel = 'Syntax error:';

  const result = {
    errors: formattedErrors,
    warnings: formattedWarnings,
  };

  function isLikelyASyntaxError(message) {
    return message.indexOf(friendlySyntaxErrorLabel) !== -1;
  }

  if (result.errors.some(isLikelyASyntaxError)) {
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }

  return result;
};

// console log message with timestamp and color based on danger level
export const logMessage = (message, level = 'info') => {
  const color = dangerLevel => ({
    error: 'red',
    warning: 'yellow',
    info: 'white',
  })[dangerLevel];

  console.log(`[${new Date().toLocaleTimeString()}]`, chalk[color(level)](message));
};
