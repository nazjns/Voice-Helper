// Khởi tạo ngày hôm nay khi mở web
elements.studyDateInput.valueAsDate = new Date();

function autoSaveNote() {
    if (finalTranscriptStr.trim() === '') return;
    const dateKey = elements.studyDateInput.value;
    let allNotes = JSON.parse(localStorage.getItem('aiot_calendar_notes')) || {};
    if (!allNotes[dateKey]) allNotes[dateKey] = [];
    
    let existingIndex = allNotes[dateKey].findIndex(n => n.id === currentSessionId);
    let noteData = {
        id: currentSessionId,
        time: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}),
        text: finalTranscriptStr
    };
    
    if (existingIndex > -1) allNotes[dateKey][existingIndex] = noteData;
    else allNotes[dateKey].push(noteData);

    localStorage.setItem('aiot_calendar_notes', JSON.stringify(allNotes));
    loadNotesFromCalendar(); 
}

function loadNotesFromCalendar() {
    const dateKey = elements.studyDateInput.value;
    let allNotes = JSON.parse(localStorage.getItem('aiot_calendar_notes')) || {};
    let notesToday = allNotes[dateKey] || [];
    
    elements.notesListEl.innerHTML = '';
    if (notesToday.length === 0) {
        elements.notesListEl.innerHTML = '<li class="note-item"><div class="note-title" style="color:#94a3b8">Chưa có bản ghi nào</div></li>';
        return;
    }
    
    notesToday.forEach(note => {
        let li = document.createElement('li');
        li.className = 'note-item';
        if(note.id === currentSessionId) li.classList.add('active'); 
        li.innerHTML = `<div class="note-title">Bản ghi ${note.time}</div><div class="note-time">${note.text.substring(0, 30)}...</div>`;
        
        li.addEventListener('click', () => {
            currentSessionId = note.id;
            finalTranscriptStr = note.text;
            elements.userTranscript.innerHTML = `<div class="chat-message">${finalTranscriptStr}</div>`;
            elements.analysisResult.style.display = 'none'; 
            loadNotesFromCalendar(); 
        });

        // Kích hoạt context menu (Chuột phải)
        li.addEventListener('contextmenu', (e) => {
            e.preventDefault(); 
            noteToDeleteId = note.id; 
            elements.contextMenu.style.display = 'block';
            elements.contextMenu.style.left = `${e.pageX}px`; 
            elements.contextMenu.style.top = `${e.pageY}px`;
        });
        
        elements.notesListEl.appendChild(li);
    });
}

elements.studyDateInput.addEventListener('change', loadNotesFromCalendar);
// Gọi lần đầu để load dữ liệu
loadNotesFromCalendar();