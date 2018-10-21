import axios from 'axios';
import '../../../scss/modules/_validation.scss';
class FormValidate {
    constructor(form) {
        this.form = form;
        this.options = {
            classError: 'error'
        };
    }

    init() {
        this.prepareElements();
        this.bindSubmit();
    }

    prepareElements() {
        this.form.setAttribute('novalidate', 'novalidate');
        const elements = this.form.querySelectorAll('[required]');

        [...elements].forEach(element => {

            if (element.nodeName.toUpperCase() == 'INPUT') {
                const type = element.type.toUpperCase();

                if (type == 'TEXT') {
                    element.addEventListener('input', e => {
                        this.testInputText(e.target);
                    });
                }
                if (type == 'EMAIL') {
                    element.addEventListener('input', e => {
                        this.testInputEmail(e.target);
                    });
                }
                if (type == 'URL') {
                    element.addEventListener('input', e => {
                        this.testInputURL(e.target);
                    });
                }
                if (type == 'CHECKBOX') {
                    element.addEventListener('click', () => {
                        this.testInputCheckbox(e.target);
                    });
                }
                if (type == 'RADIO') {
                    element.addEventListener('click', () => {
                        this.testInputCheckbox(e.target);
                    });
                }
            }
            if (element.nodeName.toUpperCase() == 'TEXTAREA') {
                element.addEventListener('input', e => {
                    this.testInputText(e.target);
                });
            }
            if (element.nodeName.toUpperCase() == 'SELECT') {
                element.addEventListener('change', e => {
                    this.testInputSelect(e.target);
                });
            }
        });
    };

    showFieldValidation(input, inputIsValid) {
        if (!inputIsValid) {
            input.parentElement.classList.add(this.options.classError);
        } else {
            input.parentElement.classList.remove(this.options.classError);
        }
    };

    testInputText(input) {
        let inputIsValid = true;
        const pattern = input.getAttribute('pattern');

        if (pattern !== null) {
            const reg = new RegExp(pattern, 'gi');
            if (!reg.test(input.value)) {
                inputIsValid = false;
            }
        } else {
            if (input.value === '') {
                inputIsValid = false;
            }
        }

        if (inputIsValid) {
            this.showFieldValidation(input, true);
            return true;
        } else {
            this.showFieldValidation(input, false);
            return false;
        }
    };

    testInputEmail(input) {
        const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');

        if (!mailReg.test(input.value)) {
            this.showFieldValidation(input, false);
            return false;
        } else {
            this.showFieldValidation(input, true);
            return true;
        }
    };

    testInputURL(input) {
        const urlReg = new RegExp('^https?:\/\/.+', 'i');
        if (!urlReg.test(input.value)) {
            this.showFieldValidation(input, false);
            return false;
        } else {
            this.showFieldValidation(input, true);
            return true;
        }
    };

    testInputSelect(select) {
        if (select.options[select.selectedIndex].value == '' || select.options[select.selectedIndex].value == '-1') {
            this.showFieldValidation(select, false);
            return false;
        } else {
            this.showFieldValidation(select, true);
            return true;
        }
    };

    testInputCheckbox(input) {
        const name = input.getAttribute('name');
        const group = input.form.querySelectorAll('input[name="' + name + '"]:checked');

        if (group.length) {
            this.showFieldValidation(input, true);
            return true;
        } else {
            this.showFieldValidation(input, false);
            return false;
        }
    };

    bindSubmit() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            let formIsValidated = true;
            const elements = this.form.querySelectorAll('[required]');

            [...elements].forEach(element => {
                if (element.nodeName.toUpperCase() == 'INPUT') {
                    const type = element.type.toUpperCase();

                    if (type == 'EMAIL') {
                        if (!this.testInputEmail(element)) {
                            formIsValidated = false;
                        }
                    }
                    if (type == 'URL') {
                        if (!this.testInputURL(element)) {
                            formIsValidated = false;
                        }
                    }
                    if (type == 'TEXT') {
                        if (!this.testInputText(element)) {
                            formIsValidated = false;
                        }
                    }
                    if (type == 'CHECKBOX') {
                        if (!this.testInputCheckbox(element)) {
                            formIsValidated = false;
                        }
                    }
                    if (type == 'RADIO') {
                        if (!this.testInputCheckbox(element)) {
                            formIsValidated = false;
                        }
                    }
                }
                if (element.nodeName.toUpperCase() == 'TEXTAREA') {
                    if (!this.testInputText(element)) {
                        formIsValidated = false;
                    }
                }
                if (element.nodeName.toUpperCase() == 'SELECT') {
                    if (!this.testInputSelect(element)) {
                        formIsValidated = false;
                    }
                }
            });

            if (formIsValidated) {
                console.log('send email');
                //   e.target.submit();
                this.sendMail();
            } else {
                return false;
            }
        });
    };

    sendMail() {

        let data = {
            'imie-i-nazwisko': document.getElementById('name').value,
            'twoj-email': document.getElementById('email').value,
            'data-wydarzenia': document.getElementById('date').value,
            'miejsce-wydarzenia': document.getElementById('place').value,
            'tresc-wiadomosci': document.getElementById('text').value
        };

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('mail.php', data, config)
            .then(response => {
                document.querySelector('.form').remove();
                document.querySelector('.form-info').innerHTML = '<h2>Dziękuję.<br>Postaram się jak najszybciej odpowiedzieć.</h2>';
            })
            .catch(error => {
                let text = document.createTextNode('Wystąpił jakiś błąd proszę wysłać ponownie formularz');
                let child = document.querySelector('.form');
                child.parentNode.insertBefore(text, child);
            });
    }

};

document.addEventListener('readystatechange', () => {
    if (document.readyState == 'complete') {
        const contact = new FormValidate(document.querySelector('.form'));
        contact.init();
    }
});


// nie mozna tego uzyc jezeli mamy async ustawione
// document.addEventListener("DOMContentLoaded", function() {
//   const contact = new FormValidate(document.querySelector('.form'));
//   contact.init();
// });