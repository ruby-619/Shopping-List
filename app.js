//--- form點按 add 之後，要把內容加進section ---//
let section = document.querySelector("section")

let add = document.querySelector("form button")
add.addEventListener("click",e=>{
    //-- 避免表單被交出去 --//
    e.preventDefault();
    
    //-------取得input裡的值------//
    //(1. 取得表單)註：e.target是<button type="submit">，而他的parentElement是form
    let form = e.target.parentElement;
    
    //(2. 取得表單中的第一個欄位：事項名稱)
    let todoText= form.children[0].value; 
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;


    //-------toText不可以為空白---------//
    if(todoText === ""){
        alert("Please enter some word😀")
        return // 在這邊就要終止掉，才不會繼續執行下面的函式
    }

    
    //-----------新增todo（顯示在清單的內容）------------//
    let todo = document.createElement("div")
    todo.classList.add("todo")

    let text = document.createElement("p")
    text.classList.add("todo-text")
    text.innerText = todoText; //代辦事項的內容會和input取得的內容一樣

    let time = document.createElement("p")
    time.classList.add("todo-time");
    time.innerText = todoMonth + "/" +todoDate;
    
    todo.appendChild(text)
    todo.appendChild(time)


    //----------create green check and red trash can---------//
    let completeButton =document.createElement("button")
    completeButton.classList.add("complete")
    completeButton.innerHTML='<i class="fas fa-check-square"></i>'
    completeButton.addEventListener("click",e=>{
        let todoItem=e.target.parentElement
        todoItem.classList.toggle("done")
    })

    let trashButton = document.createElement("button")
    trashButton.classList.add("trash")
    trashButton.innerHTML='<i class="fas fa-trash-alt"></i>'

    trashButton.addEventListener("click",e=>{
        
        let todoItem = e.target.parentElement; // 要讓整個todo消失

        // 動畫結束後，執行callback function
        todoItem.addEventListener("animationend",()=>{
            let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"))
                myListArray.forEach((item,index) =>{
                    if(item.todoText == text ){
                        myListArray.splice(index,1)
                        localStorage.setItem("list",JSON.stringify(myListArray))
                    }
                })

            todoItem.remove();
        })
        todoItem.style.animation="scaleDown 0.5s forwards"
        // todoItem.remove()
    })


    todo.appendChild(completeButton)
    todo.appendChild(trashButton) 

    todo.style.animation ="scaleUp 0.5s forwards";

    // 把上面得到的資料用object存起來
    let myTodo = {
        todoText : todoText,
        todoMonth:todoMonth,
        todoDate:todoDate
    }



    // store data (into an array of objects)
    let myList= localStorage.getItem("list")
    if(myList == null){
        localStorage.setItem("list",JSON.stringify([myTodo]))
    }else{
        let myListArray = JSON.parse(myList); //變成array
        myListArray.push(myTodo) 
        localStorage.setItem("list",JSON.stringify(myListArray))
    }

    console.log(JSON.parse(localStorage.getItem("list")))




    // 清空
    form.children[0].value=" ";
    form.children[1].value=" ";
    form.children[2].value=" ";
    section.appendChild(todo)
})

let myList = localStorage.getItem("list");
if (myList !==null){
    let myListArray = JSON.parse(myList)
    myListArray.forEach(item => {

        // creat a todo
        let todo = document.createElement("div")
        todo.classList.add("todo");
        let text = document.createElement("p")
        text.classList.add("todo-text")
        text.innerText = item.todoText;
        let time = document.createElement("p")
        time.classList.add("todo-time")
        time.innerText = item.todoMonth + "/" + item.todoDate
        todo.appendChild(text)
        todo.appendChild(time)

        let completeButton =document.createElement("button")
        completeButton.classList.add("complete")
        completeButton.innerHTML='<i class="fas fa-check-square"></i>'
        completeButton.addEventListener("click",e=>{
            let todoItem=e.target.parentElement
            todoItem.classList.toggle("done")
        })

        let trashButton = document.createElement("button")
        trashButton.classList.add("trash")
        trashButton.innerHTML='<i class="fas fa-trash-alt"></i>'
        trashButton.addEventListener("click",e=>{
            // console.log(e.target)
            let todoItem = e.target.parentElement;
            // console.log(todoItem)
            todoItem.addEventListener("animationend",()=>{
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"))
                myListArray.forEach((item,index) =>{
                    if(item.todoText == text ){
                        myListArray.splice(index,1)
                        localStorage.setItem("list",JSON.stringify(myListArray))
                    }
                })

                todoItem.remove();
            })
            todoItem.style.animation="scaleDown 0.5s forwards"
            // todoItem.remove()
        })

        todo.appendChild(completeButton)
        todo.appendChild(trashButton)

        section.appendChild(todo)
    });
}