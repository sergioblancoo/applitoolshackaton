/// Object mapping file for demo website

module.exports = {
    loginForm: {
        logo: `.logo-w > a > img`,
        header: `h4`,
        username: {
            label: `:nth-child(1) > label`,
            icon: `:nth-child(1) > .pre-icon`,
            textbox: `#username`
        },
        password: {
            label: `form > :nth-child(2) > label`,
            icon: `:nth-child(2) > .pre-icon`,
            textbox: `#password`
        },
        loginButton: `#log-in`,
        rememberMeLabel: `.form-check-label`,
        socialIcons: {
            twitter: `.buttons-w`,
            facebook: `:nth-child(2) > img`,
            linkedin: `:nth-child(3) > img`
        }
    }
}