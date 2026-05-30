export interface Translations {
  // Header
  appSubtitle: string
  myStars: string
  account: string
  githubRateLimit: string
  // Search
  searchPlaceholder: string
  // Filters
  filterBtn: string
  languageFilterLabel: string
  tagFilterLabel: string
  clearFilter: string
  // Category tabs
  catAll: string
  catClinical: string
  catEducation: string
  catData: string
  // Results bar
  loadingApps: string
  appsCount: (n: number, total: number) => string
  filteredByStars: string
  // Sort
  sortDefault: string
  sortNewest: string
  sortOldest: string
  sortMostStars: string
  sortFewestStars: string
  // Empty state
  noAppsMatch: string
  clearAllFilters: string
  // App card
  openApp: string
  accessData: string
  moreInfo: string
  addToMyStars: string
  removeFromMyStars: string
  // Access badges
  openAccess: string
  credentialedAccess: string
  // Detail modal labels
  website: string
  categoryLabel: string
  languagesLabel: string
  accessLabel: string
  dataTypesLabel: string
  addedLabel: string
  // Account modal
  accountTitle: string
  githubStarsSection: string
  githubStarsDesc: string
  githubUsernamePlaceholder: string
  githubSave: string
  githubClear: string
  githubCurrentUser: (username: string) => string
  langPrefsSection: string
  langPrefsDesc: string
  searchLanguages: string
  savePreferences: string
  noLangPrefs: string
  // Info modal
  infoTitle: string
  infoAboutFoam: string
  infoHowToUseTitle: string
  infoStep1: string
  infoStep2: string
  infoStep3: string
  infoStep4: string
  infoSubmitTitle: string
  infoSubmitDesc: string
  infoGithubIssue: string
  infoUsingTemplate: string
  infoEmail: string
  infoFooterNote: string
  // Footer
  submitAnApp: string
}

const en: Translations = {
  appSubtitle: 'Free Open Access Medical Apps',
  myStars: 'My Stars',
  account: 'Account',
  githubRateLimit: 'GitHub rate limit reached',
  searchPlaceholder: 'Search apps by name or tag…',
  filterBtn: 'Filter',
  languageFilterLabel: 'Language:',
  tagFilterLabel: 'Filter:',
  clearFilter: 'Clear',
  catAll: 'All',
  catClinical: 'Clinical',
  catEducation: 'Education',
  catData: 'Data & Research',
  loadingApps: 'Loading apps…',
  appsCount: (n, t) => `${n} of ${t} apps`,
  filteredByStars: '· filtered by your stars',
  sortDefault: 'Default',
  sortNewest: 'Newest first',
  sortOldest: 'Oldest first',
  sortMostStars: 'Most stars',
  sortFewestStars: 'Fewest stars',
  noAppsMatch: 'No apps match your filters.',
  clearAllFilters: 'Clear all filters',
  openApp: 'Open App',
  accessData: 'Access Data',
  moreInfo: 'More info',
  addToMyStars: 'Add to My Stars',
  removeFromMyStars: 'Remove from My Stars',
  openAccess: 'Open Access',
  credentialedAccess: 'Free · Account Required',
  website: 'Website',
  categoryLabel: 'Category',
  languagesLabel: 'Languages',
  accessLabel: 'Access',
  dataTypesLabel: 'Data Types',
  addedLabel: 'Added',
  accountTitle: 'Account',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: "Enter your GitHub username to highlight apps whose repos you've starred. Stored only in your browser.",
  githubUsernamePlaceholder: 'github-username',
  githubSave: 'Save',
  githubClear: '✕',
  githubCurrentUser: u => `Showing stars for @${u}`,
  langPrefsSection: 'Language Preferences',
  langPrefsDesc: 'Apps supporting your preferred languages will be sorted to the top. Also sets the app interface language.',
  searchLanguages: 'Search languages…',
  savePreferences: 'Save Preferences',
  noLangPrefs: 'No preferences set — using browser default.',
  infoTitle: 'About FOAM Apps Directory',
  infoAboutFoam: 'FOAM stands for Free Open Access Medical education. This directory catalogues free, openly accessible web apps useful to clinicians, students, and healthcare teams worldwide.',
  infoHowToUseTitle: 'How to use',
  infoStep1: 'Search by app name or tag keyword.',
  infoStep2: 'Click a tag chip to filter by specialty (click multiple to combine).',
  infoStep3: 'Apps with a public GitHub repo show a source button and a live star count from GitHub.',
  infoStep4: 'My Stars — enter your GitHub username to highlight apps whose repos you have already starred.',
  infoSubmitTitle: 'Submit an app',
  infoSubmitDesc: 'Know a free, open-access medical app that belongs here? Submit it two ways:',
  infoGithubIssue: 'GitHub issue',
  infoUsingTemplate: 'using our "Add App" template.',
  infoEmail: 'Email',
  infoFooterNote: 'Star counts are fetched from the GitHub API and cached for 1 hour. The GitHub API allows 60 unauthenticated requests/hour per IP.',
  submitAnApp: 'Submit an app',
}

