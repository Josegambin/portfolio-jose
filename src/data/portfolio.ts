// src/data/portfolio.ts
export const portfolio = {
  name: "José Manuel Gambín Manresa",
  shortName: "José Gambín",
  role: "Full Stack Developer",
  location: "Cox - Alicante, España",
  phone: "+34 665 573 606",
  email: "josemanuel.gambin@gmail.com",
  linkedin: "linkedin.com/in/jose-gambin",
  github: "https://github.com/Josegambin",
  description:
    "Desarrollador Full Stack / Backend con más de 7 años de experiencia en consultoría tecnológica de alto nivel. Especializado en el ecosistema Java (Spring Boot, Microservicios) e integración de arquitecturas SPA con React.",
  fullDescription:
    "Trayectoria contrastada en el diseño de APIs REST, optimización de bases de datos de gran envergadura (Oracle, PostgreSQL) y automatización de despliegues (CI/CD). Capacidad analítica demostrada para transformar requisitos funcionales complejos en software escalable y de alta disponibilidad para grandes clientes como Telefónica, Naturgy y Adif.",
  skills: [
    { name: "Java 21", level: 95, icon: "☕" },
    { name: "Spring Boot", level: 90, icon: "🌱" },
    { name: "React", level: 85, icon: "⚛️" },
    { name: "TypeScript", level: 80, icon: "📘" },
    { name: "PostgreSQL", level: 85, icon: "🐘" },
    { name: "Oracle SQL", level: 80, icon: "🗄️" },
    { name: "Microservicios", level: 85, icon: "�" },
    { name: "CI/CD", level: 80, icon: "�" },
  ],
  skillCategories: {
    backend: {
      title: "Backend",
      icon: "⚙️",
      skills: ["Java 21", "Spring Boot", "Spring MVC", "Hibernate", "JPA", "Microservicios"]
    },
    frontend: {
      title: "Frontend",
      icon: "🎨",
      skills: ["React", "TypeScript", "JavaScript ES6+", "Thymeleaf", "HTML5", "CSS3"]
    },
    database: {
      title: "Base de Datos",
      icon: "🗄️",
      skills: ["PostgreSQL", "Oracle SQL", "MySQL", "Diseño relacional", "Optimización"]
    },
    devops: {
      title: "DevOps & Tools",
      icon: "🔧",
      skills: ["Git", "SVN", "Jenkins", "Maven", "SonarQube", "JasperReports"]
    },
    methodologies: {
      title: "Metodologías",
      icon: "�",
      skills: ["Agile/Scrum", "Jira", "Testing Unitario", "Mockito", "JUnit"]
    }
  },
  experience: {
    years: "7+",
    projects: "20+",
    clients: "10+",
    satisfaction: "100%"
  }
};