
let allSelectors = document.querySelectorAll('select');
let allInputs = document.querySelectorAll('form input');
let form = document.querySelector('form');
let errorText = document.querySelector('#errorText');
let submitButton = document.querySelector('#submitButton');
let submittedAlert = document.querySelector('.submittedAlert');
let closeAlert = document.querySelector('#closeAlert');
let photoContainer = document.querySelector('.photoContainer');

// de-structuring inputs / selectors 
const [citySelector, campusSelector, courseSelector, preferenceSelector, genderSelector, qualificationSelector, laptopSelector] = allSelectors;
const [fullName, fatherName, email, phone, cnic, fatherCnic, dob, address, image] = allInputs;

// data
const cities = ['', 'hyderabad', 'islamabad', 'karachi', 'lahore'];
const campuses = {
    hyderabad: ['', 'City Gate', 'Auto Bhan', 'Qasim Abad'],
    islamabad: ['', 'Sector H-13', 'Faizabad', 'Blue Area'],
    karachi: ['', 'Bahadurabad', 'Gulshan', 'Numaish'],
    lahore: ['', 'Jail Road', 'Lakshmi Chowk', 'Model Town'],
}
const courses = {
    'City Gate': ['', 'Web and Mobile App Development', 'Cyber Security', 'Python Programming'],
    'Auto Bhan': ['', 'ReactJS', 'Cyber Security', 'Java Programming'],
    'Qasim Abad': ['', 'Graphic Designing', 'Java Programming', 'Python Programming'],
    'Sector H-13': ['', 'Video Animation', 'Flutter', 'Python Programming'],
    'Faizabad': ['', 'Web and Mobile App Development', 'Cyber Security', 'Python Programming'],
    'Blue Area': ['', 'ReactJS', 'Cyber Security', 'Java Programming'],
    'Bahadurabad': ['', 'Graphic Designing', 'Java Programming', 'Python Programming'],
    'Gulshan': ['', 'Video Animation', 'Flutter', 'Python Programming'],
    'Numaish': ['', 'Web and Mobile App Development', 'Cyber Security', 'Python Programming'],
    'Jail Road': ['', 'ReactJS', 'Cyber Security', 'Java Programming'],
    'Lakshmi Chowk': ['', 'Graphic Designing', 'Java Programming', 'Python Programming'],
    'Model Town': ['', 'Video Animation', 'Flutter', 'Python Programming'],
}
const preferences = {
    'Web and Mobile App Development': [
        '',
        'Monday, Wednesday, Friday (MWF) - 7.00 PM',
        'Monday, Wednesday, Friday (MWF) - 9.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 7.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 9.00 PM',
    ],
    'Cyber Security': [
        '',
        'Monday, Wednesday, Friday (MWF) - 3.00 PM',
    ],
    'Python Programming': [
        '',
        'Monday, Wednesday, Friday (MWF) - 3.00 PM',
        'Monday, Wednesday, Friday (MWF) - 5.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 3.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 5.00 PM',
    ],
    'ReactJS': [
        '',
        'Monday, Wednesday, Friday (MWF) - 7.00 PM',
        'Monday, Wednesday, Friday (MWF) - 9.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 7.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 9.00 PM',
    ],
    'Java Programming': [
        '',
        'Monday, Wednesday, Friday (MWF) - 7.00 PM',
        'Monday, Wednesday, Friday (MWF) - 9.00 PM',
    ],
    'Graphic Designing': [
        '',
        'Tuesday, Thursday, Saturday (TTS)  - 3.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 5.00 PM',
    ],
    'Video Animation': [
        '',
        'Monday, Wednesday, Friday (MWF) - 7.00 PM',
        'Monday, Wednesday, Friday (MWF) - 9.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 7.00 PM',
        'Tuesday, Thursday, Saturday (TTS)  - 9.00 PM',
    ],
    'Flutter': [
        '',
        'Monday, Wednesday, Friday (MWF) - 3.00 PM',
        'Monday, Wednesday, Friday (MWF) - 5.00 PM',
    ],
}

// get image
let imageURL;
function getImage() {
    img = image.files[0]
    let fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onload = () => {
        imageURL = fileReader.result;
        photoContainer.innerHTML = `<img src="${imageURL}">`
    }
}


// DOM =========================================================================================================================
cities.forEach((city) => {
    citySelector.innerHTML += `<option value="${city}" >${city}</option>`
})
citySelector.onchange = () => {
    campusSelector.innerHTML = '';
    courseSelector.innerHTML = '';
    preferenceSelector.innerHTML = '';
    if (citySelector.value === '') {
        campusSelector.innerHTML = '';
        courseSelector.innerHTML = '';
        preferenceSelector.innerHTML = '';
    } else {
        campuses[citySelector.value].forEach((campus) => {
            campusSelector.innerHTML += `<option value="${campus}">${campus}</option>`
        })
    }
}
campusSelector.onchange = () => {
    courseSelector.innerHTML = '';
    preferenceSelector.innerHTML = '';
    if (campusSelector.value === '') {
        courseSelector.innerHTML = '';
        preferenceSelector.innerHTML = '';
    } else {
        courses[campusSelector.value].forEach((course) => {
            courseSelector.innerHTML += `<option value="${course}">${course}</option>`
        })
    }
}

