// Quản lý trạng thái và lưu trữ DOM Elements để dùng chung cho mọi file JS khác
const elements = {
    splashScreen: document.getElementById('splash-screen'),
    mainApp: document.getElementById('main-app'),
    btnStartApp: document.getElementById('btn-start-app'),
    micBtn: document.getElementById('mic-btn'),
    micIcon: document.getElementById('mic-icon'),
    pauseBtn: document.getElementById('pause-btn'),
    statusText: document.getElementById('status-text'),
    userTranscript: document.getElementById('user-transcript'),
    equalizer: document.getElementById('equalizer'),
    studyDateInput: document.getElementById('study-date'),
    notesListEl: document.getElementById('notes-list'),
    analysisResult: document.getElementById('analysis-result'),
    aiProcessingText: document.getElementById('ai-processing-text'),
    resSummary: document.getElementById('res-summary'),
    btnSummarize: document.getElementById('btn-summarize'),
    btnSaveNote: document.getElementById('btn-save-note'),
    btnCopy: document.getElementById('btn-copy'),
    btnExport: document.getElementById('btn-export'),
    btnClear: document.getElementById('btn-clear'),
    contextMenu: document.getElementById('custom-context-menu'),
    btnDeleteNote: document.getElementById('btn-delete-note'),
    robotContainer: document.getElementById('ai-mascot'),
    rightArm: document.getElementById('waving-arm'),
    canvas: document.getElementById('star-canvas')
};

let appState = 'idle'; // Trạng thái: idle, recording, paused
let finalTranscriptStr = ''; 
let currentSessionId = Date.now(); 
let noteToDeleteId = null;