function updateUI() {
    elements.statusText.className = '';
    elements.micBtn.className = '';
    
    if (appState === 'idle') {
        elements.statusText.innerText = 'Sẵn sàng / Đã lưu';
        elements.statusText.classList.add('status-idle');
        elements.micBtn.classList.add('btn-idle');
        elements.micIcon.className = 'fa-solid fa-microphone';
        elements.pauseBtn.disabled = true;
        elements.pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
        elements.equalizer.classList.remove('active');
    } else if (appState === 'recording') {
        elements.statusText.innerText = 'Đang ghi âm (Bấm Mic để Dừng hẳn)...';
        elements.statusText.classList.add('status-recording');
        elements.micBtn.classList.add('btn-recording');
        elements.micIcon.className = 'fa-solid fa-stop';
        elements.pauseBtn.disabled = false;
        elements.pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
        elements.equalizer.classList.add('active');
    } else if (appState === 'paused') {
        elements.statusText.innerText = 'Đã tạm dừng (Bấm để nói tiếp)...';
        elements.statusText.classList.add('status-paused');
        elements.micBtn.classList.add('btn-recording'); 
        elements.micIcon.className = 'fa-solid fa-stop';
        elements.pauseBtn.disabled = false;
        elements.pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i> Tiếp tục';
        elements.equalizer.classList.remove('active');
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true; 
    recognition.interimResults = true;
    recognition.lang = 'vi-VN';

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let newlyFinalized = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) newlyFinalized += event.results[i][0].transcript + ' ';
            else interimTranscript += event.results[i][0].transcript;
        }
        finalTranscriptStr += newlyFinalized; 
        elements.userTranscript.innerHTML = `<div class="chat-message">${finalTranscriptStr} <i style="color: #94a3b8;">${interimTranscript}</i></div>`;
    };

    recognition.onend = () => {
        if (appState === 'recording') try { recognition.start(); } catch (e) {}
    };
    recognition.onerror = (event) => {
        if (event.error !== 'no-speech' && appState === 'recording') try { recognition.start(); } catch (e) {}
    };
} else {
    alert("Trình duyệt không hỗ trợ Web Speech API.");
}