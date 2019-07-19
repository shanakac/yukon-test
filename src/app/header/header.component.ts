import { Component, OnInit, EventEmitter } from '@angular/core';
import { version } from '../../../package.json';
import { Constants } from '../util/constants';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	inputs: ['optionType'],
	outputs: ['showHideSideBar']
})
export class HeaderComponent implements OnInit {

	public optionType: any = Constants.COURSES_HEADER_OPTION
	public loggedInUser: any = {
		firstName: 'Shanaka',
		lastName: 'Chethana'
	}
	public appVersion: string = version
	public isToggleMenu: boolean = false

	public showHideSideBar = new EventEmitter<any>()

	constructor() { }

	ngOnInit() {
	}

	public showToggleMenu() {
		
	}

	/**
	 * hamburger button click event 
	 * show or hide sidebar
	 */
	public showHideSlideBar() {
		console.log('[showHideSlideBar]');
		this.showHideSideBar.emit()
	}

}
