
const NS = window.VERSDesignSystem_01a32c;
const { SiteHeader, SiteFooter, Toast, SiteHome, SiteApresenta, SiteObra, SiteContato } = NS;
const G = "assets/graphics", P = "assets/photos/", C = "assets/clients/";

const NAV = [{id:"home",label:"Início"},{id:"apresenta",label:"VERS Apresenta"},{id:"obra",label:"Obras"},{id:"contato",label:"Contato"}];
const FOOTER = [
  {title:"Frentes",links:[{label:"Produzir"},{label:"Distribuir"},{label:"Materializar"}]},
  {title:"VERS Apresenta",links:[{label:"Catálogo"},{label:"Licenciamento"},{label:"Circulação"}]},
  {title:"Institucional",links:[{label:"Sobre a VERS"},{label:"Imprensa"},{label:"Brandbook"}]},
  {title:"Contato",links:[{label:"contato@vers.com.br"},{label:"LinkedIn"},{label:"Vimeo"}]}
];
const VERBOS = [
  {title:"Produzir", body:"Quando a VERS cria: concebe, dirige, desenvolve e realiza. É o verbo da obra autoral própria.", bullets:["Pesquisa e direção criativa","Design narrativo e de experiência","Direção de arte e som espacial"]},
  {title:"Distribuir", body:"Quando a VERS escolhe uma obra, negocia seus direitos, adapta sua apresentação a um território e estabelece as condições para que ela circule. É o verbo do VERS Apresenta.", bullets:["Curadoria nacional e internacional","Licenciamento e localização cultural","Estratégia de circulação"]},
  {title:"Materializar", body:"Quando a VERS dá forma pública à obra: estrutura, implanta e opera a experiência imersiva em contexto real, diante do público. É o verbo da obra em exibição.", bullets:["Infraestrutura e implantação XR","Fluxo de público e formação de equipe","Manutenção e supervisão de temporada"]}
];
const OBRAS = [
  {id:"circuito", image:"circuito", format:"Free-roaming", venue:"Sesc Barretos", year:"2026", title:"Circuito Sesc de Artes", summary:"Operação itinerante de VR em praça pública, com mediação e fluxo contínuo."},
  {id:"instalacao", image:"instalacao", format:"Instalação imersiva", venue:"Sesc Batatais", year:"2026", title:"A cidade por dentro", summary:"Cenografia, ambientação e mediação concebidas em diálogo com a obra."},
  {id:"temporada", image:"temporada", format:"Exposição XR", venue:"São Paulo", year:"2026", title:"Temporada completa", summary:"Percurso, temporada e operação contínua em instituição de grande porte."},
  {id:"praca", image:"praca", format:"Exposição XR", venue:"Barretos", year:"2026", title:"Praça pública", summary:"Implantação em espaço aberto, com estrutura própria e equipe local."},
  {id:"mediacao", image:"mediacao", format:"Instalação imersiva", venue:"Circuito Sesc", year:"2026", title:"Mediação como obra", summary:"A relação entre mediador e visitante tratada com cuidado curatorial."},
  {id:"coletiva", image:"coletiva", format:"Free-roaming", venue:"Sesc Batatais", year:"2026", title:"Sessão coletiva", summary:"Público circula livremente pelo espaço enquanto vivencia a obra."}
];
const IMAGES = {circuito:"vr-crianca-wide.jpg", instalacao:"vr-reach-wide.jpg", temporada:"free-roaming-overhead.jpg", praca:"praca-barretos-wide.jpg", mediacao:"mediacao-wide.jpg", coletiva:"tent-dusk-wide.jpg", hero:"vr-sunset-wide.jpg", dusk:"tent-dusk-wide.jpg", equipe:"equipe-publico-wide.jpg"};
const CLIENTS = ["sesc","globo","banco-do-brasil","onu","japan-foundation","anima-mundi","fundacao-itau","embratur","sebrae","senac","usp","gamescom"];
const STATS = [{value:"42",suffix:"mil",label:"Visitantes atendidos"},{value:"18",label:"Cidades"},{value:"07",label:"Festivais internacionais"},{value:"03",label:"Frentes de atuação"}];
const data = {VERBOS, OBRAS, IMAGES, CLIENTS, STATS};

function App(){
  const [page, setPage] = React.useState("home");
  const [toast, setToast] = React.useState(null);
  const go = (id) => { setPage(id); window.scrollTo(0,0); };
  const notify = (title, message) => { setToast({title, message}); setTimeout(()=>setToast(null), 4200); };

  return <>
    <SiteHeader tone="dark" active={page} onNavigate={go} items={NAV} cta="Falar com a VERS" ctaHref="#" assetBase={G}
      onClick={(e)=>{ if(!e.defaultPrevented && e.target.closest('a[href="#"]')){ e.preventDefault(); go("contato"); } }} />
    {page==="home" && <SiteHome go={go} P={P} G={G} C={C} data={data} />}
    {page==="apresenta" && <SiteApresenta go={go} P={P} G={G} data={data} onRequest={()=>notify("Solicitação enviada","A seleção curatorial chega em até dois dias úteis.")} />}
    {page==="obra" && <SiteObra go={go} P={P} data={data} />}
    {page==="contato" && <SiteContato G={G} onSubmit={()=>notify("Mensagem enviada","Retornamos em até dois dias úteis.")} />}
    <SiteFooter assetBase={G} columns={FOOTER} legal="© 2026 VERS · São Paulo, Brasil" />
    <div className="toast-slot">{toast && <Toast tone="success" title={toast.title} message={toast.message} onDismiss={()=>setToast(null)} />}</div>
  </>;
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
