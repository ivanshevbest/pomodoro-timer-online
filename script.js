// Получаем элементы DOM
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workInput = document.getElementById('work-time');
const breakInput = document.getElementById('break-time');
const timerType = document.getElementById('timer-type');

// Инициализация переменных
let workTime = parseInt(workInput.value) * 60; // время работы в секундах
let breakTime = parseInt(breakInput.value) * 60; // время перерыва в секундах
let currentTime = workTime; // текущее время
let isWorking = true; // флаг режима работы
let timerInterval = null; // интервал таймера
let isRunning = false; // флаг запущенного таймера

// Функция форматирования времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Функция обновления отображения времени
function updateDisplay() {
    timerDisplay.textContent = formatTime(currentTime);
}

// Функция запуска таймера
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Переключение между работой и перерывом
            if (isWorking) {
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            startTimer(); // Автозапуск следующего интервала
        }
    }, 1000);
}

// Функция паузы
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

// Функция сброса
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
}

// Обработчики событий
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        workTime = parseInt(workInput.value) * 60;
        breakTime = parseInt(breakInput.value) * 60;
        currentTime = workTime;
        startTimer();
    }
});

pauseBtn.addEventListener('click', pauseTimer);

resetBtn.addEventListener('click', resetTimer);

// Обновление времени при изменении настроек
workInput.addEventListener('input', () => {
    if (!isRunning) {
        workTime = parseInt(workInput.value) * 60;
        currentTime = workTime;
        updateDisplay();
    }
});

breakInput.addEventListener('input', () => {
    breakTime = parseInt(breakInput.value) * 60;
});

// Инициализация отображения
updateDisplay();
//управление темама
// Добавим управление темами
const themeSelect = document.getElementById('theme-select');

// Функция применения темы
function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Сохраняем выбор пользователя
    localStorage.setItem('theme', theme);
}

// Обработчик смены темы
themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    applyTheme(selectedTheme);
});

// Загружаем сохраненную тему при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;
});
/*счетчик помиоров*/
// Добавим переменную для счетчика
let pomodorosCount = 0;

// Получаем элемент счетчика
const pomodorosDisplay = document.getElementById('pomodoros-count');

// Обновляем функцию startTimer
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Увеличиваем счетчик только при завершении рабочего интервала
            if (isWorking) {
                pomodorosCount++;
                pomodorosDisplay.textContent = pomodorosCount;
            }
            
            // Переключение между работой и перерывом
            if (isWorking) {
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            startTimer(); // Автозапуск следующего интервала
        }
    }, 1000);
}
//павильное произношение//
// Создаем словарь правильных произношений
const pronunciationDict = {
    'Помодоро': 'Помодóро' // ударение на второй слог
};

// Обновляем функцию speak
function speak(text) {
    if (voiceModeEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        
        // Корректируем текст согласно словарю 
        const correctedText = pronunciationDict[text] || text;
        
        utterance.text = correctedText;
        utterance.lang = 'ru-RU';
        utterance.rate = 1.0;
        utterance.volume = volumeSlider.value / 100;
        speechSynthesis.speak(utterance);
    }
}


// Добавим сброс счетчика при нажатии Reset
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    pomodorosCount = 0; // Сброс счетчика
    pomodorosDisplay.textContent = pomodorosCount;
}
/*управление подсеткой от режима таймера*/
// Добавим функцию обновления градиента
function updateGradient() {
    if (isWorking) {
        app.classList.add('work-mode');
        app.classList.remove('break-mode');
    } else {
        app.classList.add('break-mode');
        app.classList.remove('work-mode');
    }
}

// Получаем элемент app
const app = document.querySelector('.app');

// Модифицируем startTimer
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorking) {
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            updateGradient(); // Обновляем градиент
            startTimer();
        }
    }, 1000);
    
    updateGradient(); // Обновляем градиент при старте
}

// Добавим обновление градиента при сбросе
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    updateGradient(); // Обновляем градиент
}

