import { ingredient } from 'src/app/shared/ingredient.model';

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingrs: ingredient[];
    
    constructor(name:string, description: string, imagePath: string, ingrs: ingredient[]){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingrs = ingrs;
    }
}