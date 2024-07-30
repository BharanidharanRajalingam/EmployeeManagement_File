export const nameRules = [
    value => {
        if (value) return true;
        return 'Name is required.';
    }
];

export const emailRules = [
    value => {
        if (value) return true;
        return 'E-mail is required.';
    },
    value => {
        if (/.+@.+\..+/.test(value)) return true;
        return 'E-mail must be valid.';
    },
];
export const passwords = [
    value => {
        if (value) return true;
        return 'Password is required.';
    },
    value => {
        if (value?.length >= 8) return true;
        return 'Password should contain minimum of 8 characters.';
    },
];
export const dob = [
    value => {
        if (value) return true;
        return 'DOB is required.';
    }
];
export const address = [
    value => {
        if (value) return true;
        return 'Address is required.';
    }
];
export const city = [
    value => {
        if (value) return true;
        return 'City is required.';
    }
];
export const state = [
    value => {
        if (value) return true;
        return 'State is required.';
    }
];
export const company = [
    value => {
        if (value) return true;
        return 'Company is required.';
    }
];
export const fromdate = [
    value => {
        if (value) return true;
        return 'From Date is required.';
    }
];
export const todate = [
    value => {
        if (value) return true;
        return 'To Date is required.';
    }
];
export const position = [
    value => {
        if (value) return true;
        return 'Position is required.';
    }
];