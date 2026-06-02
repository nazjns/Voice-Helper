elements.micBtn.addEventListener('click', () => {
    if (appState === 'idle') {
        appState = 'recording';
        currentSessionId = Date.now();
        if (finalTranscriptStr === '') elements.userTranscript.innerHTML = `<div class="chat-message"><em>Đang lắng nghe...</em></div>`;
        try { recognition.start(); } catch(e){}
    } else {
        appState = 'idle';
        recognition.stop();
        autoSaveNote(); 
    }
    updateUI();
});

elements.pauseBtn.addEventListener('click', () => {
    if (appState === 'recording') {
        appState = 'paused';
        recognition.stop(); 
    } else if (appState === 'paused') {
        appState = 'recording';
        try { recognition.start(); } catch(e){} 
    }
    updateUI();
});

elements.btnClear.addEventListener('click', () => {
    if(confirm("Xóa sạch màn hình chữ để thu bản mới?")) {
        finalTranscriptStr = '';
        elements.userTranscript.innerHTML = `<div class="chat-message speaker-system"><em>Đã dọn dẹp. Hãy bấm Micro để thu âm.</em></div>`;
        elements.analysisResult.style.display = 'none';
        currentSessionId = Date.now();
        loadNotesFromCalendar();
    }
});

elements.btnSummarize.addEventListener('click', () => {
    if (finalTranscriptStr.trim() === '') return alert("Chưa có chữ để tóm tắt!");
    elements.aiProcessingText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    setTimeout(() => {
        elements.aiProcessingText.innerHTML = '<i class="fa-solid fa-circle-check"></i> Complete';
        elements.analysisResult.style.display = 'block';
        elements.resSummary.innerText = finalTranscriptStr.substring(0, 80) + "... (Sẽ tích hợp API Backend)";
        gsap.fromTo(".result-section", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
        autoSaveNote();
    }, 1500);
});

elements.btnSaveNote.addEventListener('click', () => {
    if (finalTranscriptStr.trim() === '') return alert("Chưa có nội dung để lưu!");
    autoSaveNote(); 
    alert("Đã gắn bản ghi vào Lịch bên trái!");
});

elements.btnCopy.addEventListener('click', () => {
    if (finalTranscriptStr.trim() === '') return alert("Chưa có nội dung để copy!");
    let text = `BẢN GHI GỐC:\n${finalTranscriptStr}\n\n`;
    if (elements.resSummary.innerText) text += `TÓM TẮT AI:\n${elements.resSummary.innerText}`;
    navigator.clipboard.writeText(text).then(() => alert('Đã copy!')).catch(e => console.error(e));
});

elements.btnExport.addEventListener('click', () => {
    if (finalTranscriptStr.trim() === '') return alert("Chưa có nội dung để xuất!");
    let md = `# Ghi chú bài giảng AIoT\n\n## 1. Nội dung gốc\n${finalTranscriptStr}\n\n`;
    if (elements.resSummary.innerText) md += `## 2. Tóm tắt AI\n${elements.resSummary.innerText}\n`;
    
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; a.download = 'AIoT_Smart_Note.md'; a.click();
    URL.revokeObjectURL(url);
});

document.addEventListener('click', () => {
    if (elements.contextMenu) elements.contextMenu.style.display = 'none';
});

elements.btnDeleteNote.addEventListener('click', () => {
    if (!noteToDeleteId) return;
    const dateKey = elements.studyDateInput.value;
    let allNotes = JSON.parse(localStorage.getItem('aiot_calendar_notes')) || {};
    
    if (allNotes[dateKey]) {
        allNotes[dateKey] = allNotes[dateKey].filter(n => n.id !== noteToDeleteId);
        localStorage.setItem('aiot_calendar_notes', JSON.stringify(allNotes));
        if (currentSessionId === noteToDeleteId) {
            finalTranscriptStr = '';
            elements.userTranscript.innerHTML = `<div class="chat-message speaker-system"><em>Đã xóa bản ghi.</em></div>`;
            elements.analysisResult.style.display = 'none';
            currentSessionId = Date.now(); 
        }
        loadNotesFromCalendar(); 
    }
});