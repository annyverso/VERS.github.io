export const NAV = [
  { id: "home", label: "Início" },
  { id: "apresenta", label: "VERS Apresenta" },
  { id: "obra", label: "Obras" },
  { id: "contato", label: "Contato" }
];

export const FOOTER = [
  { title: "Frentes", links: [{ label: "Produzir" }, { label: "Distribuir" }, { label: "Materializar" }] },
  { title: "VERS Apresenta", links: [{ label: "Catálogo" }, { label: "Licenciamento" }, { label: "Circulação" }] },
  { title: "Institucional", links: [{ label: "Sobre a VERS" }, { label: "Imprensa" }, { label: "Brandbook" }] },
  { title: "Contato", links: [{ label: "contato@vers.com.br" }, { label: "LinkedIn" }, { label: "Vimeo" }] }
];

export const VERBOS = [
  { title: "Produzir", body: "Quando a VERS cria: concebe, dirige, desenvolve e realiza. É o verbo da obra autoral própria.", bullets: ["Pesquisa e direção criativa", "Design narrativo e de experiência", "Direção de arte e design sonoro espacial"] },
  { title: "Distribuir", body: "Quando a VERS escolhe uma obra, negocia seus direitos, adapta sua apresentação a um território e estabelece as condições para que ela circule. É o verbo do VERS Apresenta.", bullets: ["Curadoria nacional e internacional", "Licenciamento e localização cultural", "Estratégia de circulação"] },
  { title: "Materializar", body: "Quando a VERS dá forma pública à obra: estrutura, implanta e opera a experiência imersiva em contexto real, diante do público. É o verbo da obra em exibição.", bullets: ["Cenografia e infraestrutura técnica", "Equipe operacional e fluxo de público", "Manutenção e supervisão de temporada"] }
];

export const OBRAS = [
  { id: "circuito", image: "circuito", format: "Free-roaming", venue: "Sesc Barretos", year: "2026", title: "Circuito Sesc de Artes", summary: "Operação itinerante de VR em praça pública, com mediação e fluxo contínuo." },
  { id: "instalacao", image: "instalacao", format: "Instalação imersiva", venue: "Sesc Batatais", year: "2026", title: "A cidade por dentro", summary: "Cenografia, ambientação e mediação concebidas em diálogo com a obra." },
  { id: "temporada", image: "temporada", format: "Exposição XR", venue: "São Paulo", year: "2026", title: "Temporada completa", summary: "Percurso, temporada e operação contínua em instituição de grande porte." },
  { id: "praca", image: "praca", format: "Exposição XR", venue: "Barretos", year: "2026", title: "Praça pública", summary: "Implantação em espaço aberto, com estrutura própria e equipe local." },
  { id: "mediacao", image: "mediacao", format: "Instalação imersiva", venue: "Circuito Sesc", year: "2026", title: "Mediação como obra", summary: "A relação entre mediador e visitante tratada com cuidado curatorial." },
  { id: "coletiva", image: "coletiva", format: "Free-roaming", venue: "Sesc Batatais", year: "2026", title: "Sessão coletiva", summary: "Público circula livremente pelo espaço enquanto vivencia a obra." }
];

export const IMAGES = {
  circuito: "vr-crianca-wide.jpg",
  instalacao: "vr-reach-wide.jpg",
  temporada: "free-roaming-overhead.jpg",
  praca: "praca-barretos-wide.jpg",
  mediacao: "mediacao-wide.jpg",
  coletiva: "tent-dusk-wide.jpg",
  hero: "vr-sunset-wide.jpg",
  dusk: "tent-dusk-wide.jpg",
  equipe: "equipe-publico-wide.jpg"
};

export const CLIENTS = ["sesc","globo","banco-do-brasil","onu","japan-foundation","anima-mundi","fundacao-itau","embratur","sebrae","senac","usp","gamescom"];

export const STATS = [
  { value: "42", suffix: "mil", label: "Visitantes atendidos" },
  { value: "18", label: "Cidades" },
  { value: "07", label: "Festivais internacionais" },
  { value: "03", label: "Frentes de atuação" }
];
