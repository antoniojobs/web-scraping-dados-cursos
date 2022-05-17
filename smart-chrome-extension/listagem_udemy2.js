// let listaConteudo = ['4 aulas • 14m', 'GIT e GITHUB básico (Opcional)', '1 aulas • 18m', 'Introdução ao Spring Boot', '9 aulas • 1h 24m', 'Desenvolvimento da API de Clientes', '18 aulas • 2h 10m', 'Módulo de Introdução ao Angular', '11 aulas • 1h 39m', 'Projeto Front-end - Criação do Template da Aplicação', '8 aulas • 39m', 'Cadastro e Listagem de Clientes', '23 aulas • 3h 3m', 'Módulo de Cadastro de Serviços Prestados', '14 aulas • 2h 10m', 'Autenticação e Segurança da Aplicação com OAuth2 e JWT', '25 aulas • 4h 1m', '2 aulas • 1h' , '2 aulas • 15h', '9 aulas • 12h 24m', '9 aulas • 15h 24m', '2 aulas • 2h', '2 aulas • 4h', '2 aulas • 12h', '1 aulas • 1m']
let listaConteudo = ['Introdução', '2 aulas • 5m', 'Instalação e Configuração das ferramentas Java', '4 aulas • 14m', 'GIT e GITHUB básico (Opcional)', '1 aulas • 18m', 'Introdução ao Spring Boot', '9 aulas • 1h 24m', 'Desenvolvimento da API de Clientes', '18 aulas • 2h 10m', 'Módulo de Introdução ao Angular', '11 aulas • 1h 39m', 'Projeto Front-end - Criação do Template da Aplicação', '8 aulas • 39m', 'Cadastro e Listagem de Clientes', '23 aulas • 3h 3m', 'Módulo de Cadastro de Serviços Prestados', '14 aulas • 2h 10m', 'Autenticação e Segurança da Aplicação com OAuth2 e JWT', '25 aulas • 4h 1m']



//_1 [•]\s([0-9]{1}m) replace to | 00:0$1
//_2 [•]\s([0-9]{1}h)(?!\s) replace to | 0$1:00
//_3 ([0-9]+h\s)([0-9]+m) replace to | 0$1:0$1 ou $1$2:0$3 ou $1$2:$3$4 
//_3 ([0-9]+h\s)([0-9]+m) replace to | 0$1:0$1 ou $1$2:0$3 ou $1$2:$3$4
//_4? (((\s'))|([\n]\s\s)|('\s))
//_5? ([0-9]+\s[a-z]+\s\•\s)([0-9]+[:][0-9]+)

let reg_1 = /[•]\s([0-9]+m)/gi
let minuto_full = listaConteudo.map((item,index)=>{
    return(item.replace(reg_1,(match, p1,p2, offset, string)=>{
        p1 = p1.replace('m','')
        p1 = parseInt(p1)<10?'00:0'+p1 : '00:'+p1;
        return `• ${p1}`
    }));
})

let reg_2 = /([0-9]+h)(?!\s)/gi
let hora_full = minuto_full.map((item,index)=>{
    return(item.replace(reg_2,(match, p1,p2, offset, string)=>{
        p1 = p1.replace('h','')
        p1 = parseInt(p1)<10?'0'+p1: p1;
        return `${p1}:00`
    }));
})

let reg_3 = /([0-9]+h\s)([0-9]+m)/gi
let hora_minuto_full = hora_full.map((item,index)=>{
    return(item.replace(reg_3,(match, p1, p2, offset, string)=>{        
        p2 = p2.replace('m','')
        p1 = p1.replace('h','')
        p2 = parseInt(p2)<10?'0'+p2: p2;
        p1 = parseInt(p1)<10?'0'+p1: p1;
        return `${p1.trim()}:${p2}`
    }));
})

let arrConstruido = []
let arrConstruidoFinal = []

let reg_5 = /([0-9]+\s[a-z]+\s\•\s)([0-9]+[:][0-9]+)/
arrConstruido = hora_minuto_full.map((item)=>{
    // console.log(item.replace(reg_5,(match, p1, p2, offset, string)=>`${p2}|`));
    return item.replace(reg_5,(match, p1, p2, offset, string)=>`${p2}`)
})
let titulos = []
let tempo = []
let juntos = []
arrConstruido.map((item,index)=>{
    if (index%2==0) {
        titulos.push(item)
    } else {
        tempo.push(item)
    }
});

tempo.forEach((element, index, array)=>{
    // console.log(`${array[index]} | ${titulos[index]}`);
    juntos.push(`${array[index]} | ${titulos[index]}`)
});
// console.log(juntos);

//!estrutura para inserir dados na view do plugin

// let listaLI = document.createElement('li')
let lista = document.querySelectorAll('#list-data')

function criaItem(data=juntos,target = lista,HTMLel = 'li') {
    let listaLI = document.createElement('li')
    let createdElement = document.createElement(`${HTMLel}`)
    data.map((item)=>{
        console.log(item);
        createdElement.innerText = `brasilll`
    })
}
criaItem()

// $x('//*[@id="br"]/div[1]/div[3]/div/div/div[1]/div[4]/div[2]/div[2]/div/div[2]')[0].innerText.split('\n')
// $x('//*[@id="br"]/div[1]/div[3]/div/div/div[1]/div[4]/div[2]/div[2]/div')[0].innerText.split('\n')