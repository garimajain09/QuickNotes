const addNote = document.querySelector('#addNote');
const main=document.querySelector('#main');

const saveNotes=()=>{
    const notes=document.querySelectorAll(".note textarea");
    const data=[];
    notes.forEach(
        (note)=>{
            data.push(note.value)
        }
    )
    if(data.length===0){
        localStorage.removeItem('notes');
    }
    else{
    localStorage.setItem("notes",JSON.stringify(data));
    }
}
addNote.addEventListener("click", () => {
    addNotes();
})

const addNotes = (text= "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div>
            <div class="tool">
                <i class="save fa-solid fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>
            <textarea>${text}</textarea>
    </div>`;
 
    note.querySelector('.trash').addEventListener("click",()=>{
        note.remove();
        saveNotes();
    })

    note.querySelector('.save').addEventListener("click",()=>{
        saveNotes();
    })
    note.querySelector("textarea").addEventListener("focusout",()=>{
       saveNotes()
    })
    main.appendChild(note);
    saveNotes();
}

//self-calling function
(
    function(){
        const lsNotes=JSON.parse(localStorage.getItem("notes"));
        if(lsNotes===null){
            addNotes();
    }
        else{
            lsNotes.forEach(
                (lsNote)=>{
                    addNotes(lsNote);
                }
            )
        }
       
    }
)()