import {IsEmail, IsInt, IsString, Length, Max, Min} from "class-validator";

export class People_Post {
    @IsString({
        message: 'name must be string',
        context: {
            errorCode: 404
        }
    })
    @Length(10, 100, {
        message: 'name length must be at least 10 character, max 100 character',
        context: {
            errorCode: 404
        }
    })
    name: string;
    
    @IsString({
        message: 'name must be string',
        context: {
            errorCode: 404
        }
    })
    @IsEmail(undefined, {
        message: 'email must be string',
        context: {
            errorCode: 404
        }
 
    })
    email: string;

    @IsInt({
        message: 'age must be integer',
        context: {
            errorCode: 404
        }
    })
    @Min(5, {
        message: 'min age is 5',
        context: {
            errorCode: 404
        }
    })
    @Max(300, {
        message: 'max age is 300',
        context: {
            errorCode: 404
        }
    })
    age: number;

    constructor() {
        this.name = "";
        this.email = ""; 
        this.age = -1;
    }
}
