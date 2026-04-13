/**
 * data.js — Datos de servicios (simula JSON local)
 * Compartido en todas las páginas de la aplicación
 */
const servicios = [
  {
    id: 1,
    titulo: "Servicio de Desarrollo Web",
    descripcion:
      "Creamos sitios web modernos y aplicaciones a medida con las últimas tecnologías.",
    descripcionLarga:
      "Nuestro servicio de desarrollo web ofrece soluciones completas y personalizadas para impulsar tu presencia digital. Trabajamos con las tecnologías más modernas y eficientes del mercado para crear aplicaciones web rápidas, seguras y escalables. Desde sitios web corporativos hasta plataformas complejas, nuestro equipo de expertos te acompañará en cada paso del proceso.",
    imagen:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80",
    categoria: "tecnologia",
    tag: "Tecnología",
    estrellas: 5,
    reseñas: 128,
    caracteristicas: [
      "Desarrollo responsive y adaptable a todos los dispositivos",
      "Diseño moderno y personalizado según tu marca",
      "Optimización SEO para mejor posicionamiento",
      "Integración con sistemas y APIs existentes",
      "Soporte técnico continuo y actualizaciones",
      "Tiempos de carga optimizados para mejor rendimiento",
    ],
    porQue: [
      "Calidad Garantizada",
      "Entrega Puntual",
      "Seguridad Máxima",
      "Innovación",
    ],
  },
  {
    id: 2,
    titulo: "Consultoría de Marketing Digital",
    descripcion:
      "Estrategias de marketing digital personalizadas para hacer crecer tu presencia online.",
    descripcionLarga:
      "Nuestro servicio de consultoría de marketing digital está diseñado para ayudar a tu negocio a alcanzar sus objetivos en el entorno digital. Trabajamos contigo para desarrollar estrategias efectivas que aumenten tu visibilidad online, generen más leads y conviertan visitantes en clientes leales. Con un enfoque basado en datos y las mejores prácticas del sector, te acompañamos en cada paso de tu transformación digital.",
    imagen:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=700&q=80",
    categoria: "marketing",
    tag: "Marketing",
    estrellas: 5,
    reseñas: 94,
    caracteristicas: [
      "Optimización SEO y posicionamiento orgánico",
      "Estrategia de redes sociales",
      "Publicidad digital (SEM/PPC)",
      "Campañas de email marketing",
      "Análisis y seguimiento del rendimiento",
      "Creación de contenido estratégico",
    ],
    porQue: [
      "ROI Medible",
      "Estrategia Personalizada",
      "Equipo Experto",
      "Resultados Reales",
    ],
  },
  {
    id: 3,
    titulo: "Plataforma de Aprendizaje en Línea",
    descripcion:
      "Accede a cursos y recursos educativos de alta calidad en diversas áreas del conocimiento.",
    descripcionLarga:
      "Descubre nuestra plataforma integral de aprendizaje en línea que te permite acceder a miles de cursos de alta calidad desde cualquier lugar del mundo. Con contenido actualizado y herramientas interactivas, transformamos la manera en que aprendes y desarrollas nuevas habilidades profesionales.",
    imagen:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&q=80",
    categoria: "educacion",
    tag: "Educación",
    estrellas: 4,
    reseñas: 210,
    caracteristicas: [
      "Cursos en línea con instructores expertos",
      "Contenido interactivo y actualizado",
      "Seguimiento del progreso personalizado",
      "Certificaciones reconocidas internacionalmente",
      "Acceso 24/7 desde cualquier dispositivo",
      "Comunidad global de estudiantes",
    ],
    porQue: [
      "Flexibilidad Total",
      "Certificación Oficial",
      "Instructores Expertos",
      "Comunidad Activa",
    ],
  },
  {
    id: 4,
    titulo: "Diseño UX/UI Profesional",
    descripcion:
      "Interfaces centradas en el usuario con metodologías ágiles y design thinking.",
    descripcionLarga:
      "Creamos experiencias digitales memorables aplicando principios de UX research, prototipado en Figma, pruebas de usabilidad y diseño de sistemas. Cada decisión visual está respaldada por datos y necesidades reales del usuario.",
    imagen:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
    categoria: "diseno",
    tag: "Diseño",
    estrellas: 5,
    reseñas: 88,
    caracteristicas: [
      "Research y análisis de usuarios",
      "Prototipado en Figma",
      "Pruebas de usabilidad",
      "Design system completo",
      "Diseño responsivo",
      "Entrega de assets para desarrollo",
    ],
    porQue: [
      "Centrado en Usuario",
      "Metodología Ágil",
      "Alta Calidad",
      "Entrega Rápida",
    ],
  },
  {
    id: 5,
    titulo: "Ciberseguridad Empresarial",
    descripcion:
      "Protege tu empresa con auditorías de seguridad, pentesting y formación especializada.",
    descripcionLarga:
      "Evaluamos la postura de seguridad de tu organización mediante análisis de vulnerabilidades, pruebas de penetración y revisión de infraestructura. Incluye plan de remediación, capacitación al equipo y monitoreo continuo.",
    imagen:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80",
    categoria: "seguridad",
    tag: "Seguridad",
    estrellas: 4,
    reseñas: 61,
    caracteristicas: [
      "Auditorías de seguridad completas",
      "Pruebas de penetración (Pentesting)",
      "Análisis de vulnerabilidades",
      "Plan de remediación detallado",
      "Capacitación al equipo",
      "Monitoreo continuo",
    ],
    porQue: [
      "Protección Total",
      "Equipo Certificado",
      "Respuesta Rápida",
      "Cumplimiento Normativo",
    ],
  },
  {
    id: 6,
    titulo: "Automatización con IA",
    descripcion:
      "Optimiza tus procesos empresariales integrando inteligencia artificial y machine learning.",
    descripcionLarga:
      "Implementamos soluciones de automatización inteligente: chatbots, procesamiento de documentos, análisis predictivo y flujos de trabajo automatizados. Reducimos tiempos operativos y aumentamos la eficiencia de tu equipo.",
    imagen:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80",
    categoria: "tecnologia",
    tag: "Tecnología",
    estrellas: 5,
    reseñas: 47,
    caracteristicas: [
      "Chatbots inteligentes con NLP",
      "Procesamiento automático de documentos",
      "Análisis predictivo de datos",
      "Automatización de flujos de trabajo",
      "Integración con sistemas existentes",
      "Panel de control y reportes",
    ],
    porQue: [
      "Alta Eficiencia",
      "Escalabilidad",
      "Reducción de Costos",
      "Tecnología de Punta",
    ],
  },
];