const es: Translations = {
  appSubtitle: 'Apps Médicas de Acceso Libre',
  myStars: 'Mis Favoritos',
  account: 'Cuenta',
  githubRateLimit: 'Límite de GitHub alcanzado',
  searchPlaceholder: 'Buscar por nombre o etiqueta…',
  filterBtn: 'Filtrar',
  languageFilterLabel: 'Idioma:',
  tagFilterLabel: 'Filtrar:',
  clearFilter: 'Limpiar',
  catAll: 'Todo',
  catClinical: 'Clínico',
  catEducation: 'Educación',
  catData: 'Datos e Investigación',
  loadingApps: 'Cargando apps…',
  appsCount: (n, t) => `${n} de ${t} apps`,
  filteredByStars: '· filtrado por tus favoritos',
  sortDefault: 'Por defecto',
  sortNewest: 'Más recientes',
  sortOldest: 'Más antiguos',
  sortMostStars: 'Más favoritos',
  sortFewestStars: 'Menos favoritos',
  noAppsMatch: 'No hay apps que coincidan con tus filtros.',
  clearAllFilters: 'Limpiar todos los filtros',
  openApp: 'Abrir App',
  accessData: 'Acceder a Datos',
  moreInfo: 'Más información',
  addToMyStars: 'Añadir a favoritos',
  removeFromMyStars: 'Quitar de favoritos',
  openAccess: 'Acceso Libre',
  credentialedAccess: 'Gratis · Requiere cuenta',
  website: 'Sitio web',
  categoryLabel: 'Categoría',
  languagesLabel: 'Idiomas',
  accessLabel: 'Acceso',
  dataTypesLabel: 'Tipos de datos',
  addedLabel: 'Añadido',
  accountTitle: 'Cuenta',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: 'Ingresa tu nombre de usuario de GitHub para resaltar las apps que has marcado. Solo se almacena en tu navegador.',
  githubUsernamePlaceholder: 'nombre-usuario',
  githubSave: 'Guardar',
  githubClear: '✕',
  githubCurrentUser: u => `Favoritos de @${u}`,
  langPrefsSection: 'Preferencias de Idioma',
  langPrefsDesc: 'Las apps en tu idioma preferido aparecerán primero. También establece el idioma de la interfaz.',
  searchLanguages: 'Buscar idiomas…',
  savePreferences: 'Guardar Preferencias',
  noLangPrefs: 'Sin preferencias — usando el idioma del navegador.',
  infoTitle: 'Acerca del Directorio FOAM Apps',
  infoAboutFoam: 'FOAM son las siglas de Free Open Access Medical (educación médica de acceso abierto). Este directorio cataloga apps web gratuitas útiles para clínicos, estudiantes y equipos de salud en todo el mundo.',
  infoHowToUseTitle: 'Cómo usar',
  infoStep1: 'Busca por nombre de app o palabra clave de etiqueta.',
  infoStep2: 'Haz clic en una etiqueta para filtrar por especialidad (combina varias).',
  infoStep3: 'Las apps con repositorio público en GitHub muestran un botón de código fuente y el número de estrellas en tiempo real.',
  infoStep4: 'Mis Favoritos — ingresa tu usuario de GitHub para resaltar las apps cuyos repositorios ya tienes marcados.',
  infoSubmitTitle: 'Enviar una app',
  infoSubmitDesc: '¿Conoces una app médica gratuita y de acceso abierto que debería estar aquí? Envíala de dos maneras:',
  infoGithubIssue: 'issue de GitHub',
  infoUsingTemplate: 'usando nuestra plantilla "Agregar App".',
  infoEmail: 'Correo electrónico',
  infoFooterNote: 'El conteo de estrellas se obtiene de la API de GitHub y se guarda en caché por 1 hora. La API permite 60 solicitudes sin autenticación por hora por IP.',
  submitAnApp: 'Enviar una app',
}

