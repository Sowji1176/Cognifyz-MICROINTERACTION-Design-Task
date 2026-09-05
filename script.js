document.addEventListener('DOMContentLoaded', () => {

  const panelStart = document.getElementById('panelStart');
  const panelProgress = document.getElementById('panelProgress');
  const panelComplete = document.getElementById('panelComplete');
  const panels = [panelStart, panelProgress, panelComplete];

  const questionInput = document.getElementById('questionInput');
  const generateBtn = document.getElementById('generateBtn');
  const inputError = document.getElementById('inputError');
  const chipGrid = document.getElementById('chipGrid');

  const progressStage = document.getElementById('progressStage');
  const progressFill = document.getElementById('progressFill');

  const resultQuestion = document.getElementById('resultQuestion');
  const resultInsight = document.getElementById('resultInsight');
  const askAgainBtn = document.getElementById('askAgainBtn');

  const stateStart = document.getElementById('stateStart');
  const stateProgress = document.getElementById('stateProgress');
  const stateComplete = document.getElementById('stateComplete');
  const stateBlocks = [stateStart, stateProgress, stateComplete];

  let currentState = 'start'; // 'start' | 'progress' | 'complete'
  let activeTimers = [];

  /* ===== SIMULATED AI RESPONSE LIBRARY (10 categories, keyword-matched) ===== */
  const RESPONSES = [
    {
      keywords: ['data analytics', 'analytics concept', 'learn for data analytics', 'analytics concepts'],
      html: `
        <p>Data analytics combines several skills that help you transform raw information into useful business insights. A strong foundation should include the following concepts:</p>
        <ol>
          <li><strong>Data Cleaning</strong> — Learn how to identify missing values, duplicates, incorrect formats, inconsistent entries, and other quality issues before analyzing data.</li>
          <li><strong>Exploratory Data Analysis</strong> — EDA helps you understand patterns, relationships, distributions, and unusual values within a dataset.</li>
          <li><strong>Statistics</strong> — Learn descriptive statistics such as mean, median, mode, variance, standard deviation, correlation, and basic probability.</li>
          <li><strong>SQL</strong> — Essential for retrieving, filtering, joining, aggregating, and analyzing data stored in relational databases.</li>
          <li><strong>Data Visualization</strong> — Learn how to select appropriate charts and communicate findings clearly using tools such as Power BI, Tableau, or Excel.</li>
          <li><strong>Data Modeling</strong> — Understand how tables, relationships, dimensions, and measures work together when building analytical models.</li>
          <li><strong>Business Intelligence</strong> — Learn how to turn analytical findings into dashboards, KPIs, reports, and actionable business recommendations.</li>
          <li><strong>Communication and Storytelling</strong> — Explain what the data means, why it matters, and what decision should be considered next.</li>
        </ol>
        <p>A practical learning path is: Excel &rarr; SQL &rarr; Statistics &rarr; Data Cleaning &rarr; Power BI/Tableau &rarr; Data Modeling &rarr; Business Analytics.</p>
      `
    },
    {
      keywords: ['ui/ux tool', 'ui ux tool', 'design tool', 'tools for ux', 'tools for ui', 'software for ui', 'software for ux'],
      html: `
        <p>UI/UX designers typically use a combination of tools for research, wireframing, interface design, prototyping, collaboration, and visual assets. Some widely useful tools include:</p>
        <ol>
          <li><strong>Figma</strong> — A popular all-in-one tool for UI design, wireframing, prototyping, design systems, and team collaboration.</li>
          <li><strong>FigJam</strong> — Useful for brainstorming, user flows, journey mapping, workshops, and collaborative UX planning.</li>
          <li><strong>Adobe XD</strong> — A UI/UX design and prototyping tool within the Adobe ecosystem.</li>
          <li><strong>Sketch</strong> — A well-known interface design tool associated with digital product and UI workflows.</li>
          <li><strong>Canva</strong> — Useful for quick visual design, presentations, social assets, and mood boards.</li>
          <li><strong>Adobe Photoshop</strong> — Useful for advanced image editing, visual assets, and mockups.</li>
          <li><strong>Adobe Illustrator</strong> — Useful for vector graphics, icons, illustrations, and scalable visual assets.</li>
          <li><strong>Miro</strong> — Useful for brainstorming, journey mapping, workshops, and collaborative UX planning.</li>
        </ol>
        <p>For most beginners, Figma is a strong starting point because it combines interface design, prototyping, collaboration, and design-system capabilities in one environment.</p>
      `
    },
    {
      keywords: ['ai tool', 'ai tools for coding', 'coding tool', 'ai for coding', 'ai coding assistant'],
      html: `
        <p>AI coding tools can help developers write, explain, refactor, debug, and understand code more efficiently. Some useful tools include:</p>
        <ol>
          <li><strong>GitHub Copilot</strong> — Provides AI-assisted code completion, suggestions, explanations, and development support directly inside supported coding environments.</li>
          <li><strong>Cursor</strong> — An AI-focused code editor designed for working with codebases using natural-language instructions.</li>
          <li><strong>Claude</strong> — Useful for explaining code, generating code, debugging, refactoring, and reviewing technical solutions.</li>
          <li><strong>ChatGPT</strong> — Can assist with coding explanations, debugging, architecture discussions, and documentation.</li>
          <li><strong>Google Gemini</strong> — Provides coding assistance, explanations, and debugging help.</li>
          <li><strong>Amazon Q Developer</strong> — Provides AI assistance for software development, including AWS-related workflows.</li>
          <li><strong>Codeium</strong> — Provides AI-powered coding assistance, autocomplete, and productivity features.</li>
          <li><strong>Tabnine</strong> — Provides AI-assisted code completion and coding productivity support.</li>
        </ol>
        <p>The best tool depends on your workflow, programming language, IDE, privacy requirements, and project complexity. AI coding tools work best as development assistants rather than replacements for understanding and reviewing the code.</p>
      `
    },
    {
     test: (lower) => lower.includes('data analyst') && (
    lower.includes('skill') || lower.includes('become') || lower.includes('how can i')
   ),
    html: `
    <p>Becoming a data analyst requires a combination of technical, analytical, and business skills. The most important skills include:</p>
    <ul>
      <li><strong>Excel</strong> — Learn formulas, functions, pivot tables, data cleaning, and analysis.</li>
      <li><strong>SQL</strong> — Understand SELECT, WHERE, GROUP BY, JOINs, aggregate functions, and filtering data.</li>
      <li><strong>Data Cleaning</strong> — Learn how to identify missing values, duplicates, inconsistencies, and incorrect data.</li>
      <li><strong>Data Visualization</strong> — Learn how to communicate insights using charts, dashboards, and visual storytelling.</li>
      <li><strong>Power BI or Tableau</strong> — Build interactive dashboards and transform data into useful business insights.</li>
      <li><strong>Statistics</strong> — Understand averages, percentages, distributions, correlation, and basic statistical concepts.</li>
      <li><strong>Analytical Thinking</strong> — Develop the ability to identify patterns, trends, problems, and meaningful insights from data.</li>
      <li><strong>Business Understanding</strong> — Understand the business question behind the data and connect analysis to real-world decisions.</li>
      <li><strong>Communication</strong> — Clearly explain findings, insights, and recommendations to non-technical stakeholders.</li>
    </ul>
    <p><strong>A strong learning path is:</strong> Excel &rarr; SQL &rarr; Statistics &rarr; Data Cleaning &rarr; Power BI/Tableau &rarr; Data Modeling &rarr; Business Analytics &rarr; Data Storytelling.</p>
    <p>The goal is not just to learn tools, but to understand how to use data to answer business questions and support better decisions.</p>
  `
    },
    {
      keywords: ['become a ui/ux designer', 'become a ux designer', 'become a ui designer', 'learn to become a designer', 'learn ui ux'],
      html: `
        <p>To become a UI/UX designer, start by understanding how users interact with digital products and how design decisions influence usability.</p>
        <p>Begin with UX fundamentals such as user research, personas, user journeys, information architecture, and usability principles.</p>
        <p>Next, learn wireframing and interface structure. Tools such as Figma are useful for creating low-fidelity wireframes and gradually developing them into polished interfaces.</p>
        <p>Then focus on UI design fundamentals including typography, color theory, spacing, grids, visual hierarchy, accessibility, and responsive design.</p>
        <p>Prototyping is another important skill — learn how to connect screens and create realistic interactions so users can test a product flow before development.</p>
        <p>You should also learn usability testing and how to interpret feedback.</p>
        <p>Finally, build a strong portfolio. Instead of showing only final screens, explain your design problem, research, decisions, iterations, and final solution.</p>
        <p><strong>A useful learning path is:</strong> UX Fundamentals &rarr; Research &rarr; User Flows &rarr; Wireframes &rarr; UI Design &rarr; Prototyping &rarr; Usability Testing &rarr; Design Systems &rarr; Portfolio.</p>
      `
    },
    {
      keywords: ['sql concept', 'sql for beginner', 'important sql', 'sql beginner'],
      html: `
        <p>Beginners should focus on understanding how SQL retrieves, filters, combines, and summarizes data.</p>
        <ol>
          <li><strong>SELECT</strong> — Used to choose the columns you want to retrieve.</li>
          <li><strong>WHERE</strong> — Used to filter records based on specific conditions.</li>
          <li><strong>ORDER BY</strong> — Used to sort query results.</li>
          <li><strong>GROUP BY</strong> — Used to group records so aggregate calculations can be performed.</li>
          <li><strong>Aggregate Functions</strong> — Learn COUNT, SUM, AVG, MIN, and MAX.</li>
          <li><strong>JOIN</strong> — Understand INNER JOIN, LEFT JOIN, RIGHT JOIN, and how table relationships work.</li>
          <li><strong>DISTINCT</strong> — Used to return unique values.</li>
          <li><strong>CASE</strong> — Useful for creating conditional logic inside queries.</li>
          <li><strong>Subqueries</strong> — Learn how one query can be used inside another query.</li>
          <li><strong>INSERT, UPDATE, DELETE</strong> — Understand the basics of modifying data.</li>
        </ol>
        <p>A strong beginner approach is to learn each concept using small datasets and gradually combine multiple SQL concepts into practical analytical queries.</p>
      `
    },
    {
      keywords: ['difference between ai and machine learning', 'ai vs machine learning', 'ai and ml', 'what is machine learning'],
      html: `
        <p>Artificial Intelligence and Machine Learning are closely related, but they are not exactly the same.</p>
        <p><strong>Artificial Intelligence (AI)</strong> is the broader concept of creating systems that can perform tasks associated with human intelligence — reasoning, language understanding, planning, perception, and decision-making.</p>
        <p><strong>Machine Learning (ML)</strong> is a subset of AI. Instead of explicitly programming every rule, machine learning systems learn patterns from data and use those patterns to make predictions or decisions.</p>
        <p>For example, a recommendation system can use machine learning to analyze user behavior and predict which products or videos a person might be interested in.</p>
        <p>In simple terms:</p>
        <ul>
          <li><strong>AI</strong> = the broader field of intelligent systems.</li>
          <li><strong>Machine Learning</strong> = a method used to create some AI systems by learning from data.</li>
        </ul>
        <p>Other areas related to AI include deep learning, natural language processing, computer vision, and generative AI.</p>
      `
    },
    {
      keywords: ['ai help professionals', 'ai improve productivity', 'productivity ai', 'ai for productivity'],
      html: `
        <p>AI can support productivity by reducing repetitive work and helping professionals analyze, create, organize, and communicate information more efficiently.</p>
        <p><strong>Research and Summarization</strong> — AI can help summarize long documents, extract key points, and organize information.</p>
        <p><strong>Writing</strong> — AI can assist with drafting emails, reports, proposals, documentation, and content.</p>
        <p><strong>Data Analysis</strong> — AI can help identify patterns, generate analytical ideas, and support data interpretation.</p>
        <p><strong>Coding</strong> — AI coding assistants can help generate code, explain errors, and accelerate repetitive development tasks.</p>
        <p><strong>Design</strong> — AI tools can support brainstorming, image generation, and design ideation.</p>
        <p><strong>Automation</strong> — AI can help automate repetitive workflows and information-processing tasks.</p>
        <p><strong>Learning</strong> — AI can act as a learning assistant by explaining difficult concepts and generating practice questions.</p>
        <p>The most effective approach is to use AI as an assistant while reviewing its output carefully for accuracy, context, and quality.</p>
      `
    },
    {
      keywords: ['professional portfolio', 'include in a portfolio', 'portfolio content', 'build a portfolio'],
      html: `
        <p>A strong professional portfolio should demonstrate not only what you created but also how you approached problems and produced results.</p>
        <p>Include:</p>
        <ol>
          <li><strong>Introduction</strong> — A concise professional introduction explaining who you are and your main areas of expertise.</li>
          <li><strong>Selected Projects</strong> — Show your strongest and most relevant projects rather than adding everything you have created.</li>
          <li><strong>Case Studies</strong> — Explain the problem, your role, process, decisions, solution, and outcome.</li>
          <li><strong>Skills</strong> — Clearly list relevant technical, design, analytical, or professional skills.</li>
          <li><strong>Process</strong> — Show research, wireframes, iterations, analysis, or development stages where relevant.</li>
          <li><strong>Results</strong> — Whenever possible, demonstrate measurable outcomes or practical impact.</li>
          <li><strong>Tools and Technologies</strong> — Mention the tools used to create each project.</li>
          <li><strong>Contact Information</strong> — Make it easy for recruiters or clients to reach you.</li>
        </ol>
        <p>A professional portfolio should be visually clean, easy to navigate, and focused on demonstrating your ability rather than simply displaying finished work.</p>
      `
    },
    {
      keywords: ['data visualization', 'improve visualization', 'visualization skill'],
      html: `
        <p>Improving data visualization requires learning how to communicate information clearly rather than simply making charts look attractive.</p>
        <p>Start by understanding your objective — ask what question the visualization is supposed to answer.</p>
        <p>Choose the chart based on the message you want to communicate. Line charts are often useful for trends over time, bar charts for comparisons, and scatter plots for relationships between variables.</p>
        <p>Develop strong visual hierarchy. Important information should stand out through size, position, typography, and carefully controlled color.</p>
        <p>Avoid unnecessary decoration — too many colors, effects, labels, or visual elements can make a dashboard harder to understand.</p>
        <p>Learn to use color intentionally. Use consistent colors for categories and reserve accent colors for important findings.</p>
        <p>Practice storytelling by arranging multiple visualizations so users can understand the context, key finding, and implication.</p>
        <p>Finally, study real dashboards and recreate them using tools such as Excel, Power BI, or Tableau, then compare your version with the original.</p>
        <p><strong>The goal is not to create the most complicated visualization — the goal is to make the important information easy to understand.</strong></p>
      `
    }
  ];

  const GENERIC_RESPONSE_HTML = `
    <p>That's an interesting question. Based on common patterns in this area, the key is to break the topic into smaller, well-understood parts, build foundational knowledge first, and then apply it through hands-on practice.</p>
    <p><strong>Recommendation:</strong> Try rephrasing your question with a specific keyword — such as "SQL", "UI/UX", "data analytics", "AI tools", or "portfolio" — for a more detailed, targeted insight.</p>
  `;

  function getSimulatedInsight(question) {
  const lower = question.toLowerCase();
  const match = RESPONSES.find(r =>
    r.test ? r.test(lower) : r.keywords.some(k => lower.includes(k))
  );
  return match ? match.html : GENERIC_RESPONSE_HTML;
  }

  /* ===== PANEL / STATE SWITCHING ===== */
  function showPanel(panel) {
    panels.forEach(p => p.classList.remove('is-active'));
    panel.classList.add('is-active');
  }

  function highlightStateBlock(stateName) {
    stateBlocks.forEach(block => {
      block.classList.toggle('is-active', block.dataset.state === stateName);
    });
  }

  function clearActiveTimers() {
    activeTimers.forEach(t => clearTimeout(t));
    activeTimers = [];
  }

  /* ===== START STATE ===== */
  function setStartState(focusInput) {
    currentState = 'start';
    clearActiveTimers();
    showPanel(panelStart);
    highlightStateBlock('start');
    inputError.textContent = '';
    inputError.classList.remove('show');
    progressFill.style.width = '0%';
    if (focusInput) {
      questionInput.focus();
    }
  }

  /* ===== SUGGESTED QUESTION CHIPS -> FILL INPUT ONLY (no auto-generate) ===== */
  chipGrid.addEventListener('click', (e) => {
    const chip = e.target.closest('.example-chip');
    if (!chip) return;
    questionInput.value = chip.dataset.question;
    questionInput.focus();
    inputError.textContent = '';
    inputError.classList.remove('show');
  });

  /* ===== GENERATE INSIGHT -> PROGRESS -> COMPLETION ===== */
  function handleGenerate() {
    if (currentState !== 'start') return; // block repeated/rapid submissions

    const question = questionInput.value.trim();
    if (!question) {
      inputError.textContent = 'Please enter a question first.';
      inputError.classList.add('show');
      questionInput.focus();
      return;
    }
    inputError.textContent = '';
    inputError.classList.remove('show');

    runProgressSequence(question);
  }

  function runProgressSequence(question) {
    currentState = 'progress';
    showPanel(panelProgress);
    highlightStateBlock('progress');

    const stages = [
      { text: 'Understanding your question...', width: '30%', delay: 0 },
      { text: 'Analyzing information...', width: '65%', delay: 500 },
      { text: 'Generating insight...', width: '100%', delay: 1200 }
    ];

    progressStage.textContent = stages[0].text;
    progressFill.style.width = stages[0].width;

    stages.slice(1).forEach(stage => {
      const timer = setTimeout(() => {
        progressStage.classList.add('fade');
        setTimeout(() => {
          progressStage.textContent = stage.text;
          progressFill.style.width = stage.width;
          progressStage.classList.remove('fade');
        }, 150);
      }, stage.delay);
      activeTimers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      showCompletion(question);
    }, 2000);
    activeTimers.push(completeTimer);
  }

  function showCompletion(question) {
    currentState = 'complete';
    const insightHtml = getSimulatedInsight(question);

    resultQuestion.textContent = `“${question}”`;
    resultInsight.innerHTML = insightHtml;

    showPanel(panelComplete);
    highlightStateBlock('complete');
  }

  generateBtn.addEventListener('click', handleGenerate);
  questionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  });

  /* ===== ASK ANOTHER QUESTION -> RESET TO START ===== */
  askAgainBtn.addEventListener('click', () => {
    questionInput.value = '';
    setStartState(true);
  });

  /* ===== INITIALIZE ===== */
  setStartState(false);

});