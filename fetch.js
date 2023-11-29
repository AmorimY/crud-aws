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

  
  
  
  