const fr: Translations = {
  appSubtitle: 'Applications Médicales en Libre Accès',
  myStars: 'Mes Favoris',
  account: 'Compte',
  githubRateLimit: 'Limite GitHub atteinte',
  searchPlaceholder: 'Rechercher par nom ou étiquette…',
  filterBtn: 'Filtrer',
  languageFilterLabel: 'Langue :',
  tagFilterLabel: 'Filtrer :',
  clearFilter: 'Effacer',
  catAll: 'Tout',
  catClinical: 'Clinique',
  catEducation: 'Éducation',
  catData: 'Données & Recherche',
  loadingApps: 'Chargement…',
  appsCount: (n, t) => `${n} sur ${t} apps`,
  filteredByStars: '· filtré par vos favoris',
  sortDefault: 'Par défaut',
  sortNewest: 'Plus récents',
  sortOldest: 'Plus anciens',
  sortMostStars: "Plus d'étoiles",
  sortFewestStars: "Moins d'étoiles",
  noAppsMatch: 'Aucune application ne correspond à vos filtres.',
  clearAllFilters: 'Effacer tous les filtres',
  openApp: 'Ouvrir',
  accessData: 'Accéder aux données',
  moreInfo: "Plus d'infos",
  addToMyStars: 'Ajouter aux favoris',
  removeFromMyStars: 'Retirer des favoris',
  openAccess: 'Accès libre',
  credentialedAccess: 'Gratuit · Compte requis',
  website: 'Site web',
  categoryLabel: 'Catégorie',
  languagesLabel: 'Langues',
  accessLabel: 'Accès',
  dataTypesLabel: 'Types de données',
  addedLabel: 'Ajouté',
  accountTitle: 'Compte',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: "Entrez votre nom d'utilisateur GitHub pour mettre en valeur les apps étoilées. Stocké uniquement dans votre navigateur.",
  githubUsernamePlaceholder: 'nom-utilisateur',
  githubSave: 'Enregistrer',
  githubClear: '✕',
  githubCurrentUser: u => `Favoris de @${u}`,
  langPrefsSection: 'Préférences de Langue',
  langPrefsDesc: "Les apps dans vos langues préférées apparaîtront en premier. Définit également la langue de l'interface.",
  searchLanguages: 'Rechercher des langues…',
  savePreferences: 'Enregistrer',
  noLangPrefs: 'Aucune préférence — langue du navigateur utilisée.',
  infoTitle: 'À propos du Répertoire FOAM Apps',
  infoAboutFoam: "FOAM signifie Free Open Access Medical (éducation médicale en libre accès). Ce répertoire recense des apps web gratuites utiles aux cliniciens, étudiants et équipes de santé dans le monde entier.",
  infoHowToUseTitle: 'Comment utiliser',
  infoStep1: "Recherchez par nom d'application ou mot-clé d'étiquette.",
  infoStep2: 'Cliquez sur une étiquette pour filtrer par spécialité (combinez-en plusieurs).',
  infoStep3: 'Les apps avec un dépôt GitHub public affichent un bouton source et le nombre d\'étoiles en direct.',
  infoStep4: 'Mes Favoris — entrez votre nom d\'utilisateur GitHub pour mettre en avant les apps dont vous avez étoilé les dépôts.',
  infoSubmitTitle: 'Soumettre une app',
  infoSubmitDesc: 'Vous connaissez une app médicale gratuite en accès libre qui devrait figurer ici ? Soumettez-la de deux façons :',
  infoGithubIssue: 'issue GitHub',
  infoUsingTemplate: 'en utilisant notre modèle "Ajouter une App".',
  infoEmail: 'E-mail',
  infoFooterNote: "Le nombre d'étoiles est récupéré depuis l'API GitHub et mis en cache pendant 1 heure. L'API autorise 60 requêtes non authentifiées par heure par IP.",
  submitAnApp: 'Soumettre une app',
}

