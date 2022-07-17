export function isValidEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function isRequired(val) {
    console.log(val != "");
    return val != "";
}

export function validate(validations, val) {
    return validations.reduce((flag, validation) => {
        return validation(val) && flag;
    }, true);
}