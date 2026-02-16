import type { ScheduleWeek } from '../types';
import { addWeeks, format, startOfWeek } from 'date-fns';

export const generateSchedule = (startDate: Date = new Date('2026-02-19')): ScheduleWeek[] => {
    const weeks: ScheduleWeek[] = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 1 }); // Start on Monday

    const detailedPlan = [
        // Linear Algebra (4 Weeks)
        { subject: 'Linear Algebra', topics: ['Basics of Matrices & Determinants', 'Rank, Inverse & System of Equations'] },
        { subject: 'Linear Algebra', topics: ['Vector Spaces & Subspaces', 'Basis, Dimension & Linear Independence'] },
        { subject: 'Linear Algebra', topics: ['Eigenvalues & Eigenvectors', 'Diagonalization & Cayley-Hamilton Theorem'] },
        { subject: 'Linear Algebra', topics: ['Singular Value Decomposition (SVD)', 'LU Decomposition & Review'] },

        // Calculus (4 Weeks)
        { subject: 'Calculus', topics: ['Limits, Continuity & Differentiability', 'Mean Value Theorems'] },
        { subject: 'Calculus', topics: ['Definite & Indefinite Integrals', 'Applications of Integration'] },
        { subject: 'Calculus', topics: ['Maxima & Minima (Single & Multi-variable)', 'Partial Derivatives'] },
        { subject: 'Calculus', topics: ['Gradient, Divergence, Curl', 'Optimization Techniques'] },

        // Probability & Stats (5 Weeks - 2 Topics Per Week)
        { subject: 'Probability & Stats', topics: ['Permutations & Combinations', 'Probability Axioms & Bayes Theorem'] },
        { subject: 'Probability & Stats', topics: ['Random Variables (Discrete/Continuous)', 'Expectation, Variance & Moments'] },
        { subject: 'Probability & Stats', topics: ['Discrete Distributions (Binomial, Poisson)', 'Continuous Distributions (Normal, Exp)'] },
        { subject: 'Probability & Stats', topics: ['Joint Distributions & Covariance', 'Central Limit Theorem & Correlation'] },
        { subject: 'Probability & Stats', topics: ['Sampling & Estimation', 'Hypothesis Testing & Regression'] },

        // Python & DSA (9 Weeks - Added 1 Week)
        { subject: 'Python & DSA', topics: ['Python Basics: Variables, Loops, Functions', 'List Comprehensions & Maps'] },
        { subject: 'Python & DSA', topics: ['Recursion & Backtracking', 'Sorting & Searching Algorithms'] },
        { subject: 'Python & DSA', topics: ['Arrays, Linked Lists, Stacks & Queues', 'Time & Space Complexity'] },
        { subject: 'Python & DSA', topics: ['Trees (Binary, BST, AVL)', 'Tree Traversals'] },
        { subject: 'Python & DSA', topics: ['Graphs (BFS, DFS)', 'Shortest Path Algorithms (Dijkstra, Bellman-Ford)'] },
        { subject: 'Python & DSA', topics: ['Advanced Graphs: MST (Prim/Kruskal), Topological Sort, Network Flow'] }, // Added
        { subject: 'Python & DSA', topics: ['Dynamic Programming (Basic)', 'Greedy Algorithms'] },
        { subject: 'Python & DSA', topics: ['Hashing & Sets', 'Heaps & Priority Queues'] },
        { subject: 'Python & DSA', topics: ['Advanced Python Libraries (NumPy, Pandas)', 'DSA Revision'] },

        // DBMS (4 Weeks)
        { subject: 'DBMS', topics: ['ER Model & Relational Model', 'Keys & Constraints'] },
        { subject: 'DBMS', topics: ['SQL Basics (DDL, DML, DQL)', 'Joins & Subqueries'] },
        { subject: 'DBMS', topics: ['Normalization (1NF, 2NF, 3NF, BCNF)', 'Functional Dependencies'] },
        { subject: 'DBMS', topics: ['Transactions & Concurrency Control', 'Indexing (B-Trees, B+ Trees)'] },

        // Machine Learning (9 Weeks - Added 1 Week)
        { subject: 'Machine Learning', topics: ['Supervised Learning Basics', 'Linear & Logistic Regression'] },
        { subject: 'Machine Learning', topics: ['Decision Trees & Random Forests', 'Ensemble Methods (Bagging, Boosting)'] },
        { subject: 'Machine Learning', topics: ['Support Vector Machines (SVM)', 'k-Nearest Neighbors (k-NN)'] },
        { subject: 'Machine Learning', topics: ['Unsupervised Learning: k-Means Clustering', 'Hierarchical Clustering & PCA'] },
        { subject: 'Machine Learning', topics: ['Dimensionality Reduction (LDA, t-SNE) & Recommender Systems'] }, // Added
        { subject: 'Machine Learning', topics: ['Neural Networks Basics: Perceptron', 'Backpropagation & Activation Functions'] },
        { subject: 'Machine Learning', topics: ['Deep Learning: CNN Basics', 'Regularization & Optimization'] },
        { subject: 'Machine Learning', topics: ['Model Evaluation Metrics (Precision, Recall, F1)', 'Bias-Variance Tradeoff'] },
        { subject: 'Machine Learning', topics: ['Practical ML Pipeline', 'Case Studies & Revision'] },

        // AI (4 Weeks)
        { subject: 'AI', topics: ['AI Introduction & Agents', 'Uninformed Search (BFS, DFS)'] },
        { subject: 'AI', topics: ['Informed Search (A*, Heuristics)', 'Adversarial Search (Minimax, Alpha-Beta)'] },
        { subject: 'AI', topics: ['Logic & Knowledge Representation', 'Propositional & First-Order Logic'] },
        { subject: 'AI', topics: ['Planning & Reasoning', 'AI Ethics & Future'] },

        // Final Revision (9 Weeks - Exactly 2 Months)
        { subject: 'Final Revision', topics: ['Math Revision: Linear Algebra, Calculus, Prob & Stats'] },
        { subject: 'Final Revision', topics: ['Core CS Revision: DSA, Python, DBMS'] },
        { subject: 'Final Revision', topics: ['AI/ML Revision: Algorithms & Models'] },
        { subject: 'Final Revision', topics: ['Full Mock Test 1 (Standard Pattern) & Analysis'] },
        { subject: 'Final Revision', topics: ['Full Mock Test 2 (Difficult Pattern) & Analysis'] },
        { subject: 'Final Revision', topics: ['Full Mock Test 3 (Time Pressure) & Analysis'] },
        { subject: 'Final Revision', topics: ['Full Mock Test 4 (Predicted Questions) & Analysis'] },
        { subject: 'Final Revision', topics: ['Previous Year Papers Marathon (Last 5 Years)'] },
        { subject: 'Final Revision', topics: ['Final Logic Revision, Formula Sheets & Exam Strategy'] },
    ];

    let weekCounter = 1;

    detailedPlan.forEach((weekItem) => {
        const weekEnd = addWeeks(currentWeekStart, 1);

        // Add Sunday Mock Test to every week's topics
        const finalTopics = [...weekItem.topics, 'Sunday: 3hr Full Mock Test 📝'];

        weeks.push({
            weekNumber: weekCounter,
            subject: weekItem.subject,
            focusTopics: finalTopics,
            startDate: format(currentWeekStart, 'MMM d'),
            endDate: format(weekEnd, 'MMM d'),
        });

        currentWeekStart = weekEnd;
        weekCounter++;
    });

    return weeks;
};