const de: Translations = {
  appSubtitle: 'Freie Medizinische Apps',
  myStars: 'Meine Favoriten',
  account: 'Konto',
  githubRateLimit: 'GitHub-Limit erreicht',
  searchPlaceholder: 'Apps nach Name oder Tag suchen…',
  filterBtn: 'Filtern',
  languageFilterLabel: 'Sprache:',
  tagFilterLabel: 'Filtern:',
  clearFilter: 'Löschen',
  catAll: 'Alle',
  catClinical: 'Klinisch',
  catEducation: 'Bildung',
  catData: 'Daten & Forschung',
  loadingApps: 'Apps werden geladen…',
  appsCount: (n, t) => `${n} von ${t} Apps`,
  filteredByStars: '· nach Favoriten gefiltert',
  sortDefault: 'Standard',
  sortNewest: 'Neueste zuerst',
  sortOldest: 'Älteste zuerst',
  sortMostStars: 'Meiste Favoriten',
  sortFewestStars: 'Wenigste Favoriten',
  noAppsMatch: 'Keine Apps entsprechen Ihren Filtern.',
  clearAllFilters: 'Alle Filter löschen',
  openApp: 'App öffnen',
  accessData: 'Daten aufrufen',
  moreInfo: 'Mehr Infos',
  addToMyStars: 'Zu Favoriten hinzufügen',
  removeFromMyStars: 'Aus Favoriten entfernen',
  openAccess: 'Freier Zugang',
  credentialedAccess: 'Kostenlos · Konto erforderlich',
  website: 'Website',
  categoryLabel: 'Kategorie',
  languagesLabel: 'Sprachen',
  accessLabel: 'Zugang',
  dataTypesLabel: 'Datentypen',
  addedLabel: 'Hinzugefügt',
  accountTitle: 'Konto',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: 'Geben Sie Ihren GitHub-Benutzernamen ein, um markierte Apps hervorzuheben. Wird nur in Ihrem Browser gespeichert.',
  githubUsernamePlaceholder: 'benutzername',
  githubSave: 'Speichern',
  githubClear: '✕',
  githubCurrentUser: u => `Favoriten von @${u}`,
  langPrefsSection: 'Spracheinstellungen',
  langPrefsDesc: 'Apps in Ihren bevorzugten Sprachen werden zuerst angezeigt. Legt auch die Sprache der Benutzeroberfläche fest.',
  searchLanguages: 'Sprachen suchen…',
  savePreferences: 'Einstellungen speichern',
  noLangPrefs: 'Keine Einstellungen — Browsersprache wird verwendet.',
  infoTitle: 'Über das FOAM Apps Verzeichnis',
  infoAboutFoam: 'FOAM steht für Free Open Access Medical (freier offener Zugang zur medizinischen Bildung). Dieses Verzeichnis listet kostenlose, frei zugängliche Web-Apps für Kliniker, Studierende und Gesundheitsteams weltweit.',
  infoHowToUseTitle: 'Verwendung',
  infoStep1: 'Suchen Sie nach App-Name oder Tag-Schlüsselwort.',
  infoStep2: 'Klicken Sie auf ein Tag, um nach Fachgebiet zu filtern (mehrere kombinierbar).',
  infoStep3: 'Apps mit einem öffentlichen GitHub-Repository zeigen einen Quellcode-Button und die aktuelle Sternzahl.',
  infoStep4: 'Meine Favoriten — geben Sie Ihren GitHub-Benutzernamen ein, um bereits markierte Apps hervorzuheben.',
  infoSubmitTitle: 'App einreichen',
  infoSubmitDesc: 'Kennen Sie eine kostenlose medizinische App, die hier fehlt? Reichen Sie sie auf zwei Wegen ein:',
  infoGithubIssue: 'GitHub Issue',
  infoUsingTemplate: 'mit unserem „App hinzufügen"-Template.',
  infoEmail: 'E-Mail',
  infoFooterNote: 'Sternzahlen werden von der GitHub API abgerufen und für 1 Stunde zwischengespeichert. Die API erlaubt 60 nicht authentifizierte Anfragen pro Stunde und IP.',
  submitAnApp: 'App einreichen',
}

