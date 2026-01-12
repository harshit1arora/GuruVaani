export const translations = {
  en: {
    // Common
    cancel: "Cancel",
    continue: "Continue",
    save: "Save",
    back: "Back",

    // Bottom Nav
    nav: {
      home: "Home",
      planner: "Planner",
      peerWisdom: "Peer Wisdom",
      dailyReflection: "Daily Reflection",
      ask: "Ask",
      resources: "Resources",
      profile: "Profile",
    },

    // Home Screen
    home: {
      greeting: "Hello! 👋",
      subtitle: "Which class do you need help with today?",
      selectClass: "Select Class",
      selectSubject: "Select Subject",
      continueBtn: "Continue to Classroom Help",
    },

    // Subjects
    subjects: {
      maths: "Maths",
      hindi: "Hindi",
      science: "Science",
      evs: "EVS",
      social: "Social Science",
    },

    // Voice Input
    voice: {
      title: "Classroom Help",
      speakProblem: "Speak your classroom problem",
      listening: "Listening...",
      tapToDone: "Tap again when you're done",
      exampleHint: '"Students are distracted during group activity"',
      micHint: "Tap the microphone and describe what's happening in your classroom",
      error: "Speech recognition error:",
      notSupported: "Speech recognition is not supported in your browser. Please try using Chrome or Firefox.",
    },

    // Coaching
    coaching: {
      title: "Coaching Support",
      yourConcern: "Your concern:",
      quickAdjustments: "Quick adjustments",
      didThisHelp: "Did this help?",
      thisWorked: "This worked",
      tryAgain: "Try again",
      cards: {
        now: "What to do now (30 sec)",
        activity: "Simple Activity / Hook",
        explain: "Way to explain the concept",
        interaction: "Student Interaction Suggestion",
      },
      suggestions: {
        another: "Try another approach",
        simpler: "Make it simpler",
        local: "Give a local example",
        reduce: "Reduce group size",
      },
      // Student Performance Based Suggestions
      performance: {
        title: "Student Interaction Based on Performance",
        subtitle: "Adaptive suggestions for different learning levels",
        fastFinishers: {
          title: "Fast Finishers",
          description: "Students who complete tasks quickly",
          challenge: "Challenge them further",
          lead: "Make them leaders",
          explore: "Encourage exploration",
        },
        onTrack: {
          title: "On-Track Learners",
          description: "Students progressing as expected",
          reinforce: "Reinforce understanding",
          collaborate: "Encourage collaboration",
          apply: "Promote application",
        },
        struggling: {
          title: "Struggling Students",
          description: "Students needing extra support",
          simplify: "Simplify tasks",
          visualize: "Use visual aids",
          support: "Provide targeted support",
        },
      },
    },

    // Planner
    planner: {
      title: "AI-Powered Smart Planner",
      infoBanner: "Generate personalized lesson plans aligned to your syllabus and grade-level competencies.",
      noPlans: "No plans generated yet",
      addFirst: "Add your first topic",
      addAnother: "Add another topic",
      topicLabel: "Topic for the day",
      topicPlaceholder: "e.g., Fractions Introduction",
      timeLabel: "Approximate time",
      timePlaceholder: "Select time available",
      challengeLabel: "Anticipated challenge (optional)",
      challengePlaceholder: "e.g., Students confuse numerator/denominator",
      addTopic: "Add Topic",
      challengeHint: "💡 Teachers often face engagement challenges in this topic.",
      // AI Smart Planner new keys
      daily: "Daily Plan",
      weekly: "Weekly Plan",
      grade: "Grade",
      gradePlaceholder: "Select grade",
      grade1: "Grade 1",
      grade2: "Grade 2",
      grade3: "Grade 3",
      grade4: "Grade 4",
      grade5: "Grade 5",
      grade6: "Grade 6",
      grade7: "Grade 7",
      grade8: "Grade 8",
      subject: "Subject",
      subjectPlaceholder: "Select subject",
      math: "Mathematics",
      science: "Science",
      english: "English",
      hindi: "Hindi",
      social: "Social Studies",
      timeAvailable: "Time Available per Session",
      minutes: "minutes",
      generatePlan: "Generate AI Plan",
      generating: "Generating Plan...",
      dailyPlan: "Your Daily Plan",
      weeklyPlan: "Your Weekly Plan",
      syllabus: "Syllabus Alignment",
      competencies: "Grade-Level Competencies",
      interactiveMethods: "Interactive Methods",
    },

    // Resources
    resources: {
      title: "Practice Support Resources",
      subtitle: "Extra help when you want it",
      clusters: {
        classroomManagement: "Classroom Management",
        classroomManagementDesc: "Handle disruptions, transitions, and attention",
        mixedLevel: "Mixed-level Teaching",
        mixedLevelDesc: "Strategies for diverse learning levels",
        conceptClarity: "Concept Clarity",
        conceptClarityDesc: "Explain difficult topics simply",
        studentEngagement: "Student Engagement",
        studentEngagementDesc: "Keep students interested and participating",
      },
    },

    // Feedback
    feedback: {
      title: "Reflection",
      thankYou: "Thank you!",
      thankYouMessage: "Your reflection helps improve classroom support.",
      workedMessage: "👍 Great! The suggestion worked in your context.",
      tryAgainMessage: "🔁 No problem! Let's try a different approach.",
      optionalReflection: "Optional Reflection",
      shareWhat: "Share what happened in your classroom (text or voice)",
      reflectionPlaceholder: "What did you observe? What might you try next time?",
      recordVoice: "Or record voice note",
      recording: "Recording... Tap to stop",
      submitReflection: "Submit Reflection",
      skipHome: "Skip & Go Home",
    },

    // Profile
    profile: {
      title: "Profile",
      classes: "Classes",
      subjects: "Subjects",
      language: "Language",
      certificate: "Practice Certificate",
      certificateDesc: "Download your participation certificate",
      logout: "Logout",
      languageToggle: "Language / भाषा",
      english: "English",
      hindi: "हिंदी",
    },

    // Certificate
    certificate: {
      title: "Certificate",
      header: "Professional Practice Participation Certificate",
      certify: "This is to certify that",
      description: "has actively engaged in reflective classroom practice and continuous professional learning through the GuruVani Teaching Coach platform.",
      recognises: "This certificate recognises engagement in reflective classroom practice and continuous professional learning.",
      download: "Download Certificate",
    },

    // Login
    login: {
      appName: "GuruVani",
      tagline: "Teaching Coach",
      enterPhone: "Enter your phone number",
      sendOtpInfo: "We'll send you a one-time password",
      sendOtp: "Send OTP",
      enterCode: "Enter verification code",
      sentTo: "Sent to",
      verifyBtn: "Verify & Continue",
      changePhone: "Change phone number",
      exploreFirst: "Want to explore first?",
      guestMode: "Continue as Guest",
    },

    // Peer Wisdom
    peerWisdom: {
      title: "Peer Wisdom",
      subtitle: "Learn from teachers facing similar challenges",
      askQuestion: "Ask a Question",
      yourQuestion: "Your Question",
      questionPlaceholder: "e.g., Multigrade Class: How to teach English to Class 3 while Class 4 does math?",
      postQuestion: "Post Question",
      posts: "Posts",
      noPosts: "No posts yet. Be the first to ask!",
      helpful: "teachers found this helpful",
      from: "from",
      responses: "Responses",
      addResponse: "Add Response",
      yourResponse: "Your Response",
      responsePlaceholder: "Share your experience...",
      postResponse: "Post Response",
      markHelpful: "Mark as Helpful",
      posted: "Posted",
    },

    // Daily Reflection
    dailyReflection: {
      title: "Daily Reflection",
      question: "Aaj class mein kya achha hua? Kya mushkil aayi?",
      instruction: "Tap the microphone and share your thoughts for 60 seconds",
      recording: "Recording...",
      recordingHint: "Speak freely, you have 60 seconds",
      cancel: "Cancel",
      submitted: "Reflection Submitted!",
      feedbackTitle: "Here's your personalized feedback:",
      done: "Done",
    },

    // Context-Aware Activity Generator
    activityGenerator: {
      title: "Context-Aware Activity Generator",
      infoBanner: "Create custom activities in under 60 seconds using your real classroom constraints",
      constraints: "Classroom Constraints",
      numStudents: "Number of Students",
      selectNumStudents: "Select number of students",
      students: "students",
      learningLevel: "Learning Level",
      selectLearningLevel: "Select learning level",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      mixed: "Mixed",
      timeLeft: "Time Left",
      selectTimeLeft: "Select time left",
      minutes: "minutes",
      physicalSpace: "Physical Space",
      indoor: "Indoor (Rain/no playground)",
      outdoor: "Outdoor (Playground available)",
      availableMaterials: "Available Materials",
      selectMaterial: "Select material",
      customMaterial: "Add custom material",
      add: "Add",
      generateActivity: "Generate Activity",
      generating: "Generating Activity...",
      generatedActivity: "Generated Activity",
      roleCards: "Role Cards",
      timeLimits: "Time Limits",
      assessmentChecks: "Quick Assessment Checks",
    },

    // Smart Suggestion Bar
    smartSuggestions: {
      // Category labels
      engagement: "engagement tip",
      concept: "concept clarification",
      management: "classroom management",
      
      // Engagement tips
      engagementTip1: "Try a quick 'turn and talk' activity to get students engaged with the topic.",
      engagementTip2: "Use hand signals for student responses to keep everyone involved.",
      engagementTip3: "Incorporate movement into your lesson to maintain attention.",
      engagementTip4: "Ask open-ended questions to encourage deeper thinking.",
      
      // Concept clarification cues
      conceptTip1: "Use analogies from students' daily lives to explain complex concepts.",
      conceptTip2: "Break down the concept into smaller, more manageable parts.",
      conceptTip3: "Use visual aids like diagrams or drawings to clarify the concept.",
      conceptTip4: "Check for understanding by asking students to explain the concept in their own words.",
      
      // Classroom management nudges
      managementTip1: "Use positive reinforcement to encourage desired behaviors.",
      managementTip2: "Set clear expectations at the beginning of the activity.",
      managementTip3: "Use a timer to keep activities on track.",
      managementTip4: "Circulate the classroom to monitor student progress and provide support.",
    },

    // Curated Video Support
    videoSupport: {
      title: "Curated Video Support",
      description: "2–3 high-quality, relevant videos aligned to your topic and syllabus.",
      note: "Videos are provided as reference or inspiration, not as a replacement for teaching.",
      watchOnYoutube: "Watch on YouTube",
    },

    // Offline
    offline: {
      indicator: "You're offline",
      available: "Coaching cards available",
    },

    // Parent Bridge
    parentBridge: {
      title: "Parent Bridge",
      infoBanner: "Automatic voice messages for parents without typing required for teachers",
      generateMessage: "Generate Parent Message",
      generateButton: "Generate Voice Message",
      generating: "Generating Message...",
      regenerate: "Regenerate Message",
      messageShared: "Message shared successfully!",
      week: "Week",
      week1: "Week 1",
      week2: "Week 2",
      week3: "Week 3",
      week4: "Week 4",
      selectWeek: "Select week",
      className: "Class",
      class1: "Class 1",
      class2: "Class 2",
      class3: "Class 3",
      class4: "Class 4",
      class5: "Class 5",
      class6: "Class 6",
      class7: "Class 7",
      class8: "Class 8",
      selectClass: "Select class",
      subject: "Subject",
      math: "Mathematics",
      science: "Science",
      english: "English",
      hindi: "Hindi",
      social: "Social Studies",
      selectSubject: "Select subject",
      progressHighlights: "Student Progress Highlights",
      homeActivities: "Home Activities",
    },
  },

  hi: {
    // Common
    cancel: "रद्द करें",
    continue: "जारी रखें",
    save: "सेव करें",
    back: "वापस",

    // Bottom Nav
    nav: {
      home: "होम",
      planner: "प्लानर",
      peerWisdom: "सहकर्मी ज्ञान",
      dailyReflection: "दैनिक चिंतन",
      ask: "पूछें",
      resources: "संसाधन",
      profile: "प्रोफाइल",
    },

    // Home Screen
    home: {
      greeting: "नमस्ते! 👋",
      subtitle: "आज आपको किस कक्षा में मदद चाहिए?",
      selectClass: "कक्षा चुनें",
      selectSubject: "विषय चुनें",
      continueBtn: "कक्षा सहायता के लिए जारी रखें",
    },

    // Subjects
    subjects: {
      maths: "गणित",
      hindi: "हिंदी",
      science: "विज्ञान",
      evs: "पर्यावरण",
      social: "सामाजिक विज्ञान",
    },

    // Voice Input
    voice: {
      title: "कक्षा सहायता",
      speakProblem: "अपनी कक्षा की समस्या बोलें",
      listening: "सुन रहे हैं...",
      tapToDone: "जब हो जाए तो फिर से टैप करें",
      exampleHint: '"समूह गतिविधि में बच्चे ध्यान नहीं दे रहे"',
      micHint: "माइक्रोफोन पर टैप करें और बताएं कि आपकी कक्षा में क्या हो रहा है",
      error: "भाषण पहचान त्रुटि:",
      notSupported: "आपके ब्राउज़र में भाषण पहचान समर्थित नहीं है। कृपया Chrome या Firefox का उपयोग करें।",
    },

    // Coaching
    coaching: {
      title: "कोचिंग सहायता",
      yourConcern: "आपकी चिंता:",
      quickAdjustments: "त्वरित समायोजन",
      didThisHelp: "क्या इससे मदद मिली?",
      thisWorked: "यह काम किया",
      tryAgain: "फिर कोशिश करें",
      cards: {
        now: "अभी क्या करें (30 सेकंड)",
        activity: "सरल गतिविधि / हुक",
        explain: "अवधारणा समझाने का तरीका",
        interaction: "छात्र संवाद सुझाव",
      },
      suggestions: {
        another: "दूसरा तरीका आज़माएं",
        simpler: "सरल बनाएं",
        local: "स्थानीय उदाहरण दें",
        reduce: "समूह छोटा करें",
      },
      // Student Performance Based Suggestions
      performance: {
        title: "प्रदर्शन के आधार पर छात्र संपर्क",
        subtitle: "विभिन्न सीखने के स्तरों के लिए अनुकूलित सुझाव",
        fastFinishers: {
          title: "जल्दी समाप्त करने वाले",
          description: "जो छात्र कार्यों को जल्दी पूरा करते हैं",
          challenge: "उन्हें और चुनौती दें",
          lead: "उन्हें नेता बनाएं",
          explore: "अन्वेषण को प्रोत्साहित करें",
        },
        onTrack: {
          title: "अपेक्षित प्रगति वाले",
          description: "जैसा कि अपेक्षित था प्रगति कर रहे छात्र",
          reinforce: "समझ को मजबूत करें",
          collaborate: "सहयोग को प्रोत्साहित करें",
          apply: "अनुप्रयोग को बढ़ावा दें",
        },
        struggling: {
          title: "संघर्ष कर रहे छात्र",
          description: "अतिरिक्त सहायता चाहने वाले छात्र",
          simplify: "कार्यों को सरल बनाएं",
          visualize: "दृश्य सहायकों का उपयोग करें",
          support: "लक्षित सहायता प्रदान करें",
        },
      },
    },

    // Planner
    planner: {
      title: "AI-संचालित स्मार्ट प्लानर",
      infoBanner: "अपने पाठ्यक्रम और ग्रेड-स्तर की योग्यताओं के अनुरूप व्यक्तिगत पाठ योजनाएँ उत्पन्न करें।",
      noPlans: "अभी तक कोई योजना उत्पन्न नहीं की गई",
      addFirst: "अपना पहला विषय जोड़ें",
      addAnother: "एक और विषय जोड़ें",
      topicLabel: "आज का विषय",
      topicPlaceholder: "उदा., भिन्न का परिचय",
      timeLabel: "अनुमानित समय",
      timePlaceholder: "उपलब्ध समय चुनें",
      challengeLabel: "अपेक्षित चुनौती (वैकल्पिक)",
      challengePlaceholder: "उदा., बच्चे अंश/हर में भ्रमित होते हैं",
      addTopic: "विषय जोड़ें",
      challengeHint: "💡 इस विषय में शिक्षकों को अक्सर जुड़ाव की चुनौतियाँ आती हैं।",
      // AI Smart Planner new keys
      daily: "दैनिक योजना",
      weekly: "साप्ताहिक योजना",
      grade: "कक्षा",
      gradePlaceholder: "कक्षा चुनें",
      grade1: "कक्षा 1",
      grade2: "कक्षा 2",
      grade3: "कक्षा 3",
      grade4: "कक्षा 4",
      grade5: "कक्षा 5",
      grade6: "कक्षा 6",
      grade7: "कक्षा 7",
      grade8: "कक्षा 8",
      subject: "विषय",
      subjectPlaceholder: "विषय चुनें",
      math: "गणित",
      science: "विज्ञान",
      english: "अंग्रेजी",
      hindi: "हिंदी",
      social: "सामाजिक अध्ययन",
      timeAvailable: "प्रति सत्र उपलब्ध समय",
      minutes: "मिनट",
      generatePlan: "AI योजना उत्पन्न करें",
      generating: "योजना उत्पन्न हो रही है...",
      dailyPlan: "आपकी दैनिक योजना",
      weeklyPlan: "आपकी साप्ताहिक योजना",
      syllabus: "पाठ्यक्रम संरेखण",
      competencies: "ग्रेड-स्तर की योग्यताएँ",
      interactiveMethods: "इंटरएक्टिव तरीके",
    },

    // Resources
    resources: {
      title: "अभ्यास सहायता संसाधन",
      subtitle: "जब चाहें अतिरिक्त मदद",
      clusters: {
        classroomManagement: "कक्षा प्रबंधन",
        classroomManagementDesc: "व्यवधान, बदलाव और ध्यान को संभालें",
        mixedLevel: "मिश्रित-स्तर शिक्षण",
        mixedLevelDesc: "विविध सीखने के स्तरों के लिए रणनीतियाँ",
        conceptClarity: "अवधारणा स्पष्टता",
        conceptClarityDesc: "कठिन विषयों को सरलता से समझाएं",
        studentEngagement: "छात्र जुड़ाव",
        studentEngagementDesc: "छात्रों की रुचि और भागीदारी बनाए रखें",
      },
    },

    // Feedback
    feedback: {
      title: "चिंतन",
      thankYou: "धन्यवाद!",
      thankYouMessage: "आपका चिंतन कक्षा सहायता सुधारने में मदद करता है।",
      workedMessage: "👍 बहुत अच्छा! सुझाव आपके संदर्भ में काम किया।",
      tryAgainMessage: "🔁 कोई बात नहीं! एक अलग तरीका आज़माते हैं।",
      optionalReflection: "वैकल्पिक चिंतन",
      shareWhat: "अपनी कक्षा में क्या हुआ साझा करें (टेक्स्ट या वॉइस)",
      reflectionPlaceholder: "आपने क्या देखा? अगली बार क्या प्रयास करेंगे?",
      recordVoice: "या वॉइस नोट रिकॉर्ड करें",
      recording: "रिकॉर्डिंग... रोकने के लिए टैप करें",
      submitReflection: "चिंतन सबमिट करें",
      skipHome: "छोड़ें और होम जाएं",
    },

    // Profile
    profile: {
      title: "प्रोफाइल",
      classes: "कक्षाएं",
      subjects: "विषय",
      language: "भाषा",
      certificate: "अभ्यास प्रमाणपत्र",
      certificateDesc: "अपना भागीदारी प्रमाणपत्र डाउनलोड करें",
      logout: "लॉगआउट",
      languageToggle: "Language / भाषा",
      english: "English",
      hindi: "हिंदी",
    },

    // Certificate
    certificate: {
      title: "प्रमाणपत्र",
      header: "व्यावसायिक अभ्यास भागीदारी प्रमाणपत्र",
      certify: "यह प्रमाणित करता है कि",
      description: "ने शिक्षा मित्र टीचिंग कोच प्लेटफॉर्म के माध्यम से चिंतनशील कक्षा अभ्यास और निरंतर व्यावसायिक सीखने में सक्रिय रूप से भाग लिया है।",
      recognises: "यह प्रमाणपत्र चिंतनशील कक्षा अभ्यास और निरंतर व्यावसायिक सीखने में भागीदारी को मान्यता देता है।",
      download: "प्रमाणपत्र डाउनलोड करें",
    },

    // Login
    login: {
      appName: "शिक्षा मित्र",
      tagline: "टीचिंग कोच",
      enterPhone: "अपना फोन नंबर दर्ज करें",
      sendOtpInfo: "हम आपको एक वन-टाइम पासवर्ड भेजेंगे",
      sendOtp: "OTP भेजें",
      enterCode: "सत्यापन कोड दर्ज करें",
      sentTo: "भेजा गया",
      verifyBtn: "सत्यापित करें और जारी रखें",
      changePhone: "फोन नंबर बदलें",
      exploreFirst: "पहले देखना चाहते हैं?",
      guestMode: "गेस्ट के रूप में जारी रखें",
    },

    // Peer Wisdom
    peerWisdom: {
      title: "सहकर्मी ज्ञान",
      subtitle: "समान चुनौतियों का सामना करने वाले शिक्षकों से सीखें",
      askQuestion: "सवाल पूछें",
      yourQuestion: "आपका सवाल",
      questionPlaceholder: "उदा., बहुकक्षा कक्षा: कक्षा 3 को अंग्रेजी कैसे पढ़ाएं जब कक्षा 4 गणित कर रही है?",
      postQuestion: "सवाल पोस्ट करें",
      posts: "पोस्ट",
      noPosts: "अभी तक कोई पोस्ट नहीं। पहले पूछने वाले बनें!",
      helpful: "शिक्षकों ने इसे मददगार पाया",
      from: "से",
      responses: "प्रतिक्रियाएं",
      addResponse: "प्रतिक्रिया जोड़ें",
      yourResponse: "आपकी प्रतिक्रिया",
      responsePlaceholder: "अपना अनुभव साझा करें...",
      postResponse: "प्रतिक्रिया पोस्ट करें",
      markHelpful: "मददगार के रूप में चिह्नित करें",
      posted: "पोस्ट किया गया",
    },

    // Daily Reflection
    dailyReflection: {
      title: "दैनिक चिंतन",
      question: "आज कक्षा में क्या अच्छा हुआ? क्या मुश्किल आई?",
      instruction: "माइक्रोफोन पर टैप करें और 60 सेकंड के लिए अपने विचार साझा करें",
      recording: "रिकॉर्डिंग...",
      recordingHint: "स्वतंत्र रूप से बोलें, आपके पास 60 सेकंड हैं",
      cancel: "रद्द करें",
      submitted: "चिंतन सबमिट हो गया!",
      feedbackTitle: "यहां आपकी व्यक्तिगत फीडबैक है:",
      done: "पूरा",
    },

    // Context-Aware Activity Generator
    activityGenerator: {
      title: "संदर्भ-सजग गतिविधि जनरेटर",
      infoBanner: "अपनी वास्तविक कक्षा की बाधाओं का उपयोग करके 60 सेकंड के भीतर कस्टम गतिविधियां बनाएं",
      constraints: "कक्षा की बाधाएं",
      numStudents: "छात्रों की संख्या",
      selectNumStudents: "छात्रों की संख्या चुनें",
      students: "छात्र",
      learningLevel: "सीखने का स्तर",
      selectLearningLevel: "सीखने का स्तर चुनें",
      beginner: "शुरुआती",
      intermediate: "मध्यम",
      advanced: "उन्नत",
      mixed: "मिश्रित",
      timeLeft: "बचा हुआ समय",
      selectTimeLeft: "बचा हुआ समय चुनें",
      minutes: "मिनट",
      physicalSpace: "भौतिक स्थान",
      indoor: "इंडोर (बारिश/कोई प्लेग्राउंड नहीं)",
      outdoor: "आउटडोर (प्लेग्राउंड उपलब्ध)",
      availableMaterials: "उपलब्ध सामग्री",
      selectMaterial: "सामग्री चुनें",
      customMaterial: "कस्टम सामग्री जोड़ें",
      add: "जोड़ें",
      generateActivity: "गतिविधि उत्पन्न करें",
      generating: "गतिविधि उत्पन्न हो रही है...",
      generatedActivity: "उत्पन्न गतिविधि",
      roleCards: "भूमिका कार्ड",
      timeLimits: "समय सीमाएं",
      assessmentChecks: "त्वरित मूल्यांकन जांच",
    },

    // Smart Suggestion Bar
    smartSuggestions: {
      // Category labels
      engagement: "जुड़ाव सुझाव",
      concept: "अवधारणा स्पष्टीकरण",
      management: "कक्षा प्रबंधन",
      
      // Engagement tips
      engagementTip1: "विषय के साथ छात्रों को जोड़ने के लिए एक त्वरित 'मुड़ो और बात करो' गतिविधि आज़माएं.",
      engagementTip2: "सभी को शामिल रखने के लिए छात्रों के उत्तरों के लिए हाथ के संकेतों का उपयोग करें.",
      engagementTip3: "ध्यान बनाए रखने के लिए अपने पाठ में गति शामिल करें.",
      engagementTip4: "गहरी सोच को प्रोत्साहित करने के लिए खुले सवाल पूछें.",
      
      // Concept clarification cues
      conceptTip1: "जटिल अवधारणाओं को समझाने के लिए छात्रों के दैनिक जीवन के सादृश्यों का उपयोग करें.",
      conceptTip2: "अवधारणा को छोटे, अधिक प्रबंधन योग्य भागों में तोड़ें.",
      conceptTip3: "अवधारणा को स्पष्ट करने के लिए आरेख या चित्रों जैसे दृश्य सहायकों का उपयोग करें.",
      conceptTip4: "छात्रों से अवधारणा को अपने शब्दों में समझाने के लिए कहकर समझ की जांच करें.",
      
      // Classroom management nudges
      managementTip1: "वांछित व्यवहारों को प्रोत्साहित करने के लिए सकारात्मक सुदृढीकरण का उपयोग करें.",
      managementTip2: "गतिविधि की शुरुआत में स्पष्ट अपेक्षाएं निर्धारित करें.",
      managementTip3: "गतिविधियों को ट्रैक पर रखने के लिए टाइमर का उपयोग करें.",
      managementTip4: "छात्रों की प्रगति की निगरानी करने और सहायता प्रदान करने के लिए कक्षा का चक्कर लगाएं.",
    },

    // Curated Video Support
    videoSupport: {
      title: "क्यूरेटेड वीडियो सपोर्ट",
      description: "2–3 उच्च गुणवत्ता, प्रासंगिक वीडियो आपके विषय और पाठ्यक्रम के अनुरूप.",
      note: "वीडियो संदर्भ या प्रेरणा के रूप में प्रदान किए जाते हैं, शिक्षण के विकल्प के रूप में नहीं.",
      watchOnYoutube: "यूट्यूब पर देखें",
    },

    // Offline
    offline: {
      indicator: "आप ऑफलाइन हैं",
      available: "कोचिंग कार्ड उपलब्ध हैं",
    },

    // Parent Bridge
    parentBridge: {
      title: "पेरेंट ब्रिज",
      infoBanner: "शिक्षकों के लिए टाइपिंग की आवश्यकता के बिना माता-पिता के लिए स्वचालित आवाज संदेश",
      generateMessage: "माता-पिता संदेश उत्पन्न करें",
      generateButton: "आवाज संदेश उत्पन्न करें",
      generating: "संदेश उत्पन्न हो रहा है...",
      regenerate: "संदेश फिर से उत्पन्न करें",
      messageShared: "संदेश सफलतापूर्वक साझा किया गया!",
      week: "सप्ताह",
      week1: "सप्ताह 1",
      week2: "सप्ताह 2",
      week3: "सप्ताह 3",
      week4: "सप्ताह 4",
      selectWeek: "सप्ताह चुनें",
      className: "कक्षा",
      class1: "कक्षा 1",
      class2: "कक्षा 2",
      class3: "कक्षा 3",
      class4: "कक्षा 4",
      class5: "कक्षा 5",
      class6: "कक्षा 6",
      class7: "कक्षा 7",
      class8: "कक्षा 8",
      selectClass: "कक्षा चुनें",
      subject: "विषय",
      math: "गणित",
      science: "विज्ञान",
      english: "अंग्रेजी",
      hindi: "हिंदी",
      social: "सामाजिक अध्ययन",
      selectSubject: "विषय चुनें",
      progressHighlights: "छात्रों की प्रगति के मुख्य अंश",
      homeActivities: "घर पर क्रियाकलाप",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