// Инициализируем градиент при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateGradient();
});
/* Обновляем функцию переключения градиентов в JavaScript */
function updateGradient() {
    if (isWorking) {
        document.documentElement.style.setProperty('--current-gradient', getComputedStyle(document.body).getPropertyValue('--work-gradient'));
    } else {
        document.documentElement.style.setProperty('--current-gradient', getComputedStyle(document.body).getPropertyValue('--break-gradient'));
    }
}
/*Добавим для переключения градиентов при смене темы*/
// Функция смены темы
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--current-gradient', getComputedStyle(document.body).getPropertyValue('--work-gradient-dark'));
        // Применяем темные цвета
        document.documentElement.style.setProperty('--app-bg', getComputedStyle(document.body).getPropertyValue('--bg-dark'));
        document.documentElement.style.setProperty('--text-color', getComputedStyle(document.body).getPropertyValue('--text-dark'));
        document.documentElement.style.setProperty('--border-color', getComputedStyle(document.body).getPropertyValue('--border-dark'));
    } else {
        document.documentElement.style.setProperty('--current-gradient', getComputedStyle(document.body).getPropertyValue('--work-gradient'));
        // Возвращаем светлые цвета
        document.documentElement.style.setProperty('--app-bg', getComputedStyle(document.body).getPropertyValue('--bg-light'));
        document.documentElement.style.setProperty('--text-color', getComputedStyle(document.body).getPropertyValue('--text-light'));
        document.documentElement.style.setProperty('--border-color', getComputedStyle(document.body).getPropertyValue('--border-light'));
    }
}

// Обновляем градиент при переключении режимов
function updateGradient() {
    if (isWorking) {
        document.documentElement.style.setProperty('--current-gradient', 
            document.documentElement.style.getPropertyValue('--theme') === 'dark' 
                ? getComputedStyle(document.body).getPropertyValue('--work-gradient-dark') 
                : getComputedStyle(document.body).getPropertyValue('--work-gradient')
        );
    } else {
        document.documentElement.style.setProperty('--current-gradient', 
            document.documentElement.style.getPropertyValue('--theme') === 'dark' 
                ? getComputedStyle(document.body).getPropertyValue('--break-gradient-dark') 
                : getComputedStyle(document.body).getPropertyValue('--break-gradient')
        );
    }
}

function getCurrentTheme() {
    const hour = new Date().getHours();
    
    // С 6:00 до 18:00 - светлая тема
    if (hour >= 6 && hour < 18) {
        return 'light';
    }
    // В остальное время - темная тема
    return 'dark';
}
//счетчик помиоров
// Добавляем переменную для счётчика
let pomodoroCount = 0;

// Модифицируем функцию startTimer
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorking) {
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
                
                // Увеличиваем счётчик только после завершения работы
                pomodoroCount++;
                updatePomodoroCounter();
            } else {
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            startTimer();
        }
    }, 1000);
}

// Функция обновления счётчика
function updatePomodoroCounter() {
    document.getElementById('pomodoro-counter').textContent = `Помидоров: ${pomodoroCount}`;
}

// Добавляем сброс счётчика в функцию resetTimer
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    pomodoroCount = 0; // Сброс счётчика
    updatePomodoroCounter();
}
// Функция запуска таймера
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Переключение между режимами
            if (isWorking) {
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
                
                // Запускаем таймер перерыва
                startTimer();
            } else {
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
                
                // Запускаем таймер работы
                startTimer();
            }
        }
    }, 1000);
}

// Добавим проверку на бесконечную рекурсию
function safeStartTimer() {
    if (!isRunning) {
        startTimer();
    }
}

// Обновляем обработчик кнопки старта
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        workTime = parseInt(workInput.value) * 60;
        breakTime = parseInt(breakInput.value) * 60;
        currentTime = workTime;
        safeStartTimer();
    }
});

// Добавим отладку
function updateDisplay() {
    console.log(`Текущее состояние: ${isWorking ? 'Работа' : 'Перерыв'}, время: ${formatTime(currentTime)}`);
    timerDisplay.textContent = formatTime(currentTime);
}

