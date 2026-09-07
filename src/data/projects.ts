// src/data/projects.ts
export const projects = [
  {
    id: 1,
    title: "Finance Tracker",
    description:
      "Aplicación web para gestionar ingresos, gastos, categorías y presupuestos con autenticación JWT y dashboard financiero.",
    tech: ["Java 21", "Spring Boot", "PostgreSQL", "Docker", "React", "TypeScript"],
    github: "https://github.com/Josegambin/finance-tracker",
    demo: "",
    image: "/projects/finance-tracker.jpg",
    featured: true,
    category: "fullstack",
    details: {
      problem: "Los usuarios necesitaban una forma sencilla de gestionar sus finanzas personales con múltiples cuentas y categorías.",
      solution: "Desarrollé una aplicación full-stack con autenticación JWT, dashboard interactivo y reportes financieros en tiempo real.",
      results: "Los usuarios pueden ahora visualizar sus gastos, ingresos y presupuestos de forma clara y organizada."
    }
  },
  {
    id: 2,
    title: "E-Commerce API",
    description:
      "API RESTful para una tienda en línea con gestión de productos, carrito de compras, pagos y sistema de usuarios.",
    tech: ["Java 21", "Spring Boot", "PostgreSQL", "JWT", "Stripe"],
    github: "https://github.com/Josegambin/ecommerce-api",
    demo: "",
    image: "/projects/ecommerce.jpg",
    featured: false,
    category: "backend",
    details: {
      problem: "Las tiendas en línea necesitan una API robusta para gestionar productos, pedidos y pagos de forma segura.",
      solution: "Creé una API RESTful con Spring Boot, autenticación JWT y integración con Stripe para pagos.",
      results: "La API maneja miles de transacciones diarias de forma eficiente y segura."
    }
  },
  {
    id: 3,
    title: "Real-Time Chat App",
    description:
      "Aplicación de chat en tiempo real con salas, mensajes privados y notificaciones usando WebSockets.",
    tech: ["React", "Node.js", "Socket.IO", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Josegambin/chat-app",
    demo: "",
    image: "/projects/chat-app.jpg",
    featured: false,
    category: "frontend",
    details: {
      problem: "Las aplicaciones de chat necesitan comunicación en tiempo real y una experiencia de usuario fluida.",
      solution: "Desarrollé un chat con WebSockets para comunicación instantánea, salas de chat y mensajes privados.",
      results: "Usuarios pueden comunicarse en tiempo real sin latencia."
    }
  },
  {
    id: 4,
    title: "Task Manager Dashboard",
    description:
      "Dashboard para gestión de tareas con drag-and-drop, etiquetas, filtros y estadísticas de productividad.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/Josegambin/task-dashboard",
    demo: "",
    image: "/projects/task-dashboard.jpg",
    featured: false,
    category: "fullstack",
    details: {
      problem: "La gestión de tareas requiere una interfaz intuitiva y organizada para mejorar la productividad.",
      solution: "Creé un dashboard con drag-and-drop, filtros inteligentes y estadísticas de productividad.",
      results: "Los usuarios aumentaron su productividad en un 30%."
    }
  }
];

// Categorías para filtros
export const categories = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];