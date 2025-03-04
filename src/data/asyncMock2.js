const questions = [
    {
        id: 1,
        title: '¿Qué es una cooperativa?',
        options: [
            { id: 1, answerText: 'Una sociedad de beneficiencia.', correct: false },
            { id: 2, answerText: 'Una asociación de personas por medio de una empresa de propiedad conjunta.', correct: true },
            { id: 3, answerText: 'Una entidad organizada solidariamente para prestar servicios a sus miembros.', correct: true },
            { id: 4, answerText: 'Un organismo autónomo y autárquico del Estado.', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Las cooperativas no pertenecen al Estado ni son sociedades de beneficiencia. Son empresas que buscan beneficiar económicamente a todos sus asociados.',
    },
    {
        id: 2,
        title: '¿Cuáles de los siguientes seres vivos pertenecen al reino Animal?',
        options: [
            { id: 1, answerText: 'Perro', correct: true },
            { id: 2, answerText: 'Gato', correct: true },
            { id: 3, answerText: 'Tulipán', correct: false },
            { id: 4, answerText: 'Ameba', correct: false },
            { id: 5, answerText: 'Hongo Portobello', correct: false },
            { id: 6, answerText: 'Araña del rincón', correct: true },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Perro y gato son vertebrados del reino Animal. Araña del rincón también es un animal: un invertebrado arácnido. Hongo Portobello pertenece al reino Fungi; y ameba, al reino Protista.',
    },
    {
        id: 3,
        title: '¿Cuáles son capitales de provincias argentinas?',
        options: [
            { id: 1, answerText: 'Buenos Aires', correct: false },
            { id: 2, answerText: 'Córdoba', correct: true },
            { id: 3, answerText: 'La Plata', correct: true },
            { id: 4, answerText: 'Rosario', correct: false },
            { id: 5, answerText: 'Santa Fe', correct: true },
            { id: 6, answerText: 'Neuquén', correct: true },
            { id: 7, answerText: 'Entre Ríos', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Buenos Aires es la capital del país, Rosario es una ciudad no capital y Entre Ríos es una provincia.',
    },
    {
        id: 4,
        title: '¿Qué es el cooperativismo?',
        options: [
            { id: 1, answerText: 'La solidaridad para hacer.', correct: true },
            { id: 2, answerText: 'La realización práctica de la idea de trabajar juntos para un mismo fin.', correct: true },
            { id: 3, answerText: 'El esfuerzo de una persona para alcanzar un objetivo.', correct: false },
            { id: 4, answerText: 'El conjunto de empresas cooperativas.', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Las dos primeras opciones son conceptos del cooperativismo.',
    },
    {
        id: 5,
        title: '¿Cuáles son las banderas del cooperativismo?',
        options: [
            { id: 1, answerText: '../assets/Bandera-del-Cooperativismo.png', correct: true },
            { id: 2, answerText: '../assets/ACI-BANDERA.png', correct: true },
            { id: 3, answerText: '../assets/NUEVA-BANDERA.png', correct: true },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Las tres son o han sido banderas del cooperativismo en alguna etapa de la historia.',
    },
    {
        id: 6,
        title: '¿Qué puede suceder al tirar aceite de cocina por el desagüe?',
        options: [
            { id: 1, answerText: 'El aceite se mezcla con otras sustancias que discurren por las tuberías, provocando atascos y malos olores.', correct: true },
            { id: 2, answerText: 'Se crea una capa o barrera en la superficie del agua evitando el intercambio de oxígeno, lo cual perjudica ecosistemas.', correct: true },
            { id: 3, answerText: 'Se crea una capa o barrera en la superficie del agua desfavoreciendo la fotosíntesis, ya que se absorbe la radiación solar.', correct: true },
            { id: 4, answerText: 'El aceite se solidifica y tapa los desagües.', correct: true },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Todas son correctas. Sólo un litro de aceite puede contaminar más de mil litros de agua.'
    },
    {
        id: 7,
        title: '¿Cuáles de los siguientes son los seis valores del cooperativismo?',
        options: [
            { id: 1, answerText: 'Justicia', correct: false },
            { id: 2, answerText: 'Amistad', correct: false },
            { id: 3, answerText: 'Democracia', correct: true },
            { id: 4, answerText: 'Igualdad', correct: true },
            { id: 5, answerText: 'Propiedad privada', correct: false },
            { id: 6, answerText: 'Vida', correct: false },
            { id: 7, answerText: 'Avaricia', correct: false },
            { id: 8, answerText: 'Espiritualidad', correct: false },
            { id: 9, answerText: 'Paz', correct: false },
            { id: 10, answerText: 'Libertad', correct: false },
            { id: 11, answerText: 'Ayuda mutua', correct: true },
            { id: 12, answerText: 'Responsabilidad', correct: true },
            { id: 13, answerText: 'Familia', correct: false },
            { id: 14, answerText: 'Solidaridad', correct: true },
            { id: 15, answerText: 'Cultura', correct: false },
            { id: 16, answerText: 'Trabajo', correct: false },
            { id: 17, answerText: 'Equidad', correct: true },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Si bien algunos de los otros conceptos están relacionados, tradicionalmente esos son los valores del cooperativismo.'
    },
    {
        id: 8,
        title: '¿Cómo se desechan las pilas?',
        options: [
            { id: 1, answerText: 'En residuos no reciclables', correct: false },
            { id: 2, answerText: 'En residuos reciclables', correct: false },
            { id: 3, answerText: 'Se llevan a un centro de tratamiento especial', correct: true },
            { id: 4, answerText: 'Envueltas en bolsas en residuos no reciclables', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Las pilas contienen elementos tóxicos que, si llegan al agua, contaminan a todos los seres vivos.'
    },
    {
        id: 9,
        title: '¿Qué comprende un residuo reciclable?',
        options: [
            { id: 1, answerText: 'Papel y cartón', correct: true },
            { id: 2, answerText: 'Plástico', correct: true },
            { id: 3, answerText: 'Uranio enriquecido', correct: false },
            { id: 4, answerText: 'Hojas y ramas', correct: false },
            { id: 5, answerText: 'Vidrio', correct: true },
            { id: 6, answerText: 'Restos de comida', correct: false },
            { id: 7, answerText: 'Metal', correct: true },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Residuos reciclables: papel, cartón, plástico, vidrio, metal.',
    },
    {
        id: 10,
        title: '¿Cuáles de estos colores no son del cooperativismo?',
        options: [
            { id: 1, answerText: 'Verde', correct: false },
            { id: 2, answerText: 'Negro', correct: true },
            { id: 3, answerText: 'Azul', correct: false },
            { id: 4, answerText: 'Rojo', correct: false },
            { id: 5, answerText: 'Violeta', correct: false },
            { id: 6, answerText: 'Naranja', correct: false },
            { id: 7, answerText: 'Amarillo', correct: false },
            { id: 8, answerText: 'Añil', correct: true },
            { id: 9, answerText: 'Cerúleo', correct: true },
            { id: 10, answerText: 'Blanco', correct: true },
            { id: 11, answerText: 'Celeste', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Los colores del cooperativismo son los del arcoiris.',
    },
    {
        id: 11,
        title: '¿Sobre qué trata el proyecto PLANTAR que desarrolla CORPICO?',
        options: [
            { id: 1, answerText: 'Plantación de caldenes en los alrededores de la ciudad.', correct: false },
            { id: 2, answerText: 'Planta de tratamiento de aguas residuales por medio de piletones.', correct: true },
            { id: 3, answerText: 'Tala de árboles indiscriminada para fomentar la deforestación.', correct: false },
            { id: 4, answerText: 'Invernaderos cooperativos de frutas y verduras.', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'PLAN: planta; T: tratamiento; A: aguas; R: residuales. Se utilizan, entre otros recursos, organismos anaeróbicos que purifican desechos en el agua.',
    },
    {
        id: 12,
        title: '¿Qué tipo de cooperativa es Corpico?',
        options: [
            { id: 1, answerText: 'Cooperativa de consumo', correct: false },
            { id: 2, answerText: 'Cooperativa agraria', correct: false },
            { id: 3, answerText: 'Cooperativa de trabajo', correct: false },
            { id: 4, answerText: 'Cooperativa de crédito', correct: false },
            { id: 5, answerText: 'Cooperativa de vivienda', correct: false },
            { id: 6, answerText: 'Cooperativa de servicios públicos', correct: true },
            { id: 7, answerText: 'Cooperativa de seguros', correct: false },
            { id: 8, answerText: 'Cooperativa de provisión', correct: false },
            { id: 9, answerText: 'Administración pública cooperativa (Régie Coopérative)', correct: false },
            { id: 10, answerText: 'Cooperativa escolar', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'Corpico es una cooperativa de servicios públicos. Brinda servicio eléctrico, agua y saneamiento urbano, comunicaciones, transporte, biblioteca, enfermería, gas envasado y sepelio.',
    },
    {
        id: 13,
        title: '¿Cuál es el logo de CORPICO?',
        options: [
            { id: 1, answerText: '../assets/logo_tvco_solo-sin_fondo.png', correct: false },
            { id: 2, answerText: '../assets/escudo_pico-sin_fondo.png', correct: false },
            { id: 3, answerText: '../assets/logo_corpico-sin_fondo.png', correct: true },
            { id: 4, answerText: '../assets/bandera_pico.png', correct: false },
        ],
        pointsPerCorrectAnswer: 1,
        explanation: 'La respuesta es correcta es la tercera (cabe mencionar que los pinos se suelen utilizar como símbolos cooperativos).',
    }
];

      export const getQuestion = async () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(questions);
          }, 1000);
        });
      };