courseSelector.onchange = () => {
    preferenceSelector.innerHTML = '';
    if (courseSelector.value === '') {
        preferenceSelector.innerHTML = '';
    } else {
        preferences[courseSelector.value].forEach((preference) => {
            preferenceSelector.innerHTML += `<option value="${preference}">${preference}</option>`
        })
    }
}
image.onchange = () => {
    getImage();
}
// ===========================================================================================================================


// check validation ========================================================================================================
function checkValidation() {
    let requiredField = '';
    for (let selector of allSelectors) {
        if (selector.value === '') {
            selector.style.borderColor = 'red';
            requiredField += selector.getAttribute('name') + ', ';
        }
    }
    for (let input of allInputs) {
        if (input.value === '') {
            if (input.getAttribute('name') === 'Father CNIC') {
                continue;
            }
            input.style.borderColor = 'red';
            requiredField += input.getAttribute('name') + ', ';
        }
    }
    errorText.innerText = `Please enter/select a valid ${requiredField}`
    if (requiredField === '') {
        errorText.innerText = ``;
    }
}
console.log(allInputs)
// ========================================================================================================================


// refresh the fields on input
allSelectors.forEach((selector) => {
    selector.addEventListener('input', () => {
        selector.style.borderColor = 'var(--secondary-color)';
    })
})
allInputs.forEach((input) => {
    input.addEventListener('input', () => {
        input.style.borderColor = 'var(--secondary-color)';
    })
})


// save values to local storage
let allData = JSON.parse(localStorage.getItem('studentDataSMIT')) || [];
function saveValues() {
    let valuesObj = {};
    allSelectors.forEach((selector) => {
        valuesObj[selector.getAttribute('name')] = selector.value
    })
    allInputs.forEach((input) => {
        if (input.getAttribute('name') === 'Picture') {
            valuesObj[input.getAttribute('name')] = imageURL;
        } else {
            valuesObj[input.getAttribute('name')] = input.value;
        }
    })
    allData.push(valuesObj)
    console.log(allData);
    console.log(valuesObj);
    localStorage.setItem('studentDataSMIT', JSON.stringify(allData))
}



// form submission
submitButton.onclick = () => {
    checkValidation()
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        saveValues()
        showSubmitted()
    })
}

// submitted Alert
function showSubmitted() {
    form.style.display = 'none'
    submittedAlert.style.opacity = '1'
    submittedAlert.style.zIndex = '1'
}

closeAlert.onclick = () => {
    form.style.display = 'flex'
    submittedAlert.style.opacity = '0'
    submittedAlert.style.zIndex = '-1'
    location.reload();
}




// =================================== download tab container ===============================================

let frontSideData = document.querySelector('.frontSideData');
let backSideData = document.querySelector('.backSideData');
let smitCard = document.querySelector('.smitCard');
let searchButton = document.querySelector('.searchBox Button');
let searchInput = document.querySelector('#searchInput');
let printBtn = document.querySelector('.print');
let noRecord = document.querySelector('.noRecord');


// parsing data from local storage
let studentDataSMIT = JSON.parse(localStorage.getItem('studentDataSMIT'))

// showingCardData
function ShowData() {
    if(studentDataSMIT===null){
        smitCard.style.display = 'none';
        noRecord.style.display = 'block'
        noRecord.innerHTML = `<h3 style="color: gray">no reccord found</h3>`
        return null
    }
    let studentData = studentDataSMIT.find((student) => {
        return student.CNIC === `${searchInput.value}`;
    })
    console.log(studentData)
    if (studentData) {
        noRecord.style.display = 'none'
        smitCard.style.display = 'flex';

        frontSideData.innerHTML = `
        <div class="studentImage"><img src="${studentData.Picture}" ></div>
        <h6>${studentData["Full Name"].toUpperCase()}</h6>
        <p>${studentData.Course}</p>
        `
        backSideData.innerHTML = `
        <p> <span>Name:</span> <span>${studentData["Full Name"]}</span></p>
        <p> <span>Father Name:</span> <span>${studentData["Father Name"]}</span></p>
        <p> <span>CNIC:</span> <span>${studentData.CNIC}</span></p>
        <p> <span>Course:</span> <span>${studentData.Course}</span></p>
        <div class="qrCode"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${studentData["Full Name"]}"></div>
        `
    } else {
        smitCard.style.display = 'none';
        noRecord.style.display = 'block'
        noRecord.innerHTML = `<h3 style="color: gray">no reccord found</h3>`
    }
}

searchButton.onclick = () => {
    ShowData()
}
