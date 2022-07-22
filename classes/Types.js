import Pokemon from './Pokemon.js';
export default class Types
{
    constructor(resistance, weakness)
    {
      this.resistance = resistance;
      this.weakness = weakness;
    }
    
    relations()
    {
      return `Je suis fort contre le(s) type(s) ${this.resistance} mais je suis faible au(x) type(s) ${this.weakness} !`;
    }
}