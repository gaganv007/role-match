import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Share2, RefreshCw, CheckCircle2, Info, Users, Zap, Target, Home, ArrowRight, Sparkles, Code, Palette, Settings, TestTube, User, Mail, CreditCard } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import uxAnimation from './animations/UX.json';
import cmAnimation from './animations/CM.json';
import designAnimation from './animations/System.json';
import testerAnimation from './animations/Tester.json';
import reAnimation from './animations/RE.json';

const RoleMatch = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  // Use system dark mode preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setDarkMode(e.matches);
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [shareNotification, setShareNotification] = useState('');
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Student information state
  const [studentInfo, setStudentInfo] = useState(() => ({
    firstName: '',
    lastName: '',
    buId: '',
    email: ''
  }));
  const [studentInfoErrors, setStudentInfoErrors] = useState({});

  // Material 3 Color Scheme
  const colors = {
    light: {
      primary: '#006495',
      onPrimary: '#ffffff',
      primaryContainer: '#c9e6ff',
      onPrimaryContainer: '#001e31',
      secondary: '#525f6e',
      onSecondary: '#ffffff',
      secondaryContainer: '#d5e3f5',
      onSecondaryContainer: '#0f1c29',
      tertiary: '#6a5778',
      onTertiary: '#ffffff',
      tertiaryContainer: '#f2daff',
      onTertiaryContainer: '#251432',
      error: '#ba1a1a',
      background: '#fdfcff',
      onBackground: '#1a1c1e',
      surface: '#fdfcff',
      onSurface: '#1a1c1e',
      surfaceVariant: '#dfe2eb',
      onSurfaceVariant: '#43474e',
      outline: '#73777f',
      outlineVariant: '#c3c6cf',
      elevation1: 'rgba(0, 0, 0, 0.05)',
      elevation2: 'rgba(0, 0, 0, 0.08)',
      elevation3: 'rgba(0, 0, 0, 0.11)',
    },
    dark: {
      primary: '#8cccff',
      onPrimary: '#003450',
      primaryContainer: '#004b71',
      onPrimaryContainer: '#c9e6ff',
      secondary: '#b9c7d9',
      onSecondary: '#24323f',
      secondaryContainer: '#3a4856',
      onSecondaryContainer: '#d5e3f5',
      tertiary: '#d5bee5',
      onTertiary: '#3a2948',
      tertiaryContainer: '#52405f',
      onTertiaryContainer: '#f2daff',
      error: '#ffb4ab',
      background: '#1a1c1e',
      onBackground: '#e2e2e6',
      surface: '#1a1c1e',
      onSurface: '#e2e2e6',
      surfaceVariant: '#43474e',
      onSurfaceVariant: '#c3c6cf',
      outline: '#8d9199',
      outlineVariant: '#43474e',
      elevation1: 'rgba(255, 255, 255, 0.05)',
      elevation2: 'rgba(255, 255, 255, 0.08)',
      elevation3: 'rgba(255, 255, 255, 0.11)',
    }
  };

  const theme = darkMode ? colors.dark : colors.light;

  // Role definitions
  const roles = {
    RE: {
      name: "Requirements Engineer",
      description: "Gathers and documents project requirements, writes specifications",
      skills: ["Documentation", "Analysis", "Communication", "Research"],
      icon: <Sparkles size={32} />,
      gradient: { from: theme.primary, to: theme.secondary },
      color: "#3B82F6"
    },
    CM: {
      name: "Configuration Manager",
      description: "Manages tools, files, versions, and project structure",
      skills: ["Organization", "Version Control", "Tool Management", "Documentation"],
      icon: <Settings size={32} />,
      gradient: { from: theme.secondary, to: theme.tertiary },
      color: "#10B981"
    },
    Design: {
      name: "System Designer",
      description: "Plans system architecture and component interactions",
      skills: ["Architecture", "Diagramming", "System Planning", "Technical Design"],
      icon: <Code size={32} />,
      gradient: { from: theme.tertiary, to: theme.primary },
      color: "#8B5CF6"
    },
    UX: {
      name: "UX Designer",
      description: "Designs user interfaces and improves user experience",
      skills: ["UI Design", "Prototyping", "User Research", "Visual Design"],
      icon: <Palette size={32} />,
      gradient: { from: theme.primary, to: theme.tertiary },
      color: "#EC4899"
    },
    Test: {
      name: "QA Tester",
      description: "Ensures quality through testing and bug detection",
      skills: ["Testing", "Debugging", "Quality Assurance", "Attention to Detail"],
      icon: <TestTube size={32} />,
      gradient: { from: theme.secondary, to: theme.primary },
      color: "#F59E0B"
    }
  };

  //characters animations
  const roleAnimations = {
    UX: uxAnimation,
    CM: cmAnimation,
    RE: reAnimation,
    Design: designAnimation,
    Test: testerAnimation,
  };

  
  // Questions data
  const questions = [
    {
      id: 1,
      text: "Which of these roles sounds most enjoyable to you?",
      type: "single",
      weight: 3.0,
      options: [
        { text: "Writing clear instructions or outlining requirements", points: { RE: 3 }, roleKey: 'RE' },
        { text: "Organizing tools, files, and project structure", points: { CM: 3 }, roleKey: 'CM' },
        { text: "Planning how system parts connect and work together", points: { Design: 3 }, roleKey: 'Design' },
        { text: "Designing user interfaces and improving usability", points: { UX: 3 }, roleKey: 'UX' },
        { text: "Testing and making sure things work correctly", points: { Test: 3 }, roleKey: 'Test' }
      ]
    },
    {
      id: 2,
      text: "If you had to pick a role for a group project, which would you choose?",
      type: "single",
      weight: 2.5,
      options: [
        { text: "Requirement writer or researcher", points: { RE: 3 }, roleKey: 'RE' },
        { text: "Repository/file manager", points: { CM: 3 }, roleKey: 'CM' },
        { text: "Systems planner or diagram designer", points: { Design: 3 }, roleKey: 'Design' },
        { text: "Interface or layout designer", points: { UX: 3 }, roleKey: 'UX' },
        { text: "Tester or debugger", points: { Test: 3 }, roleKey: 'Test' }
      ]
    },
    {
      id: 3,
      text: "Which work style describes you best?",
      type: "single",
      weight: 2.0,
      options: [
        { text: "I like working alone and being detail-focused", points: { Test: 2, CM: 1 }, roleKey: 'Test' },
        { text: "I enjoy collaborative work and sharing ideas", points: { RE: 2, UX: 1 }, roleKey: 'RE' },
        { text: "I prefer strategic planning and system thinking", points: { Design: 2, RE: 1 }, roleKey: 'Design' },
        { text: "I like creative work and visual problem-solving", points: { UX: 2, Design: 1 }, roleKey: 'UX' }
      ]
    },
    {
      id: 4,
      text: "What would you most enjoy improving or learning about?",
      type: "single",
      weight: 1.5,
      options: [
        { text: "Writing requirements or specifications", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Managing shared tools and files", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Designing system architecture", points: { Design: 2 }, roleKey: 'Design' },
        { text: "UI/UX design and accessibility", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Testing and quality control", points: { Test: 2 }, roleKey: 'Test' }
      ]
    },
    {
      id: 5,
      text: "Which of these describe your interests?",
      type: "multiple",
      weight: 1.0,
      options: [
        { text: "Writing instructions or organizing project ideas", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Keeping track of files, folders, and shared materials", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Planning how different features work together", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Designing how interfaces should look and feel", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Finding problems or mistakes in systems", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 6,
      text: "What have you done before?",
      type: "multiple",
      weight: 2.5,
      options: [
        { text: "Wrote documents, outlines, or plans for projects", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Helped keep files and folders organized", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Drew diagrams to explain how something works", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Sketched website or app designs", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Found bugs or tested features", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 7,
      text: "What do you enjoy doing?",
      type: "multiple",
      weight: 1.5,
      options: [
        { text: "Writing documents that explain things clearly", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Keeping files and content neat and organized", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Planning visuals or system structures", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Making interfaces simple and easy to use", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Catching small details others might miss", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 8,
      text: "Which tools or platforms have you used?",
      type: "multiple",
      weight: 1.0,
      options: [
        { text: "Written instructions or documentation", points: { RE: 1 }, roleKey: 'RE' },
        { text: "Managed files or versions in group settings", points: { CM: 1 }, roleKey: 'CM' },
        { text: "Created flowcharts or system diagrams", points: { Design: 1 }, roleKey: 'Design' },
        { text: "Designed visual layouts or presentations", points: { UX: 1 }, roleKey: 'UX' },
        { text: "Logged issues or verified test results", points: { Test: 1 }, roleKey: 'Test' }
      ]
    },
    {
      id: 9,
      text: "Which behaviors describe you?",
      type: "multiple",
      weight: 2.0,
      options: [
        { text: "I help teammates understand requirements", points: { RE: 2 }, roleKey: 'RE' },
        { text: "I enjoy organizing to-do lists and folders", points: { CM: 2 }, roleKey: 'CM' },
        { text: "I notice when designs or interfaces feel off", points: { UX: 2, Design: 1 }, roleKey: 'UX' },
        { text: "I think through edge cases and scenarios", points: { Test: 2, Design: 1 }, roleKey: 'Test' },
        { text: "I often write instructions for others", points: { RE: 2, CM: 1 }, roleKey: 'RE' }
      ]
    },
    {
      id: 10,
      text: "When joining a new project, what's your natural instinct?",
      type: "single",
      weight: 1.5,
      options: [
        { text: "Help define the goals and scope", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Set up project structure and tools", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Start planning the system architecture", points: { Design: 2 }, roleKey: 'Design' },
        { text: "Think about the user experience", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Consider testing strategies", points: { Test: 2 }, roleKey: 'Test' }
      ]
    },
    {
      id: 11,
      text: "What do you usually contribute most in team work?",
      type: "single",
      weight: 2.0,
      options: [
        { text: "Writing up steps or requirements", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Organizing files and documentation", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Creating system diagrams", points: { Design: 2 }, roleKey: 'Design' },
        { text: "Making visual layouts or mockups", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Finding issues and ensuring quality", points: { Test: 2 }, roleKey: 'Test' }
      ]
    },
    {
      id: 12,
      text: "Which role have you enjoyed most in past experiences?",
      type: "single",
      weight: 2.5,
      options: [
        { text: "Requirements gathering and documentation", points: { RE: 2 }, roleKey: 'RE' },
        { text: "Managing project setup and structure", points: { CM: 2 }, roleKey: 'CM' },
        { text: "Building logical flows and diagrams", points: { Design: 2 }, roleKey: 'Design' },
        { text: "Creating user interfaces", points: { UX: 2 }, roleKey: 'UX' },
        { text: "Spotting bugs and issues", points: { Test: 2 }, roleKey: 'Test' }
      ]
    }
  ];

  // Enhanced Role Character Component with 16personalities-style animations
  const RoleCharacter = ({ roleKey, isAnimated = false, size = 'medium', showSparkles = false, isHovered = false }) => {
    const sizeMap = {
      small: { w: 60, h: 60, icon: 24 },
      medium: { w: 120, h: 120, icon: 40 },
      large: { w: 160, h: 160, icon: 48 }
    };

    const dimensions = sizeMap[size];
    
    // Enhanced character styles with personality-based gradients and effects
    const characterStyles = {
      RE: { 
        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #2563EB 100%)',
        personality: 'analytical',
        hoverBg: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%)'
      },
      CM: { 
        background: 'linear-gradient(135deg, #10B981 0%, #047857 50%, #059669 100%)',
        personality: 'organized',
        hoverBg: 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #059669 100%)'
      },
      Design: { 
        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 50%, #7C3AED 100%)',
        personality: 'creative-logical',
        hoverBg: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #7C3AED 100%)'
      },  
      UX: { 
        background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 50%, #DB2777 100%)',
        personality: 'creative',
        hoverBg: 'linear-gradient(135deg, #F472B6 0%, #EC4899 50%, #DB2777 100%)'
      },
      Test: { 
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #F59E0B 100%)',
        personality: 'detective',
        hoverBg: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)'
      }
    };

    const style = characterStyles[roleKey];
    const currentBg = isHovered ? style.hoverBg : style.background;

    // Personality-based animation classes
    const getPersonalityAnimation = () => {
      switch (style.personality) {
        case 'analytical': return isAnimated ? 'character-think' : '';
        case 'organized': return isAnimated ? 'character-organize' : '';
        case 'creative-logical': return isAnimated ? 'character-create-logic' : '';
        case 'creative': return isAnimated ? 'character-create' : '';
        case 'detective': return isAnimated ? 'character-investigate' : '';
        default: return isAnimated ? 'character-bounce' : '';
      }
    };

    return (
      <div 
        className={`role-character ${getPersonalityAnimation()} ${showSparkles ? 'character-sparkle' : ''}`}
        style={{
          width: `${dimensions.w}px`,
          height: `${dimensions.h}px`,
          position: 'relative',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Main character circle */}
        <div 
          className="character-circle"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: currentBg,
            boxShadow: isHovered 
              ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.1)' 
              : '0 8px 32px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Character icon - FIXED: Better sizing */}
          {React.cloneElement(roles[roleKey].icon, { 
            size: dimensions.icon,
            style: { 
              color: '#ffffff',
              filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
              transition: 'all 0.3s ease',
              width: `${dimensions.icon}px`,
              height: `${dimensions.icon}px`
            }
          })}

          {/* Personality ring animation */}
          {isAnimated && (
            <div 
              className="personality-ring"
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '3px solid',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                borderTopColor: 'rgba(255, 255, 255, 0.8)',
                animation: 'personality-spin 2s linear infinite'
              }}
            />
          )}

          {/* Hover glow effect */}
          {isHovered && (
            <div 
              className="character-glow"
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, ${roles[roleKey].color}40, transparent, ${roles[roleKey].color}40)`,
                animation: 'glow-rotate 3s linear infinite',
                zIndex: -1
              }}
            />
          )}
        </div>

        {/* Enhanced sparkles for selection feedback */}
        {showSparkles && (
          <div className="sparkles-container">
            <div className="sparkle sparkle-1" style={{ fontSize: '18px' }}>✨</div>
            <div className="sparkle sparkle-2" style={{ fontSize: '16px' }}>⭐</div>
            <div className="sparkle sparkle-3" style={{ fontSize: '14px' }}>💫</div>
            <div className="sparkle sparkle-4" style={{ fontSize: '12px' }}>✨</div>
            <div className="sparkle sparkle-5" style={{ fontSize: '16px' }}>⚡</div>
          </div>
        )}

        {/* Personality indicator dots */}
        {(isAnimated || isHovered) && (
          <div className="personality-dots">
            <div className="dot dot-1" style={{ backgroundColor: roles[roleKey].color }} />
            <div className="dot dot-2" style={{ backgroundColor: roles[roleKey].color }} />
            <div className="dot dot-3" style={{ backgroundColor: roles[roleKey].color }} />
          </div>
        )}
      </div>
    );
  };

  // Calculate results
  const calculateResults = () => {
    const scores = { RE: 0, CM: 0, Design: 0, UX: 0, Test: 0 };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) return;

      if (question.type === 'single') {
        const option = question.options[answer];
        if (option && option.points) {
          Object.entries(option.points).forEach(([role, points]) => {
            scores[role] += points * question.weight;
          });
        }
      } else if (question.type === 'multiple' && Array.isArray(answer)) {
        answer.forEach(optionIndex => {
          const option = question.options[optionIndex];
          if (option && option.points) {
            Object.entries(option.points).forEach(([role, points]) => {
              scores[role] += points * question.weight;
            });
          }
        });
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const normalizedScores = {};
    Object.entries(scores).forEach(([role, score]) => {
      normalizedScores[role] = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    });

    const sortedRoles = Object.entries(normalizedScores)
      .filter(([, score]) => score >= 20)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const recommendations = sortedRoles.map(([role, score], index) => ({
      rank: index + 1,
      role: role,
      score: score,
      roleInfo: roles[role],
      explanation: generateExplanation(role)
    }));

    return { recommendations, rawScores: scores, normalizedScores };
  };

  const generateExplanation = (role) => {
    const explanations = {
      RE: "Your responses show strong alignment with requirements engineering. You enjoy documentation, clear communication, and helping others understand project needs.",
      CM: "You demonstrate excellent organizational skills and attention to structure. Your preference for managing tools and maintaining order makes you ideal for configuration management.",
      Design: "Your strategic thinking and system planning abilities shine through. You excel at seeing the big picture and designing how components work together.",
      UX: "Your creative vision and user-focused mindset are perfect for UX design. You have a natural talent for making interfaces intuitive and visually appealing.",
      Test: "Your detail-oriented nature and quality-focused approach make you an excellent tester. You have a knack for finding issues others might miss."
    };
    return explanations[role] || "Based on your responses, this role aligns well with your skills and interests.";
  };

  // Get personality-based messages for speech bubbles
  const getPersonalityMessage = (roleKey) => {
    const messages = {
      RE: "Perfect analysis! 📋✨",
      CM: "Great organization! 🗂️⚡",
      Design: "Brilliant logic! 🧠💫",
      UX: "Creative genius! 🎨🌟",
      Test: "Sharp detective! 🔍💎"
    };
    return messages[roleKey] || "Great choice! 🎉";
  };

  const handleAnswer = (answer, option) => {
    const question = questions[currentQuestion];
    
    if (question.type === 'single') {
      setShowWarning(false);
      setIsAnimating(true);
      setAnswers({ ...answers, [question.id]: answer });
      setSelectedOption(option.roleKey);
      
      setTimeout(() => {
        setSelectedOption(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          submitAnswers();
        }
        setIsAnimating(false);
      }, 1500);
    }
  };

  const handleMultipleAnswer = (optionIndex, option) => {
    const question = questions[currentQuestion];
    const currentAnswers = answers[question.id] || [];
    
    if (currentAnswers.includes(optionIndex)) {
      setAnswers({
        ...answers,
        [question.id]: currentAnswers.filter(i => i !== optionIndex)
      });
    } else {
      setAnswers({
        ...answers,
        [question.id]: [...currentAnswers, optionIndex]
      });
      setSelectedOption(option.roleKey);
      setTimeout(() => setSelectedOption(null), 1000);
    }
    setShowWarning(false);
  };

  const nextQuestion = () => {
    const question = questions[currentQuestion];
    
    if (question.type === 'single' && answers[question.id] === undefined) {
      setShowWarning(true);
      return;
    }
    
    if (question.type === 'multiple' && (!answers[question.id] || answers[question.id].length === 0)) {
      setShowWarning(true);
      return;
    }
    
    setShowWarning(false);
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        submitAnswers();
      }
      setIsAnimating(false);
    }, 300);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setShowWarning(false);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const submitAnswers = () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setCurrentPage('results');
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setShowWarning(false);
    setStudentInfo({ firstName: '', lastName: '', buId: '', email: '' });
    setStudentInfoErrors({});
    setCurrentPage('studentInfo');
  };

  const exportToCSV = () => {
    if (!results) return;
    let csv = "Name,BU Email,BU ID,Role 1,Role 2,Role 3\n";
    csv += `"${studentInfo.firstName} ${studentInfo.lastName}","${studentInfo.email}","${studentInfo.buId}",${results.recommendations.map(rec => `"${rec.roleInfo.name}"`).join(',')}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rolematch-results-${studentInfo.buId}.csv`;
    a.click();
  };

  const exportToPDF = () => {
    if (!results) return;
    
    // Create a clean, printable version of the results
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>RoleMatch Results - ${studentInfo.firstName} ${studentInfo.lastName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
              line-height: 1.6;
              color: #1a1c1e;
              background: #ffffff;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 3px solid #006495;
            }
            
            .header h1 {
              font-size: 32px;
              font-weight: 700;
              color: #006495;
              margin-bottom: 10px;
            }
            
            .student-info {
              font-size: 16px;
              color: #43474e;
              margin-bottom: 10px;
            }
            
            .generated-date {
              font-size: 14px;
              color: #73777f;
              font-style: italic;
            }
            
            .results-section {
              margin-top: 30px;
            }
            
            .results-title {
              font-size: 24px;
              font-weight: 700;
              color: #1a1c1e;
              margin-bottom: 20px;
            }
            
            .role-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 20px;
              margin-bottom: 16px;
              border-radius: 12px;
              border: 2px solid #dfe2eb;
              background: #fdfcff;
            }
            
            .role-item.rank-1 {
              border-color: #006495;
              background: #c9e6ff;
            }
            
            .role-item.rank-2 {
              border-color: #525f6e;
              background: #d5e3f5;
            }
            
            .role-item.rank-3 {
              border-color: #6a5778;
              background: #f2daff;
            }
            
            .role-info h3 {
              font-size: 20px;
              font-weight: 700;
              color: #1a1c1e;
              margin-bottom: 4px;
            }
            
            .role-info .match-score {
              font-size: 16px;
              font-weight: 600;
              color: #006495;
            }
            
            .role-info .description {
              font-size: 14px;
              color: #43474e;
              margin-top: 8px;
            }
            
            .rank-badge {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: #006495;
              color: white;
              font-size: 24px;
              font-weight: 700;
            }
            
            .rank-1 .rank-badge {
              background: #006495;
            }
            
            .rank-2 .rank-badge {
              background: #525f6e;
            }
            
            .rank-3 .rank-badge {
              background: #6a5778;
            }
            
            .skills-section {
              margin-top: 12px;
            }
            
            .skills-title {
              font-size: 14px;
              font-weight: 600;
              color: #43474e;
              margin-bottom: 8px;
            }
            
            .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 6px;
            }
            
            .skill-tag {
              padding: 4px 12px;
              background: #dfe2eb;
              color: #43474e;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
            }
            
            .footer {
              margin-top: 40px;
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #dfe2eb;
              color: #73777f;
              font-size: 14px;
            }
            
            @media print {
              body {
                padding: 20px;
              }
              
              .header {
                margin-bottom: 30px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RoleMatch Assessment Results</h1>
            <div class="student-info">
              <strong>${studentInfo.firstName} ${studentInfo.lastName}</strong>
            </div>
            <div class="student-info">
              BU ID: ${studentInfo.buId} • Email: ${studentInfo.email}
            </div>
            <div class="generated-date">
              Generated on ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          <div class="results-section">
            <h2 class="results-title">Recommended Roles</h2>
            ${results.recommendations.map(rec => `
              <div class="role-item rank-${rec.rank}">
                <div class="role-info">
                  <h3>${rec.roleInfo.name}</h3>
                  <div class="match-score">${rec.score}% Match</div>
                  <div class="description">${rec.explanation}</div>
                  <div class="skills-section">
                    <div class="skills-title">Key Skills:</div>
                    <div class="skills-list">
                      ${rec.roleInfo.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                  </div>
                </div>
                <div class="rank-badge">${rec.rank}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="footer">
            <p>RoleMatch - Intelligent Team Role Assessment</p>
            <p>CS673 Software Engineering • Boston University</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };
  };

  const shareResults = async () => {
    if (!results) return;
    
    const text = `My RoleMatch Results:\n\n${results.recommendations.map(rec => 
      `${rec.rank}. ${rec.roleInfo.name} (${rec.score}% match)`
    ).join('\n')}\n\nDiscover your perfect team role at RoleMatch!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'RoleMatch Results', text: text });
        setShareNotification('Results shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(text);
        }
      }
    } else {
      copyToClipboard(text);
    }
    
    setTimeout(() => setShareNotification(''), 3000);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareNotification('Results copied to clipboard!');
    }).catch(() => {
      setShareNotification('Unable to share results');
    });
  };

  // Landing Page Component
  const LandingPage = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.background }}>
      <div style={{ position: 'relative' }}>
        {/* Animated background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{ 
            position: 'absolute', width: '400px', height: '400px', 
            top: '-200px', right: '-200px', borderRadius: '50%', 
            backgroundColor: theme.primary, opacity: 0.1, filter: 'blur(80px)',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
          <div style={{ 
            position: 'absolute', width: '350px', height: '350px', 
            bottom: '-175px', left: '-175px', borderRadius: '50%', 
            backgroundColor: theme.secondary, opacity: 0.1, filter: 'blur(80px)',
            animation: 'float 25s ease-in-out infinite reverse'
          }}></div>
        </div>

        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Navigation */}
          <nav style={{ padding: '24px' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: theme.primary }}>RoleMatch</h1>
              <button
                onClick={() => setCurrentPage('about')}
                style={{ 
                  color: theme.onSurface, backgroundColor: 'transparent',
                  border: `1px solid ${theme.outline}`, fontSize: '16px', fontWeight: '500',
                  padding: '8px 16px', borderRadius: '9999px', cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.surfaceVariant;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                About
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '3.75rem', fontWeight: '700', marginBottom: '24px', color: theme.onBackground }}>
                Find Your Perfect<br />
                <span style={{ 
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.tertiary} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', display: 'inline-block'
                }}>Team Role</span>
              </h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '32px', color: theme.onSurfaceVariant }}>
                Discover where you'll thrive in your next software engineering project with our intelligent role matching system
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('studentInfo')}
              style={{ 
                backgroundColor: theme.primary, color: theme.onPrimary,
                boxShadow: '0 8px 32px rgba(0, 100, 149, 0.3)',
                padding: '16px 32px', borderRadius: '9999px', fontSize: '18px', fontWeight: '600',
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                transition: 'all 0.3s ease', border: 'none', cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 100, 149, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 100, 149, 0.3)';
              }}
            >
              Start Assessment
              <ArrowRight size={20} />
            </button>

            {/* Role Preview Section - FIXED: Better alignment and spacing */}
            <div style={{ marginTop: '80px', marginBottom: '64px' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '48px', color: theme.onSurface, textAlign: 'center' }}>
                Discover Your Role Among
              </h3>
              <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                {/* Top row - 3 roles - FIXED: Perfect centering */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'flex-start',
                  gap: '40px', 
                  marginBottom: '60px',
                  flexWrap: 'wrap'
                }}>
                  {Object.entries(roles).slice(0, 3).map(([key, role]) => (
                    <div 
                      key={key} 
                      style={{ 
                        backgroundColor: theme.elevation1,
                        border: hoveredRole === key ? `3px solid ${role.color}` : '3px solid transparent',
                        transform: hoveredRole === key ? 'scale(1.02) translateY(-5px)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        padding: '36px', 
                        borderRadius: '32px', 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        width: '240px',
                        height: '220px',
                        boxShadow: hoveredRole === key 
                          ? `0 25px 70px ${role.color}40, 0 10px 35px rgba(0, 0, 0, 0.15)` 
                          : '0 8px 30px rgba(0, 0, 0, 0.08)',
                        position: 'relative',
                        overflow: 'visible'
                      }}
                      onMouseEnter={() => setHoveredRole(key)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <RoleCharacter 
                        roleKey={key} 
                        isAnimated={hoveredRole === key} 
                        isHovered={hoveredRole === key}
                        size="medium" 
                      />
                      <h4 style={{ 
                        color: theme.onSurface, 
                        marginTop: '28px', 
                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '1.3',
                        transition: 'all 0.3s ease',
                        transform: hoveredRole === key ? 'translateY(-3px)' : 'translateY(0)'
                      }}>
                        {role.name}
                      </h4>
                      
                      {/* Hover tooltip - FIXED: Better positioning */}
                      {hoveredRole === key && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%) translateY(15px)',
                          backgroundColor: theme.surface,
                          padding: '16px 20px',
                          borderRadius: '16px',
                          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25)',
                          width: '300px',
                          zIndex: 1000,
                          border: `2px solid ${role.color}`,
                          animation: 'tooltip-appear 0.3s ease-out'
                        }}>
                          <p style={{ 
                            color: theme.onSurface, 
                            fontSize: '14px', 
                            lineHeight: '1.5',
                            margin: 0,
                            textAlign: 'center',
                            fontWeight: '500'
                          }}>
                            {role.description}
                          </p>
                          
                          {/* Tooltip arrow */}
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderBottom: `8px solid ${role.color}`
                          }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Bottom row - 2 roles centered - FIXED: Perfect spacing */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'flex-start',
                  gap: '80px',
                  flexWrap: 'wrap'
                }}>
                  {Object.entries(roles).slice(3, 5).map(([key, role]) => (
                    <div 
                      key={key} 
                      style={{ 
                        backgroundColor: theme.elevation1,
                        border: hoveredRole === key ? `3px solid ${role.color}` : '3px solid transparent',
                        transform: hoveredRole === key ? 'scale(1.02) translateY(-5px)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        padding: '36px', 
                        borderRadius: '32px', 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        width: '240px',
                        height: '220px',
                        boxShadow: hoveredRole === key 
                          ? `0 25px 70px ${role.color}40, 0 10px 35px rgba(0, 0, 0, 0.15)` 
                          : '0 8px 30px rgba(0, 0, 0, 0.08)',
                        position: 'relative',
                        overflow: 'visible'
                      }}
                      onMouseEnter={() => setHoveredRole(key)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <RoleCharacter 
                        roleKey={key} 
                        isAnimated={hoveredRole === key} 
                        isHovered={hoveredRole === key}
                        size="medium" 
                      />
                      <h4 style={{ 
                        color: theme.onSurface, 
                        marginTop: '28px', 
                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '1.3',
                        transition: 'all 0.3s ease',
                        transform: hoveredRole === key ? 'translateY(-3px)' : 'translateY(0)'
                      }}>
                        {role.name}
                      </h4>
                      
                      {/* Hover tooltip - FIXED: Position above for bottom row */}
                      {hoveredRole === key && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%) translateY(-15px)',
                          backgroundColor: theme.surface,
                          padding: '16px 20px',
                          borderRadius: '16px',
                          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25)',
                          width: '300px',
                          zIndex: 1000,
                          border: `2px solid ${role.color}`,
                          animation: 'tooltip-appear 0.3s ease-out'
                        }}>
                          <p style={{ 
                            color: theme.onSurface, 
                            fontSize: '14px', 
                            lineHeight: '1.5',
                            margin: 0,
                            textAlign: 'center',
                            fontWeight: '500'
                          }}>
                            {role.description}
                          </p>
                          
                          {/* Tooltip arrow pointing down */}
                          <div style={{
                            position: 'absolute',
                            bottom: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderTop: `8px solid ${role.color}`
                          }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ 
              maxWidth: '900px', 
              margin: '80px auto 40px auto', 
              padding: '0 20px'
            }}>
              {/* First row - 2 cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '32px', 
                marginBottom: '32px',
                maxWidth: '600px',
                margin: '0 auto 32px auto'
              }}>
                <div style={{ 
                  backgroundColor: theme.elevation1, 
                  padding: '32px', 
                  borderRadius: '24px', 
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 20px', 
                    backgroundColor: theme.primaryContainer 
                  }}>
                    <Zap size={28} style={{ color: theme.onPrimaryContainer }} />
                  </div>
                  <h3 style={{ 
                    color: theme.onSurface, 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    marginBottom: '12px' 
                  }}>
                    Quick & Easy
                  </h3>
                  <p style={{ 
                    color: theme.onSurfaceVariant, 
                    fontSize: '16px', 
                    lineHeight: '1.5' 
                  }}>
                    Complete the assessment in under 5 minutes
                  </p>
                </div>

                <div style={{ 
                  backgroundColor: theme.elevation1, 
                  padding: '32px', 
                  borderRadius: '24px', 
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 20px', 
                    backgroundColor: theme.secondaryContainer 
                  }}>
                    <Target size={28} style={{ color: theme.onSecondaryContainer }} />
                  </div>
                  <h3 style={{ 
                    color: theme.onSurface, 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    marginBottom: '12px' 
                  }}>
                    Accurate Matching
                  </h3>
                  <p style={{ 
                    color: theme.onSurfaceVariant, 
                    fontSize: '16px', 
                    lineHeight: '1.5' 
                  }}>
                    Smart algorithm analyzes your skills and preferences
                  </p>
                </div>
              </div>

              {/* Second row - 1 centered card */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '40px'
              }}>
                <div style={{ 
                  backgroundColor: theme.elevation1, 
                  padding: '32px', 
                  borderRadius: '24px', 
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  maxWidth: '320px',
                  width: '100%'
                }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 20px', 
                    backgroundColor: theme.tertiaryContainer 
                  }}>
                    <Users size={28} style={{ color: theme.onTertiaryContainer }} />
                  </div>
                  <h3 style={{ 
                    color: theme.onSurface, 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    marginBottom: '12px' 
                  }}>
                    Better Teams
                  </h3>
                  <p style={{ 
                    color: theme.onSurfaceVariant, 
                    fontSize: '16px', 
                    lineHeight: '1.5' 
                  }}>
                    Build stronger, more effective project teams
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
        
        /* Enhanced background animations */
        @keyframes float {
          0%, 100% { 
            transform: translate(0px, 0px) rotate(0deg); 
          }
          33% { 
            transform: translate(40px, -40px) rotate(120deg); 
          }
          66% { 
            transform: translate(-30px, 30px) rotate(240deg); 
          }
        }
        
        /* Enhanced character entrance animation */
        @keyframes character-entrance {
          0% {
            opacity: 0;
            transform: translateY(-50%) scale(0.3) rotate(-20deg);
          }
          30% {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.4) rotate(15deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-50%) scale(0.8) rotate(-8deg);
          }
          80% {
            opacity: 1;
            transform: translateY(-50%) scale(1.2) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) scale(1) rotate(0deg);
          }
        }
        
        /* Enhanced speech bubble animation */
        @keyframes speech-bubble {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.4) translateY(30px) rotate(-10deg);
          }
          40% {
            opacity: 0.9;
            transform: translateX(-50%) scale(1.3) translateY(-10px) rotate(5deg);
          }
          70% {
            opacity: 1;
            transform: translateX(-50%) scale(0.9) translateY(5px) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1) translateY(0) rotate(0deg);
          }
        }
        
        /* Enhanced warning shake */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) rotate(-1deg); }
          20%, 40%, 60%, 80% { transform: translateX(5px) rotate(1deg); }
        }
        
        /* Personality-based character animations */
        @keyframes character-think {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-12px) rotate(-4deg) scale(1.03); 
          }
          50% { 
            transform: translateY(-18px) rotate(0deg) scale(1.08); 
          }
          75% { 
            transform: translateY(-8px) rotate(4deg) scale(1.03); 
          }
        }
        
        @keyframes character-organize {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(0deg); 
          }
          20% { 
            transform: translateY(-6px) scale(1.04) rotate(-2deg); 
          }
          40% { 
            transform: translateY(-12px) scale(1.08) rotate(2deg); 
          }
          60% { 
            transform: translateY(-15px) scale(1.12) rotate(-1deg); 
          }
          80% { 
            transform: translateY(-8px) scale(1.05) rotate(1deg); 
          }
        }
        
        @keyframes character-create-logic {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
          }
          16% { 
            transform: translateY(-15px) rotate(-8deg) scale(1.06); 
          }
          33% { 
            transform: translateY(-22px) rotate(12deg) scale(1.12); 
          }
          50% { 
            transform: translateY(-25px) rotate(-10deg) scale(1.15); 
          }
          66% { 
            transform: translateY(-18px) rotate(6deg) scale(1.1); 
          }
          83% { 
            transform: translateY(-10px) rotate(-3deg) scale(1.05); 
          }
        }
        
        @keyframes character-create {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
          }
          12% { 
            transform: translateY(-18px) rotate(-12deg) scale(1.1); 
          }
          25% { 
            transform: translateY(-28px) rotate(15deg) scale(1.18); 
          }
          37% { 
            transform: translateY(-35px) rotate(-18deg) scale(1.22); 
          }
          50% { 
            transform: translateY(-32px) rotate(10deg) scale(1.25); 
          }
          62% { 
            transform: translateY(-25px) rotate(-8deg) scale(1.15); 
          }
          75% { 
            transform: translateY(-15px) rotate(5deg) scale(1.08); 
          }
          87% { 
            transform: translateY(-8px) rotate(-2deg) scale(1.03); 
          }
        }
        
        @keyframes character-investigate {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(0deg); 
          }
          20% { 
            transform: translateY(-8px) scale(1.08) rotate(-3deg); 
          }
          40% { 
            transform: translateY(-16px) scale(1.15) rotate(3deg); 
          }
          60% { 
            transform: translateY(-20px) scale(1.18) rotate(-2deg); 
          }
          80% { 
            transform: translateY(-12px) scale(1.1) rotate(2deg); 
          }
        }
        
        /* Enhanced ring and glow animations */
        @keyframes personality-spin {
          0% { 
            transform: rotate(0deg); 
            opacity: 0.6; 
            filter: blur(0px);
          }
          50% { 
            opacity: 1; 
            filter: blur(1px);
          }
          100% { 
            transform: rotate(360deg); 
            opacity: 0.6;
            filter: blur(0px);
          }
        }
        
        @keyframes glow-rotate {
          0% { 
            transform: rotate(0deg) scale(1); 
            opacity: 0.7;
          }
          25% { 
            transform: rotate(90deg) scale(1.1); 
            opacity: 1;
          }
          50% { 
            transform: rotate(180deg) scale(1.05); 
            opacity: 0.8;
          }
          75% { 
            transform: rotate(270deg) scale(1.15); 
            opacity: 1;
          }
          100% { 
            transform: rotate(360deg) scale(1); 
            opacity: 0.7;
          }
        }
        
        /* Enhanced tooltip animation */
        @keyframes tooltip-appear {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.7) translateY(20px) rotate(-5deg);
          }
          60% {
            opacity: 0.9;
            transform: translateX(-50%) scale(1.1) translateY(-5px) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1) translateY(0) rotate(0deg);
          }
        }
        
        /* Enhanced sparkle animations */
        @keyframes sparkle-float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) rotate(0deg) scale(0.3);
          }
          20% {
            opacity: 0.7;
            transform: translateY(-12px) rotate(72deg) scale(0.8);
          }
          40% {
            opacity: 1;
            transform: translateY(-25px) rotate(144deg) scale(1.4);
          }
          60% {
            opacity: 0.9;
            transform: translateY(-30px) rotate(216deg) scale(1.6);
          }
          80% {
            opacity: 0.6;
            transform: translateY(-20px) rotate(288deg) scale(1.2);
          }
        }
        
        /* Character sparkle class */
        .character-sparkle {
          animation: character-bounce 1.5s ease-in-out infinite;
        }
        
        .sparkles-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .sparkle {
          position: absolute;
          animation: sparkle-float 3s ease-in-out infinite;
          font-weight: bold;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }
        
        .sparkle-1 {
          top: -25px;
          right: -25px;
          animation-delay: 0s;
        }
        
        .sparkle-2 {
          bottom: -25px;
          left: -25px;
          animation-delay: 0.5s;
        }
        
        .sparkle-3 {
          top: 50%;
          left: -30px;
          animation-delay: 1s;
        }
        
        .sparkle-4 {
          top: -20px;
          left: 50%;
          animation-delay: 1.5s;
        }
        
        .sparkle-5 {
          bottom: -20px;
          right: 50%;
          animation-delay: 2s;
        }
        
        .sparkle-6 {
          top: 20%;
          right: -25px;
          animation-delay: 2.5s;
        }
        
        /* Personality indicator dots */
        .personality-dots {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }
        
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: dot-pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
        }
        
        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.4s; }
        .dot-3 { animation-delay: 0.8s; }
        
        @keyframes dot-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.8);
          }
        }
        
        /* Floating personality particles */
        .personality-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: particle-float 4s ease-in-out infinite;
        }
        
        .particle-1 {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          top: 60%;
          right: 25%;
          animation-delay: 1.3s;
        }
        
        .particle-3 {
          bottom: 30%;
          left: 70%;
          animation-delay: 2.6s;
        }
        
        @keyframes particle-float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          25% {
            opacity: 0.6;
            transform: translateY(-15px) scale(1.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-25px) scale(2);
          }
          75% {
            opacity: 0.4;
            transform: translateY(-35px) scale(1.2);
          }
        }
        
        /* Character-specific animation classes */
        .character-think {
          animation: character-think 3s ease-in-out infinite;
        }
        
        .character-organize {
          animation: character-organize 2.5s ease-in-out infinite;
        }
        
        .character-create-logic {
          animation: character-create-logic 4s ease-in-out infinite;
        }
        
        .character-create {
          animation: character-create 4.5s ease-in-out infinite;
        }
        
        .character-investigate {
          animation: character-investigate 3.2s ease-in-out infinite;
        }
        
        /* Enhanced bounce animation */
        @keyframes character-bounce {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          50% { 
            transform: translateY(-20px) scale(1.05); 
          }
        }
        
        .character-bounce {
          animation: character-bounce 1.2s ease-in-out infinite;
        }
        
        /* Page transition animations */
        @keyframes slideInUp {
          from { 
            transform: translateY(40px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes slideUpIn {
          from { 
            transform: translateX(-50%) translateY(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateX(-50%) translateY(0); 
            opacity: 1; 
          }
        }
        
        /* Hover effects for cards */
        @keyframes card-glow {
          0%, 100% {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          }
          50% {
            box-shadow: 0 25px 70px rgba(var(--role-color), 0.4), 0 10px 35px rgba(0, 0, 0, 0.15);
          }
        }
      `}</style>
    </div>
  );

  // Student Info Page Component
  
  const StudentInfoPage = () => {
    const [localInfo, setLocalInfo] = useState(studentInfo);
    
    const handleLocalInputChange = (field) => (e) => {
      const { value } = e.target;
      setLocalInfo(prev => ({ ...prev, [field]: value }));
    };
    
    const handleLocalBuIdChange = (e) => {
      const value = e.target.value.toUpperCase();
      if (value === '' || /^U\d{0,8}$/.test(value)) {
        setLocalInfo(prev => ({ ...prev, buId: value }));
      }
    };
    
    const validateLocalInfo = () => {
      const errors = {};
      
      if (!localInfo.firstName.trim()) errors.firstName = 'First name is required';
      if (!localInfo.lastName.trim()) errors.lastName = 'Last name is required';
      
      const buIdRegex = /^U\d{8}$/;
      if (!localInfo.buId.trim()) {
        errors.buId = 'BU ID is required';
      } else if (!buIdRegex.test(localInfo.buId)) {
        errors.buId = 'BU ID must start with U followed by 8 digits (e.g., U41513646)';
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!localInfo.email.trim()) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(localInfo.email)) {
        errors.email = 'Please enter a valid email address';
      } else if (!localInfo.email.toLowerCase().includes('bu.edu')) {
        errors.email = 'Please use your BU email address';
      }
      
      setStudentInfoErrors(errors);
      return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = () => {
      if (validateLocalInfo()) {
        setStudentInfo(localInfo);
        setCurrentPage('quiz');
      }
    };
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.background }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3 }}>
            <div style={{ 
              position: 'absolute', width: '400px', height: '400px', 
              top: '10%', left: '-200px', borderRadius: '50%', 
              backgroundColor: theme.primary, filter: 'blur(80px)',
              animation: 'float 20s ease-in-out infinite'
            }}></div>
            <div style={{ 
              position: 'absolute', width: '400px', height: '400px', 
              bottom: '10%', right: '-200px', borderRadius: '50%', 
              backgroundColor: theme.secondary, filter: 'blur(80px)',
              animation: 'float 25s ease-in-out infinite reverse'
            }}></div>
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '42rem', margin: '0 auto', padding: '32px 16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '8px', color: theme.onBackground }}>
                Student Information
              </h1>
              <p style={{ fontSize: '1.125rem', color: theme.onSurfaceVariant }}>
                Please enter your details to begin the assessment
              </p>
            </div>

            <div style={{ 
              backgroundColor: theme.surface,
              boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.08)',
              borderRadius: '24px', padding: '40px'
            }}>
              {/* First Name */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: theme.onSurface }}>
                  <User size={20} />
                  First Name
                </label>
                <input
                  type="text"
                  value={localInfo.firstName}
                  onChange={handleLocalInputChange('firstName')}
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid',
                    fontSize: '16px', transition: 'all 0.3s ease', outline: 'none', boxSizing: 'border-box',
                    backgroundColor: theme.elevation1, color: theme.onSurface,
                    borderColor: studentInfoErrors.firstName ? theme.error : theme.outline
                  }}
                  placeholder="Enter your first name"
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = studentInfoErrors.firstName ? theme.error : theme.outline;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {studentInfoErrors.firstName && (
                  <p style={{ marginTop: '6px', fontSize: '14px', fontWeight: '500', color: theme.error }}>
                    {studentInfoErrors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: theme.onSurface }}>
                  <User size={20} />
                  Last Name
                </label>
                <input
                  type="text"
                  value={localInfo.lastName}
                  onChange={handleLocalInputChange('lastName')}
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid',
                    fontSize: '16px', transition: 'all 0.3s ease', outline: 'none', boxSizing: 'border-box',
                    backgroundColor: theme.elevation1, color: theme.onSurface,
                    borderColor: studentInfoErrors.lastName ? theme.error : theme.outline
                  }}
                  placeholder="Enter your last name"
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = studentInfoErrors.lastName ? theme.error : theme.outline;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {studentInfoErrors.lastName && (
                  <p style={{ marginTop: '6px', fontSize: '14px', fontWeight: '500', color: theme.error }}>
                    {studentInfoErrors.lastName}
                  </p>
                )}
              </div>

              {/* BU ID */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: theme.onSurface }}>
                  <CreditCard size={20} />
                  BU ID
                </label>
                <input
                  type="text"
                  value={localInfo.buId}
                  onChange={handleLocalBuIdChange}
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid',
                    fontSize: '16px', transition: 'all 0.3s ease', outline: 'none', boxSizing: 'border-box',
                    backgroundColor: theme.elevation1, color: theme.onSurface,
                    borderColor: studentInfoErrors.buId ? theme.error : theme.outline
                  }}
                  placeholder="U12345678"
                  maxLength={9}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = studentInfoErrors.buId ? theme.error : theme.outline;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {studentInfoErrors.buId && (
                  <p style={{ marginTop: '6px', fontSize: '14px', fontWeight: '500', color: theme.error }}>
                    {studentInfoErrors.buId}
                  </p>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: theme.onSurface }}>
                  <Mail size={20} />
                  BU Email
                </label>
                <input
                  type="email"
                  value={localInfo.email}
                  onChange={handleLocalInputChange('email')}
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid',
                    fontSize: '16px', transition: 'all 0.3s ease', outline: 'none', boxSizing: 'border-box',
                    backgroundColor: theme.elevation1, color: theme.onSurface,
                    borderColor: studentInfoErrors.email ? theme.error : theme.outline
                  }}
                  placeholder="yourname@bu.edu"
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = studentInfoErrors.email ? theme.error : theme.outline;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {studentInfoErrors.email && (
                  <p style={{ marginTop: '6px', fontSize: '14px', fontWeight: '500', color: theme.error }}>
                    {studentInfoErrors.email}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                style={{ 
                  width: '100%', padding: '16px 24px', borderRadius: '9999px', fontWeight: '600', fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '32px',
                  backgroundColor: theme.primary, color: theme.onPrimary,
                  boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 32px rgba(0, 100, 149, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 100, 149, 0.3)';
                }}
              >
                Start Assessment
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => setCurrentPage('landing')}
                style={{ 
                  width: '100%', padding: '16px 24px', borderRadius: '9999px', fontWeight: '600', fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '32px',
                  backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer,
                  boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 32px rgba(0, 100, 149, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 100, 149, 0.3)';
                }}
              >
                Return to RoleMatch Home Page
                <ArrowRight size={20} />
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  };

  // About Page Component
  const AboutPage = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.background }}>
      <div style={{ position: 'relative' }}>
        <nav style={{ padding: '24px' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage('landing')}
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '12px',
                backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer,
                fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease',
                border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Home size={20} />
              RoleMatch
            </button>
          </div>
        </nav>

        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '48px 24px' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '32px', color: theme.onBackground }}>About RoleMatch</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <section style={{ backgroundColor: theme.elevation1, padding: '24px', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: theme.primary }}>Our Mission</h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.625', color: theme.onSurfaceVariant }}>
                RoleMatch is a smart role recommendation system created for CS673 Software Engineering course. 
                It's designed to revolutionize team formation by matching individuals to their optimal project roles.
              </p>
            </section>

            <section style={{ backgroundColor: theme.elevation1, padding: '24px', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: theme.primary }}>Our Team</h2>
              <ul style={{ listStyle: 'none', padding: 0, color: theme.onSurfaceVariant }}>
                <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>• <strong>Gagan Veginati</strong> - System Designer</li>
                <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>• <strong>Swamy Tuttagunta</strong> - Configuration Manager</li>
                <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>• <strong>Yuqing Zheng</strong> - UX Designer</li>
                <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>• <strong>Brady Wu</strong> - QA Tester</li>
                <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>• <strong>Paul Mulroney</strong> - Requirements Engineer</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  // Quiz Page Component - COMPLETELY REWRITTEN TO FIX DUPLICATION
  const QuizPage = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentQ = questions[currentQuestion];

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.background }}>
        <div style={{ position: 'relative' }}>
          {/* Background */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3 }}>
            <div style={{ 
              position: 'absolute', width: '400px', height: '400px', 
              top: '25%', left: '-200px', borderRadius: '50%', 
              backgroundColor: theme.primary, filter: 'blur(80px)',
              animation: 'float 20s ease-in-out infinite'
            }}></div>
            <div style={{ 
              position: 'absolute', width: '400px', height: '400px', 
              bottom: '25%', right: '-200px', borderRadius: '50%', 
              backgroundColor: theme.secondary, filter: 'blur(80px)',
              animation: 'float 25s ease-in-out infinite reverse'
            }}></div>
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '56rem', margin: '0 auto', padding: '32px 16px' }}>
            {/* Header with Home Button */}
            <nav style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentPage('landing')}
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px', borderRadius: '12px',
                    backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer,
                    fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease',
                    border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <Home size={20} />
                  RoleMatch
                </button>
                <div style={{ fontSize: '14px', fontWeight: '500', color: theme.onSurfaceVariant }}>
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </nav>
            
            {/* Student Info Display */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '8px', color: theme.onBackground }}>
                RoleMatch Assessment
              </h1>
              <p style={{ fontSize: '1.125rem', color: theme.onSurfaceVariant }}>
                {studentInfo.firstName} {studentInfo.lastName} ({studentInfo.buId})
              </p>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ 
                height: '8px', borderRadius: '9999px', overflow: 'hidden',
                backgroundColor: theme.surfaceVariant
              }}>
                <div style={{ 
                  height: '100%', width: `${progress}%`,
                  background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.tertiary} 100%)`,
                  transition: 'width 0.5s ease-out'
                }} />
              </div>
            </div>

            {/* Question Card */}
            <div style={{
              backgroundColor: theme.surface,
              boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.08)',
              borderRadius: '24px',
              padding: '40px',
              marginBottom: '24px',
              transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
              opacity: isAnimating ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}>
              {/* Question Text */}
              <h2 style={{ 
                fontSize: '1.75rem', fontWeight: '700', marginBottom: '32px', 
                textAlign: 'center', color: theme.onSurface, lineHeight: '1.4'
              }}>
                {currentQ.text}
              </h2>

              {/* Warning Message */}
              {showWarning && (
                <div style={{ 
                  backgroundColor: theme.error + '20',
                  marginBottom: '24px', padding: '16px', borderRadius: '16px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  animation: 'shake 0.5s ease-in-out'
                }}>
                  <Info size={20} style={{ color: theme.error }} />
                  <span style={{ color: theme.error, fontWeight: '500' }}>
                    {currentQ.type === 'multiple' 
                      ? 'Please select at least one option' 
                      : 'Please select an option'}
                  </span>
                </div>
              )}

              {/* Options Container */}
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px'
              }}>
                {currentQ.options.map((option, index) => {
                  const isSelected = currentQ.type === 'single' 
                    ? answers[currentQ.id] === index
                    : (answers[currentQ.id] || []).includes(index);

                  return (
                    <div key={index} style={{ position: 'relative' }}>
                      <button
                        onClick={() => {
                          if (currentQ.type === 'single') {
                            handleAnswer(index, option);
                          } else {
                            handleMultipleAnswer(index, option);
                          }
                        }}
                        style={{ 
                          backgroundColor: isSelected ? theme.primaryContainer : theme.elevation1,
                          color: isSelected ? theme.onPrimaryContainer : theme.onSurfaceVariant,
                          borderColor: isSelected ? theme.primary : 'transparent',
                          boxShadow: isSelected ? '0 8px 32px rgba(0, 100, 149, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                          width: '100%', textAlign: 'left', padding: '20px 24px',
                          borderRadius: '16px', transition: 'all 0.3s ease',
                          border: '2px solid', cursor: 'pointer',
                          fontSize: '16px', fontWeight: '500',
                          transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.target.style.transform = 'scale(1.01)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = isSelected ? 'scale(1.02)' : 'scale(1)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          {currentQ.type === 'multiple' && (
                            <div style={{ 
                              width: '24px', height: '24px', borderRadius: '8px',
                              border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: isSelected ? theme.primary : 'transparent',
                              borderColor: isSelected ? theme.primary : theme.outline,
                              flexShrink: 0
                            }}>
                              {isSelected && <CheckCircle2 size={16} style={{ color: theme.onPrimary }} />}
                            </div>
                          )}
                          <span style={{ flex: 1, lineHeight: '1.5' }}>
                            {option.text}
                          </span>
                        </div>
                      </button>
                      
                      {/* Enhanced Character Animation with Speech Bubble */}
                      {selectedOption === option.roleKey && (
                        <div style={{
                          position: 'absolute', 
                          right: '-160px', 
                          top: '50%',
                          transform: 'translateY(-50%)', 
                          zIndex: 1000,
                          animation: 'character-entrance 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                          <RoleCharacter 
                            roleKey={option.roleKey} 
                            isAnimated={true} 
                            isHovered={true}
                            size="large" 
                            showSparkles={true}
                          />
                          
                          {/* Enhanced speech bubble with personality-based messages */}
                          <div style={{
                            position: 'absolute',
                            top: '-80px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: theme.surface,
                            padding: '16px 20px',
                            borderRadius: '20px',
                            boxShadow: `0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${roles[option.roleKey].color}40`,
                            border: `3px solid ${roles[option.roleKey].color}`,
                            animation: 'speech-bubble 0.8s ease-out 0.5s both',
                            whiteSpace: 'nowrap',
                            zIndex: 1001
                          }}>
                            <p style={{ 
                              color: theme.onSurface, 
                              fontSize: '16px', 
                              fontWeight: '700',
                              margin: 0,
                              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}>
                              {getPersonalityMessage(option.roleKey)}
                            </p>
                            {/* Enhanced speech bubble arrow */}
                            <div style={{
                              position: 'absolute',
                              bottom: '-12px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 0,
                              height: 0,
                              borderLeft: '12px solid transparent',
                              borderRight: '12px solid transparent',
                              borderTop: `12px solid ${roles[option.roleKey].color}`,
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                            }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  style={{ 
                    backgroundColor: currentQuestion === 0 ? theme.surfaceVariant : theme.elevation2,
                    color: currentQuestion === 0 ? theme.onSurfaceVariant : theme.onSurface,
                    padding: '16px 24px', borderRadius: '9999px', fontWeight: '600',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    border: 'none', cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentQuestion === 0 ? 0.5 : 1,
                    transition: 'all 0.3s ease', fontSize: '16px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentQuestion > 0) e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {currentQ.type === 'multiple' && (
                  <span style={{ 
                    color: theme.onSurfaceVariant, fontSize: '14px', 
                    fontWeight: '500', fontStyle: 'italic'
                  }}>
                    Select all that apply
                  </span>
                )}

                <button
                  onClick={nextQuestion}
                  style={{ 
                    backgroundColor: theme.primary, color: theme.onPrimary,
                    boxShadow: '0 8px 32px rgba(0, 100, 149, 0.3)',
                    padding: '16px 24px', borderRadius: '9999px', fontWeight: '600',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                    fontSize: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 12px 40px rgba(0, 100, 149, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0, 100, 149, 0.3)';
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Enhanced quiz page animations */
          @keyframes character-entrance {
            0% {
              opacity: 0;
              transform: translateY(-50%) scale(0.3) rotate(-20deg);
            }
            30% {
              opacity: 0.8;
              transform: translateY(-50%) scale(1.4) rotate(15deg);
            }
            60% {
              opacity: 1;
              transform: translateY(-50%) scale(0.8) rotate(-8deg);
            }
            80% {
              opacity: 1;
              transform: translateY(-50%) scale(1.2) rotate(5deg);
            }
            100% {
              opacity: 1;
              transform: translateY(-50%) scale(1) rotate(0deg);
            }
          }
          
          @keyframes speech-bubble {
            0% {
              opacity: 0;
              transform: translateX(-50%) scale(0.4) translateY(30px) rotate(-10deg);
            }
            40% {
              opacity: 0.9;
              transform: translateX(-50%) scale(1.3) translateY(-10px) rotate(5deg);
            }
            70% {
              opacity: 1;
              transform: translateX(-50%) scale(0.9) translateY(5px) rotate(-2deg);
            }
            100% {
              opacity: 1;
              transform: translateX(-50%) scale(1) translateY(0) rotate(0deg);
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translateX(5px) rotate(1deg); }
          }
          
          /* Personality-based character animations */
          @keyframes character-think {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1); 
            }
            25% { 
              transform: translateY(-12px) rotate(-4deg) scale(1.03); 
            }
            50% { 
              transform: translateY(-18px) rotate(0deg) scale(1.08); 
            }
            75% { 
              transform: translateY(-8px) rotate(4deg) scale(1.03); 
            }
          }
          
          @keyframes character-organize {
            0%, 100% { 
              transform: translateY(0) scale(1) rotate(0deg); 
            }
            20% { 
              transform: translateY(-6px) scale(1.04) rotate(-2deg); 
            }
            40% { 
              transform: translateY(-12px) scale(1.08) rotate(2deg); 
            }
            60% { 
              transform: translateY(-15px) scale(1.12) rotate(-1deg); 
            }
            80% { 
              transform: translateY(-8px) scale(1.05) rotate(1deg); 
            }
          }
          
          @keyframes character-create-logic {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1); 
            }
            16% { 
              transform: translateY(-15px) rotate(-8deg) scale(1.06); 
            }
            33% { 
              transform: translateY(-22px) rotate(12deg) scale(1.12); 
            }
            50% { 
              transform: translateY(-25px) rotate(-10deg) scale(1.15); 
            }
            66% { 
              transform: translateY(-18px) rotate(6deg) scale(1.1); 
            }
            83% { 
              transform: translateY(-10px) rotate(-3deg) scale(1.05); 
            }
          }
          
          @keyframes character-create {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1); 
            }
            12% { 
              transform: translateY(-18px) rotate(-12deg) scale(1.1); 
            }
            25% { 
              transform: translateY(-28px) rotate(15deg) scale(1.18); 
            }
            37% { 
              transform: translateY(-35px) rotate(-18deg) scale(1.22); 
            }
            50% { 
              transform: translateY(-32px) rotate(10deg) scale(1.25); 
            }
            62% { 
              transform: translateY(-25px) rotate(-8deg) scale(1.15); 
            }
            75% { 
              transform: translateY(-15px) rotate(5deg) scale(1.08); 
            }
            87% { 
              transform: translateY(-8px) rotate(-2deg) scale(1.03); 
            }
          }
          
          @keyframes character-investigate {
            0%, 100% { 
              transform: translateY(0) scale(1) rotate(0deg); 
            }
            20% { 
              transform: translateY(-8px) scale(1.08) rotate(-3deg); 
            }
            40% { 
              transform: translateY(-16px) scale(1.15) rotate(3deg); 
            }
            60% { 
              transform: translateY(-20px) scale(1.18) rotate(-2deg); 
            }
            80% { 
              transform: translateY(-12px) scale(1.1) rotate(2deg); 
            }
          }
          
          @keyframes personality-spin {
            0% { 
              transform: rotate(0deg); 
              opacity: 0.6; 
            }
            50% { 
              opacity: 1; 
            }
            100% { 
              transform: rotate(360deg); 
              opacity: 0.6;
            }
          }
          
          @keyframes glow-rotate {
            0% { 
              transform: rotate(0deg) scale(1); 
              opacity: 0.7;
            }
            25% { 
              transform: rotate(90deg) scale(1.1); 
              opacity: 1;
            }
            50% { 
              transform: rotate(180deg) scale(1.05); 
              opacity: 0.8;
            }
            75% { 
              transform: rotate(270deg) scale(1.15); 
              opacity: 1;
            }
            100% { 
              transform: rotate(360deg) scale(1); 
              opacity: 0.7;
            }
          }
          
          /* Character animation classes */
          .character-think {
            animation: character-think 3s ease-in-out infinite;
          }
          
          .character-organize {
            animation: character-organize 2.5s ease-in-out infinite;
          }
          
          .character-create-logic {
            animation: character-create-logic 4s ease-in-out infinite;
          }
          
          .character-create {
            animation: character-create 4.5s ease-in-out infinite;
          }
          
          .character-investigate {
            animation: character-investigate 3.2s ease-in-out infinite;
          }
          
          .character-sparkle {
            animation: character-bounce 1.5s ease-in-out infinite;
          }
          
          .sparkles-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          
          .sparkle {
            position: absolute;
            animation: sparkle-float 3s ease-in-out infinite;
            font-weight: bold;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          }
          
          .sparkle-1 {
            top: -25px;
            right: -25px;
            animation-delay: 0s;
          }
          
          .sparkle-2 {
            bottom: -25px;
            left: -25px;
            animation-delay: 0.5s;
          }
          
          .sparkle-3 {
            top: 50%;
            left: -30px;
            animation-delay: 1s;
          }
          
          .sparkle-4 {
            top: -20px;
            left: 50%;
            animation-delay: 1.5s;
          }
          
          .sparkle-5 {
            bottom: -20px;
            right: 50%;
            animation-delay: 2s;
          }
          
          .sparkle-6 {
            top: 20%;
            right: -25px;
            animation-delay: 2.5s;
          }
          
          @keyframes sparkle-float {
            0%, 100% {
              opacity: 0;
              transform: translateY(0) rotate(0deg) scale(0.3);
            }
            20% {
              opacity: 0.7;
              transform: translateY(-12px) rotate(72deg) scale(0.8);
            }
            40% {
              opacity: 1;
              transform: translateY(-25px) rotate(144deg) scale(1.4);
            }
            60% {
              opacity: 0.9;
              transform: translateY(-30px) rotate(216deg) scale(1.6);
            }
            80% {
              opacity: 0.6;
              transform: translateY(-20px) rotate(288deg) scale(1.2);
            }
          }
          
          /* Personality dots */
          .personality-dots {
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
          }
          
          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: dot-pulse 2s ease-in-out infinite;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          }
          
          .dot-1 { animation-delay: 0s; }
          .dot-2 { animation-delay: 0.4s; }
          .dot-3 { animation-delay: 0.8s; }
          
          @keyframes dot-pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.8);
            }
          }
          
          /* Floating personality particles */
          .personality-particles {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          
          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            animation: particle-float 4s ease-in-out infinite;
          }
          
          .particle-1 {
            top: 20%;
            left: 20%;
            animation-delay: 0s;
          }
          
          .particle-2 {
            top: 60%;
            right: 25%;
            animation-delay: 1.3s;
          }
          
          .particle-3 {
            bottom: 30%;
            left: 70%;
            animation-delay: 2.6s;
          }
          
          @keyframes particle-float {
            0%, 100% {
              opacity: 0;
              transform: translateY(0) scale(1);
            }
            25% {
              opacity: 0.6;
              transform: translateY(-15px) scale(1.5);
            }
            50% {
              opacity: 1;
              transform: translateY(-25px) scale(2);
            }
            75% {
              opacity: 0.4;
              transform: translateY(-35px) scale(1.2);
            }
          }
        `}</style>
      </div>
    );
  };

  // Results Page Component
  const ResultsPage = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.background }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.2 }}>
          {results.recommendations.map((rec, index) => (
            <div key={rec.role} style={{ 
              background: `linear-gradient(135deg, ${rec.roleInfo.gradient.from} 0%, ${rec.roleInfo.gradient.to} 100%)`,
              position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
              filter: 'blur(100px)', top: `${index * 30}%`,
              left: index % 2 === 0 ? '-10%' : '60%',
              animation: `float 20s ease-in-out infinite`,
              animationDelay: `${index * 0.5}s`
            }} />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '72rem', margin: '0 auto', padding: '32px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: theme.onBackground }}>
              Your Results
            </h1>
            <button
              onClick={restart}
              style={{ 
                backgroundColor: theme.primary, color: theme.onPrimary,
                boxShadow: '0 4px 20px rgba(0, 100, 149, 0.3)',
                padding: '12px 24px', borderRadius: '9999px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '8px',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <RefreshCw size={20} />
              Retake Quiz
            </button>
            <nav style={{ padding: '24px' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage('landing')}
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '12px',
                backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer,
                fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease',
                border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Home size={20} />
              RoleMatch
            </button>
          </div>
        </nav>
          </div>

          <div style={{ 
            backgroundColor: theme.elevation1, color: theme.onSurfaceVariant,
            padding: '12px 24px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px'
          }}>
            <strong>{studentInfo.firstName} {studentInfo.lastName}</strong> • {studentInfo.buId} • {studentInfo.email}
          </div>

          <div style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
            {results.recommendations.map((rec, index) => (
              <div key={rec.role} style={{
                backgroundColor: theme.surface,
                boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.08)',
                borderRadius: '24px', padding: '32px',
                animation: `slideInUp 0.6s ease-out ${index * 0.15}s both`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                      <div style={{ position: 'relative' }}>
                        {/* <RoleCharacter 
                          roleKey={rec.role} 
                          isAnimated={true} 
                          isHovered={true}
                          size="large" 
                          showSparkles={index === 0} // Only sparkles for #1 result
                        /> */}
                        <Player
                          autoplay
                          loop
                          src={roleAnimations[rec.role]}
                          style={{
                            width: '200px',
                            height: '200px',
                            background: 'transparent', 
                            borderRadius: '0px',        
                            boxShadow: 'none'
                          }}
                        />

                        {/* Enhanced rank badge with pulsing animation */}
                        <div style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '-12px',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: theme.primary,
                          color: theme.onPrimary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: '800',
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                          zIndex: 2,
                          animation: index === 0 ? 'rank-pulse 2s ease-in-out infinite' : 'none'
                        }}>
                          {rec.rank}
                        </div>
                        
                        {/* Winner crown for #1 result */}
                        {index === 0 && (
                          <div style={{
                            position: 'absolute',
                            top: '-25px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '24px',
                            animation: 'crown-float 3s ease-in-out infinite',
                            zIndex: 3
                          }}>
                            👑
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 style={{ 
                          color: theme.onSurface, fontSize: '28px', fontWeight: '700', 
                          marginBottom: '4px'
                        }}>
                          {rec.roleInfo.name}
                        </h3>
                        <p style={{ color: theme.primary, fontWeight: '600', fontSize: '18px' }}>
                          {rec.score}% Match
                        </p>
                      </div>
                    </div>
                    
                    <p style={{ 
                      color: theme.onSurfaceVariant, marginBottom: '16px', 
                      fontSize: '18px', lineHeight: '1.6'
                    }}>
                      {rec.explanation}
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {rec.roleInfo.skills.map(skill => (
                        <span key={skill} style={{
                          backgroundColor: theme.secondaryContainer,
                          color: theme.onSecondaryContainer,
                          padding: '8px 16px', borderRadius: '9999px',
                          fontSize: '14px', fontWeight: '500'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
                    <svg viewBox="0 0 120 120" style={{ width: '120px', height: '120px', transform: 'rotate(-90deg)' }}>
                      <circle cx="60" cy="60" r="45" stroke={theme.surfaceVariant} strokeWidth="10" fill="none" />
                      <circle
                        cx="60" cy="60" r="45" stroke={rec.roleInfo.color} strokeWidth="10" fill="none"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - rec.score / 100)}`}
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                      />
                    </svg>
                    <div style={{ 
                      position: 'absolute', inset: 0, display: 'flex', 
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: '24px', fontWeight: '700', color: theme.onSurface
                    }}>
                      {rec.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            backgroundColor: theme.surface,
            boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.08)',
            borderRadius: '24px', padding: '32px',
            animation: 'slideInUp 0.6s ease-out 0.5s both'
          }}>
            <h3 style={{ 
              color: theme.onSurface, fontSize: '24px', fontWeight: '700', 
              marginBottom: '20px', textAlign: 'center'
            }}>
              Save & Share Your Results
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button onClick={exportToCSV} style={{ 
                backgroundColor: theme.secondaryContainer, color: theme.onSecondaryContainer,
                padding: '14px 28px', borderRadius: '9999px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '8px',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '16px'
              }}>
                <Download size={20} />
                Download CSV
              </button>
              <button onClick={exportToPDF} style={{ 
                backgroundColor: theme.tertiaryContainer, color: theme.onTertiaryContainer,
                padding: '14px 28px', borderRadius: '9999px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '8px',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '16px'
              }}>
                <Download size={20} />
                Download PDF
              </button>
              <button onClick={shareResults} style={{ 
                backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer,
                padding: '14px 28px', borderRadius: '9999px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '8px',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '16px'
              }}>
                <Share2 size={20} />
                Share Results
              </button>
            </div>
          </div>

          {shareNotification && (
            <div style={{ 
              backgroundColor: theme.primary, color: theme.onPrimary,
              position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
              padding: '16px 24px', borderRadius: '12px', fontWeight: '600',
              animation: 'slideUpIn 0.3s ease-out', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}>
              {shareNotification}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Results page enhanced animations */
        @keyframes slideInUp {
          from { 
            transform: translateY(50px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes slideUpIn {
          from { 
            transform: translateX(-50%) translateY(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateX(-50%) translateY(0); 
            opacity: 1; 
          }
        }
        
        /* Enhanced rank badge animation for winner */
        @keyframes rank-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 8px 30px rgba(0, 100, 149, 0.5), 0 0 20px rgba(0, 100, 149, 0.3);
          }
        }
        
        /* Winner crown animation */
        @keyframes crown-float {
          0%, 100% {
            transform: translateX(-50%) translateY(0) rotate(-3deg);
          }
          33% {
            transform: translateX(-50%) translateY(-8px) rotate(3deg);
          }
          66% {
            transform: translateX(-50%) translateY(-5px) rotate(-2deg);
          }
        }
        
        /* Enhanced progress bar animation */
        @keyframes progress-fill {
          from {
            stroke-dashoffset: 283; /* 2 * π * 45 */
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );

  // Main render logic
  if (currentPage === 'landing') return <LandingPage />;
  if (currentPage === 'about') return <AboutPage />;
  if (currentPage === 'studentInfo') return <StudentInfoPage />;
  if (currentPage === 'quiz') return <QuizPage />;
  if (currentPage === 'results' && results) return <ResultsPage />;
  
  return <LandingPage />;
};

export default RoleMatch;