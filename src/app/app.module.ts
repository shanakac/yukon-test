import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//bootstrap components
import { PopoverModule } from 'ngx-bootstrap/popover';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseAddEditComponent } from './courses/course-add-edit/course-add-edit.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentAddEditComponent } from './students/student-add-edit/student-add-edit.component';


@NgModule({
	declarations: [
		AppComponent,
		SidebarComponent,
		HeaderComponent,
		CoursesComponent,
		StudentsComponent,
		CourseDetailComponent,
		CourseAddEditComponent,
		CourseListComponent,
		StudentDetailComponent,
		StudentListComponent,
		StudentAddEditComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		PopoverModule.forRoot(),
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [
		CourseDetailComponent,
		CourseAddEditComponent,
		CourseListComponent,
		StudentDetailComponent,
		StudentListComponent,
		StudentAddEditComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