const pt: Translations = {
  appSubtitle: 'Apps Médicos de Acesso Aberto',
  myStars: 'Meus Favoritos',
  account: 'Conta',
  githubRateLimit: 'Limite do GitHub atingido',
  searchPlaceholder: 'Buscar apps por nome ou etiqueta…',
  filterBtn: 'Filtrar',
  languageFilterLabel: 'Idioma:',
  tagFilterLabel: 'Filtrar:',
  clearFilter: 'Limpar',
  catAll: 'Tudo',
  catClinical: 'Clínico',
  catEducation: 'Educação',
  catData: 'Dados e Pesquisa',
  loadingApps: 'Carregando apps…',
  appsCount: (n, t) => `${n} de ${t} apps`,
  filteredByStars: '· filtrado por seus favoritos',
  sortDefault: 'Padrão',
  sortNewest: 'Mais recentes',
  sortOldest: 'Mais antigos',
  sortMostStars: 'Mais favoritos',
  sortFewestStars: 'Menos favoritos',
  noAppsMatch: 'Nenhum app corresponde aos seus filtros.',
  clearAllFilters: 'Limpar todos os filtros',
  openApp: 'Abrir App',
  accessData: 'Acessar Dados',
  moreInfo: 'Mais informações',
  addToMyStars: 'Adicionar aos favoritos',
  removeFromMyStars: 'Remover dos favoritos',
  openAccess: 'Acesso Aberto',
  credentialedAccess: 'Gratuito · Conta necessária',
  website: 'Site',
  categoryLabel: 'Categoria',
  languagesLabel: 'Idiomas',
  accessLabel: 'Acesso',
  dataTypesLabel: 'Tipos de dados',
  addedLabel: 'Adicionado',
  accountTitle: 'Conta',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: 'Digite seu nome de usuário do GitHub para destacar os apps que você marcou. Armazenado apenas no seu navegador.',
  githubUsernamePlaceholder: 'nome-usuario',
  githubSave: 'Salvar',
  githubClear: '✕',
  githubCurrentUser: u => `Favoritos de @${u}`,
  langPrefsSection: 'Preferências de Idioma',
  langPrefsDesc: 'Apps com seu idioma preferido serão exibidos primeiro. Também define o idioma da interface.',
  searchLanguages: 'Pesquisar idiomas…',
  savePreferences: 'Salvar Preferências',
  noLangPrefs: 'Sem preferências — usando idioma do navegador.',
  infoTitle: 'Sobre o Diretório FOAM Apps',
  infoAboutFoam: 'FOAM significa Free Open Access Medical (educação médica de acesso aberto). Este diretório cataloga apps web gratuitos úteis para clínicos, estudantes e equipes de saúde em todo o mundo.',
  infoHowToUseTitle: 'Como usar',
  infoStep1: 'Busque por nome do app ou palavra-chave de etiqueta.',
  infoStep2: 'Clique em uma etiqueta para filtrar por especialidade (combine várias).',
  infoStep3: 'Apps com repositório público no GitHub mostram um botão de código-fonte e a contagem de estrelas em tempo real.',
  infoStep4: 'Meus Favoritos — informe seu usuário do GitHub para destacar apps cujos repositórios você já marcou.',
  infoSubmitTitle: 'Enviar um app',
  infoSubmitDesc: 'Conhece um app médico gratuito e de acesso aberto que deveria estar aqui? Envie de duas formas:',
  infoGithubIssue: 'issue no GitHub',
  infoUsingTemplate: 'usando nosso modelo "Adicionar App".',
  infoEmail: 'E-mail',
  infoFooterNote: 'A contagem de estrelas é obtida da API do GitHub e armazenada em cache por 1 hora. A API permite 60 requisições sem autenticação por hora por IP.',
  submitAnApp: 'Enviar um app',
}

