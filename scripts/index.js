let form = document.getElementById('newsletter');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    saveData(email.value);

})

let emailButton = document.getElementById('btn-form');
emailButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    saveData(email.value);
})

function saveData(email) {
    console.log(email);
    
    if (validateEmail(email)) {
        let data = JSON.parse(localStorage.getItem('mail-list'));
        if (data != null) {
            let used = data.filter((savedEmails) => {return savedEmails === email});
            if (used != null && used.length > 0) {
                resultFromSubmit(2);
                return false;
            } else {
                data.push(email);
                console.log(data);
            }
        } else {
            data = [email];
        }
        localStorage.setItem('mail-list', JSON.stringify(data));
        resultFromSubmit(1);
    } else {
        resultFromSubmit(0);
    }
}
function resultFromSubmit(value) {
    let msg = document.getElementById('feedback');
    if (value == 1) {
        msg.textContent = 'Sucesso! Muito obrigado :D';
        msg.style.color = 'green';
    } else if (value == 2) {
        msg.textContent = 'Email já cadastrado!';
        msg.style.color = 'red';
    } else {
        msg.textContent = 'Email inválido! Tente Novamente!';
        msg.style.color = 'red';
    }
    
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}