// Функция обновления градиента
function updateGradient() {
    if (isWorking) {
        document.documentElement.style.setProperty('--current-gradient', getComputedStyle(document.body).getPropertyValue('--work-gradient'));
    } else {
        document.documentElement.style.setProperty('--current-gradient', getComputedStyle(document.body).getPropertyValue('--break-gradient'));
    }
}

// Добавляем вызов функции в startTimer
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorking) {
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            updateGradient(); // Добавляем обновление градиента
            startTimer();
        }
    }, 1000);
    
    updateGradient(); // Вызываем при старте
}

// Добавляем обновление градиента при сбросе
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    updateGradient(); // Добавляем обновление градиента
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateGradient();
});
 //голос//
 // Добавляем новый элемент для управления речью
const speech = new SpeechSynthesisUtterance();

// Функция для объявления уведомлений
function speak(text) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = 'ru-RU';
    utterance.rate = 1.0; // Скорость речи (1.0 - нормальная)
    
    // Добавляем обработку ошибок
    utterance.onerror = (event) => {
        console.error('Ошибка воспроизведения речи:', event);
    };
    
    speechSynthesis.speak(utterance);
}

// Модифицируем функцию завершения таймера
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Добавляем голосовое уведомление
            if (isWorking) {
                speak('Время работы закончилось. Начинается перерыв!');
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                speak('Перерыв закончился. Начинается рабочий интервал!');
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            startTimer(); // Автозапуск следующего интервала
        }
    }, 1000);
}

// Добавляем уведомление при старте работы
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        workTime = parseInt(workInput.value) * 60;
        breakTime = parseInt(breakInput.value) * 60;
        currentTime = workTime;
        
        // Говорим о начале работы
        speak('Таймер запущен. Начинается рабочий интервал!');
        startTimer();
    }
});

// Добавляем уведомление при сбросе
resetBtn.addEventListener('click', () => {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    
    speak('Таймер сброшен.');
});
//голосовые команды//
// Проверяем поддержку распознавания речи
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    
    // Настраиваем параметры распознавания
    recognition.continuous = true; // непрерывное распознавание
    recognition.lang = 'ru-RU';
    
    // Функция обработки распознанного текста
    function processSpeech(transcript) {
        const lowerCaseTranscript = transcript.toLowerCase();
        
        if (lowerCaseTranscript.includes('сколько времени на таймере') || 
            lowerCaseTranscript.includes('осталось времени')) {
                lowerCaseTranscript.includes('сколько до перерыва')
            const remainingTime = formatTime(currentTime);
            speak(`До перерыва осталось ${remainingTime}`);
        }
    }
    
    // Обработчик результатов распознавания
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processSpeech(transcript);
    };
    
    // Автоматически запускаем распознавание при загрузке
    window.addEventListener('DOMContentLoaded', () => {
        try {
            recognition.start();
            console.log('Распознавание речи запущено автоматически');
        } catch (error) {
            console.error('Ошибка при запуске распознавания:', error);
        }
    });
    
    // Обработка ошибок
    recognition.onerror = (error) => {
        console.error('Ошибка распознавания:', error);
    };
    
    // Обработка завершения
    recognition.onend = () => {
        recognition.start(); // перезапускаем
    };
} else {
    console.warn('Ваш браузер не поддерживает распознавание речи');
}