const vi: Translations = {
  appSubtitle: 'Ứng Dụng Y Tế Miễn Phí Mở',
  myStars: 'Yêu Thích',
  account: 'Tài Khoản',
  githubRateLimit: 'Đã đạt giới hạn GitHub',
  searchPlaceholder: 'Tìm kiếm theo tên hoặc nhãn…',
  filterBtn: 'Lọc',
  languageFilterLabel: 'Ngôn ngữ:',
  tagFilterLabel: 'Lọc:',
  clearFilter: 'Xóa',
  catAll: 'Tất cả',
  catClinical: 'Lâm sàng',
  catEducation: 'Giáo dục',
  catData: 'Dữ liệu & Nghiên cứu',
  loadingApps: 'Đang tải ứng dụng…',
  appsCount: (n, t) => `${n}/${t} ứng dụng`,
  filteredByStars: '· lọc theo yêu thích',
  sortDefault: 'Mặc định',
  sortNewest: 'Mới nhất',
  sortOldest: 'Cũ nhất',
  sortMostStars: 'Nhiều yêu thích nhất',
  sortFewestStars: 'Ít yêu thích nhất',
  noAppsMatch: 'Không có ứng dụng nào phù hợp với bộ lọc.',
  clearAllFilters: 'Xóa tất cả bộ lọc',
  openApp: 'Mở Ứng Dụng',
  accessData: 'Truy Cập Dữ Liệu',
  moreInfo: 'Thêm thông tin',
  addToMyStars: 'Thêm vào yêu thích',
  removeFromMyStars: 'Xóa khỏi yêu thích',
  openAccess: 'Truy cập mở',
  credentialedAccess: 'Miễn phí · Cần tài khoản',
  website: 'Trang web',
  categoryLabel: 'Danh mục',
  languagesLabel: 'Ngôn ngữ',
  accessLabel: 'Truy cập',
  dataTypesLabel: 'Loại dữ liệu',
  addedLabel: 'Đã thêm',
  accountTitle: 'Tài Khoản',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: 'Nhập tên người dùng GitHub để đánh dấu các ứng dụng bạn đã gắn sao. Chỉ lưu trong trình duyệt của bạn.',
  githubUsernamePlaceholder: 'tên-người-dùng',
  githubSave: 'Lưu',
  githubClear: '✕',
  githubCurrentUser: u => `Yêu thích của @${u}`,
  langPrefsSection: 'Tùy Chọn Ngôn Ngữ',
  langPrefsDesc: 'Ứng dụng hỗ trợ ngôn ngữ ưa thích sẽ được sắp xếp lên đầu. Cũng đặt ngôn ngữ giao diện.',
  searchLanguages: 'Tìm kiếm ngôn ngữ…',
  savePreferences: 'Lưu Tùy Chọn',
  noLangPrefs: 'Chưa đặt tùy chọn — dùng ngôn ngữ trình duyệt.',
  infoTitle: 'Về Thư Mục FOAM Apps',
  infoAboutFoam: 'FOAM là viết tắt của Free Open Access Medical (Giáo dục Y tế Truy cập Mở Miễn phí). Thư mục này tổng hợp các ứng dụng web miễn phí hữu ích cho các bác sĩ, sinh viên và đội ngũ y tế trên toàn thế giới.',
  infoHowToUseTitle: 'Hướng dẫn sử dụng',
  infoStep1: 'Tìm kiếm theo tên ứng dụng hoặc từ khóa nhãn.',
  infoStep2: 'Nhấp vào nhãn để lọc theo chuyên khoa (kết hợp nhiều nhãn).',
  infoStep3: 'Ứng dụng có kho GitHub công khai hiển thị nút xem mã nguồn và số sao trực tiếp.',
  infoStep4: 'Yêu Thích — nhập tên người dùng GitHub để làm nổi bật các ứng dụng bạn đã gắn sao.',
  infoSubmitTitle: 'Gửi một ứng dụng',
  infoSubmitDesc: 'Bạn biết một ứng dụng y tế miễn phí và truy cập mở nên có ở đây? Gửi theo hai cách:',
  infoGithubIssue: 'GitHub issue',
  infoUsingTemplate: 'sử dụng mẫu "Thêm Ứng Dụng" của chúng tôi.',
  infoEmail: 'Email',
  infoFooterNote: 'Số sao được lấy từ API GitHub và lưu cache trong 1 giờ. API cho phép 60 yêu cầu không xác thực mỗi giờ mỗi IP.',
  submitAnApp: 'Gửi ứng dụng',
}

