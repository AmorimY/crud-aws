/*async function pessoas() {
  const res = await fetch("http://localhost:2000/person");
  return res;
}
pessoas()
  .then((response) => response.json())
  .then((data) => (data) );
*/
const pessoas = async () =>{
    let url = "http://localhost:2000/person";
    const res = await fetch(url);
    //console.log(res)
    const data = await res.json();
    //console.log(data)
    return data
}
async function mostra(){
    const pessoa = await pessoas()
    const date = pessoa[1].modified
    const d = new Date(date)
    
    console.log(diaHora(d))
}

mostra()

function diaHora(date){
    const ano = date.getFullYear()
    const mes = date.toLocaleString('default', { month: 'long' });
    const dia = date.getDate()
    const hora = date.getHours()
    const minuto = date.getMinutes()
    return `${dia} de ${mes} de ${ano} ${hora}:${minuto}`
}