// Функция для голосового ответа
function speak(text) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = 'ru-RU';
    speechSynthesis.speak(utterance);
}
// СКОЛЬКО ДО РАБОТЫ//
// Проверяем поддержку распознавания речи
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    
    // Настраиваем параметры распознавания
    recognition.continuous = true; // непрерывное распознавание
    recognition.lang = 'ru-RU';
    
    // Функция обработки распознанного текста
    function processSpeech(transcript) {
        const lowerCaseTranscript = transcript.toLowerCase();
        
        if (isWorking) {
            // Если сейчас работа
            if (lowerCaseTranscript.includes('сколько времени') || 
                lowerCaseTranscript.includes('осталось времени')) {
                    lowerCaseTranscript.includes('сколько осталось времени')
                const remainingTime = formatTime(currentTime);
                speak(`До перерыва осталось ${remainingTime}`);
            }
        } else {
            // Если сейчас перерыв
            if (lowerCaseTranscript.includes('сколько осталось') || 
                lowerCaseTranscript.includes('когда конец')) {
                    lowerCaseTranscript.includes('сколько  осталось времени')
                const remainingBreakTime = formatTime(currentTime);
                speak(`До конца перерыва осталось ${remainingBreakTime}`);
            }
        }
    }
    
    // Обработчик результатов распознавания
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processSpeech(transcript);
    };
    
    // Автоматически запускаем распознавание при загрузке
    window.addEventListener('DOMContentLoaded', () => {
        try {
            recognition.start();
            console.log('Распознавание речи запущено автоматически');
        } catch (error) {
            console.error('Ошибка при запуске распознавания:', error);
        }
    });
    
    // Обработка ошибок
    recognition.onerror = (error) => {
        console.error('Ошибка распознавания:', error);
    };
    
    // Обработка завершения
    recognition.onend = () => {
        recognition.start(); // перезапускаем
    };
} else {
    console.warn('Ваш браузер не поддерживает распознавание речи');
}

// Функция для голосового ответа
function speak(text) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = 'ru-RU';
    speechSynthesis.speak(utterance);
}
//-------------------------------------------------интерфес для незрячих-----------------------------------------//

// Инициализация распознавания речи
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'ru-RU';

// Голосовые команды
const commands = {
    приветствие: ['привет', 'здравствуй', 'начать'],
    время: ['сколько времени', 'какое время'],
    погода: ['какая погода', 'температура'],
    статус: ['что происходит', 'какой режим'],
    осталось: ['сколько осталось', 'время до конца'],
    старт: ['начать', 'пуск', 'старт'],
    пауза: ['остановить', 'пауза'],
    сброс: ['сбросить', 'обнулить'],
    выход: ['завершить', 'выйти']
};

// Функция приветствия
function speakWelcome() {
    speak('Добро пожаловать в таймер pomodóro! ' +
        'Я ваш голосовой помошник. ' +
        'Вы можете использовать команды: старт, пауза, сброс, время, погода, статус.');
}

// Функция получения времени
function speakCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    speak(`Текущее время: ${hours}:${minutes}`);
}

// Основная функция распознавания
function processSpeech(transcript) {
    const lowerCaseTranscript = transcript.toLowerCase();
    
    if (matchesCommand(lowerCaseTranscript, commands.приветствие)) {
        speakWelcome();
    }
    
    if (matchesCommand(lowerCaseTranscript, commands.время)) {
        speakCurrentTime();
    }
    
    if (matchesCommand(lowerCaseTranscript, commands.статус)) {
        speak(`Сейчас ${isWorking ? 'рабочий интервал' : 'перерыв'}`);
    }
    
    if (matchesCommand(lowerCaseTranscript, commands.осталось)) {
        speak(`Осталось времени: ${formatTime(currentTime)}`);
    }
    
    if (matchesCommand(lowerCaseTranscript, commands.старт)) {
        startTimer();
        speak('Таймер запущен');
    }
    
    if (matchesCommand(lowerCaseTranscript, commands.пауза)) {
        pauseTimer();
        speak('Таймер приостановлен');
    }
    
    if (matchesCommand(lowerCaseTranscript, commands.сброс)) {
        resetTimer();
        speak('Таймер сброшен');
    }
}

// Функция проверки команды
function matchesCommand(text, commandArray) {
    return commandArray.some(command => text.includes(command));
}

// Обработка результатов распознавания
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    processSpeech(transcript);
};

// Запуск распознавания при загрузке
window.addEventListener('DOMContentLoaded', () => {
    try {
        recognition.start();
        speakWelcome();
    } catch (error) {
        console.error('Ошибка при запуске распознавания:', error);
    }
});

// Функция голосового ответа
function speak(text) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = 'ru-RU';
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
}

// Обработка ошибок
recognition.onerror = (error) => {
    console.error('Ошибка распознавания:', error);
};

