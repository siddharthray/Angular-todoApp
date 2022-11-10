import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
interface Todo {
  id: number,
  task: string,
  complete: boolean

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  editMode: boolean = false;
  inputValue: string = ""
  currentTodo: Todo = { id: 0, task: "", complete: false };
  todos: Todo[] = [];
  completedTodos: Todo[] = [];
  isTaskCompleted: boolean = false;
  completedTask: Todo[] = [];
  todoFormCtrl: FormControl
  userForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.todoFormCtrl = fb.control('', Validators.required);
    this.userForm = fb.group({
      task: this.todoFormCtrl
    });
  }

  delete(id: number) {
    console.log("id ", id, "typeof id", typeof id)
    const todo = this.todos.filter(todoId => todoId.id !== id);
    this.todos = todo;
  }

  edit(id: number) {
    console.log("id ", id, "typeof id", typeof id)
    const todo = this.todos.find(todoId => todoId.id === id);
    this.inputValue = todo?.task || "";
    this.currentTodo = todo!;
    this.editMode = true;
  }
  checkedTodo(id: number) {
    console.log("checked id ", id)
    const todo = this.todos.find(todoId => todoId.id === id);
    console.log("checked todo ", todo)
    this.todos = this.todos.map(item => {
      let res = { ...item };
      if ((res.id - 0) === todo?.id) {
        res.complete = !todo.complete
      }
      return res
    })
    console.log("after checked todos ", this.todos)
    this.todos.filter(el => el.complete === true).length > 0 ? this.isTaskCompleted = true : this.isTaskCompleted = false;
    this.completedTask = this.todos.filter(el => el.complete === true)
  }

  register(): void {
    console.log(this.userForm.value);
    let todo: Todo = {
      id: this.todos.length + 1,
      task: this.userForm.value['task'],
      complete: false
    }
    if (!this.editMode) {
      this.todos.push(todo);
    } else {

      this.todos = this.todos.map(item => {
        let res = { ...item };
        if (res.id === this.currentTodo.id) {
          res.task = todo.task
        }
        return res
      })
      console.log("todos update", this.todos)
    }
    this.editMode = false;
    this.userForm.reset()

  }
}