const id: Translations = {
  appSubtitle: 'Aplikasi Medis Akses Terbuka Gratis',
  myStars: 'Favorit Saya',
  account: 'Akun',
  githubRateLimit: 'Batas GitHub tercapai',
  searchPlaceholder: 'Cari aplikasi berdasarkan nama atau tag…',
  filterBtn: 'Filter',
  languageFilterLabel: 'Bahasa:',
  tagFilterLabel: 'Filter:',
  clearFilter: 'Hapus',
  catAll: 'Semua',
  catClinical: 'Klinis',
  catEducation: 'Pendidikan',
  catData: 'Data & Riset',
  loadingApps: 'Memuat aplikasi…',
  appsCount: (n, t) => `${n} dari ${t} aplikasi`,
  filteredByStars: '· difilter berdasarkan favorit',
  sortDefault: 'Default',
  sortNewest: 'Terbaru',
  sortOldest: 'Terlama',
  sortMostStars: 'Favorit terbanyak',
  sortFewestStars: 'Favorit tersedikit',
  noAppsMatch: 'Tidak ada aplikasi yang cocok dengan filter Anda.',
  clearAllFilters: 'Hapus semua filter',
  openApp: 'Buka Aplikasi',
  accessData: 'Akses Data',
  moreInfo: 'Info lanjut',
  addToMyStars: 'Tambah ke favorit',
  removeFromMyStars: 'Hapus dari favorit',
  openAccess: 'Akses Terbuka',
  credentialedAccess: 'Gratis · Perlu Akun',
  website: 'Situs web',
  categoryLabel: 'Kategori',
  languagesLabel: 'Bahasa',
  accessLabel: 'Akses',
  dataTypesLabel: 'Jenis data',
  addedLabel: 'Ditambahkan',
  accountTitle: 'Akun',
  githubStarsSection: 'GitHub Stars',
  githubStarsDesc: 'Masukkan nama pengguna GitHub Anda untuk menyorot aplikasi yang telah Anda bintangi. Disimpan hanya di browser Anda.',
  githubUsernamePlaceholder: 'nama-pengguna',
  githubSave: 'Simpan',
  githubClear: '✕',
  githubCurrentUser: u => `Favorit @${u}`,
  langPrefsSection: 'Preferensi Bahasa',
  langPrefsDesc: 'Aplikasi yang mendukung bahasa pilihan Anda akan diurutkan ke atas. Juga mengatur bahasa antarmuka.',
  searchLanguages: 'Cari bahasa…',
  savePreferences: 'Simpan Preferensi',
  noLangPrefs: 'Belum ada preferensi — menggunakan bahasa browser.',
  infoTitle: 'Tentang Direktori FOAM Apps',
  infoAboutFoam: 'FOAM adalah singkatan dari Free Open Access Medical (pendidikan medis akses terbuka gratis). Direktori ini mengkatalogkan aplikasi web gratis yang berguna bagi klinisi, mahasiswa, dan tim kesehatan di seluruh dunia.',
  infoHowToUseTitle: 'Cara penggunaan',
  infoStep1: 'Cari berdasarkan nama aplikasi atau kata kunci tag.',
  infoStep2: 'Klik chip tag untuk memfilter berdasarkan spesialisasi (kombinasikan beberapa).',
  infoStep3: 'Aplikasi dengan repositori GitHub publik menampilkan tombol kode sumber dan jumlah bintang langsung.',
  infoStep4: 'Favorit Saya — masukkan nama pengguna GitHub Anda untuk menyorot aplikasi yang repositorinya sudah Anda bintangi.',
  infoSubmitTitle: 'Kirim aplikasi',
  infoSubmitDesc: 'Tahu aplikasi medis gratis dan akses terbuka yang layak ada di sini? Kirimkan dengan dua cara:',
  infoGithubIssue: 'GitHub issue',
  infoUsingTemplate: 'menggunakan template "Tambah Aplikasi" kami.',
  infoEmail: 'Email',
  infoFooterNote: 'Jumlah bintang diambil dari API GitHub dan disimpan dalam cache selama 1 jam. API mengizinkan 60 permintaan tanpa autentikasi per jam per IP.',
  submitAnApp: 'Kirim aplikasi',
}

export const translations: Record<string, Translations> = { en, es, fr, de, pt, vi, id }

export const SUPPORTED_UI_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'vi', 'id'] as const
export type SupportedUILanguage = (typeof SUPPORTED_UI_LANGUAGES)[number]

export function getUiLanguage(orderedLangs: string[]): string {
  for (const lang of orderedLangs) {
    if ((SUPPORTED_UI_LANGUAGES as readonly string[]).includes(lang)) return lang
  }
  return 'en'
}