// Обработка завершения
recognition.onend = () => {
    recognition.start();
};
// Проверка поддержки функций
if ('speechSynthesis' in window && 'webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'ru-RU';

    function speak(text) {
        if (!speechSynthesis.speaking) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.lang = 'ru-RU';
            utterance.rate = 1.0; 
            
            utterance.onend = () => {
                console.log('Речь завершена');
                
                // Получаем элемент для громкости
const volumeSlider = document.getElementById('volume-slider');

// Функция воспроизведения речи
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = 'ru-RU';
        utterance.rate = 1.0;
        utterance.volume = volumeSlider.value / 100; // Устанавливаем громкость
        speechSynthesis.speak(utterance);
    }
}

// Функция запуска таймера
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    const workMinutes = Math.floor(workTime / 60);
    const breakMinutes = Math.floor(breakTime / 60);
    
    speak(`Установлено время работы ${workMinutes} минут и перерыв ${breakMinutes} минут. Таймер запущен`);
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorking) {
                speak(`Рабочее время (${workMinutes} минут) закончилось. Установлен перерыв на ${breakMinutes} минут`);
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                speak(`Перерыв (${breakMinutes} минут) закончился. Установлено рабочее время на ${workMinutes} минут`);
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            } 
            
            updateDisplay();
            startTimer();
        }
    }, 1000);
}

// Функция паузы
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
    
    speak('Таймер приостановлен');
}

// Функция сброса
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    
    const workMinutes = Math.floor(workTime / 60);
    const breakMinutes = Math.floor(breakTime / 60);
    
    speak(`Таймер сброшен. Установлено новое время: работа ${workMinutes} минут, перерыв ${breakMinutes} минут`);
}

// Озвучка громкости
volumeSlider.addEventListener('input', () => {
    speak(`Громкость голосовых уведомлений установлена на ${volumeSlider.value}%`);
});

// Озвучка темы
themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    applyTheme(selectedTheme);
    speak(`Установлена тема: ${selectedTheme}`);
});

// Озвучка времени
function speakCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    speak(`Московское время: ${hours} часов ${minutes} минут`);
}

// Приветственное сообщение
window.addEventListener('DOMContentLoaded', () => {
    const initialWorkMinutes = Math.floor(workTime / 60);
    const initialBreakMinutes = Math.floor(breakTime / 60);
    
    speak(`Добро пожаловать! Установлено время работы ${initialWorkMinutes} минут и перерыв ${initialBreakMinutes} минут`);
    speakCurrentTime();
});

            };
            
            utterance.onerror = (event) => {
                console.error('Ошибка воспроизведения:', event);
            };
            
            speechSynthesis.speak(utterance); 
        }
    }

    function processSpeech(transcript) {
        const lowerCaseTranscript = transcript.toLowerCase();
        
        if (lowerCaseTranscript.includes('привет')) {
            speak('Здравствуйте! Я ваш голосовой помощник.');
            return;
        }
        
        if (lowerCaseTranscript.includes('время')) {
            speak('Сейчас проверю время...');
            return;
        }
        
        // Остальные команды...
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processSpeech(transcript);
    };

    window.addEventListener('DOMContentLoaded', () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                try {
                    recognition.start();
                    speak('Привет! Я готов к работе.');
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            })
            .catch(error => {
                console.error('Ошибка доступа к микрофону:', error);
            });
    });

    recognition.onerror = (error) => {
        console.error('Ошибка распознавания:', error);
    };
} else {
    alert('Ваш браузер не поддерживает голосовые функции');
}



// ---------------------голосовой интерфейс----------------------------------///
// Функция воспроизведения речи
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = 'ru-RU';
        utterance.rate = 1.0;
        speechSynthesis.speak(utterance);
    }
}

// Функция запуска таймера
function startTimer() {
    isRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true;
    
    const workMinutes = Math.floor(workTime / 60);
    const breakMinutes = Math.floor(breakTime / 60);
    
    speak(`Установлено время работы ${workMinutes} минут и перерыв ${breakMinutes} минут. Таймер запущен`);
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();
        
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorking) {
                speak(`Рабочее время (${workMinutes} минут) закончилось. Установлен перерыв на ${breakMinutes} минут`);
                isWorking = false;
                currentTime = breakTime;
                timerType.textContent = 'Перерыв';
            } else {
                speak(`Перерыв (${breakMinutes} минут) закончился. Установлено рабочее время на ${workMinutes} минут`);
                isWorking = true;
                currentTime = workTime;
                timerType.textContent = 'Работа';
            }
            
            updateDisplay();
            startTimer();
        }
    }, 1000);
}

