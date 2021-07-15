import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/VinikutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar(propriedades){
  
  console.log(propriedades);

  return(   
    <Box as="aside">
      <img  src={`https://github.com/${propriedades.githubUser}.png`}  style={{ borderRadius: '8px' }}/>
      <hr />

      <p>
        <a className="boxLink" href="https://github.com/${propriedades.githubUser}.png">
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
        Seguidores ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.map((itemAtual) => {
          return(
            <li key={itemAtual.id}>
              <img src={`https://github.com/${itemAtual.login}.png`} className="img" />
              <span>{itemAtual.login}</span>
            </li>
          )
        })}         
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const usuarioAleatorio = 'ivinib';
  const [comunidades, setComunidades] = React.useState([]);

  const pessoasFavoritas = [
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib'    
  ]

  const [seguidores, setSeguidores] = React.useState([])

//GET
React.useEffect(function(){
    fetch('https://api.github.com/users/ivinib/followers')
    .then(function(respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
   })
}, [])

//GraphQL
//POST
fetch('https://graphql.datocms.com/', {
  method: 'POST',
  headers: {
    'Authorization': '325716c3fa3e51e668e1caf98928db',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({"query": `query{
    allCommunities{
      id
      title
      imageUrl
      creatorSlug
    }
  }`})
})
.then((response) => response.json())
.then((respostaCompleta) =>{
  const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;

  console.log(comunidadesVindasDoDato);

  setComunidades[comunidadesVindasDoDato];
})

  return( 
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={usuarioAleatorio} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet />
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade),
              })
              .then(async (response) => {
                const dados = response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas  = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
              
              
            }}>
            <div>

                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?" 
                type="text"
                />
              </div>

              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}> 

      <ProfileRelationsBox title="seguidores" items={seguidores} />
        
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return(
                <li key={itemAtual.id}>
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}            
          </ul>
      </ProfileRelationsBoxWrapper>

      <ProfileRelationsBoxWrapper>
         <h2 className="smallTitle">
           Pessoas({pessoasFavoritas.length})
         </h2>
         <ul>
           {pessoasFavoritas.map((itemAtual) => {
             return(
               <li key={itemAtual}>
                 <a href={`/users/${itemAtual}`}>
                   <img src={`https://github.com/${itemAtual}.png`} />
                   <span>{itemAtual}</span>
                 </a>
               </li>
             )
           })}            
        </ul>
           
       </ProfileRelationsBoxWrapper>        
      </div>
    </MainGrid>
    </>
  );
}

