export default class Pokemon
{
    constructor(name, height, weight, type)
    {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.type = type;
    }
    
    identity()
    {
        return `Je suis ${this.name}. Je mesure ${this.height} cm et je pèse ${this.weight} g. Je suis du type ${this.type}.`;
    }
}