import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'
@Injectable({
	providedIn:'root'
})
export class InMemoryDataService implements InMemoryDbService{
	createDb(){
		const employees = [
			{
				id:1,
				name:'Mark',
				gender:'male',
				contactPreference:'email',
				email:'mark@pragimtech.com',
				phoneNumber:'1234567891',
				dateOfBirth:new Date('10/25/2018'),
				department:'1',
				isActive:false,
				photoPath:'https://www.w3schools.com/w3images/avatar2.png'
				//photoPath:'./src/app/images/sudhakar.jpg'
			},
			{
				id:2,
				name:'Mary',
				gender:'female',
				contactPreference:'phone',
				email:'mary@pragimtech.com',
				phoneNumber:'1234567890',
				dateOfBirth:new Date('11/2/2018'),
				department:'2',
				isActive:true,
				photoPath:'https://www.w3schools.com/howto/img_avatar2.png'
			},
			{
				id:3,
				name:'Louis',
				gender:'female',
				contactPreference:'phone',
				email:'louis@pragimtech.com',
				phoneNumber:'1234567890',
				dateOfBirth:new Date('11/2/2018'),
				department:'3',
				isActive:true,
				photoPath:'https://www.w3schools.com/howto/img_avatar2.png'
			}
		];
		return {employees};
	}
}