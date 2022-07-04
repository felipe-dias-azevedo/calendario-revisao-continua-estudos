const current = new Date();
let monthsForward = 0;
let textFilter = '';

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

const addSubjectModal = `<div class="input-container">
                <p>Disciplina:</p>
                <input type="text" name="subject" id="subject">
            </div>
            <div class="input-container">
                <p>Frente:</p>
                <select name="subtopic" id="subtopic">
                    <option value="">-- Selecione --</option>
                </select>
            </div>
            <div class="input-container">
                <p>Matéria:</p>
                <select name="materia" id="materia">
                    <option value="">-- Selecione --</option>
                </select>
            </div>
            <div class="input-container">
                <p>Data de Início:</p>
                <input id="date-subject" name="date-subject" type="date">
            </div>
            <button type="button" onclick="saveSubject()">Salvar</button>`;

const addSubtopicModal = `<div class="input-container">
                <p>Frente:</p>
                <input type="text" name="subtopic" id="subtopic">
            </div>
            <button type="button" onclick="saveSubtopic()">Salvar</button>`;

const addMateriaModal = `<div class="input-container">
                <p>Matéria:</p>
                <input type="text" name="materia" id="materia">
            </div>
            <div class="input-container">
                <p>Cor de Destaque:</p>
                <input type="color" name="materia-color" id="materia-color">
            </div>
            <button type="button" onclick="saveMateria()">Salvar</button>`;

const removeSubtopicModal = `<div class="input-container">
                <p>Frente:</p>
                <select name="subtopic-remove" id="subtopic-remove">
                    <option value="">-- Selecione --</option>
                </select>
            </div>
            <button type="button" class="delete" onclick="deleteSubtopic()">Deletar</button>`;

const removeMateriaModal = `<div class="input-container">
                <p>Matéria:</p>
                <select name="materia-remove" id="materia-remove">
                    <option value="">-- Selecione --</option>
                </select>
            </div>
            <button type="button" class="delete" onclick="deleteMateria()">Deletar</button>`;

const studyDayList = (day, studyDays) => {
    return `<div id="dia-${day}" class="study-day">
        <h3>${day}</h3>
        ${studyDays}
    </div>`;
}

const studyDay = (id, name, backgroundColor, color) => {
    return `<div class="subject" style="background-color: ${backgroundColor}; color: ${color};" onclick="showModal('modal-details-subject', '${id}')">
                <p>${name}</p>
            </div>`;
}

const updateMonth = () => {
    let currentMonthElem = document.getElementById('currentMonth');
    const actualMonth = current.getMonth() + monthsForward;
    currentMonthElem.innerHTML = months[actualMonth];
    
    let studiesDayList = document.getElementById('studies-day-list');
    let studiesDaysData = "";
    const materias = localStorage.getItem('materias');
    const jsonMaterias = JSON.parse(materias);
    const subjects = localStorage.getItem('subjects');
    const jsonSubjects = JSON.parse(subjects);
    for (let i = 1; i <= daysInMonth(actualMonth+1, current.getFullYear()); i++) {
        if (jsonSubjects !== null) {
            const subjectsToday = jsonSubjects
                .filter(s => s.date === toFormat(new Date(current.getFullYear(), actualMonth, i)))
                .filter(s => s.subject.toLowerCase().includes(textFilter))
                .map(s => studyDay(
                    s.id, 
                    s.subject, 
                    jsonMaterias[s.materia] === undefined ? '#000000' : jsonMaterias[s.materia].color, 
                    textColorFrom(jsonMaterias[s.materia] === undefined ? '#000000' : jsonMaterias[s.materia].color)))
                .join('');
            studiesDaysData += studyDayList(i, subjectsToday);
        } else {
            studiesDaysData += studyDayList(i, "");
        }
    }
    studiesDayList.innerHTML = studiesDaysData;
    if (monthsForward === 0) {
        document.getElementById(`dia-${current.getDate()}`).classList.add('today-study-day');
    }
}

const onInit = () => {
    updateMonth();
}

const addHours = (date, h) => {
    let dt = new Date(date);
    dt.setTime(dt.getTime() + (h * 60 * 60 * 1000));
    return dt;
}

const toFormat = (date) => {
    let dt = new Date(date);
    let dtPlusThree = addHours(dt, -3);
    return dtPlusThree.toISOString().split('T')[0];
}

