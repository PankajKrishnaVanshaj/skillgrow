const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutline = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for the topic react js of type exam with a difficulty level of high.\nProvide the following in JSON format:\n1. A summary of the course.\n2. A list of chapters, with each chapter containing:\n- Title\n- Summary\n- List of topics covered in the chapter.\nThe study material should be written in english\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseSummary": "This advanced React.js exam tests comprehensive understanding of React\'s core concepts, advanced techniques, and best practices.  It goes beyond the basics, focusing on performance optimization, complex state management, testing, and integration with other technologies.  Successful completion demonstrates proficiency in building robust, scalable, and maintainable React applications.",\n  "chapters": [\n    {\n      "title": "Advanced Component Lifecycle and Optimization",\n      "summary": "This chapter delves into the intricacies of React\'s component lifecycle, exploring advanced techniques for performance optimization, including memoization, code splitting, and lazy loading.  It also covers strategies for minimizing re-renders and improving application responsiveness.",\n      "topics": [\n        "Advanced use of `useEffect` hook (including cleanup functions, dependencies management, and optimization strategies)",\n        "`useMemo` and `useCallback` hooks for performance optimization",\n        "React.memo for component memoization",\n        "Code splitting with dynamic imports",\n        "Lazy loading components",\n        "Profiling React applications with React DevTools Profiler",\n        "Identifying and resolving performance bottlenecks",\n        "Virtualization techniques for large lists"\n      ]\n    },\n    {\n      "title": "Context API and State Management",\n      "summary": "This chapter covers advanced state management techniques, moving beyond simple component state.  It focuses on effectively utilizing the Context API and explores various third-party libraries for robust state management in complex applications.",\n      "topics": [\n        "Advanced Context API usage (including multiple contexts and context updates)",\n        "Understanding the limitations of Context API",\n        "Choosing the right state management solution (Redux, Zustand, Recoil, Jotai)",\n        "Implementing Redux with middleware and asynchronous actions",\n        "Building custom hooks for state management",\n        "Data fetching and caching strategies with state management libraries",\n        "Optimistic updates and error handling in state management"\n      ]\n    },\n    {\n      "title": "Testing and Debugging React Applications",\n      "summary": "This chapter focuses on writing comprehensive tests for React components and applications, covering unit, integration, and end-to-end testing.  It also covers debugging strategies for complex React applications.",\n      "topics": [\n        "Unit testing with Jest and React Testing Library",\n        "Integration testing with React Testing Library",\n        "End-to-end testing with Cypress or Selenium",\n        "Testing asynchronous actions and promises",\n        "Mocking dependencies and external APIs",\n        "Testing custom hooks",\n        "Debugging React applications with browser developer tools",\n        "Using React DevTools debugger effectively"\n      ]\n    },\n    {\n      "title": "Advanced React Concepts and Integrations",\n      "summary": "This chapter covers advanced topics, such as higher-order components (HOCs), render props, and integrating React with other technologies like server-side rendering (SSR) and GraphQL.",\n      "topics": [\n        "Higher-order components (HOCs) and their use cases",\n        "Render props pattern",\n        "Server-side rendering (SSR) with Next.js or other frameworks",\n        "Integrating React with GraphQL using Apollo Client or other libraries",\n        "Working with WebSockets and real-time updates in React",\n        "Building reusable custom components",\n        "Understanding and utilizing React portals",\n        "Advanced forms handling and validation"\n      ]\n    },\n    {\n      "title": "Performance Optimization and Best Practices",\n      "summary": "This chapter summarizes and expands on performance optimization strategies, emphasizing best practices for building maintainable and scalable React applications.",\n      "topics": [\n        "Code splitting and dynamic imports for improved load times",\n        "Image optimization techniques",\n        "Minimizing unnecessary re-renders",\n        "Writing efficient and readable code",\n        "Following React best practices",\n        "Utilizing linting and code formatting tools",\n        "Implementing proper error handling and logging",\n        "Advanced techniques for optimizing large datasets"\n      ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateNotes = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'generate exam material detail content for each chapter. make sure to include all topic point in the content make sure to give content in HTML format (do not add HTML, head ,body ,title tag ), the chapters:  summary : "This chapter introduces the four core technologies of the MERN stack: MongoDB, Express.js, React, and Node.js.  It explains their individual roles and how they combine to create full-stack JavaScript applications." ,\ntitle : "Introduction to the MERN Stack" ,\ntopics: ["What is the MERN stack?" , \n"Brief overview of MongoDB (NoSQL database)" , \n"Brief overview of Express.js (Node.js web framework)"\n, \n"Brief overview of React (JavaScript library for building user interfaces)"\n, \n"Brief overview of Node.js (JavaScript runtime environment)"\n, \n"Advantages of using the MERN stack" , \n"Setting up a development environment"]',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html\n<h1>Introduction to the MERN Stack</h1>\n\n<h2>What is the MERN stack?</h2>\n<p>The MERN stack is a popular JavaScript-based technology stack for building dynamic and scalable web applications.  It's comprised of four key components: MongoDB, Express.js, React, and Node.js.  Each component plays a crucial role in the development process, allowing for a streamlined and efficient workflow using a single programming language (JavaScript) across the entire application.</p>\n\n<h2>Brief overview of MongoDB (NoSQL database)</h2>\n<p>MongoDB is a NoSQL, document-oriented database.  Unlike relational databases (like MySQL or PostgreSQL), MongoDB stores data in flexible, JSON-like documents. This makes it highly scalable and well-suited for handling large volumes of unstructured or semi-structured data. Key features include:</p>\n<ul>\n  <li><strong>Document Model:</strong> Data is stored in flexible, self-describing documents.</li>\n  <li><strong>Scalability:</strong> Easily scales horizontally to handle growing data volumes and traffic.</li>\n  <li><strong>Flexibility:</strong> Schema is flexible, allowing for easy adaptation to changing data requirements.</li>\n  <li><strong>High Availability:</strong> Supports replication and sharding for high availability and fault tolerance.</li>\n</ul>\n\n<h2>Brief overview of Express.js (Node.js web framework)</h2>\n<p>Express.js is a minimal and flexible Node.js web application framework.  It provides a robust set of features for creating APIs and web servers, simplifying the development process.  Key aspects include:</p>\n<ul>\n  <li><strong>Routing:</strong> Defines how the application responds to different HTTP requests.</li>\n  <li><strong>Middleware:</strong> Allows for modular and reusable code for handling requests and responses.</li>\n  <li><strong>Templating Engines:</strong> Supports various templating engines for generating dynamic HTML content.</li>\n  <li><strong>Simplicity:</strong> Easy to learn and use, minimizing boilerplate code.</li>\n</ul>\n\n<h2>Brief overview of React (JavaScript library for building user interfaces)</h2>\n<p>React is a JavaScript library for building user interfaces (UIs). It employs a component-based architecture, making it easier to manage complex UIs.  Key features are:</p>\n<ul>\n  <li><strong>Component-Based Architecture:</strong> UI is broken down into reusable components.</li>\n  <li><strong>Virtual DOM:</strong> Optimizes updates to the UI, improving performance.</li>\n  <li><strong>JSX:</strong> Allows writing HTML-like syntax within JavaScript code.</li>\n  <li><strong>One-way Data Binding:</strong> Improves predictability and maintainability of the application.</li>\n</ul>\n\n<h2>Brief overview of Node.js (JavaScript runtime environment)</h2>\n<p>Node.js allows you to run JavaScript code outside of a web browser.  It uses an event-driven, non-blocking I/O model, making it highly efficient for handling concurrent requests.  This makes it ideal for building scalable server-side applications.</p>\n\n<h2>Advantages of using the MERN stack</h2>\n<p>The MERN stack offers several advantages:</p>\n<ul>\n  <li><strong>Full-stack JavaScript:</strong> Use JavaScript for both front-end (React) and back-end (Node.js, Express.js) development, simplifying development and improving consistency.</li>\n  <li><strong>Isomorphic JavaScript:</strong> Share code between the front-end and back-end.</li>\n  <li><strong>Scalability:</strong> MongoDB and Node.js are highly scalable, allowing applications to handle large amounts of data and traffic.</li>\n  <li><strong>Large and Active Community:</strong> Extensive resources, libraries, and support are readily available.</li>\n  <li><strong>Rapid Prototyping:</strong> The stack's simplicity facilitates faster development and prototyping.</li>\n</ul>\n\n<h2>Setting up a development environment</h2>\n<p>Setting up a MERN stack development environment typically involves:</p>\n<ol>\n  <li>Installing Node.js and npm (or yarn).</li>\n  <li>Installing MongoDB.</li>\n  <li>Setting up a code editor (VS Code, Atom, Sublime Text, etc.).</li>\n  <li>Using a package manager (npm or yarn) to install required packages.</li>\n  <li>Creating project folders and files.</li>\n  <li>(Optional) Using a development server (e.g., nodemon) for live reloading.</li>\n</ol>\n\n```\n",
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
