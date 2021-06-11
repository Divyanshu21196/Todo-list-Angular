import { Component, OnInit } from '@angular/core';
import {Todo} from '../../interfaces/todo';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  searchTitle:string;
  private modalRef;
  editTitle:string;
  editTitleId:number;
  idForTodo: number;
  constructor(private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Angular List1',
        'completed': false,
      },
      {
        'id': 2,
        'title': 'Angular List2',
        'completed': false,
      },
      {
        'id': 3,
        'title': 'Angular List3',
        'completed': false,
      },
    ];
    this.idForTodo = this.todos.length+1;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.toastr.success('Todo deleted successfully');
  }

  complete(id: number): void {
    let index = this.todos.findIndex(e=>e.id === id)
    if(index != -1){
      this.todos[index].completed = true;
      this.toastr.success('Todo completed successfully');
    }else{
      this.toastr.success('Todo not in list');
    }
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
    })
    this.toastr.success('Added successfully')
    this.todoTitle = '';
    this.idForTodo++;
  }

  edit(id,modal){
    this.modalRef = this.modalService.open(modal, { size: 'sm', ariaLabelledBy: 'modal-basic-title',backdrop:'static'});
    let index = this.todos.findIndex(e=>e.id === id)
    if(index != -1){
     this.editTitle = this.todos[index].title;
     this.editTitleId = id;
    }
  }

  doneEdit() {
    let index = this.todos.findIndex(e=>e.id === this.editTitleId)
    if(index != -1){
     this.todos[index].title =  this.editTitle ;
     this.modalService.dismissAll();
    }
    this.toastr.info('Edited Successfully')
  }

  cancelEdit(){
    this.editTitle="";
    this.modalService.dismissAll();
  }


}