const uuidv4 = () => {
    if (crypto.randomUUID === undefined) {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    return crypto.randomUUID();
}

const filterSearch = () => {
    textFilter = document.getElementById("pesquisa").value.toLowerCase();
    updateMonth();
}

const textColorFrom = (backgroundColor) => {
    let colorHexa = backgroundColor.split("#")[1];
    let rgb = [parseInt(colorHexa.slice(0,2), 16), parseInt(colorHexa.slice(2,4), 16), parseInt(colorHexa.slice(4,6), 16)];
    const brightness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
    return brightness > 50 ? 'black' : 'white';
}

const addDaysToDate = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const goToToday = (inputType) => {
    if (inputType === 'title' && window.innerWidth >= 700)
    {
        return;
    }
    monthsForward = 0;
    updateMonth();
    const currentDay = current.getDate();
    smoothness = { behavior: 'smooth' };
    if (currentDay === 1 || currentDay === 2) {
        window.scrollTo({ top: 0, ...smoothness });
    } else {
        document.getElementById(`dia-${currentDay-2}`).scrollIntoView(smoothness);
    }
}

const changeActiveTagModal = (type) => {
    document.getElementById("tag-1").className = "tag tag-inactive";
    document.getElementById("tag-2").className = "tag tag-inactive";
    document.getElementById("tag-3").className = "tag tag-inactive";
    document.getElementById("tag-4").className = "tag tag-inactive";
    document.getElementById("tag-5").className = "tag tag-inactive";
    document.getElementById(`tag-${type}`).className = "tag tag-active";
    let modalContent = document.getElementById("modal-content-add");
    switch (type) {
        case 1:
            modalContent.innerHTML = addSubjectModal;
            populateAddSubject();
            break;
        case 2:
            modalContent.innerHTML = addSubtopicModal;
            break;
        case 3:
            modalContent.innerHTML = addMateriaModal;
            break;
        case 4:
            document.getElementById("modal-content-remove").innerHTML = removeSubtopicModal;
            populateRemoveTopic('subtopic-remove', 'subtopics');
            break;
        case 5:
            document.getElementById("modal-content-remove").innerHTML = removeMateriaModal;
            populateRemoveTopic('materia-remove', 'materias');
            break;
        default:
            modalContent.innerHTML = addSubjectModal;
            populateAddSubject();
            break;
    }
}

const previousMonth = () => {
    if (current.getMonth() + (monthsForward - 1) >= 0) {
        monthsForward--;
        updateMonth();
    }
}

const nextMonth = () => {
    if (current.getMonth() + (monthsForward + 1) <= 11) {
        monthsForward++;
        updateMonth();
    }
}

const closeModal = (typeModal = 'modal-add') => {
    document.getElementById(typeModal).style.display = 'none';
    updateMonth();
}

const populateRemoveTopic = (topic, storage) => {
    let topicSelect = document.getElementById(topic);
    const topics = localStorage.getItem(storage);
    if (topics !== null) {
        const jsonTopics = JSON.parse(topics);
        for (let i = 0; i < jsonTopics.length; i++) {
            let option = document.createElement('option');
            option.value = i;
            if (topic === 'subtopic-remove') {
                option.text = jsonTopics[i].subtopic;
            } else if (topic === 'materia-remove') {
                option.text = jsonTopics[i].materia;
            }
            topicSelect.add(option);
        }
    }
}

const populateAddSubject = () => {
    document.getElementById('date-subject').value = toFormat(current);
    
    let subtopicSelect = document.getElementById('subtopic');
    const subtopics = localStorage.getItem('subtopics');
    if (subtopics !== null) {
        const jsonSubtopics = JSON.parse(subtopics);
        for (let i = 0; i < jsonSubtopics.length; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = jsonSubtopics[i].subtopic;
            subtopicSelect.add(option);
        }
    }
    let materiaSelect = document.getElementById('materia');
    const materias = localStorage.getItem('materias');
    if (materias !== null) {
        const jsonMaterias = JSON.parse(materias);
        for (let i = 0; i < jsonMaterias.length; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = jsonMaterias[i].materia;
            materiaSelect.add(option);
        }
    }
}

const showModal = (typeModal = 'modal-add', idSubject) => {
    if (typeModal === 'modal-add') {
        changeActiveTagModal(1);
    } else if (typeModal === 'modal-details-subject') {
        const subjects = JSON.parse(localStorage.getItem('subjects'));
        const subtopics = JSON.parse(localStorage.getItem('subtopics'));
        const materias = JSON.parse(localStorage.getItem('materias'));
        const subject = subjects.filter(s => s.id === idSubject)[0];
        const date = new Date(subject.date);
        document.getElementById('modal-subject-name').innerHTML = subject.subject;
        document.getElementById('modal-date-subject').innerHTML = `${date.getDate()+1}/${date.getMonth()+1}/${date.getFullYear()}`;
        document.getElementById('modal-subtopic-subject').innerHTML = subtopics[subject.subtopic] === undefined ? '' : subtopics[subject.subtopic].subtopic;
        document.getElementById('modal-materia-subject').innerHTML = materias[subject.materia] === undefined ? '' : materias[subject.materia].materia;
    } else if (typeModal === 'modal-remove') {
        changeActiveTagModal(4);
    }
    document.getElementById(typeModal).style.display = 'flex';    
}

const saveSubject = () => {
    const subject = document.getElementById('subject').value;
    const subtopic = document.getElementById('subtopic').value;
    const materia = document.getElementById('materia').value;
    const date = document.getElementById('date-subject').value;

    if (subject.trim() === '' || subtopic === '' || materia === '' || date === '') {
        return;
    }

    let daysToAdd = [0,7,15,30].map(x => x+1);
    let values = [];
    for (let i = 0; i < daysToAdd.length; i++) {
        const dateValue = toFormat(addDaysToDate(date, daysToAdd[i]));
        let value = { id: uuidv4(), subject, subtopic, materia, date: dateValue };
        values.push(value);
    }
    
    const successText = "Disciplina Salva!";

    const subjects = localStorage.getItem('subjects');

    if (subjects === null) {
        localStorage.setItem('subjects', JSON.stringify(values));
        document.getElementById('subject').value = '';
        document.getElementById('subtopic').value = '';
        document.getElementById('materia').value = '';
        document.getElementById('date-subject').value = toFormat(current);
        alert(successText);
        return;
    }

    let oldSubjects = JSON.parse(subjects);
    for (let i = 0; i < values.length; i++) {
        oldSubjects.push(values[i]);
    }
    localStorage.setItem('subjects', JSON.stringify(oldSubjects));
    document.getElementById('subject').value = '';
    document.getElementById('subtopic').value = '';
    document.getElementById('materia').value = '';
    document.getElementById('date-subject').value = toFormat(current);
    alert(successText);
}

const saveSubtopic = () => {
    const subtopic = document.getElementById('subtopic').value;

    if (subtopic.trim() === '') {
        return;
    }

    const value = { subtopic };
    const successText = "Frente Salva!";

    const subtopics = localStorage.getItem('subtopics');

    if (subtopics === null) {
        const valueToArray = [value];
        localStorage.setItem('subtopics', JSON.stringify(valueToArray));
        document.getElementById('subtopic').value = "";
        alert(successText);
        return;
    }

    let oldSubtopics = JSON.parse(subtopics);
    oldSubtopics.push(value);
    localStorage.setItem('subtopics', JSON.stringify(oldSubtopics));
    document.getElementById('subtopic').value = "";
    alert(successText);
}

const saveMateria = () => {
    const materia = document.getElementById('materia').value;
    const materiaColor = document.getElementById('materia-color').value;

    if (materia.trim() === '') {
        return;
    }

    const value = { materia, color: materiaColor };
    const successText = "Matéria Salva!";

    const materias = localStorage.getItem('materias');

    if (materias === null) {
        const valueToArray = [value];
        localStorage.setItem('materias', JSON.stringify(valueToArray));
        document.getElementById('materia').value = "";
        alert(successText);
        return;
    }

    let oldMaterias = JSON.parse(materias);
    oldMaterias.push(value);
    localStorage.setItem('materias', JSON.stringify(oldMaterias));
    document.getElementById('materia').value = "";
    alert(successText);
}

const deleteSubtopic = () => {
    const subtopic = document.getElementById('subtopic-remove').value;

    if (subtopic.trim() === '') {
        return;
    }

    const successText = "Frente Deletada!";

    const subtopics = localStorage.getItem('subtopics');

    let oldSubtopics = JSON.parse(subtopics);
    oldSubtopics.splice(subtopic, 1);
    localStorage.setItem('subtopics', JSON.stringify(oldSubtopics));
    document.getElementById('subtopic-remove').value = "";
    changeActiveTagModal(4);
    alert(successText);
}

const deleteMateria = () => {
    const materia = document.getElementById('materia-remove').value;

    if (materia.trim() === '') {
        return;
    }

    const successText = "Matéria Deletada!";

    const materias = localStorage.getItem('materias');

    let oldMaterias = JSON.parse(materias);
    oldMaterias.splice(materia, 1);
    localStorage.setItem('materias', JSON.stringify(oldMaterias));
    document.getElementById('materia-remove').value = "";
    changeActiveTagModal(5);
    alert(successText);
}

const deleteSubject = () => {
    const subject = document.getElementById('modal-subject-name').innerHTML;
    
    if (subject.trim() === '') {
        return;
    }

    const subjects = localStorage.getItem('subjects');

    let oldSubjects = JSON.parse(subjects);
    const unfilteredSubjectsCount = oldSubjects.filter(s => s.subject === subject).length;
    const filteredSubjects = oldSubjects.filter(s => s.subject !== subject);
    localStorage.setItem('subjects', JSON.stringify(filteredSubjects));

    const successText = `${unfilteredSubjectsCount} Ocorrências de Disciplinas Deletadas! (${subject})`;
    alert(successText);
}

const exportData = () => {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const materias = JSON.parse(localStorage.getItem('materias')) || [];
    const subtopics = JSON.parse(localStorage.getItem('subtopics')) || [];
    
    const dataObject = {
        subjects,
        materias,
        subtopics
    }

    const today = toFormat(current);

    const file = new Blob([JSON.stringify(dataObject)], { type: "text/json" });
    const exportElem = document.createElement("a");
    exportElem.href = URL.createObjectURL(file);
    exportElem.download = `dados-calendario-revisao-estudos-${today}.json`;
    exportElem.click();
}

onInit();
