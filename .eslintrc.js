module.exports = {
  "extends": "eslint:recommended"
  ,"globals": {
      "g": true
      ,"FPSMeter": false
      ,"PIXI": false
      ,"dp": false
      ,"$": false
  }
  ,"env": {
    "browser": true
    ,"es6": true
  }
  ,rules: {
      "indent": ["error", "tab"]
      ,"space-before-function-paren": ["error", "never"]
      ,"no-tabs": 0
      ,"no-console": 0
      ,"comma-style": ["warn", "first"]
      ,"no-trailing-spaces": 0
      ,"semi": ["warn", "always"]
      ,"quotes": ["warn", "double"]
  }
};