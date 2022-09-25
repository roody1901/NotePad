const addBtn = document.querySelector('#addBtn')
// const main = document.querySelector("#main")

//===========CODE FOR SAVENOTE DATA IN LOCALSTORAGE================
const saveNote =() =>{
    const Notes = document.querySelectorAll(".note textarea"); 
    console.log(Notes)
    const data = [];
    Notes.forEach(
        (note) =>{
            data.push(note.value)
        }
    )
    if(data.length===0){
        localStorage.removeItem("Notes")
    }
    else{
       localStorage.setItem("Notes",JSON.stringify(data))
    }
}

//===========CODE FOR CREATE NEW NOTE================

const addNote = (text="") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
    <i onclick="bold()" class="fa fa-sharp fa-solid fa-bold" ></i>
    <i onclick="underline()" class="fa fa-underline" aria-hidden="true"></i>
    <i onclick="copy()"  class="fa fa-sharp fa-solid fa-copy"></i> 
    </div>
    <textarea id="content">${text}</textarea>
    <button id="save">
    <i class ="fas fa-save"></i>
    Save
    </button>
    <button id="delete">
    <i class ="fa fa-trash"></i>
    Remove
    </button>
    `;
  
    //===============SAVE NOTE DATA IN LS==========================
    note.querySelector("#save").addEventListener(
        "click",
        function(){
            saveNote()
        }
    )
//===============REMOVE NOTE ==========================
    note.querySelector("#delete").addEventListener(
        "click",
        function(){
            note.remove()
            saveNote()
        }
    )

    main.appendChild(note);
    saveNote()
      
 
}

addBtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)


//=======FUNCTIONALITY TO BOLD THE TEXT=====================================
function bold(){
    var bol = document.getElementById('content').style.fontWeight;
    if(bol=='normal'){
        document.getElementById('content').style.fontWeight='bold';
    }
    else{
        document.getElementById('content').style.fontWeight='normal';
    }
}
//==================UNDERLINE TEXT=========================================
function underline(){
    var tex = document.getElementById('content').style.textDecoration;
    if(tex=='underline'){
        document.getElementById('content').style.textDecoration='none';
    }
    else{
        document.getElementById('content').style.textDecoration='underline';
    }
}
//======================COPY TEXT ===========================================
function copy(){
   var text = document.getElementById('content');
   navigator.clipboard.writeText(text.value);
   
}
//=====================TO STICK NOTES ON REFRESH WITH DATA====================
(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("Notes"));
        lsnotes.forEach(
            (lsnote) =>{
                addNote(lsnote)
            }
        )
    }
)()