document.addEventListener('DOMContentLoaded', ()=>{

    const url = 'https://cep.awesomeapi.com.br/json/'
    const form = document.querySelector('.form')
    const infos = document.querySelector('.informacoes')
    const mensagem = document.querySelector('.mensagem')
    
    form.addEventListener('submit',(event)=>{
        const cep = document.querySelector('.cep').value
        event.preventDefault()
        const buscarCep = async () =>{
            infos.innerHTML = ''

            const getData = await fetch(url+cep)
            const response = await getData.json()
            console.log(response)

            const container = document.createElement('p')
            const ibge = document.createElement('p')
            const ddd = document.createElement('p')

            container.innerHTML = `${response.address_type}: ${response.address_name}, ${response.address.district}, ${response.city} - ${response.state}`

            ibge.innerHTML = `Código da região com base no IBGE: ${response.city_ibge}`
            ddd.innerHTML = `DDD: ${response.ddd}`
            
            infos.appendChild(container)
            infos.appendChild(ibge)
            infos.appendChild(ddd)
             
            cep.value = ''
}
    buscarCep().then(()=>{
    mensagem.classList.add('sucesso')
    mensagem.innerHTML = 'Busca realizada com sucesso.'
  
}).catch(()=>{
    mensagem.innerHTML = 'Algo deu errado! Por favor, verifique se o CEP indicado está correto'
    mensagem.classList.add('erro')
})
})
})
