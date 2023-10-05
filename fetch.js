//const axios = require("axios");
const url = "http://localhost:2000/note"; 

const textInput = document.getElementById("conteudo")
const envia = document.getElementById("envia")

//const conteudo = textInput.value
envia.addEventListener("click",() =>{
    const conteudo = textInput.value;
    
    axios.post(url,{
        content:conteudo
    })
    .then((res)=>console.log(res))
})

//axios post 
// axios({
    //     method: "post",
    //     url: url,
    //     data:{
        //         _id: '650c79e59bdab9a0b8c564fb',
//         content: 'teste axios',
//         modified: '2023-09-21T14:14:13.396Z',
//         __v: 0
//     }
// })

axios.get(url)
.then(data => {
    console.log(data.data)
}
 )

  
  
  
  
  /*
  function diaHora(date){
      const ano = date.getFullYear()
      const mes = date.toLocaleString('default', { month: 'long' });
      const dia = date.getDate()
      const hora = date.getHours() + 3
      const minuto = date.getMinutes()
      return `${dia} de ${mes} de ${ano} ás ${hora}:${minuto}`
    }

// const notes = async () =>{
//     let url = "http://localhost:2000/note";
//     const res = await fetch(url);
//     const data = await res.json();
//     return data
// }


// async function mostra(){
//     const note = await notes()
//     const content = note
//     const date = note[1].modified
//     const UTCdate = new Date(date)
//     console.log(content)

// }

*/