// Функция паузы
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
    
    speak('Таймер приостановлен');
}

// Функция сброса
function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    
    const workMinutes = Math.floor(workTime / 60);
    const breakMinutes = Math.floor(breakTime / 60);
    
    speak(`Таймер сброшен. Установлено новое время: работа ${workMinutes} минут, перерыв ${breakMinutes} минут`);
}

// Добавление озвучки при смене темы
themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    applyTheme(selectedTheme);
    speak(`Установлена тема: ${selectedTheme}`);
});

// Приветственное сообщение
window.addEventListener('DOMContentLoaded', () => {
    const initialWorkMinutes = Math.floor(workTime / 60);
    const initialBreakMinutes = Math.floor(breakTime / 60);
    
    speak(`Добро пожаловать! Установлено время работы ${initialWorkMinutes} минут и перерыв ${initialBreakMinutes} минут`);
});
// Функция сброса таймера
function resetTimer() {
    pauseTimer(); // Сначала останавливаем таймер
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    currentTime = workTime;
    isWorking = true;
    timerType.textContent = 'Работа';
    updateDisplay();
    
    // Озвучиваем именно сброс, а не паузу
    speak('Таймер сброшен');
}

// Функция паузы
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
    
    // Добавляем озвучку для паузы
    speak('Таймер приостановлен');
}

// Проверяем, что все кнопки имеют правильные обработчики
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        workTime = parseInt(workInput.value) * 60;
        breakTime = parseInt(breakInput.value) * 60;
        currentTime = workTime;
        startTimer();
        speak('Таймер запущен');
    }
});

pauseBtn.addEventListener('click', () => {
    pauseTimer(); // Вызываем функцию паузы
});

resetBtn.addEventListener('click', () => {
    resetTimer(); // Вызываем функцию сброса
});
// Функция озвучки нажатия кнопки
function speakButtonAction(buttonText) {
    if (voiceModeEnabled) { // Проверяем, включен ли голосовой режим
        switch(buttonText) {
            case 'История техники':
                speak('Открыта информация об истории техники Помодоро');
                break;
            case 'Как пользоваться техникой':
                speak('Открыта инструкция по использованию техники Помодоро');
                break;
            case 'Как пользоваться таймером':
                speak('Открыта инструкция по работе с таймером');
                break;
            default:
                speak(`Нажата кнопка: ${buttonText}`);
        }
    }
}

// Обновляем обработчики для кнопок в header
document.querySelectorAll('.header-button').forEach(button => {
    button.addEventListener('click', () => {
        // Получаем текст кнопки
        const buttonText = button.textContent;
        
        // Озвучиваем действие
        speakButtonAction(buttonText);
        
        // Здесь добавляем логику обработки нажатия
        // Например:
        // showInfo(buttonText);
    });
});
// Добавим флаг для предотвращения множественных озвучек
let isVolumeAnnounced = false;

// Модифицируем обработчик громкости
volumeSlider.addEventListener('input', () => {
    if (!isVolumeAnnounced) {
        speak(`Громкость голосовых уведомлений установлена на ${volumeSlider.value}%`);
        isVolumeAnnounced = true;
    }
    
    // Добавим таймер для сброса флага
    clearTimeout(volumeTimeout);
    volumeTimeout = setTimeout(() => {
        isVolumeAnnounced = false;
    }, 2000); // Запрещаем озвучивать громкость в течение 2 секунд
});

// Инициализируем переменную для таймера
let volumeTimeout;

// Остальные функции остаются без изменений
function speak(text) {
    if (voiceModeEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = 'ru-RU';
        utterance.rate = 1.0;
        utterance.volume = volumeSlider.value / 100;
        speechSynthesis.speak(utterance);
    }
} 

//время


