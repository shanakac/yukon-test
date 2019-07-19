import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, 
	SimpleChanges, AfterContentInit, OnChanges, OnDestroy } from '@angular/core';
import { Constants } from '../util/constants';
import { ComponentLoaderService } from '../util/component-loader.service';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

	public paddingtop: number = 60;
	@ViewChild('navPanel', null) navPanel: ElementRef

	public constants: any = Constants
	public isSideBar: boolean = true

	component: any;
    @ViewChild('courseHost', { read: ViewContainerRef, static:true }) componentHost: ViewContainerRef
	componentRef: ComponentRef<Component>

	private subsVar: any

	constructor(private resolver: ComponentFactoryResolver, private clService: ComponentLoaderService) { 
		this.component =  clService.loadComponentByName(Constants.COMP_NAME.course_list)
	}

	ngOnInit() {
		
	}

	ngAfterContentInit(): void {
		//Called after ngOnInit when the component's or directive's content has been initialized.
		//Add 'implements AfterContentInit' to the class.
		this.updateComponent()
		this.subsVar = this.clService.changeComponentExecute().subscribe((option: { compName: string; }) => this.changeComponent(option.compName))
	}

	ngOnChanges(changes: SimpleChanges): void {
		//Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
		//Add '${implements OnChanges}' to the class.
		
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		if (this.componentRef) {
			this.componentRef.destroy()
		}
		this.subsVar.unsubscribe()
	}

	updateComponent() {
		this.componentHost.clear()
		const authFormFactory = this.resolver.resolveComponentFactory(this.component)
		const componentRef = this.componentHost.createComponent(authFormFactory);
	}

	changeComponent(compName: string) {
		this.component =  this.clService.loadComponentByName(compName)
		this.updateComponent()
	}

}
